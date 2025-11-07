# Contributing

Thank you for your interest in contributing to the Fresh Fruit Market React frontend. This document outlines how to propose changes, coding standards, and review expectations.

## Ways to Contribute

- Bug fixes and refinements to UI components and pages.
- Accessibility improvements.
- Tests for components, pages, and API client.
- Documentation updates and clarifications.
- Integration wiring for future backend endpoints.

## Workflow

1) Create a branch
- Use a descriptive name: feature/cart-promo, fix/checkout-focus, docs/architecture-update.

2) Make your changes
- Follow the style guide (Ocean Professional palette, retro accents).
- Keep components small and composable.
- Prefer function components and hooks.
- Maintain accessibility (labels, focus, aria attributes).

3) Tests and lint
- Ensure npm test passes.
- Address ESLint warnings/errors (configured in eslint.config.mjs).

4) Commit Messages
- Use clear, imperative messages: “Add ProductCard hover transitions” or “Fix cart subtotal rounding”.

5) Pull Request
- Provide a concise description of the change and screenshots for UI updates.
- Request review from maintainers.
- Be open to feedback; small iterations keep PRs focused and easier to review.

## Code Quality Standards

- Structure:
  - Pages in src/pages, components in src/components, contexts in src/contexts, API in src/api.
- State:
  - Use React Context for cross-cutting state and local state for small component concerns.
- Data fetching:
  - Add new functions to src/api/client.js. Reuse fetchWithTimeout and environment-based base URL selection.
  - Provide mock fallbacks if appropriate to maintain local dev resilience.
- Styling:
  - Use CSS variables defined in App.css. Keep retro accents subtle and consistent with existing usage.
- Accessibility:
  - Include aria-labels, ensure focus management, and check contrast.
- Performance:
  - Memoize expensive computations and stable values. Avoid unnecessary re-renders.

## Security and Privacy

- Do not commit secrets. Only REACT_APP_* variables are exposed to the client.
- Validate and sanitize inputs where relevant on the future backend. The frontend should avoid leaking sensitive data in logs.

## Release and Versioning

- Production builds are created with npm run build.
- HashRouter enables static hosting without server rewrites. If switching to BrowserRouter, configure host routes accordingly.

## Getting Help

- Open an issue with details and repro steps.
- Propose improvements via PR with context and rationale.
