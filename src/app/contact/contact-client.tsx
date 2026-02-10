"use client";

import { useState, type ReactNode } from "react";
import { PageNavbar } from "@/components/layout/page-navbar";
import { PageFooter } from "@/components/layout/page-footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Loader2,
  Target,
  Trophy,
  BarChart3,
  Handshake,
  Mail,
  Globe,
  Pill,
  Dumbbell,
  Shirt,
  Smartphone,
} from "lucide-react";

// ─── Animated Section Wrapper ────────────────────────────────────────────────
function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Floating Orbs Background ────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-primary/10 absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[150px]" />
      <div className="bg-accent/8 absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" />
      <div className="bg-warning/5 absolute top-3/4 left-3/4 h-[300px] w-[300px] rounded-full blur-[100px]" />
    </div>
  );
}

// ─── Team Member Data ────────────────────────────────────────────────────────
const teamMembers = [
  {
    name: "AJ Aparicio",
    role: "Lead Developer",
    email: "aparicio.ajb+support@gmail.com",
    website: "ajaparicio.com",
    avatar: "🧑‍💻",
    gradient: "from-primary to-warning",
  },
  {
    name: "Louie Dale Cervera",
    role: "Developer",
    email: "louiedalecervera@gmail.com",
    avatar: "👨‍💻",
    gradient: "from-accent to-primary",
  },
  {
    name: "John Carlo Macoco",
    role: "Developer",
    email: "johncarlo.macoco-16@cpu.edu.ph",
    avatar: "👨‍💻",
    gradient: "from-warning to-accent",
  },
  {
    name: "Chrishyl John Laloy",
    role: "Developer",
    email: "chrishyljohn.laloy-08@cpu.edu.ph",
    avatar: "👨‍💻",
    gradient: "from-primary to-accent",
  },
];

// ─── Partnership Benefits Data ───────────────────────────────────────────────
const partnershipBenefits = [
  {
    icon: Target,
    title: "Targeted Audience",
    desc: "Reach fitness enthusiasts actively improving their form",
  },
  {
    icon: Trophy,
    title: "Reward Integration",
    desc: "Your products as rewards for user consistency",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    desc: "Understand how users engage with your brand",
  },
  {
    icon: Handshake,
    title: "Brand Alignment",
    desc: "Associate with innovation in fitness technology",
  },
];

// ─── Partnership Types Data ──────────────────────────────────────────────────
const partnershipTypes = [
  {
    icon: Pill,
    title: "Supplement Brands",
    description: "Offer your products as rewards for consistent users",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Dumbbell,
    title: "Gym Chains",
    description: "Integrate our form analysis with your facilities",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Shirt,
    title: "Fitness Apparel",
    description: "Discount codes and exclusive drops for our community",
    gradient: "from-warning/20 to-warning/5",
  },
  {
    icon: Smartphone,
    title: "Tech Partners",
    description: "Wearable integrations and smart equipment",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
];

// ─── Form Input Component ────────────────────────────────────────────────────
function FormInput({
  label,
  id,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="group-focus-within:text-primary text-foreground mb-2 block text-sm font-medium transition-colors"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        className="bg-surface-1/80 border-border/50 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground/50 w-full rounded-xl border px-4 py-3.5 transition-all duration-200 focus:ring-2 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Main Contact Page Component
// ═════════════════════════════════════════════════════════════════════════════
export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "partnership",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <main className="bg-background flex min-h-screen flex-col">
      <PageNavbar activeRoute="/contact" />

      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="bg-surface-1 relative overflow-hidden pt-32 pb-20">
        <FloatingOrbs />
        <div className="bg-gradient-mesh absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-20" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                Let&apos;s Connect
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Partner With <span className="gradient-text">Get Gains</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              Interested in partnerships, sponsorships, or collaborating with
              us? We&apos;re always looking to work with fitness brands,
              supplement companies, and gyms.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24">
        <div className="bg-gradient-mesh pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* ─── Contact Form ────────────────────────────── */}
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="mb-2 text-3xl font-bold">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within
                  24-48 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="from-accent/20 via-surface-1 to-primary/10 border-accent/30 animate-in fade-in-0 zoom-in-95 rounded-3xl border bg-gradient-to-br p-12 text-center duration-500">
                  <div className="from-accent/30 to-accent/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
                    <Check className="text-accent h-10 w-10" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Thank you for reaching out. We&apos;ll review your message
                    and get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        type: "partnership",
                        message: "",
                      });
                    }}
                    className="bg-surface-2 hover:bg-surface-3 border-border/50 hover:border-primary/50 rounded-full border px-8 py-3 font-semibold transition-all duration-200 hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormInput
                      label="Full Name"
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Email Address"
                      id="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormInput
                      label="Company / Organization"
                      id="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <div className="group">
                      <label
                        htmlFor="type"
                        className="group-focus-within:text-primary text-foreground mb-2 block text-sm font-medium transition-colors"
                      >
                        Inquiry Type <span className="text-primary">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="bg-surface-1/80 border-border/50 focus:ring-primary/50 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border px-4 py-3.5 transition-all duration-200 focus:ring-2 focus:outline-none"
                      >
                        <option value="partnership">Partnership</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="supplement">Supplement Partner</option>
                        <option value="gym">Gym Partnership</option>
                        <option value="coaching">Coaching Platform</option>
                        <option value="media">Media Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="group-focus-within:text-primary text-foreground mb-2 block text-sm font-medium transition-colors"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-surface-1/80 border-border/50 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground/50 w-full resize-none rounded-xl border px-4 py-3.5 transition-all duration-200 focus:ring-2 focus:outline-none"
                      placeholder="Tell us about your partnership idea, what you'd like to achieve together, and any relevant details..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground hover:shadow-primary/30 group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* ─── Contact Info & Team ─────────────────────── */}
            <div className="space-y-8">
              {/* Partnership Benefits */}
              <AnimatedSection delay={100}>
                <div className="bg-surface-1/80 border-border/50 rounded-3xl border p-8 backdrop-blur-sm">
                  <h3 className="mb-6 text-2xl font-bold">
                    Why Partner With Us?
                  </h3>
                  <div className="space-y-4">
                    {partnershipBenefits.map((item, i) => (
                      <div
                        key={i}
                        className="bg-surface-2/50 border-border/30 hover:border-primary/30 group flex gap-4 rounded-xl border p-4 transition-all duration-200"
                      >
                        <div className="from-primary/20 to-primary/5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                          <item.icon className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-foreground font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Team Section */}
              <AnimatedSection delay={200}>
                <div className="bg-surface-1/80 border-border/50 rounded-3xl border p-8 backdrop-blur-sm">
                  <h3 className="mb-6 text-2xl font-bold">Meet The Team</h3>
                  <div className="space-y-4">
                    {teamMembers.map((member, i) => (
                      <div
                        key={i}
                        className="bg-surface-2/50 border-border/30 hover:border-primary/30 group flex items-center gap-4 rounded-xl border p-4 transition-all duration-200"
                      >
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110",
                            member.gradient,
                          )}
                        >
                          {member.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-foreground font-semibold">
                            {member.name}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {member.role}
                          </p>
                        </div>
                        <a
                          href={`mailto:${member.email}`}
                          className="bg-primary/10 hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110"
                          title={`Email ${member.name}`}
                        >
                          <Mail className="text-primary h-5 w-5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Quick Contact */}
              <AnimatedSection delay={300}>
                <div className="from-primary/10 via-surface-1 to-accent/5 border-primary/30 glow-primary rounded-3xl border bg-gradient-to-br p-8">
                  <h3 className="mb-6 text-2xl font-bold">Quick Contact</h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:aparicio.ajb+support@gmail.com"
                      className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                        <Mail className="text-primary h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Email us at
                        </p>
                        <p className="text-primary group-hover:text-primary-hover font-semibold transition-colors">
                          aparicio.ajb+support@gmail.com
                        </p>
                      </div>
                    </a>
                    <a
                      href="https://ajaparicio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                        <Globe className="text-primary h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Visit our website
                        </p>
                        <p className="text-primary group-hover:text-primary-hover font-semibold transition-colors">
                          ajaparicio.com
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partnership Types Section ────────────────────────────────── */}
      <section className="bg-surface-1 relative overflow-hidden py-16 md:py-24">
        <div className="bg-dots absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6">
          <AnimatedSection className="mb-16 text-center">
            <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <Handshake className="text-primary h-4 w-4" />
              <span className="text-muted-foreground text-sm font-medium">
                Opportunities
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Partnership <span className="gradient-text">Opportunities</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We&apos;re open to various types of collaborations that benefit
              our users
            </p>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="group bg-surface-2/50 border-border/50 hover:border-primary/50 hover-lift relative h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500">
                  {/* Gradient Background on Hover */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      item.gradient,
                    )}
                  />

                  <div className="relative">
                    <div className="bg-surface-3/80 border-border/30 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <item.icon className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
