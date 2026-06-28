"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ScrollIndicator } from "./scroll-indicator";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <div className="bg-background h-full w-full" />,
});

// Icons
function ArrowRightIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="text-warning h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative h-screen">
      {/* Sticky 3D Scene Background */}
      <div className="absolute inset-0">
        {/* Background effects */}
        <div className="bg-gradient-mesh absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-30" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/15 absolute top-1/4 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full blur-[100px]" />
          <div
            className="bg-accent/10 absolute right-1/4 bottom-1/4 h-[400px] w-[400px] animate-pulse rounded-full blur-[80px]"
            style={{ animationDelay: "1s" }}
          />
          <div className="bg-gradient-radial from-primary/5 absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full to-transparent" />
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 md:right-0 md:left-1/2">
          <HeroScene />
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl space-y-8">
            {/* Badge */}
            <div className="bg-surface-2/80 border-border/50 hover:border-primary/50 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                AI-Powered Form Analysis
              </span>
              <SparkleIcon />
            </div>

            {/* Headline */}
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl">
              Transform Your
              <span className="gradient-text text-glow block">
                Workout Form
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground max-w-lg text-xl leading-relaxed">
              Stop guessing if you&apos;re doing it right. Compare your form
              with coaches using
              <span className="text-foreground font-semibold"> 3D models</span>,
              get real-time
              <span className="text-accent font-semibold">
                {" "}
                similarity scores
              </span>
              , and earn
              <span className="text-warning font-semibold"> rewards</span> for
              consistency.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#download"
                className="bg-primary hover:bg-primary-hover text-primary-foreground glow-primary hover-glow group inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRightIcon />
              </Link>
              <button className="bg-surface-2/80 hover:bg-surface-3 group border-border/50 text-foreground hover:border-primary/50 inline-flex items-center gap-3 rounded-full border px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300">
                <div className="bg-primary/20 group-hover:bg-primary/30 flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                  <PlayIcon />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[
                  "from-primary to-warning",
                  "from-accent to-primary",
                  "from-warning to-accent",
                  "from-primary to-accent",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`border-background flex h-11 w-11 items-center justify-center rounded-full border-3 bg-gradient-to-br ${gradient} ring-border/50 text-xs font-bold text-white ring-2`}
                  >
                    {["JD", "AK", "MR", "LP"][i]}
                  </div>
                ))}
                <div className="bg-surface-2 border-background text-muted-foreground ring-border/50 flex h-11 w-11 items-center justify-center rounded-full border-3 text-sm font-semibold ring-2">
                  +10k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} />
                  ))}
                  <span className="text-foreground ml-2 font-semibold">
                    4.9
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Trusted by 10,000+ athletes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
