"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Icons
const SendIcon = () => (
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
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="text-accent h-10 w-10"
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

const SpinnerIcon = () => (
  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Navbar Component
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
            href="/#features"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Privacy
          </Link>
        </div>
        <Link
          href="/"
          className="bg-primary hover:bg-primary-hover text-primary-foreground hover:shadow-primary/30 rounded-full px-6 py-2.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </nav>
);

// Footer Component
const Footer = () => (
  <footer className="border-border/50 bg-surface-0 border-t py-12">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-6">
          <Image
            src="/getgains-logo.png"
            alt="Get Gains"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <span className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Get Gains. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="text-primary text-sm font-medium">
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

// Team Member Data
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

// Partnership Benefits Data
const partnershipBenefits = [
  {
    icon: "🎯",
    title: "Targeted Audience",
    desc: "Reach fitness enthusiasts actively improving their form",
  },
  {
    icon: "🏆",
    title: "Reward Integration",
    desc: "Your products as rewards for user consistency",
  },
  {
    icon: "📊",
    title: "Analytics & Insights",
    desc: "Understand how users engage with your brand",
  },
  {
    icon: "🤝",
    title: "Brand Alignment",
    desc: "Associate with innovation in fitness technology",
  },
];

// Partnership Types Data
const partnershipTypes = [
  {
    icon: "💊",
    title: "Supplement Brands",
    description: "Offer your products as rewards for consistent users",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: "🏋️",
    title: "Gym Chains",
    description: "Integrate our form analysis with your facilities",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: "👕",
    title: "Fitness Apparel",
    description: "Discount codes and exclusive drops for our community",
    gradient: "from-warning/20 to-warning/5",
  },
  {
    icon: "📱",
    title: "Tech Partners",
    description: "Wearable integrations and smart equipment",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
];

// Form Input Component
const FormInput = ({
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
}) => (
  <div>
    <label
      htmlFor={id}
      className="text-foreground mb-2 block text-sm font-medium"
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
      className="bg-surface-1/80 border-border/50 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground/50 w-full rounded-xl border px-4 py-3.5 transition-all focus:ring-2 focus:outline-none"
      placeholder={placeholder}
    />
  </div>
);

// Contact Page Component
const ContactPage = () => {
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
    <main className="bg-background flex flex-1 flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-surface-1 relative overflow-hidden pt-32 pb-20">
        {/* Background Effects */}
        <div className="bg-gradient-mesh absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="bg-primary/10 absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[150px]" />
        <div className="bg-accent/10 absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-accent relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              Let&apos;s Connect
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Partner With <span className="gradient-text">Get Gains</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            Interested in partnerships, sponsorships, or collaborating with us?
            We&apos;re always looking to work with fitness brands, supplement
            companies, and gyms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="mb-2 text-3xl font-bold">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within
                  24-48 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="from-accent/20 via-surface-1 to-primary/10 border-accent/30 rounded-3xl border bg-gradient-to-br p-12 text-center">
                  <div className="from-accent/30 to-accent/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
                    <CheckIcon />
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
                    className="bg-surface-2 hover:bg-surface-3 border-border/50 hover:border-primary/50 rounded-full border px-8 py-3 font-semibold transition-all"
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
                    <div>
                      <label
                        htmlFor="type"
                        className="text-foreground mb-2 block text-sm font-medium"
                      >
                        Inquiry Type <span className="text-primary">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="bg-surface-1/80 border-border/50 focus:ring-primary/50 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border px-4 py-3.5 transition-all focus:ring-2 focus:outline-none"
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

                  <div>
                    <label
                      htmlFor="message"
                      className="text-foreground mb-2 block text-sm font-medium"
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
                      className="bg-surface-1/80 border-border/50 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground/50 w-full resize-none rounded-xl border px-4 py-3.5 transition-all focus:ring-2 focus:outline-none"
                      placeholder="Tell us about your partnership idea, what you'd like to achieve together, and any relevant details..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground hover:shadow-primary/30 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerIcon />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <SendIcon />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info & Team */}
            <div className="space-y-8">
              {/* Partnership Benefits */}
              <div className="bg-surface-1/80 border-border/50 rounded-3xl border p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-2xl font-bold">
                  Why Partner With Us?
                </h3>
                <div className="space-y-4">
                  {partnershipBenefits.map((item, i) => (
                    <div
                      key={i}
                      className="bg-surface-2/50 border-border/30 hover:border-primary/30 group flex gap-4 rounded-xl border p-4 transition-colors"
                    >
                      <div className="from-primary/20 to-primary/5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl transition-transform group-hover:scale-110">
                        {item.icon}
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

              {/* Team Section */}
              <div className="bg-surface-1/80 border-border/50 rounded-3xl border p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-2xl font-bold">Meet The Team</h3>
                <div className="space-y-4">
                  {teamMembers.map((member, i) => (
                    <div
                      key={i}
                      className="bg-surface-2/50 border-border/30 hover:border-primary/30 group flex items-center gap-4 rounded-xl border p-4 transition-all"
                    >
                      <div
                        className={`h-14 w-14 bg-gradient-to-br ${member.gradient} flex items-center justify-center rounded-full text-2xl shadow-lg`}
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
                        className="bg-primary/10 hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-xl transition-colors group-hover:scale-110"
                        title={`Email ${member.name}`}
                      >
                        <svg
                          className="text-primary h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="from-primary/10 via-surface-1 to-accent/5 border-primary/30 glow-primary rounded-3xl border bg-gradient-to-br p-8">
                <h3 className="mb-6 text-2xl font-bold">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:aparicio.ajb+support@gmail.com"
                    className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all"
                  >
                    <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      <svg
                        className="text-primary h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
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
                    className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all"
                  >
                    <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      <svg
                        className="text-primary h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
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
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="bg-surface-1 relative overflow-hidden py-16 md:py-24">
        <div className="bg-dots absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
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
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((item, i) => (
              <div
                key={i}
                className="group bg-surface-2/50 border-border/50 hover:border-primary/50 hover-lift relative rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="bg-surface-3/80 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
