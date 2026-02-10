# Get Gains Web - Project Context

> **For AI Agents**: This document provides complete architectural context for the Get Gains Next.js web application. Read this first before making changes.

## Quick Reference

| Aspect              | Value                                         |
| ------------------- | --------------------------------------------- |
| **Framework**       | Next.js 16.x with App Router                  |
| **Language**        | TypeScript 5.x                                |
| **Styling**         | Tailwind CSS 4.x + ShadCN UI (New York style) |
| **3D Graphics**     | Three.js + React Three Fiber + Drei           |
| **Auth Provider**   | Supabase (JS client + SSR)                    |
| **Linting**         | ESLint 9.x + Prettier + lint-staged           |
| **Git Hooks**       | Husky (pre-commit via lint-staged)            |
| **Package Manager** | npm                                           |
| **Backend**         | Get Gains Server (Express.js) - separate repo |
| **Mobile App**      | Get Gains App (Flutter) - separate repo       |

---

## Architecture Overview

This is a **lightweight public-facing web application** that serves as:

1. **Landing Page** — Marketing site with creative 3D visuals (Three.js)
2. **Legal Pages** — Privacy Policy, Terms of Service
3. **Contact Page** — Contact us / support form
4. **Auth Intermediary** — Handles Supabase email verification and password reset token relay, then deep-links back into the Flutter mobile app

```
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, theme, metadata)
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Tailwind + design system CSS variables
│   ├── (legal)/                 # Route group: legal pages
│   │   ├── privacy/page.tsx     # Privacy Policy
│   │   └── terms/page.tsx       # Terms of Service
│   ├── contact/page.tsx         # Contact Us
│   └── auth/                    # Auth intermediary routes
│       ├── confirm/page.tsx     # Email verification handler
│       └── reset/page.tsx       # Password reset relay
├── components/                  # Shared React components
│   ├── ui/                      # ShadCN UI primitives
│   ├── landing/                 # Landing page sections
│   ├── three/                   # Three.js scene components
│   └── layout/                  # Layout components (Header, Footer)
├── lib/                         # Utilities and config
│   ├── utils.ts                 # ShadCN cn() utility
│   ├── supabase/                # Supabase client setup
│   │   ├── client.ts            # Browser client
│   │   └── server.ts            # Server-side client (SSR)
│   └── constants.ts             # App-wide constants
└── hooks/                       # Custom React hooks
```

---

## Essential Commands

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Lint
npm run lint
npm run lint:fix

# Format
npm run format
npm run format:check
```

### ShadCN UI

```bash
# Add a component
npx shadcn@latest add button
npx shadcn@latest add card

# Add multiple components
npx shadcn@latest add button card input label
```

---

## Key Implementation Patterns

### 1. Design System — Dark-First with Gradient Cards

The app follows the **Get Gains Design System** (documented in the Flutter app's `DESIGN_STYLE.md`). The web app uses the same OKLCH color tokens, configured as CSS custom properties in `globals.css`.

**Core Design Principle**: Dark-first, coral/orange primary (`#E8844A`), flat UI with **gradient background cards** and white text overlay.

#### Gradient Card Pattern

Cards use gradient backgrounds with white content text overlaid:

```tsx
// Primary gradient card
<div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-md">
  <h3 className="text-xl font-semibold">Card Title</h3>
  <p className="text-primary-foreground/80">Card content text</p>
</div>

// Accent gradient card (green/success)
<div className="rounded-2xl bg-gradient-to-br from-accent to-accent/70 p-6 text-accent-foreground shadow-md">
  <h3 className="text-xl font-semibold">Success Card</h3>
</div>

// Dark surface card with subtle gradient
<div className="rounded-2xl bg-gradient-to-br from-card to-secondary p-6 text-card-foreground shadow-md">
  <h3 className="text-xl font-semibold">Surface Card</h3>
</div>
```

#### Color Token Usage

| Token              | Dark Mode Hex | Purpose                          |
| ------------------ | ------------- | -------------------------------- |
| `primary`          | `#E07D3B`     | CTA buttons, gradient cards      |
| `accent`           | `#4ADE80`     | Success states, positive actions |
| `background`       | `#1A1A1A`     | Page background                  |
| `card`             | `#252525`     | Card/surface backgrounds         |
| `secondary`        | `#363636`     | Subtle surfaces, borders         |
| `destructive`      | `#7F1D1D`     | Error states                     |
| `muted-foreground` | `#A1A1AA`     | Secondary text                   |

#### Border Radius Scale

| Class          | Value  | Usage                     |
| -------------- | ------ | ------------------------- |
| `rounded-sm`   | 8px    | Chips, badges             |
| `rounded-md`   | 12px   | Buttons, inputs           |
| `rounded-lg`   | 16px   | Cards                     |
| `rounded-xl`   | 20px   | Large cards, modals       |
| `rounded-2xl`  | 24px   | Feature cards, hero cards |
| `rounded-full` | 9999px | Pills, avatars            |

### 2. Supabase Auth Integration

This web app acts as an **intermediary** for Supabase auth flows. It receives tokens from Supabase redirect URLs and relays them to the mobile app via deep links.

#### Email Verification Flow

```
1. User registers in Flutter app → Supabase sends verification email
2. Email contains link: https://get-gains-web.com/auth/confirm?token_hash=xxx&type=email
3. Web app receives, verifies token with Supabase
4. On success → deep link: getgains://auth/verified
5. Flutter app receives deep link → shows success state
```

#### Password Reset Flow

```
1. User requests reset in Flutter app → Supabase sends reset email
2. Email contains link: https://get-gains-web.com/auth/reset?token_hash=xxx&type=recovery
3. Web app receives, verifies token with Supabase
4. On success → deep link: getgains://auth/reset-password?access_token=xxx
5. Flutter app receives deep link → shows reset password form
```

#### Supabase Client Setup

```typescript
// Browser client (src/lib/supabase/client.ts)
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// Server client (src/lib/supabase/server.ts)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}
```

### 3. Three.js Scene (Landing Page)

The landing page features a 3D scene built with React Three Fiber:

- **Scene**: Crash Test Dummy doing a squat with glowing glitchy primary color effects
- **View**: Isometric camera angle
- **Integration**: `@react-three/fiber` for React integration, `@react-three/drei` for helpers

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      style={{ height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      {/* Crash Test Dummy model + effects */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
```

> **Important**: Three.js components must use `"use client"` directive since they rely on browser APIs.

### 4. Scroll Animations (Landing Page)

Landing page content sections animate on scroll:

- **Fade in from bottom** as user scrolls down
- **Fade out upward** as content passes viewport
- Uses `IntersectionObserver` for performance
- See `SCROLL_LANDING_PAGE.md` for full implementation plan

### 5. Deep Linking to Flutter App

```typescript
// Construct deep link URL
const deepLink = `${process.env.NEXT_PUBLIC_APP_DEEP_LINK_SCHEME}://auth/verified`;

// Redirect with fallback
window.location.href = deepLink;

// Fallback: show "Open in App" button or app store links
setTimeout(() => {
  // If deep link didn't work, show fallback UI
  setShowFallback(true);
}, 2000);
```

### 6. Server Components vs Client Components

```
Server Components (default):
  - Legal pages (static content)
  - Layout components
  - Auth intermediary pages (token verification)

Client Components ("use client"):
  - Three.js scene
  - Scroll animation wrappers
  - Interactive forms (contact)
  - Deep link redirect logic
```

---

## File Naming Conventions

| Type          | Convention                | Example                   |
| ------------- | ------------------------- | ------------------------- |
| Pages         | `page.tsx`                | `app/contact/page.tsx`    |
| Layouts       | `layout.tsx`              | `app/layout.tsx`          |
| Components    | `kebab-case.tsx`          | `hero-scene.tsx`          |
| UI Components | `kebab-case.tsx` (ShadCN) | `button.tsx`              |
| Utilities     | `kebab-case.ts`           | `deep-link.ts`            |
| Hooks         | `use-*.ts`                | `use-scroll-animation.ts` |
| Constants     | `kebab-case.ts`           | `constants.ts`            |
| Types         | `*.types.ts`              | `auth.types.ts`           |

---

## Environment Variables

| Variable                           | Description                  | Default                 |
| ---------------------------------- | ---------------------------- | ----------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`         | Supabase project URL         | Required                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`    | Supabase anonymous key       | Required                |
| `NEXT_PUBLIC_APP_URL`              | This web app's URL           | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_DEEP_LINK_SCHEME` | Flutter app deep link scheme | `getgains`              |
| `NEXT_PUBLIC_API_URL`              | Get Gains Server API URL     | `http://localhost:3001` |

---

## ShadCN UI Configuration

Configuration is in `components.json`:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Adding ShadCN Components

```bash
# Single component
npx shadcn@latest add button

# Multiple components at once
npx shadcn@latest add card button input label textarea
```

Components are installed to `src/components/ui/` and can be customized freely.

---

## Code Quality Setup

### ESLint

- Config: `eslint.config.mjs`
- Extends: `eslint-config-next`
- Run: `npm run lint` / `npm run lint:fix`

### Prettier

- Config: `.prettierrc`
- Plugin: `prettier-plugin-tailwindcss` (auto-sorts classes)
- Run: `npm run format` / `npm run format:check`

### Husky + lint-staged

- **Pre-commit hook**: Runs lint-staged
- **lint-staged config**: In `package.json`
  - `*.{ts,tsx}` → ESLint fix + Prettier
  - `*.{json,md,css}` → Prettier

---

## Relationship to Other Repos

```
┌─────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│  get_gains_app      │     │  get-gains-web       │     │  get-gains-server    │
│  (Flutter Mobile)   │◄────│  (Next.js Web)       │────►│  (Express API)       │
│                     │     │                      │     │                      │
│  • Main app         │     │  • Landing page      │     │  • REST API          │
│  • Workout tracking │     │  • Auth intermediary  │     │  • Prisma + Postgres │
│  • Offline-first    │     │  • Legal pages       │     │  • Supabase Auth     │
│  • Deep link target │     │  • 3D visuals        │     │  • Subscriptions     │
└─────────────────────┘     └──────────────────────┘     └──────────────────────┘
         ▲                            │
         │         Deep Links         │
         └────────────────────────────┘
```

- **Web → App**: Deep links for auth flows (email verification, password reset)
- **Web → Server**: Contact form submission (future)
- **Shared**: Supabase project, design system colors, branding

---

## Adding a New Page Checklist

1. [ ] Create route folder under `src/app/<route>/`
2. [ ] Create `page.tsx` (Server Component by default)
3. [ ] Add `"use client"` only if interactive
4. [ ] Use design system tokens (gradient cards, proper colors)
5. [ ] Add to navigation if needed
6. [ ] Update `FEATURE_INDEX.md`

---

## Dependencies Summary

```json
{
  "dependencies": {
    "@react-three/drei": "^10.x", // Three.js helpers (controls, loaders)
    "@react-three/fiber": "^9.x", // React Three Fiber (Three.js in React)
    "@supabase/ssr": "^0.8.x", // Supabase SSR client
    "@supabase/supabase-js": "^2.x", // Supabase JS client
    "class-variance-authority": "^0.7.x", // ShadCN variant utility
    "clsx": "^2.x", // Conditional classes
    "lucide-react": "^0.5x", // Icon library (ShadCN)
    "next": "16.x", // Next.js framework
    "radix-ui": "^1.x", // ShadCN primitive components
    "react": "19.x", // React
    "react-dom": "19.x", // React DOM
    "tailwind-merge": "^3.x", // Tailwind class merging
    "three": "^0.182.x" // Three.js 3D library
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4", // Tailwind PostCSS plugin
    "@types/three": "^0.182.x", // Three.js types
    "eslint": "^9", // Linter
    "eslint-config-next": "16.x", // Next.js ESLint config
    "husky": "^9.x", // Git hooks
    "lint-staged": "^16.x", // Staged file linting
    "prettier": "^3.x", // Code formatter
    "prettier-plugin-tailwindcss": "^0.7.x", // Tailwind class sorting
    "shadcn": "^3.x", // ShadCN CLI
    "tailwindcss": "^4", // Tailwind CSS
    "tw-animate-css": "^1.x", // ShadCN animation utilities
    "typescript": "^5" // TypeScript
  }
}
```

---

## Common Gotchas

1. **Three.js requires `"use client"`** — All R3F components must be client components. Wrap them in a client boundary component.

2. **Supabase SSR cookies** — Use the server client factory in Server Components and Route Handlers. Use the browser client in Client Components.

3. **Deep link scheme** — Must match the Flutter app's configured scheme (`getgains://`). Android and iOS handle deep links differently; test both.

4. **ShadCN component customization** — Components are copied into your codebase. Modify them freely but document changes.

5. **Tailwind v4** — Uses CSS-first configuration (no `tailwind.config.ts`). Design tokens are defined in `globals.css` using `@theme inline`.

6. **Dark mode** — Uses CSS class strategy (`.dark` class on `<html>`). Default is dark for this app.

7. **Environment variables** — `NEXT_PUBLIC_` prefix is required for client-side access. Never expose server-only secrets with this prefix.

---

_Last updated: February 11, 2026_
