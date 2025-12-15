# Feature Guide

## User-Facing Features

### Browse Catalog
- Home page shows a responsive grid of products (name, description, price/unit).
- Product tiles include an Add to cart action.

### Search with Suggestions-like Filtering
- Client-side filtering on Home matches name, description, and category.
- Typing updates the list immediately.

### Filter/Sort
- Initial scope includes client-side search; category text is considered in the filter.
- Additional explicit filters/sorting can be added alongside the existing structure.

### Product Details
- Dedicated page with larger visual treatment, description, price/unit.
- Quantity selection with input validation (minimum 1).
- Add to cart and shortcut link to the cart.

### Cart Operations
- View cart items with editable quantities, per-line totals, and remove actions.
- Summary panel with subtotal, tax (7%), shipping (free above $25 or when subtotal is 0), and total.
- Proceed to checkout CTA.

### Checkout Flow
- Basic form collects name and address.
- On submit, posts to the API layer:
  - If a backend is configured and available, uses it.
  - Otherwise, returns a mock confirmation and clears the cart.
- Displays a confirmation panel with order details.

## Accessibility

- Semantic elements and clear labels for inputs and controls.
- aria-labels for theme toggle, cart count, inputs, and loading indicators.
- Visible focus outlines to support keyboard navigation.

## Responsiveness

- Layouts use fluid grids and flexible containers.
- Works across desktop, tablet, and mobile viewports.
- Sticky header and section dividers provide consistent structure.

## Routing Summary

- / — Home (catalog and search)
- /product/:id — Product details
- /cart — Cart
- /checkout — Checkout
- * — NotFound
