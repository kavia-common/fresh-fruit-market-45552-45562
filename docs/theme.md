# Theming & UI Guidelines

## Ocean Professional Theme

Primary Tokens (src/App.css)
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
- Muted: #6b7280
- Border: rgba(0,0,0,0.1)

Dark Mode Overrides ([data-theme="dark"])
- Primary: #60a5fa
- Secondary: #fbbf24
- Error: #f87171
- Surface: #0f172a
- Background: #0b1220
- Text: #e5e7eb
- Border: rgba(255,255,255,0.12)

Implementation details
- Theme is controlled by ThemeContext and applied via data-theme on documentElement.
- Use CSS variables (var(--primary), var(--bg), var(--text)) in components.

## Layout and Interaction

- Header: sticky top navigation with brand, cart badge, and theme toggle.
- Main content: grid-based layouts for lists, cards, and forms.
- Footer: lightweight links and contact information.

## Retro Accents

- Subtle repeating gradients for dividers and decorative backgrounds:
  - .retro-divider
  - Backgrounds in ProductCard, Home hero, and ProductDetail image area
- Keep opacity low and patterns subtle to maintain a professional look.

## Accessibility

- Maintain visible focus outlines:
  - Focus ring defined in App.css (outline: 2px solid #93c5fd).
- Provide aria-labels for interactive controls (theme toggle, buttons, inputs).
- Use semantic elements (headings, sections, lists) and appropriate roles.

## Component Consistency

- Cards: soft shadows, rounded corners (10–16px), clear hierarchy (title → description → action).
- Buttons: use primary color with accessible contrast; disabled states should reduce emphasis.
- Forms: labeled controls, large enough click targets, proper spacing.

## Do and Don’t

Do
- Use theme tokens consistently.
- Favor light borders and subtle shadows for separation and depth.
- Keep animations/transitions gentle and fast.

Don’t
- Introduce new colors without updating tokens and verifying contrast.
- Overuse heavy gradients or motion that distracts from content.
