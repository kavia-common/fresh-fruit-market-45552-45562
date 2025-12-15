# FAQ & Troubleshooting

## Why do I see mock data?

If REACT_APP_API_BASE (or alternatives) is not set, or if the backend is unreachable, the API client returns mock products and a mock checkout confirmation. This keeps local development productive.

## How do I point the app to a backend?

Create a .env file and set:
```
REACT_APP_API_BASE=https://api.example.com
```
Restart the dev server after changes. The client will call:
- GET /products
- GET /products/:id
- POST /checkout

## Where do I change base URLs?

All API base resolution is centralized in src/api/client.js. Use:
- REACT_APP_API_BASE (preferred)
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL

## How do previews work?

The dev server runs via CRA (npm start) and is typically managed by the environment, served at http://localhost:3000. Avoid starting multiple servers manually in the same environment.

## Routing issues on static hosting?

The app uses HashRouter, which avoids server-side rewrite issues. If you switch to BrowserRouter later, configure your host to serve index.html for all routes.

## I changed .env but nothing happened.

Environment variables are inlined at build time. Restart the dev server after modifying .env.

## Can I change the port?

CRA defaults to 3000. You can set REACT_APP_PORT for other environments, but ensure your host supports it.

## Styling looks inconsistent.

Ensure you use the CSS variables defined in src/App.css (Ocean Professional theme). Avoid hard-coded colors and keep retro accents subtle.
