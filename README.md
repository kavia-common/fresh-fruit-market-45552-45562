# Fresh Fruit Market

A modern, responsive React frontend for an online fruit shop. The UI follows the Ocean Professional theme (blue primary with amber accents) and currently ships as a frontend-only application with mock-friendly API behavior.

- Project Overview: see docs/overview in this README
- Architecture: see docs/architecture.md
- Features: see docs/features.md
- Developer Guide: see docs/developer-guide.md
- Theme & UI Guidelines: see docs/theme.md
- Roadmap & Extensibility: see docs/roadmap.md
- FAQ & Troubleshooting: see docs/faq.md

## Project Overview

Purpose
- Provide a seamless browsing and shopping experience for fresh fruits with an accessible, performant web UI.

Key Features
- Browse catalog, product detail pages, cart operations, and a checkout flow.
- Client-side search with suggestions-like filtering by name/description/category.
- Light/dark theme toggle with persistence.
- Resilient API layer with environment-driven base URL and graceful mock fallback.

Tech Stack
- React 18 with Create React App (react-scripts)
- React Router v6 (HashRouter)
- Vanilla CSS with theme tokens (Ocean Professional)

Style Theme
- Ocean Professional (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827)

Current Scope
- Frontend-only. No backend integration is required; the app uses mock data unless a REACT_APP_API_BASE is provided.

## Documentation Index

- Architecture Overview: docs/architecture.md
- Feature Guide: docs/features.md
- Developer Guide: docs/developer-guide.md
- Theming & UI Guidelines: docs/theme.md
- Roadmap & Extensibility: docs/roadmap.md
- FAQ & Troubleshooting: docs/faq.md

Quick start
- npm install
- npm start
- Optional: set REACT_APP_API_BASE to point at a backend; otherwise mock data will be used.
