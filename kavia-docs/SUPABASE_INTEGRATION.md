# Supabase Integration Guide (Auth and Database)

This guide explains how to integrate Supabase into the Fresh Fruit Market React frontend to add authentication and a hosted Postgres database while keeping the current mock-based behavior for local development.

## 1. Overview

The current frontend uses mock data when no backend API is available and supports a real API via environment configuration. Supabase can serve as the production-grade backend for:
- Authentication (email/password and OAuth providers)
- Database tables for products, orders, and order_items
- Row Level Security (RLS) to protect user data

The integration approach is incremental to avoid breaking local development flows.

## 2. Install and Configure

Install the official client:
```
npm install @supabase/supabase-js
```

Add environment variables to your .env:
```
REACT_APP_SUPABASE_URL=https://<your-project-ref>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJ...<anon-public-key>...
```

Notes:
- Only the anon public key should be used in the frontend. Never expose service role keys.
- Restart the dev server after changing .env.

## 3. Initialize the Client

Create a small wrapper for Supabase:

```javascript
// src/api/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 4. Authentication Patterns

Email/password:
```javascript
import { supabase } from './supabase';

// Sign up
await supabase.auth.signUp({ email: 'user@example.com', password: 'password123' });

// Sign in
await supabase.auth.signInWithPassword({ email: 'user@example.com', password: 'password123' });

// Session
const { data: { session } } = await supabase.auth.getSession();

// Sign out
await supabase.auth.signOut();
```

OAuth:
```javascript
await supabase.auth.signInWithOAuth({ provider: 'github' });
```

Recommended:
- Create an AuthContext similar to ThemeContext and CartContext:
  - Store { user, session }.
  - Subscribe to onAuthStateChange to react to sign-in/out.
  - Expose helper functions for signIn, signUp, signOut.

## 5. Database Structure

Create tables in Supabase with RLS enabled:

- products
  - id (text, PK)
  - name (text)
  - description (text)
  - price (numeric)
  - unit (text)
  - category (text)
  - stock (int)

- orders
  - id (uuid, PK, default uuid_generate_v4())
  - user_id (uuid, references auth.users)
  - total (numeric)
  - created_at (timestamp, default now())

- order_items
  - id (uuid, PK, default uuid_generate_v4())
  - order_id (uuid, references orders.id)
  - product_id (text, references products.id)
  - qty (int)
  - price (numeric)

RLS policies:
- products: anonymous read-only (if desired), or authenticated read-only.
- orders and order_items: insert/select only where user_id matches auth.uid().

## 6. Query Examples

```javascript
import { supabase } from './supabase';

// Products
export async function dbFetchProducts() {
  const { data, error } = await supabase.from('products').select('*').order('name');
  if (error) throw error;
  return data;
}

export async function dbFetchProductById(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Orders
export async function dbSubmitOrder({ userId, items, total }) {
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({ user_id: userId, total })
    .select()
    .single();
  if (orderErr) throw orderErr;

  const orderItems = items.map(it => ({
    order_id: order.id,
    product_id: it.id,
    qty: it.qty,
    price: it.price,
  }));
  const { error: itemsErr } = await supabase.from('order_items').insert(orderItems);
  if (itemsErr) throw itemsErr;

  return order;
}
```

## 7. Progressive Integration with Feature Flags

To keep local development smooth and allow opt-in usage of Supabase:

1) Add feature flag:
```
REACT_APP_FEATURE_FLAGS=supabase
```

2) Detect the flag in src/api/client.js and conditionally delegate:
- If Supabase URL/key are present and the “supabase” flag is enabled, use dbFetchProducts/dbFetchProductById/dbSubmitOrder.
- Otherwise, keep current behavior (HTTP or mock fallback).

Pseudocode for client.js:
```javascript
// at top
const FLAGS = (process.env.REACT_APP_FEATURE_FLAGS || '').toLowerCase();
const ENABLE_SUPABASE = FLAGS.includes('supabase')
  && process.env.REACT_APP_SUPABASE_URL
  && process.env.REACT_APP_SUPABASE_ANON_KEY;

// later in fetchProducts
if (ENABLE_SUPABASE) {
  const { dbFetchProducts } = await import('./supabase-data'); // module that uses supabase.js
  return dbFetchProducts();
}
```

3) Create src/api/supabase-data.js with the database functions shown in section 6 and import supabase from src/api/supabase.js.

4) Auth context:
- Add src/contexts/AuthContext.js and wrap <App> with <AuthProvider>. This is optional until you need user-specific orders, but recommended for a complete flow.

## 8. Safe Env Configuration in React

- Only variables prefixed with REACT_APP_ are inlined into the frontend bundle.
- Never commit actual secrets to source control. Use .env.example for placeholders.
- Restart the dev server after changing .env.
- Avoid logging secrets to the browser console.

## 9. Migration Tips

- Start by wiring read-only product listing to Supabase while preserving mock fallback.
- Introduce auth and protected writes (orders) after RLS policies are in place.
- Add loading states and error toasts for Supabase operations to ensure good UX.
- Keep tests running by mocking supabase-js in unit tests for db functions.

## 10. Checklist

- [ ] Add @supabase/supabase-js
- [ ] Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to .env
- [ ] Create src/api/supabase.js
- [ ] Create src/api/supabase-data.js with dbFetchProducts, dbFetchProductById, dbSubmitOrder
- [ ] Feature flag integration in src/api/client.js
- [ ] Optional AuthContext and UI hooks for sign-in/out
- [ ] Configure tables and RLS policies in Supabase

By following this guide, you can progressively enhance the app with Supabase-backed authentication and data while keeping the current resilient mock-driven experience for development.
