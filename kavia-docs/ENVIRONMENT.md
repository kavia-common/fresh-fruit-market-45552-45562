# Environment Configuration

This document explains the environment variables used by the Fresh Fruit Market React frontend. Variables are read at build time using the Create React App convention (REACT_APP_*). The most critical variable is the API base URL, which enables real data fetching; the app will fall back to mock data when the backend is not available.

## Key Variables

Primary API configuration (precedence order in src/api/client.js):
1) REACT_APP_API_BASE — Preferred API base URL
2) REACT_APP_BACKEND_URL — Alternative base URL
3) REACT_APP_FRONTEND_URL — Legacy alternative base URL

Other supported variables for broader environment control:
- REACT_APP_WS_URL — Reserved for future websockets.
- REACT_APP_NODE_ENV — Environment label (development, production, etc.).
- REACT_APP_NEXT_TELEMETRY_DISABLED — Disable telemetry if applicable.
- REACT_APP_ENABLE_SOURCE_MAPS — Toggle source map generation.
- REACT_APP_PORT — Preferred port for development (default 3000).
- REACT_APP_TRUST_PROXY — Proxy trust toggle for advanced setups.
- REACT_APP_LOG_LEVEL — Client logging level (e.g., debug, info, warn, error).
- REACT_APP_HEALTHCHECK_PATH — Healthcheck endpoint path (future).
- REACT_APP_FEATURE_FLAGS — Comma-separated or JSON-encoded flags.
- REACT_APP_EXPERIMENTS_ENABLED — true/false switch for experimental features.

## Example .env

```
# API Base URL
REACT_APP_API_BASE=https://api.example.com

# Optional/advanced
REACT_APP_WS_URL=wss://ws.example.com
REACT_APP_NODE_ENV=development
REACT_APP_ENABLE_SOURCE_MAPS=true
REACT_APP_PORT=3000
REACT_APP_TRUST_PROXY=false
REACT_APP_LOG_LEVEL=info
REACT_APP_HEALTHCHECK_PATH=/healthz
REACT_APP_FEATURE_FLAGS=betaFilters,perfHints
REACT_APP_EXPERIMENTS_ENABLED=false
```

## Behavior Without Backend

If none of the API base variables are set or if the backend returns errors/timeouts:
- fetchProducts and fetchProductById return mock data.
- submitCheckout returns a mock confirmation with a generated order ID.

This approach keeps local development productive without requiring backend availability.

## Applying Changes

- Environment values are inlined at build time by CRA. Changing .env requires restarting the dev server.
- Only variables prefixed with REACT_APP_ are exposed to the React app.
