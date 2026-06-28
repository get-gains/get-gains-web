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
│  NAVBAR (fixed, glassmorphism)                              │
│  [Logo]  Features  How It Works  Pricing  Contact  [CTA]   │
├─────────────────────────────────────────────────────────────┤
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
│   🟢 AI-Powered Form Analysis ✨                            │
│                                                             │
│   Transform Your                                            │
│   WORKOUT FORM              (gradient text + glow)          │
│                                                             │
│   Stop guessing if you're doing it right. Compare your      │
│   form with coaches using 3D models, get real-time          │
│   similarity scores, and earn rewards for consistency.      │
│                                                             │
│   [ Get Started Free → ]  [ ▶ Watch Demo ]                  │
│                                                             │
│   👤👤👤👤 +10k  ⭐⭐⭐⭐⭐ 4.9                               │
│   Trusted by 10,000+ athletes                              │
│                                                             │
│   ↓ Scroll                                                  │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ The Problem ───────────────────────────────────────┐   │
│   │                                                     │   │
│   │   [confused.png]     🔴 The Problem                 │   │
│   │   ❌ No way to       Tired of Guessing Your Form?   │   │
│   │   compare            ✕ No way to know if form       │   │
│   │                        matches the coach            │   │
│   │                      ✕ Risk of injury               │   │
│   │                      ✕ Plateauing results           │   │
│   │                      ✕ Expensive personal trainers  │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ Features ──────────────────────────────────────────┐   │
│   │                                                     │   │
│   │  ✨ Powerful Features                               │   │
│   │  Everything You Need to Master Your Form            │   │
│   │                                                     │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│   │  │🎯 AI Form│  │🧍 3D     │  │🎨 Custom │          │   │
│   │  │Comparison│  │Model Viz │  │Avatars   │          │   │
│   │  └──────────┘  └──────────┘  └──────────┘          │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│   │  │🏆 Reward │  │👨‍🏫 Coach │  │📊 Progress│          │   │
│   │  │System    │  │Classes   │  │Tracking  │          │   │
│   │  └──────────┘  └──────────┘  └──────────┘          │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ How It Works ──────────────────────────────────────┐   │
│   │                                                     │   │
│   │   [01 👀]────────[02 📱]────────[03 📈]             │   │
│   │   Watch Coach    Record Your    Compare &           │   │
│   │   Demo           Form           Improve             │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ Pricing ───────────────────────────────────────────┐   │
│   │                                                     │   │
│   │   ┌─────────────┐    ┌──────────────────┐           │   │
│   │   │  FREE       │    │ ⭐ Most Popular  │           │   │
│   │   │  $0/month   │    │  PREMIUM         │           │   │
│   │   │  5 features │    │  $9.99/month     │           │   │
│   │   │             │    │  7 features      │           │   │
│   │   │ [Get Started│    │  [Start 7-Day    │           │   │
│   │   │  Free]      │    │   Free Trial]    │           │   │
│   │   └─────────────┘    └──────────────────┘           │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────── SCROLL BOUNDARY ─────────────────────────┤
│                                                             │
│   ┌─ CTA Section ──────────────────────────────────────┐    │
│   │   🚀 Ready to start?                              │    │
│   │   Ready to Transform Your Workouts?               │    │
│   │   Join thousands of athletes...                   │    │
│   │   [ 🍎 App Store ] [ ▶ Google Play ]               │    │
│   └────────────────────────────────────────────────────┘    │
│                                                             │
│   FOOTER                                                    │
│   [Logo]  Description  Social   Product   Company           │
│   © 2026 Get Gains     🐦 📷    Features  Contact           │
│   Made with ❤️                   Pricing   Privacy           │
│                                  Download                   │
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

### Navbar (Fixed)

- **Position**: Fixed top, `z-50`, frosted glass background (`bg-background/70 backdrop-blur-xl`)
- **Logo**: `/getgains-logo.png` (160×40), links to `/`, hover scale effect
- **Nav Links** (hidden on mobile):
  - Features (`#features`)
  - How It Works (`#how-it-works`)
  - Pricing (`#pricing`)
  - Contact (`/contact`)
- **CTA Button**: "Download App" → `#download`, primary pill button with glow hover

---

### Section 1: Hero (Full Viewport Height)

- **3D Scene**: Crash Test Dummy squatting with glitch effects (replaces the previous static hero image)
- **Background Effects**: Gradient mesh, grid overlay, floating animated orbs (primary/accent blurs)
- **Overlay Content** (centered over 3D scene):

  **Badge**: Pulsing green dot + "AI-Powered Form Analysis" + sparkle icon

  **Headline**:

  > Transform Your
  > **Workout Form** ← gradient text with glow

  **Subheadline**:

  > Stop guessing if you're doing it right. Compare your form with coaches using **3D models**, get real-time **similarity scores**, and earn **rewards** for consistency.

  **CTA Buttons**:
  - Primary: "Get Started Free" → `#download` (coral pill + arrow icon + glow)
  - Secondary: "Watch Demo" (surface pill + play icon)

  **Social Proof Bar**:
  - Avatar stack: 4 gradient circles (JD, AK, MR, LP) + "+10k" badge
  - Star rating: ⭐⭐⭐⭐⭐ 4.9
  - Text: "Trusted by 10,000+ athletes"

- **Scroll Indicator**: Animated bouncing capsule with "Scroll" label at bottom center

---

### Section 2: The Problem (2-Column)

- **Background**: `bg-surface-1`, dots pattern overlay
- **Layout**: 2-column grid on desktop, stacked on mobile

  **Left Column — Image**:
  - Image: `/confused.png` (person confused about workout form)
  - Gradient overlay: `from-error/20 to-transparent`
  - Floating error card: ❌ "No way to compare" / "Guessing if form is correct"

  **Right Column — Content**:
  - Badge: Red dot + "The Problem" (error styled)
  - Heading: `Tired of **Guessing** Your Form?` (error-colored emphasis)
  - Body: "Most people watch a workout video once and hope they're doing it right. Without real feedback, you risk **injury** and waste time with **ineffective workouts**."
  - Pain Points List (error-styled X markers):
    1. "No way to know if your form matches the coach"
    2. "Risk of injury from incorrect technique"
    3. "Plateauing results from ineffective movements"
    4. "Expensive personal trainers or guesswork"

- **Animation**: Fades in from bottom on scroll

---

### Section 3: Key Features (3-Column Grid)

- **Background**: Gradient mesh overlay at 50% opacity
- **Section Header**:
  - Badge: Sparkle icon + "Powerful Features"
  - Heading: `Everything You Need to **Master Your Form**` (gradient text)
  - Subtitle: "A complete ecosystem for coaches and clients to perfect every movement"

- **Feature Cards** (3-col grid on desktop, stacked on mobile):

  | Icon | Title                  | Description                                                                                        | Gradient                       |
  | ---- | ---------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------ |
  | 🎯   | AI Form Comparison     | Record your form and get instant similarity scores compared to your coach's perfect demonstration. | `from-primary/20 to-primary/5` |
  | 🧍   | 3D Model Visualization | See your coach's form as a 3D model. Your avatar mirrors their movements for perfect comparison.   | `from-accent/20 to-accent/5`   |
  | 🎨   | Customizable Avatars   | Personalize your 3D model with cosmetics earned through consistency and achievements.              | `from-warning/20 to-warning/5` |
  | 🏆   | Reward System          | Earn XP, unlock discount coupons, and win physical rewards like supplements from our partners.     | `from-chart-4/20 to-chart-4/5` |
  | 👨‍🏫   | Coach Classes          | Premium access to professional coaches who create exercise programs with form demonstrations.      | `from-chart-5/20 to-chart-5/5` |
  | 📊   | Progress Tracking      | Track your form improvement over time with detailed analytics and milestone celebrations.          | `from-primary/20 to-accent/5`  |

- **Card Behavior**: Surface background (`bg-surface-1/80`), border highlight on hover (`hover:border-primary/50`), gradient background fades in on hover, icon scales + rotates 3°
- **Animation**: Staggered fade-in (100ms delay between cards)

---

### Section 4: How It Works (3-Step Timeline)

- **Background**: `bg-surface-1`, grid pattern overlay
- **Section Header**:
  - Badge: "Simple Process"
  - Heading: `How **Get Gains** Works` (gradient text)
  - Subtitle: "Three simple steps to perfect form and maximum gains"

- **Connection Line**: Horizontal gradient line (`from-primary via-warning to-accent`) connecting the 3 step badges on desktop

- **Steps**:

  | Step | Icon | Title             | Description                                                                                |
  | ---- | ---- | ----------------- | ------------------------------------------------------------------------------------------ |
  | 01   | 👀   | Watch Coach Demo  | Your coach records the perfect form for each exercise. View their 3D model from any angle. |
  | 02   | 📱   | Record Your Form  | Use your phone camera to record yourself. Our AI creates your 3D model instantly.          |
  | 03   | 📈   | Compare & Improve | Get similarity scores, see where to adjust, and track your improvement over time.          |

- **Card Style**: Step number badge (gradient `from-primary to-warning`, rounded-2xl), large faded step number in background (`text-primary/10`), surface card with hover border effect
- **Animation**: Sequential fade-in as user scrolls through

---

### Section 5: Pricing (2-Column Cards)

- **Background**: Gradient mesh overlay at 30% opacity
- **Section Header**:
  - Badge: "Pricing"
  - Heading: `Simple, **Transparent** Pricing` (gradient text)
  - Subtitle: "Start free, upgrade when you're ready for coach classes"

- **Plans**:

  **Free Plan**:
  - Price: `$0/month`
  - Tagline: "Perfect for getting started"
  - Features (✓ check marks):
    - Basic workout tracking
    - Self-recording & playback
    - Community exercises
    - Basic avatar customization
    - Achievement badges
  - CTA: "Get Started Free" (surface button, outline)

  **Premium Plan** (highlighted — `glow-primary` border):
  - Badge: "⭐ Most Popular" (gradient pill, floats above card)
  - Price: `$9.99/month` (gradient text)
  - Tagline: "For serious athletes"
  - Features (✓ check marks):
    - Everything in Free
    - Coach Classes access
    - AI form comparison
    - 3D model visualization
    - Premium avatar cosmetics
    - Physical reward eligibility
    - Partner discounts & coupons
  - CTA: "Start 7-Day Free Trial" (gradient primary button)

- **Animation**: Fades in from bottom on scroll

---

### Section 6: CTA (Call to Action)

- **Background**: `bg-surface-1`, gradient mesh, large primary blur orb (800×800px)
- **Content** (centered):
  - Badge: 🚀 "Ready to start?"
  - Heading: `Ready to **Transform** Your Workouts?` (gradient text)
  - Body: "Join thousands of athletes who are perfecting their form and earning rewards. Download Get Gains today and start your journey to better fitness."
  - **Store Buttons** (side by side):
    - Apple App Store button (dark, with Apple icon + "Download on the App Store")
    - Google Play button (dark, with Play icon + "Get it on Google Play")
- **Animation**: Scale up slightly on enter

---

### Section 7: Footer (4-Column)

- **Background**: `bg-surface-0`, top border
- **Grid Layout** (4 columns on desktop):

  **Brand Column** (spans 2 cols):
  - Logo: `/getgains-logo.png`
  - Description: "The ultimate workout tracker with AI-powered form analysis. Perfect your technique, earn rewards, achieve your goals."
  - Social Links: Twitter, Instagram (circular icon buttons)

  **Product Column**:
  - "Product" heading
  - Links: Features, Pricing, Download

  **Company Column**:
  - "Company" heading
  - Links: Contact, Privacy Policy

- **Bottom Bar**: Copyright "© 2026 Get Gains. All rights reserved." + "Made with ❤️ for athletes everywhere"

---

## Technical Architecture

### Component Tree

```
page.tsx (Server Component — composes the page)
├── Navbar (Client — fixed nav with glassmorphism)
│   ├── Logo (/getgains-logo.png)
│   ├── Nav Links (Features, How It Works, Pricing, Contact)
│   └── CTA Button ("Download App")
├── HeroSection (Client — "use client")
│   ├── Background Effects (gradient mesh, grid, floating orbs)
│   ├── HeroScene (Canvas + R3F)
│   │   ├── SceneLighting
│   │   ├── CrashTestDummy
│   │   │   └── SquatAnimation (useFrame hook)
│   │   ├── GroundGrid
│   │   └── EffectComposer (Bloom + Glitch)
│   ├── HeroOverlay
│   │   ├── Badge ("AI-Powered Form Analysis")
│   │   ├── Headline ("Transform Your Workout Form")
│   │   ├── Subheadline (3D models, similarity scores, rewards)
│   │   ├── CTA Buttons ("Get Started Free" + "Watch Demo")
│   │   └── Social Proof (avatar stack + star rating + "10,000+ athletes")
│   └── ScrollIndicator (animated bouncing capsule)
├── ScrollSection (Client — intersection observer)
│   └── ProblemSection
│       ├── Image (/confused.png + error overlay card)
│       └── Content (pain points list with ✕ markers)
├── ScrollSection
│   └── FeaturesSection
│       ├── SectionHeader ("Everything You Need to Master Your Form")
│       └── FeatureGrid (6 cards)
│           ├── FeatureCard (🎯 AI Form Comparison)
│           ├── FeatureCard (🧍 3D Model Visualization)
│           ├── FeatureCard (🎨 Customizable Avatars)
│           ├── FeatureCard (🏆 Reward System)
│           ├── FeatureCard (👨‍🏫 Coach Classes)
│           └── FeatureCard (📊 Progress Tracking)
├── ScrollSection
│   └── HowItWorksSection
│       ├── SectionHeader ("How Get Gains Works")
│       ├── ConnectionLine (gradient from-primary via-warning to-accent)
│       ├── Step 01 (👀 Watch Coach Demo)
│       ├── Step 02 (📱 Record Your Form)
│       └── Step 03 (📈 Compare & Improve)
├── ScrollSection
│   └── PricingSection
│       ├── SectionHeader ("Simple, Transparent Pricing")
│       ├── FreePlanCard ($0/month — 5 features)
│       └── PremiumPlanCard ($9.99/month — 7 features, highlighted)
├── ScrollSection
│   └── CTASection
│       ├── Heading ("Ready to Transform Your Workouts?")
│       ├── AppStoreButton
│       └── GooglePlayButton
└── Footer (Server Component)
    ├── BrandColumn (logo + description + social icons)
    ├── ProductLinks (Features, Pricing, Download)
    ├── CompanyLinks (Contact, Privacy Policy)
    └── BottomBar (copyright + "Made with ❤️")
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

- [ ] Set up `globals.css` custom utilities (gradient-mesh, bg-grid, bg-dots, glass, glow-primary, gradient-text, hover-lift, animate-float, surface colors, etc.)
- [ ] Create shared `Navbar` component (glassmorphism, logo, nav links, CTA button — with landing/subpage variants)
- [ ] Create shared `Footer` component (full 4-col for landing, simplified for subpages)
- [ ] Create `ScrollSection` wrapper component
- [ ] Create `useScrollAnimation` hook (IntersectionObserver)
- [ ] Build `HeroSection` with placeholder gradient background (badge, headline, subheadline, CTA buttons, social proof bar, scroll indicator)
- [ ] Build `ProblemSection` (2-col: image + pain points list)
- [ ] Build `FeaturesSection` (section header + 6-card grid with hover effects)
- [ ] Build `HowItWorksSection` (3-step timeline with connection line)
- [ ] Build `PricingSection` (Free + Premium cards with feature lists)
- [ ] Build `CTASection` (heading + App Store / Google Play buttons)
- [ ] Mobile responsive layout across all sections
- [ ] Test scroll animations across browsers

**Placeholder for 3D**: Use a static gradient hero with the app title and floating orb backgrounds (already designed in samples).

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
│   ├── globals.css                     # Design tokens + custom utilities (gradient-mesh, bg-grid, bg-dots, glass, glow-primary, etc.)
│   └── layout.tsx                      # Root layout
├── components/
│   ├── landing/
│   │   ├── hero-section.tsx            # Hero wrapper (sticky + overlay text + social proof)
│   │   ├── problem-section.tsx         # "The Problem" section (2-col: image + pain points)
│   │   ├── features-section.tsx        # 6-card feature grid with section header
│   │   ├── feature-card.tsx            # Individual gradient card (icon, title, description)
│   │   ├── how-it-works-section.tsx    # 3-step timeline with connection line
│   │   ├── pricing-section.tsx         # Free + Premium plan cards
│   │   ├── cta-section.tsx             # Call to action with App Store / Google Play buttons
│   │   ├── scroll-section.tsx          # Scroll animation wrapper
│   │   └── scroll-indicator.tsx        # Animated "scroll down" capsule
│   ├── three/
│   │   ├── hero-scene.tsx              # R3F Canvas + post-processing
│   │   ├── crash-test-dummy.tsx        # Dummy geometry + materials
│   │   ├── squat-animation.tsx         # Animation hook
│   │   ├── glitch-effects.tsx          # Post-processing effects
│   │   ├── ground-grid.tsx             # Reference grid
│   │   └── scene-lighting.tsx          # Lighting setup
│   ├── layout/
│   │   ├── navbar.tsx                  # Fixed glassmorphism navigation (shared across pages)
│   │   └── footer.tsx                  # Page footer (full 4-col on landing, simplified on subpages)
│   └── ui/                             # ShadCN components
├── hooks/
│   ├── use-scroll-animation.ts         # IntersectionObserver hook
│   └── use-reduced-motion.ts           # prefers-reduced-motion hook
└── lib/
    └── utils.ts                        # cn() utility
```

### Shared Components Across Pages

The Navbar and Footer are used across all pages (landing, contact, privacy) with slight variations:

| Component  | Landing Page                                                                     | Subpages (Contact, Privacy)                                      |
| ---------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Navbar** | Anchor links (#features, #how-it-works, #pricing, /contact) + "Download App" CTA | /#features, /#pricing, /privacy or /contact + "Back to Home" CTA |
| **Footer** | Full 4-column grid (brand, social, product links, company links) + bottom bar    | Simplified single-row (logo, copyright, 2 links)                 |

### CSS Custom Utilities (defined in `globals.css`)

These custom utilities are used across all samples and should be defined in the global stylesheet:

| Utility                       | Description                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `bg-gradient-mesh`            | Subtle background gradient pattern                                                   |
| `bg-grid`                     | CSS grid/dot background pattern                                                      |
| `bg-dots`                     | Dot matrix background pattern                                                        |
| `glass`                       | Glassmorphism effect (`backdrop-blur` + semi-transparent background)                 |
| `gradient-text`               | Gradient text using `bg-clip-text text-transparent` with primary-to-warning gradient |
| `text-glow`                   | Text shadow glow effect in primary color                                             |
| `glow-primary`                | Box shadow glow in primary color                                                     |
| `hover-glow`                  | Glow effect on hover state                                                           |
| `hover-lift`                  | Subtle translateY lift on hover                                                      |
| `animate-float`               | Gentle floating keyframe animation                                                   |
| `animate-pulse-glow`          | Pulsing glow keyframe animation                                                      |
| `bg-gradient-radial`          | Radial gradient utility                                                              |
| `bg-surface-0/1/2/3`          | Surface color hierarchy (darkest to lightest)                                        |
| `text-error` / `bg-error`     | Error/destructive color token                                                        |
| `text-warning` / `bg-warning` | Warning color token                                                                  |
| `bg-primary-hover`            | Primary hover state color                                                            |

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
