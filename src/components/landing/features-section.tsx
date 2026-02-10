"use client";

import { FeatureCard } from "./feature-card";

function SparkleIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
    </svg>
  );
}

const features = [
  {
    icon: "🎯",
    title: "AI Form Comparison",
    description:
      "Record your form and get instant similarity scores compared to your coach's perfect demonstration.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: "🧍",
    title: "3D Model Visualization",
    description:
      "See your coach's form as a 3D model. Your avatar mirrors their movements for perfect comparison.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: "🎨",
    title: "Customizable Avatars",
    description:
      "Personalize your 3D model with cosmetics earned through consistency and achievements.",
    gradient: "from-warning/20 to-warning/5",
  },
  {
    icon: "🏆",
    title: "Reward System",
    description:
      "Earn XP, unlock discount coupons, and win physical rewards like supplements from our partners.",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
  {
    icon: "👨‍🏫",
    title: "Coach Classes",
    description:
      "Premium access to professional coaches who create exercise programs with form demonstrations.",
    gradient: "from-chart-5/20 to-chart-5/5",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description:
      "Track your form improvement over time with detailed analytics and milestone celebrations.",
    gradient: "from-primary/20 to-accent/5",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-32">
      <div className="bg-gradient-mesh absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <SparkleIcon />
            <span className="text-muted-foreground text-sm font-medium">
              Powerful Features
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Everything You Need to
            <span className="gradient-text block">Master Your Form</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            A complete ecosystem for coaches and clients to perfect every
            movement
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
