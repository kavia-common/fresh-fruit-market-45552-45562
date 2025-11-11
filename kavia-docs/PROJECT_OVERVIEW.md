# Fruit Shop Frontend Project Overview

This document provides a comprehensive overview of the Fresh Fruit Market React frontend, covering architecture, environment setup, application of the style guide, development workflow, testing strategy, deployment notes, and the feature roadmap. It consolidates details from the current codebase and expands with practical guidance for ongoing development.

## 1. Architecture Overview

The application is a single-page React app (Create React App) using HashRouter to support static hosting without server-side route handling. Cross-cutting concerns are implemented with React Context:

- ThemeContext: Provides light/dark theme management, persists the mode in localStorage, and applies the chosen theme via the data-theme attribute for CSS variables.
- CartContext: Manages cart items and quantities, persists the cart in localStorage, and exposes derived costs (subtotal, tax, shipping, total).

Data access is centralized in src/api/client.js. It selects an API base URL from environment variables and includes a fetch wrapper with AbortController for timeouts. If environment variables are not configured or the backend is unavailable, the client returns mock data to keep the UI functional.

Key composition:
- App shell: src/App.js wraps the app with ThemeProvider and CartProvider, defines HashRouter routes, and renders Header and Footer on all pages.
- Pages: Home, ProductDetail, Cart, Checkout, NotFound, each under src/pages/.
- Components: Header, Footer, ProductCard, and Loading under src/components/.

### Module Map

- src/App.js: Application shell with contexts and routes.
- src/contexts/ThemeContext.js: Theme state, persistence, and data-theme application.
- src/contexts/CartContext.js: Cart state and computed totals with persistence.
- src/api/client.js: API base URL selection, fetch helpers, product and checkout APIs with mock fallbacks.
- src/pages/*.js: Page-level UI and behavior.
- src/components/*.js: Reusable presentational components.
- src/App.css and src/index.css: Theme tokens, global styles, and focus outlines.

### Routing

HashRouter routes:
- / — Home
- /product/:id — Product details
- /cart — Cart
- /checkout — Checkout
- * — NotFound

### Data Access

- getEnv(name, fallback): reads REACT_APP_* variables at build time.
- fetchProducts(): GET products with timeout and mock fallback.
- fetchProductById(id): GET product by id with mock fallback.
- submitCheckout(payload): POST checkout with timeout; returns mock confirmation when unavailable.

## 2. Environment Setup

Create React App exposes only variables prefixed with REACT_APP_. The client selects the API base URL with this precedence:
1) REACT_APP_API_BASE (preferred)
2) REACT_APP_BACKEND_URL
3) REACT_APP_FRONTEND_URL

Recognized variables in this project:
- REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

Example .env:
```
REACT_APP_API_BASE=https://api.example.com
REACT_APP_WS_URL=wss://ws.example.com
REACT_APP_NODE_ENV=development
REACT_APP_ENABLE_SOURCE_MAPS=true
REACT_APP_PORT=3000
REACT_APP_LOG_LEVEL=info
REACT_APP_FEATURE_FLAGS=betaFilters,perfHints
REACT_APP_EXPERIMENTS_ENABLED=false
```

Notes:
- Environment values are substituted at build time. Changing .env requires restarting the dev server.
- If the API base is not set or the backend is failing, the app will use mock data for products and checkout.

## 3. Applying the Style Guide

The Ocean Professional palette and design tokens are defined in src/App.css as CSS variables, with dark mode overrides under [data-theme="dark"]. Use CSS variables for colors and text rather than hard-coded values.

Palette:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Design guidance:
- Keep layouts clean and content-forward with rounded corners and subtle shadows.
- Use primary for actions/links and amber as accents.
- Apply retro accents in moderation using subtle repeating gradients (see .retro-divider and examples in ProductCard, Home, and ProductDetail).
- Maintain accessible focus outlines as defined in App.css.
- Respect dark mode via data-theme and CSS variables.

## 4. Development Workflow

Prerequisites:
- Node.js (LTS) and npm.

Setup and run:
- npm install
- npm start
The preview environment serves the app on port 3000 for the fruit_shop_frontend container. Avoid launching additional processes.

Scripts:
- npm start — React dev server with hot reload.
- npm test — Runs tests once (watch disabled).
- npm run build — Production build.

Linting:
- ESLint is configured in eslint.config.mjs, using @eslint/js and eslint-plugin-react.
- React legacy scope rules are disabled; react/jsx-uses-vars is enforced, and no-unused-vars is strict with React|App ignored.

Common tasks:
- Add a page: create a component in src/pages and add a Route in src/App.js.
- Add a component: place it in src/components, keep it small and accessible.
- Extend the API client: implement new functions in src/api/client.js using the existing helpers and follow the mock fallback pattern when appropriate.

## 5. Testing Strategy

Current testing setup:
- React Testing Library with jest-dom via react-scripts.
- A baseline test exists in src/App.test.js to verify the header renders.

Planned additions:
- Component tests for pages and components.
- Integration tests for cart operations and checkout flow.
- API client tests with fetch mocking, including timeouts and failure fallbacks.

Running tests:
- npm test

## 6. Deployment Notes

- Build with npm run build to produce optimized static assets in build/.
- HashRouter supports static hosting without server-side route handling. If migrating to BrowserRouter, ensure server rewrites map all routes to index.html.
- Configure REACT_APP_* variables before building. CRA only exposes variables with this prefix.

## 7. Feature Roadmap

Short-term:
- Integrate a real backend for products and checkout using RESTful endpoints.
- Increase test coverage for contexts, pages, and the API client.
- Replace placeholder emojis with optimized product images and alt text.

Medium-term:
- Add filters and categories to the catalog.
- Introduce user accounts with authentication (see Supabase guide).
- Persist past orders and user addresses when a backend is available.

Long-term:
- Add real-time inventory updates (future REACT_APP_WS_URL usage).
- Implement promotions, discount codes, and saved carts.
- Enhance accessibility to target WCAG AA+.

## 8. Supabase Integration Guide (Auth + Database)

This project currently uses mock data for products and a mock checkout confirmation. Supabase can provide a quick path to add authentication and a hosted Postgres database with REST and client SDKs.

### 8.1 Install Dependencies

Use the official Supabase JS client:
```
npm install @supabase/supabase-js
```

### 8.2 Define Environment Variables

Add these to your .env, ensuring each is prefixed with REACT_APP_ so CRA exposes them:
```
REACT_APP_SUPABASE_URL=https://<your-project-ref>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJ...<anon-public-key>...
```

Security note:
- Only use the anon public key in the frontend. Service role keys must never be in the client.
- Consider Row Level Security (RLS) in Supabase to protect tables.

### 8.3 Create a Supabase Client

Create a module (for example src/api/supabase.js) to initialize the client. This document shows the code snippet you should add; do not check in secrets.

Example:
```javascript
// src/api/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 8.4 Auth: Email/Password and OAuth

Usage patterns:
```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Get current session
const { data: { session } } = await supabase.auth.getSession();

// Sign out
await supabase.auth.signOut();
```

For OAuth providers (e.g., GitHub), configure providers in the Supabase dashboard and call:
```javascript
await supabase.auth.signInWithOAuth({ provider: 'github' });
```

Recommended: Create an AuthContext similar to ThemeContext/CartContext that stores the session and user, subscribes to auth state changes, and exposes sign-in/sign-out helpers.

### 8.5 Database: Products and Orders

Use Supabase tables with RLS enabled. Example tables:
- products: id (text), name (text), description (text), price (numeric), unit (text), category (text), stock (int)
- orders: id (uuid), user_id (uuid), total (numeric), created_at (timestamp)
- order_items: id (uuid), order_id (uuid), product_id (text), qty (int), price (numeric)

Example queries:
```javascript
// Fetch products
export async function dbFetchProducts() {
  const { data, error } = await supabase.from('products').select('*').order('name');
  if (error) throw error;
  return data;
}

// Fetch product by id
export async function dbFetchProductById(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Create an order and items
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

### 8.6 Progressive Integration Plan

You can layer Supabase into the existing API client without breaking local development:

1) Create feature flags:
- Add REACT_APP_FEATURE_FLAGS=supabase in .env to toggle Supabase usage.

2) Conditional fetching:
- In src/api/client.js, detect a “supabase” feature flag and delegate to supabase-based functions (e.g., dbFetchProducts) if configured and connected; otherwise keep mock/HTTP behavior.

3) Auth context:
- Introduce src/contexts/AuthContext.js to store the session. Wrap App with <AuthProvider> alongside ThemeProvider and CartProvider. Use the session to associate orders with a user.

4) Security:
- Enable RLS and write policies for products (read-only to anon) and orders/order_items (insert/select only by owner user_id).

This approach preserves the current mock fallback while enabling a gradual migration to Supabase for production.

## 9. Safe Environment Variable Practices in React

- Only use REACT_APP_* in the frontend. All other variables are ignored at build time.
- Never commit .env files with secrets. Provide .env.example with placeholder values.
- Restart the dev server after changing .env so CRA picks up changes.
- Avoid logging sensitive env values in the browser console or bundling them into code.

## 10. References

- Source files in this repository:
  - fruit_shop_frontend/src/App.js
  - fruit_shop_frontend/src/App.css
  - fruit_shop_frontend/src/api/client.js
  - fruit_shop_frontend/src/contexts/ThemeContext.js
  - fruit_shop_frontend/src/contexts/CartContext.js
  - fruit_shop_frontend/src/components/{Header,Footer,ProductCard,Loading}.js
  - fruit_shop_frontend/src/pages/{Home,ProductDetail,Cart,Checkout,NotFound}.js
  - fruit_shop_frontend/eslint.config.mjs
  - fruit_shop_frontend/README.md

For deeper architectural discussion, see ARCHITECTURE.md; for environment specifics, see ENVIRONMENT.md; for style guidance, see STYLE_GUIDE.md; for day-to-day workflows, see DEVELOPMENT.md.
