# UI/UX Style Guide

This document describes the visual and interaction guidelines for the Fresh Fruit Market frontend. The theme is “Ocean Professional” with a modern, minimalist aesthetic and subtle retro accents.

## Theme Palette

Defined as CSS variables in src/App.css:
- Primary: #2563EB
- Secondary: #F59E0B
- Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Dark mode overrides are provided via [data-theme="dark"].

## Visual Language

- Modern and clean:
  - Use generous white space, rounded corners (8–16px), and subtle shadows for depth.
  - Prefer light borders (rgba(0,0,0,0.06–0.12)) to separate sections.
- Retro accents:
  - Employ subtle repeating gradients for dividers and decorative card/hero backgrounds. See .retro-divider and examples in ProductCard/Home/Detail for patterns.
- Gradients:
  - Use low-opacity, soft angle linear gradients to avoid distraction.
- Motion:
  - Keep transitions smooth and understated for hover/focus states.

## Components

- Header:
  - Sticky top navigation, gradient backdrop, clear brand, theme toggle, and cart badge with count.
- Cards:
  - Surface background with a soft shadow and rounded corners.
  - Prominent title, subdued description, clear price with unit, and a primary button.
- Forms:
  - Rounded inputs, subtle inset shadows, clear labels, and visible focus outlines.

## Typography

- System sans-serif stack defined in src/index.css.
- Headings: moderate letter-spacing; avoid overly large sizes.
- Body: comfortable line-height; prioritize readability.

## Accessibility

- Maintain color contrast (prefer AA minimum).
- Ensure focus outlines remain visible. App.css defines a strong focus ring.
- Use semantic elements and aria-labels for non-text UI (e.g., theme toggle, cart count, product imagery).

## Theming Usage

- Apply colors via CSS variables instead of hard-coded values.
- Respect dark mode by reading variables (e.g., var(--bg), var(--text), var(--primary)).
- For new components, include minimal inline styles or create component-level CSS, but stay consistent with existing tokens.

## Do/Don’t

- Do:
  - Keep layouts simple and content-forward.
  - Use primary (#2563EB) for actions and links.
  - Use secondary/amber (#F59E0B) for accents and highlights.
- Don’t:
  - Overuse heavy gradients or animations.
  - Introduce new color tokens without updating variables and validating contrast.
