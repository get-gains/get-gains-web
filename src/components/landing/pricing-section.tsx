"use client";

function CheckIcon() {
  return (
    <svg
      className="text-accent h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

const freePlanFeatures = [
  "Basic workout tracking",
  "Self-recording & playback",
  "Community exercises",
  "Basic avatar customization",
  "Achievement badges",
];

const premiumPlanFeatures = [
  "Everything in Free",
  "Coach Classes access",
  "AI form comparison",
  "3D model visualization",
  "Premium avatar cosmetics",
  "Physical reward eligibility",
  "Partner discounts & coupons",
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-32">
      <div className="bg-gradient-mesh absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <span className="text-muted-foreground text-sm font-medium">
              Pricing
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Start free, upgrade when you&apos;re ready for coach classes
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <div className="border-border/50 bg-surface-1/80 hover:border-border relative rounded-3xl border p-10 backdrop-blur-sm transition-all duration-300">
            <div className="mb-10">
              <h3 className="mb-2 text-2xl font-bold">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-6xl font-bold">$0</span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>
              <p className="text-muted-foreground mt-3">
                Perfect for getting started
              </p>
            </div>

            <ul className="mb-10 space-y-4">
              {freePlanFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-accent/20 flex h-6 w-6 items-center justify-center rounded-full">
                    <CheckIcon />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="bg-surface-2 hover:bg-surface-3 border-border/50 text-foreground hover:border-primary/50 w-full rounded-full border py-4 font-semibold transition-all duration-300">
              Get Started Free
            </button>
          </div>

          {/* Premium Plan */}
          <div className="glow-primary border-primary/30 from-primary/10 via-surface-1 to-accent/5 relative rounded-3xl border bg-gradient-to-br p-10">
            {/* Popular Badge */}
            <div className="from-primary to-warning text-primary-foreground shadow-primary/30 absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r px-6 py-2 text-sm font-bold shadow-lg">
              ⭐ Most Popular
            </div>

            <div className="mb-10">
              <h3 className="mb-2 text-2xl font-bold">Premium</h3>
              <div className="flex items-baseline gap-1">
                <span className="gradient-text font-mono text-6xl font-bold">
                  $9.99
                </span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>
              <p className="text-muted-foreground mt-3">For serious athletes</p>
            </div>

            <ul className="mb-10 space-y-4">
              {premiumPlanFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-accent/20 flex h-6 w-6 items-center justify-center rounded-full">
                    <CheckIcon />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="bg-primary hover:bg-primary-hover text-primary-foreground hover:shadow-primary/30 w-full rounded-full py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
