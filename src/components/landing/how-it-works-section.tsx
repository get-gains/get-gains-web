"use client";

const steps = [
  {
    step: "01",
    title: "Watch Coach Demo",
    description:
      "Your coach records the perfect form for each exercise. View their 3D model from any angle.",
    icon: "👀",
  },
  {
    step: "02",
    title: "Record Your Form",
    description:
      "Use your phone camera to record yourself. Our AI creates your 3D model instantly.",
    icon: "📱",
  },
  {
    step: "03",
    title: "Compare & Improve",
    description:
      "Get similarity scores, see where to adjust, and track your improvement over time.",
    icon: "📈",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-surface-1 relative overflow-hidden py-32"
    >
      <div className="bg-grid absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <span className="text-muted-foreground text-sm font-medium">
              Simple Process
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            How <span className="gradient-text">Get Gains</span> Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Three simple steps to perfect form and maximum gains
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connection Line */}
          <div className="from-primary via-warning to-accent absolute top-24 right-1/6 left-1/6 hidden h-0.5 bg-gradient-to-r md:block" />

          {steps.map((item, i) => (
            <div key={i} className="relative">
              {/* Step Number Badge */}
              <div className="from-primary to-warning text-primary-foreground shadow-primary/30 relative z-10 mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold shadow-lg">
                {item.icon}
              </div>

              {/* Content Card */}
              <div className="bg-surface-2/50 border-border/50 hover:border-primary/50 relative rounded-3xl border p-8 text-center backdrop-blur-sm transition-all duration-300">
                <span className="text-primary/10 absolute top-4 left-6 text-6xl font-bold">
                  {item.step}
                </span>
                <div className="relative pt-8">
                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
