# Development Guide

This guide describes how to set up a local environment, run the app, execute tests, and follow workflows for day-to-day development on the Fresh Fruit Market React frontend.

## Prerequisites

- Node.js (LTS recommended) and npm.
- No backend is required for local development due to mock fallbacks.

## Setup and Run

1) Install dependencies:
```
npm install
```

2) Start the development server:
```
npm start
```

Notes:
- The preview system auto-starts on port 3000 for the fruit_shop_frontend container. Do not manually start additional processes in this environment.
- Modify or set REACT_APP_API_BASE if you need to point to a real backend.

## Scripts

- npm start — Starts the CRA development server with hot reload.
- npm test — Runs tests once (watch disabled as configured).
- npm run build — Builds a production bundle in build/.

## Linting

ESLint is configured via eslint.config.mjs:
- Uses @eslint/js and eslint-plugin-react.
- Disables legacy react/react-in-jsx-scope.
- Enforces react/jsx-uses-vars and no-unused-vars (ignoring React|App vars).
Run lint via your editor integration or a future npm script if added.

## Project Structure

```
src/
  api/client.js
  components/{Header,Footer,ProductCard,Loading}.js
  contexts/{ThemeContext,CartContext}.js
  pages/{Home,ProductDetail,Cart,Checkout,NotFound}.js
  App.js App.css index.js index.css
```

## Common Tasks

- Add a page:
  - Create a component under src/pages/.
  - Register the route in src/App.js Routes (HashRouter).
- Add a component:
  - Place in src/components.
  - Keep it focused and accessible (aria-labels, keyboard navigability).
- Extend API client:
  - Add functions in src/api/client.js using fetchWithTimeout and the base URL helpers.
  - Provide sensible fallbacks when feasible.

## Testing

- Framework: react-scripts with Testing Library and jest-dom (see src/setupTests.js).
- Current test: src/App.test.js checks the header renders.
- To run tests:
```
npm test
```

Planned additions:
- Component tests for pages/components.
- Integration tests for cart and checkout flows.
- API client tests with mocked fetch and abort handling.

## Preview System

- The environment provides an automatic preview on port 3000. Rely on it; do not manually change ports.
- If a different port is required for external environments, set REACT_APP_PORT accordingly and ensure host compatibility.

## Troubleshooting

- Blank data: ensure REACT_APP_API_BASE is correct; otherwise the app uses mock data by design.
- Routing issues on static hosts: HashRouter prevents server-route 404s. If you migrate to BrowserRouter, configure server rewrites.
