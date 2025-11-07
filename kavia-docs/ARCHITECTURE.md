# Architecture

This document describes the structure of the Fresh Fruit Market React frontend, including composition of components, contexts, routing, and data access, as implemented in the current codebase.

## Overview

The application is a single-page React app built with Create React App. It uses HashRouter to support static hosting without server-side route handling. Global concerns are managed via React Contexts:

- ThemeContext controls UI theming, toggling light/dark modes, persisting the theme, and applying data-theme for CSS variables.
- CartContext manages cart state, provides operations to modify contents, and computes derived totals.

All network operations are funneled through a minimal API client that reads environment variables for the API base URL and falls back to mock data.

## Application Shell

- src/App.js:
  - Wraps the app in ThemeProvider and CartProvider.
  - Sets up HashRouter and defines page routes.
  - Renders Header and Footer on all routes.
  - Adds a retro-divider for thematic styling.

Layout:
- Header: sticky top bar with brand, cart badge, and theme toggle.
- Main: page content (Home, ProductDetail, Cart, Checkout, NotFound).
- Footer: simple footer with links.

## Routing

The app uses react-router-dom v6 with HashRouter to ensure routes resolve on static hosts.

Routes:
- / — Home
- /product/:id — Product details
- /cart — Cart
- /checkout — Checkout
- * — NotFound

## State Management

### ThemeContext (src/contexts/ThemeContext.js)

- Exposes theme, setTheme, and toggleTheme().
- Persists the selected theme to localStorage under "ffm_theme".
- Applies data-theme on document.documentElement, enabling App.css to switch variables for dark mode.

### CartContext (src/contexts/CartContext.js)

- Stores an array of items with { id, name, price, qty, ... }.
- Persists items in localStorage under "ffm_cart".
- Public API:
  - addItem(product, qty=1)
  - updateQty(id, qty)
  - removeItem(id)
  - clear()
  - Derived values: subtotal, tax (7%), shipping (free above $25 or when subtotal is 0), total
  - count: total number of items across all lines

## Data Access Layer

### API Client (src/api/client.js)

- getEnv(name, fallback): utility for accessing process.env.
- Base URL resolution:
  - REACT_APP_API_BASE (preferred) or REACT_APP_BACKEND_URL or REACT_APP_FRONTEND_URL.
- fetchWithTimeout: wrapper with AbortController to avoid indefinite hangs.
- Public APIs:
  - fetchProducts(): returns products list (mock fallback if base URL missing/unreachable).
  - fetchProductById(id): returns product by id (mock fallback).
  - submitCheckout(payload): POSTs checkout; returns mock confirmation if unavailable.

The mock products and confirmation flow enable local development and testing without a backend.

## Components and Pages

- Header (src/components/Header.js): Top navigation, theme toggle, cart count badge.
- Footer (src/components/Footer.js): Footer links and contact.
- ProductCard (src/components/ProductCard.js): Product tile with add-to-cart.
- Loading (src/components/Loading.js): Accessible loading indicator.

- Home (src/pages/Home.js): Loads product list, client-side search, renders ProductCard grid.
- ProductDetail (src/pages/ProductDetail.js): Loads a single product, quantity selection, add-to-cart.
- Cart (src/pages/Cart.js): Cart listing, quantity updates, cost summary, link to checkout.
- Checkout (src/pages/Checkout.js): Simple form; submits to API client (mock or real), then shows confirmation and clears cart.
- NotFound (src/pages/NotFound.js): Fallback route.

## Styling and Theming

- src/App.css defines CSS variables for the Ocean Professional palette:
  - Light and dark palettes under :root and [data-theme="dark"].
- Retro accents are applied through subtle repeating gradients:
  - .retro-divider section divider
  - Decorative backgrounds in components/pages
- Global focus styles provide visible outlines for keyboard accessibility.

## Error Handling and Resilience

- API client timeouts and mock fallbacks prevent blocking UX when backend is misconfigured or down.
- Cart and theme are persisted locally to survive reloads.

## Extensibility Notes

- When adding new pages, register them under HashRouter in App.js.
- For new data endpoints, add functions to api/client.js following the same base URL and timeout pattern.
- Prefer extending contexts or creating new context providers for cross-cutting concerns.
