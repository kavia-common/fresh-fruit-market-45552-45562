# Roadmap & Extensibility

## Backend API Integration (Future)

- Replace mock fallbacks by configuring REACT_APP_API_BASE and implementing:
  - GET /products
  - GET /products/:id
  - POST /checkout
- Add robust error handling and user-facing messages.
- Consider pagination, categories/filters endpoints, and search suggestions.

## Payment Integration (Future)

- Integrate a payment provider (e.g., Stripe) in Checkout.
- Handle payment intents, error states, and confirmation flows.
- Securely manage keys and do not expose secrets in the frontend.

## Testing Strategy

- Unit tests:
  - Components: ProductCard, Header/Footer, Loading.
  - Pages: Home, ProductDetail, Cart, Checkout.
  - API client: success, timeout, and mock fallback paths.
- Integration tests:
  - Cart operations (add, update, remove).
  - Checkout flow (with mock confirmation).
- Accessibility checks:
  - Keyboard navigation, focus traps, aria-label coverage.

## Performance & Accessibility

- Performance:
  - Memoize heavy computations.
  - Consider code splitting for larger future routes/assets.
  - Optimize image assets when added.
- Accessibility:
  - Enforce contrast and focus visibility.
  - Validate semantics and labels.
  - Add screen reader-friendly announcements for cart/checkout actions.

## Extensibility Notes

- New features:
  - Explicit filters and sorting controls on Home.
  - Category browsing and landing pages.
  - Saved carts or wishlists (with backend support).
- Architecture:
  - Keep contexts well-scoped.
  - Expand the API client rather than scattering fetch calls.
