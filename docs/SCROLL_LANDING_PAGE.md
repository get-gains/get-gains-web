# Get Gains Web — Scroll Landing Page Implementation Plan

> **Purpose**: Detailed implementation plan for the 3D animated landing page featuring a Crash Test Dummy doing squats with glowing glitch effects, combined with scroll-driven section animations.

---

## Table of Contents

1. [Vision & Concept](#vision--concept)
2. [3D Hero Scene — Crash Test Dummy](#3d-hero-scene--crash-test-dummy)
3. [Scroll Animation System](#scroll-animation-system)
4. [Page Sections & Layout](#page-sections--layout)
5. [Technical Architecture](#technical-architecture)
6. [Performance Considerations](#performance-considerations)
7. [Implementation Phases](#implementation-phases)
8. [File Structure](#file-structure)

---

## Vision & Concept

The landing page is designed to be a **visually striking, immersive experience** that immediately communicates energy, movement, and fitness. The hero section features a 3D Crash Test Dummy performing a squat exercise, rendered with a glowing, glitchy aesthetic in the app's primary coral/orange color palette.

### Core Visual Concept

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ╔══════════════════════════════════════════╗              │
│   ║                                          ║              │
│   ║        🤖  CRASH TEST DUMMY              ║              │
│   ║        (glowing wireframe outline)       ║              │
│   ║        performing a squat                ║              │
│   ║        isometric view (45° angle)        ║              │
│   ║                                          ║              │
│   ║   ✨ Glitch effects: primary color       ║              │
│   ║   ✨ Subtle scan lines / digital noise   ║              │
│   ║   ✨ Glowing edge highlights             ║              │
│   ║                                          ║              │
│   ╚══════════════════════════════════════════╝              │
│                                                             │
│   GET GAINS                                                 │
│   Your AI-Powered Fitness Companion                         │
│                                                             │
│   [ Download Now ]                                          │
│                                                             │
│   ↓ Scroll to explore                                       │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ Section fades in from bottom ──────────────────────┐   │
│   │                                                     │   │
│   │   🏋️ TRACK YOUR WORKOUTS                           │   │
│   │   (gradient card with content)                      │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ Section fades in from bottom ──────────────────────┐   │
│   │                                                     │   │
│   │   📊 REAL-TIME PROGRESS                             │   │
│   │   (gradient card with content)                      │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ... more sections ...                                     │
│                                                             │
│   ┌─ CTA Section ──────────────────────────────────────┐    │
│   │   Ready to Get Gains?                              │    │
│   │   [ App Store ] [ Google Play ]                    │    │
│   └────────────────────────────────────────────────────┘    │
│                                                             │
│   FOOTER                                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3D Hero Scene — Crash Test Dummy

### Concept Details

The Crash Test Dummy is rendered as a **wireframe/outline figure** with a glowing, digital aesthetic. It continuously performs a squat animation in an isometric view.

### Visual Style

| Aspect            | Specification                                                   |
| ----------------- | --------------------------------------------------------------- |
| **Model Style**   | Simplified humanoid wireframe/outline (low-poly mesh edges)     |
| **Color**         | Primary coral/orange (`#E8844A`) with glow bloom                |
| **Glow Effect**   | Emissive edges, bloom post-processing, ~2–3px glow radius       |
| **Glitch Effect** | Periodic vertex displacement (subtle jitter), RGB split overlay |
| **Camera Angle**  | Isometric view — camera at `[5, 5, 5]` looking at origin        |
| **Animation**     | Smooth squat loop — standing → squat → standing (2–3s cycle)    |
| **Background**    | App background color (`#1A1A1A`), no environment/skybox         |
| **Grid**          | Faint ground grid in `muted` color for spatial reference        |

### Glitch Effects Breakdown

1. **Vertex Glitch**: Randomly offset vertices by small amounts on a timer (~every 2–4 seconds), then snap back. Creates a "digital instability" look.
2. **Edge Glow**: Use `MeshStandardMaterial` with `emissive` set to primary color + `UnrealBloomPass` for post-processing glow.
3. **Scanline Overlay**: CSS-based semi-transparent scanline pattern layered over the canvas — not in 3D, for performance.
4. **RGB Split**: On glitch trigger, briefly offset the red and blue channels of the final render (via post-processing effect or CSS filter).
5. **Flicker**: Occasional opacity pulse (95% → 100% → 95%) on the model material.

### Model Approach

**Option A — Procedural Geometry (Recommended for MVP)**

Build the dummy from basic Three.js primitives:

```
Head:       SphereGeometry (wireframe)
Torso:      BoxGeometry (wireframe)
Arms:       CylinderGeometry × 4 segments (wireframe)
Legs:       CylinderGeometry × 4 segments (wireframe)
Joints:     SphereGeometry (small, solid emissive)
```

Pros: No external model files, full control, tiny bundle size.

**Option B — GLTF Model (For polish phase)**

Use a low-poly humanoid `.glb` model with custom materials:

- Source from a CC0 mannequin/dummy model
- Apply `EdgesGeometry` + `LineBasicMaterial` for wireframe look
- Use `useGLTF` from `@react-three/drei` for loading

### Squat Animation

The squat animation is driven programmatically (not baked into a model):

```typescript
// Pseudo-code for squat animation
const SQUAT_DURATION = 2.5; // seconds per full cycle
const SQUAT_DEPTH = 0.8; // how far down (normalized)

function animateSquat(elapsed: number, parts: DummyParts) {
  // Sine wave for smooth up/down
  const t = Math.sin((elapsed / SQUAT_DURATION) * Math.PI * 2) * 0.5 + 0.5;
  const squatAmount = t * SQUAT_DEPTH;

  // Lower hips
  parts.hips.position.y = STANDING_HIP_Y - squatAmount * HIP_DROP;

  // Bend knees (rotate upper legs forward, lower legs back)
  parts.upperLegL.rotation.x = squatAmount * MAX_KNEE_BEND;
  parts.upperLegR.rotation.x = squatAmount * MAX_KNEE_BEND;
  parts.lowerLegL.rotation.x = -squatAmount * MAX_KNEE_BEND * 1.2;
  parts.lowerLegR.rotation.x = -squatAmount * MAX_KNEE_BEND * 1.2;

  // Slight forward torso lean
  parts.torso.rotation.x = squatAmount * TORSO_LEAN;

  // Arms extend forward for balance
  parts.upperArmL.rotation.x = squatAmount * ARM_RAISE;
  parts.upperArmR.rotation.x = squatAmount * ARM_RAISE;
}
```

### Three.js Component Structure

```
src/components/three/
├── hero-scene.tsx          # Canvas + post-processing setup
├── crash-test-dummy.tsx    # Dummy model (geometry + materials)
├── squat-animation.tsx     # Animation logic hook
├── glitch-effects.tsx      # Glitch shader / post-processing
├── ground-grid.tsx         # Faint reference grid
└── scene-lighting.tsx      # Lights + environment
```

### Post-Processing Stack

```typescript
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";

<EffectComposer>
  <Bloom
    luminanceThreshold={0.2}
    luminanceSmoothing={0.9}
    intensity={1.5}
    radius={0.8}
  />
  <Glitch
    delay={[2, 4]}        // seconds between glitches
    duration={[0.1, 0.3]} // glitch duration
    strength={[0.02, 0.05]}
    mode={GlitchMode.SPORADIC}
  />
</EffectComposer>
```

> **Note**: Install `@react-three/postprocessing` and `postprocessing` packages when implementing:
>
> ```bash
> npm install @react-three/postprocessing postprocessing
> ```

---

## Scroll Animation System

### Core Behavior

As the user scrolls past the hero section, content sections animate in and out:

| Direction    | Animation                                                 |
| ------------ | --------------------------------------------------------- |
| **Entering** | Fades in from bottom (opacity 0 → 1, translateY 60px → 0) |
| **Exiting**  | Fades out upward (opacity 1 → 0, translateY 0 → -30px)    |
| **Idle**     | Fully visible, no transform                               |

### Implementation: `useScrollAnimation` Hook

Uses `IntersectionObserver` for performant scroll detection — no scroll event listeners.

```typescript
// src/hooks/use-scroll-animation.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAnimationOptions {
  threshold?: number; // 0-1, how much of element must be visible
  rootMargin?: string; // margin around root (e.g., "-100px")
  triggerOnce?: boolean; // only animate in once, never out
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -80px 0px",
    triggerOnce = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else {
          if (!triggerOnce) setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
```

### Animation Wrapper Component

```tsx
// src/components/landing/scroll-section.tsx
"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // stagger delay in ms
}

export function ScrollSection({
  children,
  className,
  delay = 0,
}: ScrollSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: false });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

### Hero Parallax Behavior

The hero 3D scene remains fixed while the user scrolls. Content sections scroll over it:

```
┌──────────────────────────────────────┐
│  3D Scene (position: fixed/sticky)   │  ← Stays in place
│                                      │
│                                      │
├──────────────────────────────────────┤
│  Content sections scroll over        │  ← z-index above scene
│  with fade-in/fade-out animations    │
│                                      │
└──────────────────────────────────────┘
```

Implementation approach:

```tsx
// Hero: sticky/fixed behind content
<div className="sticky top-0 h-screen">
  <HeroScene />
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <h1>GET GAINS</h1>
    <p>Your AI-Powered Fitness Companion</p>
  </div>
</div>

// Content: scrolls over the hero with bg-background
<div className="relative z-10 bg-background">
  <ScrollSection>
    {/* Feature section 1 */}
  </ScrollSection>
  <ScrollSection delay={100}>
    {/* Feature section 2 */}
  </ScrollSection>
  {/* ... */}
</div>
```

---

## Page Sections & Layout

### Section 1: Hero (Viewport Height)

- **3D Scene**: Crash Test Dummy squatting with glitch effects
- **Overlay**: App title, tagline, CTA button
- **Scroll indicator**: Animated down arrow

### Section 2: "What is Get Gains?" (Feature Overview)

- **Layout**: 2-column on desktop, stacked on mobile
- **Content**: Brief app description + feature highlights
- **Card Style**: Primary gradient card (coral/orange → coral/80%)
- **Animation**: Fades in from bottom on scroll

### Section 3: Key Features (Grid)

- **Layout**: 3-column grid on desktop, single column on mobile
- **Cards**: Each feature in a gradient card variant:
  - 🏋️ **Workout Tracking** — Primary gradient
  - 📊 **Progress Analytics** — Accent/green gradient
  - 🤖 **AI Coaching** — Secondary/dark gradient with primary border
- **Animation**: Staggered fade-in (100ms delay between cards)

### Section 4: How It Works (Steps)

- **Layout**: Vertical timeline / numbered steps
- **Style**: Dark surface cards with numbered badges
- **Steps**:
  1. Sign Up
  2. Choose Your Program
  3. Track Your Workouts
  4. See Your Progress
- **Animation**: Sequential fade-in as user scrolls through

### Section 5: Social Proof / Testimonials (Optional)

- **Layout**: Horizontal scroll / carousel
- **Cards**: Dark surface with accent border
- **Animation**: Slide in from bottom

### Section 6: CTA (Call to Action)

- **Layout**: Full-width, centered
- **Background**: Large primary gradient
- **Content**: "Ready to Get Gains?" + App Store / Google Play buttons
- **Animation**: Scale up slightly on enter

### Section 7: Footer

- **Content**: Navigation links, legal links, social icons
- **Style**: Dark surface, minimal

---

## Technical Architecture

### Component Tree

```
page.tsx (Server Component — composes the page)
├── HeroSection (Client — "use client")
│   ├── HeroScene (Canvas + R3F)
│   │   ├── SceneLighting
│   │   ├── CrashTestDummy
│   │   │   └── SquatAnimation (useFrame hook)
│   │   ├── GroundGrid
│   │   └── EffectComposer (Bloom + Glitch)
│   └── HeroOverlay (title, tagline, CTA)
├── ScrollSection (Client — intersection observer)
│   └── FeatureOverview
├── ScrollSection
│   └── FeatureGrid
│       ├── FeatureCard (gradient)
│       ├── FeatureCard (gradient)
│       └── FeatureCard (gradient)
├── ScrollSection
│   └── HowItWorks
│       ├── Step 1
│       ├── Step 2
│       ├── Step 3
│       └── Step 4
├── ScrollSection
│   └── CTASection (gradient)
└── Footer (Server Component)
```

### State Management

No global state needed — the landing page is presentation-only. Local state for:

- Scroll animation visibility (`useState` in hook)
- 3D scene animation frame (`useFrame` from R3F)
- Mobile menu open/close (`useState`)

### Responsive Breakpoints

| Breakpoint | Width    | Layout Changes                    |
| ---------- | -------- | --------------------------------- |
| `sm`       | ≥ 640px  | Single column, smaller 3D canvas  |
| `md`       | ≥ 768px  | 2-column features                 |
| `lg`       | ≥ 1024px | 3-column features, full 3D canvas |
| `xl`       | ≥ 1280px | Max-width container               |

### 3D Scene Responsive Behavior

- **Mobile (< 768px)**: Reduced canvas height (60vh), simpler post-processing (no bloom for performance), camera zoomed in closer
- **Tablet (768px–1024px)**: Full height canvas, moderate post-processing
- **Desktop (> 1024px)**: Full scene with all effects

---

## Performance Considerations

### Three.js Optimizations

1. **Lazy load the Canvas**: Use `next/dynamic` with `ssr: false` to prevent server-side rendering of Three.js

   ```tsx
   const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
     ssr: false,
     loading: () => <div className="bg-background h-screen" />,
   });
   ```

2. **Low-poly model**: Keep geometry simple (< 1000 vertices for the dummy)

3. **Conditional post-processing**: Disable bloom/glitch on mobile or low-power devices

   ```tsx
   const isMobile = window.innerWidth < 768;
   // Skip heavy effects on mobile
   ```

4. **`frameloop="demand"`**: Only re-render when animation is active (saves GPU)

5. **Dispose resources**: Clean up geometries, materials, textures on unmount

### Scroll Animation Optimizations

1. **IntersectionObserver only** — No `scroll` event listeners
2. **CSS transforms** — Use `transform` and `opacity` (GPU-accelerated, no layout thrashing)
3. **`will-change`** — Apply sparingly to animating elements
4. **`triggerOnce`** — For sections that only need to animate in once

### Bundle Size

| Package                       | Approx Size | Notes                       |
| ----------------------------- | ----------- | --------------------------- |
| `three`                       | ~150KB gz   | Tree-shake unused modules   |
| `@react-three/fiber`          | ~40KB gz    | Required                    |
| `@react-three/drei`           | Variable    | Import only what you use    |
| `@react-three/postprocessing` | ~30KB gz    | Only if bloom/glitch needed |

**Strategy**: Code-split the entire 3D scene behind `next/dynamic` so non-landing pages don't pay the Three.js cost.

---

## Implementation Phases

### Phase 1: Page Structure & Scroll Animations _(Start here)_

**Goal**: Full page layout with scroll animations, no 3D yet.

- [ ] Create `ScrollSection` wrapper component
- [ ] Create `useScrollAnimation` hook
- [ ] Build page sections with placeholder content
- [ ] Implement gradient card components
- [ ] Add header and footer
- [ ] Mobile responsive layout
- [ ] Test scroll animations across browsers

**Placeholder for 3D**: Use a static gradient hero with the app title.

### Phase 2: Crash Test Dummy Model

**Goal**: 3D dummy model visible in hero section.

- [ ] Build procedural dummy geometry (primitives)
- [ ] Apply wireframe/edge materials with emissive primary color
- [ ] Set up isometric camera
- [ ] Add ground grid
- [ ] Lazy-load canvas with `next/dynamic`
- [ ] Basic lighting setup

### Phase 3: Squat Animation

**Goal**: Dummy performs smooth squat loop.

- [ ] Implement squat kinematics (hip drop, knee bend, torso lean, arm raise)
- [ ] Smooth easing with sine wave
- [ ] Test animation cycle timing (2.5–3s)
- [ ] Fine-tune joint rotation limits

### Phase 4: Glitch & Glow Effects

**Goal**: Full visual polish with post-processing.

- [ ] Install `@react-three/postprocessing` + `postprocessing`
- [ ] Add `Bloom` effect for edge glow
- [ ] Add `Glitch` effect (sporadic, subtle)
- [ ] CSS scanline overlay
- [ ] Optional: RGB split on glitch trigger
- [ ] Performance test on mobile — conditionally disable effects

### Phase 5: Polish & Optimization

**Goal**: Production-ready landing page.

- [ ] Performance audit (Lighthouse, bundle analysis)
- [ ] Reduce Three.js bundle (tree-shake)
- [ ] Add loading state for 3D scene
- [ ] Accessibility: prefers-reduced-motion support
- [ ] SEO metadata for landing page
- [ ] OG image / social sharing
- [ ] Final responsive QA

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                        # Landing page (Server Component, composes sections)
│   ├── globals.css                     # Design tokens
│   └── layout.tsx                      # Root layout
├── components/
│   ├── landing/
│   │   ├── hero-section.tsx            # Hero wrapper (sticky + overlay text)
│   │   ├── feature-overview.tsx        # "What is Get Gains?" section
│   │   ├── feature-grid.tsx            # 3-column feature cards
│   │   ├── feature-card.tsx            # Individual gradient card
│   │   ├── how-it-works.tsx            # Steps section
│   │   ├── cta-section.tsx             # Call to action
│   │   ├── scroll-section.tsx          # Scroll animation wrapper
│   │   └── scroll-indicator.tsx        # Animated "scroll down" arrow
│   ├── three/
│   │   ├── hero-scene.tsx              # R3F Canvas + post-processing
│   │   ├── crash-test-dummy.tsx        # Dummy geometry + materials
│   │   ├── squat-animation.tsx         # Animation hook
│   │   ├── glitch-effects.tsx          # Post-processing effects
│   │   ├── ground-grid.tsx             # Reference grid
│   │   └── scene-lighting.tsx          # Lighting setup
│   ├── layout/
│   │   ├── header.tsx                  # Navigation header
│   │   └── footer.tsx                  # Page footer
│   └── ui/                             # ShadCN components
├── hooks/
│   ├── use-scroll-animation.ts         # IntersectionObserver hook
│   └── use-reduced-motion.ts           # prefers-reduced-motion hook
└── lib/
    └── utils.ts                        # cn() utility
```

---

## Accessibility & Reduced Motion

For users who prefer reduced motion (`prefers-reduced-motion: reduce`):

- **3D Scene**: Show a static pose (no animation), disable post-processing
- **Scroll Animations**: Elements appear instantly (no transition)
- **Glitch Effects**: Disabled entirely

```typescript
// src/hooks/use-reduced-motion.ts
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
```

---

_Last updated: February 11, 2026_
