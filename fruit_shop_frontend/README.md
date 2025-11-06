# Fresh Fruit Market - React Frontend

A lightweight React app for an online fruit shop using the Ocean Professional palette (blue primary, amber accents) with subtle retro styling.

## Highlights

- Hash-based routing via `react-router-dom@6`
- ThemeContext with dark/light mode, persisted to localStorage
- CartContext with full cart operations and persisted state
- API client reads env base URL and gracefully falls back to mock data
- Product catalog, product detail, cart, and checkout flow
- Accessible components and semantic markup

## Getting Started

Install dependencies and start the app:

```bash
npm install
npm start
```

Open http://localhost:3000

## Environment Variables

Copy `.env.example` to `.env` and set:

- `REACT_APP_API_BASE` (preferred) or `REACT_APP_BACKEND_URL`/`REACT_APP_FRONTEND_URL`

If not set or the backend is unreachable, the app uses mock data for products and checkout.

## Scripts

- `npm start` - dev server
- `npm test` - run tests
- `npm run build` - production build

## Structure

```
src/
  api/client.js
  components/{Header,Footer,ProductCard,Loading}.js
  contexts/{ThemeContext,CartContext}.js
  pages/{Home,ProductDetail,Cart,Checkout,NotFound}.js
  App.js App.css index.js index.css
```

## Style

The Ocean Professional palette is implemented via CSS variables in `App.css`. Retro accents appear as subtle repeating gradients on hero/tiles and dividers.

## Routing

HashRouter ensures client-side routing works in static hosting environments. Pages:
- `/` home
- `/product/:id` details
- `/cart`
- `/checkout`
- any other route → NotFound
