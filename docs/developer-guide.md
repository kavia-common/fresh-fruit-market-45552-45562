# Developer Guide

## Local Development

Prerequisites
- Node.js (LTS recommended) and npm.

Setup
- Install dependencies:
```
npm install
```
- Start the development server:
```
npm start
```
- Open http://localhost:3000

Scripts (package.json)
- npm start — CRA dev server (react-scripts)
- npm test — runs tests once (watch disabled)
- npm run build — production build

## Environment Variables

Create React App exposes only REACT_APP_* keys to the client. Recognized keys:

Primary API base (used by src/api/client.js; precedence order):
1) REACT_APP_API_BASE — preferred base URL
2) REACT_APP_BACKEND_URL — alternative
3) REACT_APP_FRONTEND_URL — legacy alternative

Additional keys available in the environment (may be empty in this phase):
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

Behavior without backend:
- If no base URL is set or the API is unreachable, the app uses mock products and returns a mock order confirmation on checkout.

Note: Changing .env requires restarting the dev server.

## Preview Behavior

- A preview is typically controlled externally by the environment and served on port 3000.
- Do not spawn additional services; rely on the standard CRA dev server.
- For other environments, REACT_APP_PORT may be used, but hosting must support the change.

## Code Style and Linting

- ESLint is configured via eslint.config.mjs:
  - Uses @eslint/js and eslint-plugin-react.
  - Disables react/react-in-jsx-scope.
  - Enforces react/jsx-uses-vars and no-unused-vars (ignoring React|App).
- Follow the Ocean Professional theme and modern, minimal aesthetic.
- Keep components small, accessible, and composable.

Static analysis
- Linting runs via editor integrations; an explicit npm script for lint may be added later.
- Tests use Testing Library and jest-dom (see src/setupTests.js). Run:
```
npm test
```

## Project Structure

```
src/
  api/client.js
  components/{Header,Footer,ProductCard,Loading}.js
  contexts/{ThemeContext,CartContext}.js
  pages/{Home,ProductDetail,Cart,Checkout,NotFound}.js
  App.js App.css index.js index.css
```

## Extending the API Layer

- Add new functions in src/api/client.js.
- Reuse fetchWithTimeout and environment-based base URL logic.
- Provide safe fallbacks when appropriate to preserve developer UX.

## Routing and New Pages

- Register new page components in App.js under HashRouter Routes.
- For static hosting with BrowserRouter (future), ensure server rewrites are configured.
