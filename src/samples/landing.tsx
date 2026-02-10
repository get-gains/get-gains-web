import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
const CheckIcon = () => (
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

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    className={`h-5 w-5 ${filled ? "text-warning" : "text-muted"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ArrowRightIcon = () => (
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

const PlayIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
  </svg>
);

// Navbar
const Navbar = () => (
  <nav className="bg-background/70 border-border/50 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl">
    <div className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/getgains-logo.png"
            alt="Get Gains"
            width={160}
            height={40}
            className="h-10 w-auto transition-transform group-hover:scale-105"
          />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#download"
            className="bg-primary hover:bg-primary-hover text-primary-foreground hover:shadow-primary/30 hidden rounded-full px-6 py-2.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg sm:inline-flex"
          >
            Download App
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

// Hero Section
const HeroSection = () => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
    {/* Animated Background */}
    <div className="bg-gradient-mesh absolute inset-0" />
    <div className="bg-grid absolute inset-0 opacity-30" />

    {/* Floating Orbs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-primary/15 absolute top-1/4 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full blur-[100px]" />
      <div
        className="bg-accent/10 absolute right-1/4 bottom-1/4 h-[400px] w-[400px] animate-pulse rounded-full blur-[80px]"
        style={{ animationDelay: "1s" }}
      />
      <div className="bg-gradient-radial from-primary/5 absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full to-transparent" />
    </div>

    <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
      {/* Left Content */}
      <div className="space-y-8">
        {/* Badge */}
        <div className="bg-surface-2/80 border-border/50 hover:border-primary/50 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-accent relative inline-flex h-2 w-2 rounded-full"></span>
          </span>
          <span className="text-muted-foreground text-sm font-medium">
            AI-Powered Form Analysis
          </span>
          <SparkleIcon />
        </div>

        {/* Headline */}
        <h1 className="text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl">
          Transform Your
          <span className="gradient-text text-glow block">Workout Form</span>
        </h1>

        {/* Subheadline */}
        <p className="text-muted-foreground max-w-lg text-xl leading-relaxed">
          Stop guessing if you&apos;re doing it right. Compare your form with
          coaches using
          <span className="text-foreground font-semibold"> 3D models</span>, get
          real-time
          <span className="text-accent font-semibold"> similarity scores</span>,
          and earn
          <span className="text-warning font-semibold"> rewards</span> for
          consistency.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="#download"
            className="group bg-primary hover:bg-primary-hover text-primary-foreground glow-primary hover-glow inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
          >
            Get Started Free
            <ArrowRightIcon />
          </Link>
          <button className="group bg-surface-2/80 hover:bg-surface-3 text-foreground border-border/50 hover:border-primary/50 inline-flex items-center gap-3 rounded-full border px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300">
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
                className={`h-11 w-11 rounded-full bg-gradient-to-br ${gradient} border-background ring-border/50 flex items-center justify-center border-3 text-xs font-bold text-white ring-2`}
              >
                {["JD", "AK", "MR", "LP"][i]}
              </div>
            ))}
            <div className="bg-surface-2 border-background ring-border/50 text-muted-foreground flex h-11 w-11 items-center justify-center rounded-full border-3 text-sm font-semibold ring-2">
              +10k
            </div>
          </div>
          <div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} />
              ))}
              <span className="text-foreground ml-2 font-semibold">4.9</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Trusted by 10,000+ athletes
            </p>
          </div>
        </div>
      </div>

      {/* Right Content - Hero Image */}
      <div className="relative lg:pl-8">
        <div className="animate-float relative z-10">
          {/* Main Image Card */}
          <div className="border-border/50 glow-primary shadow-primary/10 relative overflow-hidden rounded-3xl border shadow-2xl">
            <Image
              src="/pullup.png"
              alt="Perfect form demonstration"
              width={600}
              height={700}
              className="h-auto w-full object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="from-background via-background/20 absolute inset-0 bg-gradient-to-t to-transparent" />

            {/* Score Card */}
            <div className="absolute right-6 bottom-6 left-6">
              <div className="glass rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Form Similarity
                    </p>
                    <p className="text-accent text-xs">Excellent match!</p>
                  </div>
                  <div className="text-right">
                    <span className="text-accent font-mono text-4xl font-bold">
                      94
                    </span>
                    <span className="text-muted-foreground text-xl">%</span>
                  </div>
                </div>
                <div className="bg-surface-3/50 h-2.5 w-full overflow-hidden rounded-full">
                  <div
                    className="from-primary via-warning to-accent h-full rounded-full bg-gradient-to-r transition-all duration-1000"
                    style={{ width: "94%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Achievement Card */}
          <div className="glass animate-pulse-glow absolute -top-6 -right-6 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="from-accent/30 to-accent/10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
                <CheckIcon />
              </div>
              <div>
                <p className="text-foreground font-semibold">Form Matched!</p>
                <p className="text-accent font-mono text-sm">+50 XP earned</p>
              </div>
            </div>
          </div>

          {/* Floating Stats Card */}
          <div className="glass absolute -bottom-4 -left-8 hidden rounded-2xl p-4 lg:block">
            <div className="flex items-center gap-3">
              <div className="from-warning/30 to-warning/10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl">
                🔥
              </div>
              <div>
                <p className="text-foreground font-semibold">7 Day Streak</p>
                <p className="text-warning font-mono text-sm">Keep going!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
      <span className="text-muted-foreground text-xs tracking-widest uppercase">
        Scroll
      </span>
      <div className="border-muted-foreground/30 flex h-10 w-6 justify-center rounded-full border-2 pt-2">
        <div className="bg-primary h-3 w-1.5 animate-pulse rounded-full" />
      </div>
    </div>
  </section>
);

// Problem Section
const ProblemSection = () => (
  <section className="bg-surface-1 relative overflow-hidden py-32">
    {/* Background Pattern */}
    <div className="bg-dots absolute inset-0 opacity-50" />

    <div className="relative mx-auto max-w-7xl px-6">
      <div className="grid items-center gap-20 lg:grid-cols-2">
        {/* Left - Image */}
        <div className="relative">
          <div className="border-border/50 relative overflow-hidden rounded-3xl border shadow-xl">
            <Image
              src="/confused.png"
              alt="Confused about workout form"
              width={550}
              height={550}
              className="h-auto w-full object-cover"
            />
            <div className="from-error/20 absolute inset-0 bg-gradient-to-tr to-transparent" />
          </div>

          {/* Problem Card */}
          <div className="bg-surface-2 border-error/30 absolute -right-8 -bottom-8 rounded-2xl border p-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="bg-error/20 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                ❌
              </div>
              <div>
                <p className="text-error font-semibold">No way to compare</p>
                <p className="text-muted-foreground text-sm">
                  Guessing if form is correct
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="space-y-8">
          <div className="bg-error/10 border-error/20 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <span className="bg-error h-2 w-2 rounded-full" />
            <span className="text-error text-sm font-medium">The Problem</span>
          </div>

          <h2 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Tired of <span className="text-error">Guessing</span> Your Form?
          </h2>

          <p className="text-muted-foreground text-xl leading-relaxed">
            Most people watch a workout video once and hope they&apos;re doing
            it right. Without real feedback, you risk{" "}
            <span className="text-error font-semibold">injury</span> and waste
            time with{" "}
            <span className="text-error font-semibold">
              ineffective workouts
            </span>
            .
          </p>

          <ul className="space-y-4">
            {[
              "No way to know if your form matches the coach",
              "Risk of injury from incorrect technique",
              "Plateauing results from ineffective movements",
              "Expensive personal trainers or guesswork",
            ].map((item, i) => (
              <li
                key={i}
                className="bg-surface-2/50 border-border/50 flex items-start gap-4 rounded-xl border p-4"
              >
                <span className="bg-error/20 text-error flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  ✕
                </span>
                <span className="text-muted-foreground text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Features Section
const FeaturesSection = () => (
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
          A complete ecosystem for coaches and clients to perfect every movement
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
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
        ].map((feature, i) => (
          <div
            key={i}
            className="group bg-surface-1/80 border-border/50 hover:border-primary/50 hover-lift relative rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500"
          >
            {/* Gradient Background on Hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="relative">
              <div className="bg-surface-2 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// How It Works Section
const HowItWorksSection = () => (
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

        {[
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
        ].map((item, i) => (
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

// Pricing Section
const PricingSection = () => (
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
        <div className="bg-surface-1/80 border-border/50 hover:border-border relative rounded-3xl border p-10 backdrop-blur-sm transition-all duration-300">
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
            {[
              "Basic workout tracking",
              "Self-recording & playback",
              "Community exercises",
              "Basic avatar customization",
              "Achievement badges",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="bg-accent/20 flex h-6 w-6 items-center justify-center rounded-full">
                  <CheckIcon />
                </div>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="bg-surface-2 hover:bg-surface-3 text-foreground border-border/50 hover:border-primary/50 w-full rounded-full border py-4 font-semibold transition-all duration-300">
            Get Started Free
          </button>
        </div>

        {/* Premium Plan */}
        <div className="from-primary/10 via-surface-1 to-accent/5 border-primary/30 glow-primary relative rounded-3xl border bg-gradient-to-br p-10">
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
            {[
              "Everything in Free",
              "Coach Classes access",
              "AI form comparison",
              "3D model visualization",
              "Premium avatar cosmetics",
              "Physical reward eligibility",
              "Partner discounts & coupons",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="bg-accent/20 flex h-6 w-6 items-center justify-center rounded-full">
                  <CheckIcon />
                </div>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground hover:shadow-primary/30 w-full rounded-full bg-gradient-to-r py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            Start 7-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  </section>
);

// CTA Section
const CTASection = () => (
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
        Ready to <span className="gradient-text">Transform</span> Your Workouts?
      </h2>

      <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl leading-relaxed">
        Join thousands of athletes who are perfecting their form and earning
        rewards. Download Get Gains today and start your journey to better
        fitness.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* App Store Button */}
        <button className="group bg-foreground hover:bg-foreground/90 text-background inline-flex items-center gap-4 rounded-2xl px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <div className="text-xs opacity-70">Download on the</div>
            <div className="text-lg font-bold">App Store</div>
          </div>
        </button>

        {/* Google Play Button */}
        <button className="group bg-foreground hover:bg-foreground/90 text-background inline-flex items-center gap-4 rounded-2xl px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105">
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

// Footer
const Footer = () => (
  <footer className="border-border/50 bg-surface-0 border-t py-16">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-16 grid gap-12 md:grid-cols-4">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Image
            src="/getgains-logo.png"
            alt="Get Gains"
            width={160}
            height={40}
            className="mb-6 h-10 w-auto"
          />
          <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
            The ultimate workout tracker with AI-powered form analysis. Perfect
            your technique, earn rewards, achieve your goals.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              {
                icon: "twitter",
                path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
              },
              {
                icon: "instagram",
                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
              },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className="bg-surface-2 hover:bg-primary/20 group flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              >
                <svg
                  className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="text-foreground mb-6 font-bold">Product</h4>
          <ul className="space-y-4">
            {["Features", "Pricing", "Download"].map((item, i) => (
              <li key={i}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-foreground mb-6 font-bold">Company</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-border/50 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Get Gains. All rights reserved.
        </p>
        <p className="text-muted-foreground text-sm">
          Made with <span className="text-error">❤️</span> for athletes
          everywhere
        </p>
      </div>
    </div>
  </footer>
);

// Main Page Component
const Home = () => {
  return (
    <main className="bg-background flex flex-1 flex-col overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Home;
