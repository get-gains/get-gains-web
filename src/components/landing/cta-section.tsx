"use client";

export function CTASection() {
  return (
    <section
      id="download"
      className="bg-surface-1 relative overflow-hidden py-32"
    >
      {/* Background Effects */}
      <div className="bg-gradient-mesh absolute inset-0" />
      <div className="bg-primary/10 absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full blur-[150px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="bg-surface-2/80 border-border/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2">
          <span className="text-2xl">🚀</span>
          <span className="text-muted-foreground text-sm font-medium">
            Ready to start?
          </span>
        </div>

        <h2 className="mb-8 text-4xl font-bold md:text-5xl lg:text-6xl">
          Ready to <span className="gradient-text">Transform</span> Your
          Workouts?
        </h2>

        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl leading-relaxed">
          Join thousands of athletes who are perfecting their form and earning
          rewards. Download Get Gains today and start your journey to better
          fitness.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* App Store Button */}
          <button className="group bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-4 rounded-2xl px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-70">Download on the</div>
              <div className="text-lg font-bold">App Store</div>
            </div>
          </button>

          {/* Google Play Button */}
          <button className="group bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-4 rounded-2xl px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-70">Get it on</div>
              <div className="text-lg font-bold">Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
