# Get Gains Web - Feature Index

> **Purpose**: Central navigation hub for all Next.js web app features and documentation.

---

## Overview

**Get Gains Web** is a Next.js web application serving as the public-facing landing page, legal pages, and auth intermediary for the Get Gains fitness ecosystem. It bridges Supabase auth flows (email verification, password reset) to the Flutter mobile app via deep links.

### Technology Stack

| Technology            | Version | Purpose                            |
| --------------------- | ------- | ---------------------------------- |
| **Next.js**           | 16.x    | React framework (App Router)       |
| **TypeScript**        | ^5      | Type-safe JavaScript               |
| **Tailwind CSS**      | ^4      | Utility-first CSS (v4 CSS-first)   |
| **ShadCN UI**         | ^3      | Component library (New York style) |
| **Three.js**          | ^0.182  | 3D graphics engine                 |
| **React Three Fiber** | ^9      | React renderer for Three.js        |
| **@react-three/drei** | ^10     | Three.js helpers and abstractions  |
| **Supabase JS**       | ^2      | Auth client                        |
| **Supabase SSR**      | ^0.8    | Server-side Supabase integration   |
| **Husky**             | ^9      | Git hooks                          |
| **lint-staged**       | ^16     | Pre-commit linting                 |
| **Prettier**          | ^3      | Code formatting                    |
| **ESLint**            | ^9      | Code linting                       |

### Architecture Approach

- **App Router** with Server Components by default
- **Client Components** only for interactive/3D content
- **CSS-first Tailwind v4** with OKLCH design tokens
- **Dark-first design** with gradient card UI pattern
- **Supabase SSR** for secure server-side auth token handling

---

## Documentation Structure

| Document                                         | Purpose                                              |
| ------------------------------------------------ | ---------------------------------------------------- |
| [CONTEXT.md](CONTEXT.md)                         | Core infrastructure, patterns, conventions           |
| [FEATURE_INDEX.md](FEATURE_INDEX.md)             | This file — navigation hub                           |
| [SCROLL_LANDING_PAGE.md](SCROLL_LANDING_PAGE.md) | 3D landing page scroll animation implementation plan |

### Cross-Repo Documentation

| Document                                                                  | Purpose                                |
| ------------------------------------------------------------------------- | -------------------------------------- |
| [Flutter App — CONTEXT.md](../../get_gains_app/docs/CONTEXT.md)           | Mobile app architecture                |
| [Flutter App — DESIGN_STYLE.md](../../get_gains_app/docs/DESIGN_STYLE.md) | Shared design system (source of truth) |
| [Server — CONTEXT.md](../../get-gains-server/docs/CONTEXT.md)             | Backend API patterns                   |
| [Server — AUTH.md](../../get-gains-server/docs/features/AUTH.md)          | Auth endpoints & Supabase setup        |

---

## Feature Categories

### Core Infrastructure _(Documented in [CONTEXT.md](CONTEXT.md))_

| Topic                 | Description                          | CONTEXT.md Section          |
| --------------------- | ------------------------------------ | --------------------------- |
| Project Structure     | Folder organization                  | Architecture Overview       |
| Design System         | OKLCH tokens, gradient cards         | Design System               |
| Supabase Setup        | Browser + Server client factories    | Supabase Auth Integration   |
| Three.js Setup        | R3F canvas, scene components         | Three.js Scene              |
| Scroll Animations     | IntersectionObserver fade patterns   | Scroll Animations           |
| Deep Linking          | Flutter app redirect logic           | Deep Linking to Flutter App |
| Code Quality          | ESLint, Prettier, Husky, lint-staged | Code Quality Setup          |
| ShadCN UI             | Component library usage              | ShadCN UI Configuration     |
| Environment Variables | Config for Supabase, API, deep links | Environment Variables       |

### Landing Page _(Documented in [SCROLL_LANDING_PAGE.md](SCROLL_LANDING_PAGE.md))_

| Feature                   | Description                                         | Status             |
| ------------------------- | --------------------------------------------------- | ------------------ |
| Hero Section + 3D Scene   | Crash Test Dummy squat w/ glitch effects (Three.js) | 🔮 Not Implemented |
| Scroll Animations         | Fade-in-from-bottom / fade-out-upward on scroll     | 🔮 Not Implemented |
| Feature Showcase Sections | App features with gradient cards                    | 🔮 Not Implemented |
| CTA Section               | App store download links                            | 🔮 Not Implemented |
| Header / Navigation       | Minimal nav bar                                     | 🔮 Not Implemented |
| Footer                    | Links, socials, legal                               | 🔮 Not Implemented |

**Primary Files (planned):**

- `/src/app/page.tsx` — Landing page composition
- `/src/components/landing/` — Section components
- `/src/components/three/` — 3D scene components
- `/src/hooks/use-scroll-animation.ts` — Scroll observer hook

### Auth Intermediary

| Feature              | Description                                         | Status             |
| -------------------- | --------------------------------------------------- | ------------------ |
| Email Verification   | Verify Supabase email token → deep link to app      | 🔮 Not Implemented |
| Password Reset Relay | Verify recovery token → deep link with access token | 🔮 Not Implemented |
| Fallback UI          | "Open in App" button + app store links              | 🔮 Not Implemented |

**Primary Files (planned):**

- `/src/app/auth/confirm/page.tsx` — Email verification handler
- `/src/app/auth/reset/page.tsx` — Password reset token relay
- `/src/lib/supabase/client.ts` — Browser Supabase client
- `/src/lib/supabase/server.ts` — Server-side Supabase client

**Auth Flow Diagrams:**

```
Email Verification:
  Supabase Email → Web /auth/confirm?token_hash=xxx&type=email
                 → Verify token server-side
                 → Deep link: getgains://auth/verified
                 → Flutter app shows success

Password Reset:
  Supabase Email → Web /auth/reset?token_hash=xxx&type=recovery
                 → Verify token server-side
                 → Deep link: getgains://auth/reset-password?access_token=xxx
                 → Flutter app shows reset form
```

### Legal Pages

| Feature          | Description               | Status             |
| ---------------- | ------------------------- | ------------------ |
| Privacy Policy   | App privacy policy page   | 🔮 Not Implemented |
| Terms of Service | App terms of service page | 🔮 Not Implemented |

**Primary Files (planned):**

- `/src/app/(legal)/privacy/page.tsx`
- `/src/app/(legal)/terms/page.tsx`

### Contact Page

| Feature      | Description                   | Status             |
| ------------ | ----------------------------- | ------------------ |
| Contact Form | Support / feedback submission | 🔮 Not Implemented |

**Primary Files (planned):**

- `/src/app/contact/page.tsx`

---

## App Routes Summary

| Route           | Page                 | Purpose                           | Component Type          |
| --------------- | -------------------- | --------------------------------- | ----------------------- |
| `/`             | Landing              | Marketing page with 3D visuals    | Mixed (Server + Client) |
| `/privacy`      | Privacy Policy       | Legal — privacy policy            | Server                  |
| `/terms`        | Terms of Service     | Legal — terms of service          | Server                  |
| `/contact`      | Contact Us           | Support contact form              | Client                  |
| `/auth/confirm` | Email Verification   | Supabase email verify → deep link | Server                  |
| `/auth/reset`   | Password Reset Relay | Supabase reset token → deep link  | Server                  |

---

## Design Approach

### Visual Identity

The web app mirrors the Flutter app's design system with web-specific adaptations:

- **Dark mode primary** — OLED-optimized dark backgrounds
- **Gradient cards** — Primary coral/orange gradients with white text overlay
- **Coral/Orange accent** (`#E8844A`) — CTAs, primary interactions
- **Green accent** (`#4ADE80`) — Success states
- **Rounded & soft** — Generous border radius (16–24px for cards)
- **Poppins font** — Primary UI typeface (via Google Fonts / Next Font)

### Gradient Card Examples

```
┌─────────────────────────────────────────┐
│  ░░░░ Orange Gradient Background ░░░░   │
│                                         │
│   🏋️ Track Your Gains                  │  ← White text
│   Log workouts, track progress,         │  ← White/80% text
│   and crush your goals.                 │
│                                         │
│   [ Get Started → ]                     │  ← White outlined button
└─────────────────────────────────────────┘
```

---

## Quick Start Guide

### How to Navigate Documentation

1. **New to the codebase?** Start with [CONTEXT.md](CONTEXT.md) for patterns
2. **Working on the landing page?** See [SCROLL_LANDING_PAGE.md](SCROLL_LANDING_PAGE.md)
3. **Working on auth flows?** See CONTEXT.md → Supabase Auth Integration
4. **Need design reference?** See Flutter app's [DESIGN_STYLE.md](../../get_gains_app/docs/DESIGN_STYLE.md)

### Common Workflows

#### Adding a New Page

1. Create route folder: `src/app/<route>/`
2. Create `page.tsx` (Server Component by default)
3. Add `"use client"` only if interactive content needed
4. Use gradient card pattern for content cards
5. Add route to this index

#### Adding a ShadCN Component

```bash
npx shadcn@latest add <component-name>
```

Components are installed to `src/components/ui/` and fully customizable.

#### Working with Three.js

1. Create component in `src/components/three/`
2. Add `"use client"` at top of file
3. Use `<Canvas>` from `@react-three/fiber`
4. Use helpers from `@react-three/drei`
5. Lazy-load the canvas in the page to avoid SSR issues

---

## File Structure Reference

```
get-gains-web/
├── .env.example                    # Environment variable template
├── .env.local                      # Local environment variables
├── .husky/
│   └── pre-commit                  # lint-staged hook
├── .prettierrc                     # Prettier config
├── .prettierignore                 # Prettier ignore patterns
├── components.json                 # ShadCN UI config
├── eslint.config.mjs               # ESLint config
├── next.config.ts                  # Next.js config
├── package.json                    # Dependencies + lint-staged config
├── postcss.config.mjs              # PostCSS (Tailwind)
├── tsconfig.json                   # TypeScript config
├── docs/
│   ├── CONTEXT.md                  # Project context (this doc)
│   ├── FEATURE_INDEX.md            # Feature navigation (this file)
│   └── SCROLL_LANDING_PAGE.md      # Landing page implementation plan
├── public/                         # Static assets
│   └── ...
└── src/
    ├── app/
    │   ├── globals.css             # Tailwind + design system tokens
    │   ├── layout.tsx              # Root layout
    │   ├── page.tsx                # Landing page
    │   ├── (legal)/
    │   │   ├── privacy/page.tsx    # Privacy Policy
    │   │   └── terms/page.tsx      # Terms of Service
    │   ├── contact/page.tsx        # Contact page
    │   └── auth/
    │       ├── confirm/page.tsx    # Email verification
    │       └── reset/page.tsx      # Password reset relay
    ├── components/
    │   ├── ui/                     # ShadCN primitives
    │   ├── landing/                # Landing page sections
    │   ├── three/                  # Three.js components
    │   └── layout/                 # Header, Footer
    ├── hooks/                      # Custom React hooks
    └── lib/
        ├── utils.ts                # cn() utility
        ├── constants.ts            # App constants
        └── supabase/
            ├── client.ts           # Browser Supabase client
            └── server.ts           # Server Supabase client
```

---

## Documentation Conventions

### Documentation Hierarchy

```
CONTEXT.md                → Core patterns, conventions (always check first)
FEATURE_INDEX.md          → Navigation hub (this file)
SCROLL_LANDING_PAGE.md    → Landing page 3D + scroll implementation plan
```

### When to Create Feature Docs

**Create a new feature doc when:**

- Feature has complex implementation requiring a plan (e.g., 3D scene)
- Feature involves multiple components and integration points
- Feature needs a phased rollout approach

**Don't create separate docs for:**

- Simple CRUD pages (legal, contact)
- Auth flow (documented in CONTEXT.md)
- Individual component documentation

### Documentation Status Legend

| Status             | Meaning                        |
| ------------------ | ------------------------------ |
| ✅ Complete        | Full implementation with docs  |
| ✅ Infrastructure  | Setup complete, needs features |
| 🚧 Partial         | Some implementation exists     |
| ⚠️ Needs Docs      | Feature exists, undocumented   |
| 🔮 Not Implemented | Planned feature                |

---

## Current Status Summary

| Category          | Status             | Notes                                |
| ----------------- | ------------------ | ------------------------------------ |
| Project Setup     | ✅ Infrastructure  | Next.js, Tailwind, ShadCN, deps      |
| Design System     | ✅ Infrastructure  | OKLCH tokens configured in CSS       |
| Code Quality      | ✅ Complete        | ESLint, Prettier, Husky, lint-staged |
| Landing Page      | 🔮 Not Implemented | See SCROLL_LANDING_PAGE.md           |
| Auth Intermediary | 🔮 Not Implemented | Email verify + password reset        |
| Legal Pages       | 🔮 Not Implemented | Privacy + Terms                      |
| Contact Page      | 🔮 Not Implemented | Contact form                         |

---

_Last updated: February 11, 2026_
