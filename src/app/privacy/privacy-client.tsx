"use client";

import Link from "next/link";
import { PageNavbar } from "@/components/layout/page-navbar";
import { PageFooter } from "@/components/layout/page-footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import {
  Shield,
  Lock,
  Eye,
  Trash2,
  Globe,
  FileText,
  Baby,
  CreditCard,
  ExternalLink,
  Pencil,
  Mail,
} from "lucide-react";
import type { ReactNode } from "react";

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

// ─── Section Card Component ──────────────────────────────────────────────────
function SectionCard({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <AnimatedSection delay={delay} className="mb-12">
      <h2 className="mb-6 flex items-center gap-4 text-2xl font-bold md:text-3xl">
        <span className="from-primary/20 to-primary/5 border-primary/20 flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br shadow-lg">
          <Icon className="text-primary h-5 w-5" />
        </span>
        <span>{title}</span>
      </h2>
      {children}
    </AnimatedSection>
  );
}

// ─── Info Card Component ─────────────────────────────────────────────────────
function InfoCard({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "gradient";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all duration-300 md:p-8",
        variant === "gradient"
          ? "from-primary/10 via-surface-1 to-accent/5 border-primary/30 glow-primary bg-gradient-to-br"
          : "bg-surface-1/80 border-border/50 hover:border-border backdrop-blur-sm",
      )}
    >
      {children}
    </div>
  );
}

// ─── Definition Item ─────────────────────────────────────────────────────────
function DefinitionItem({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  return (
    <div className="bg-surface-2/50 border-border/30 hover:border-primary/30 group flex flex-col rounded-xl border p-4 transition-all duration-200 md:flex-row md:gap-4">
      <span className="group-hover:text-primary text-foreground font-semibold whitespace-nowrap transition-colors md:min-w-[140px]">
        {term}:
      </span>
      <span className="text-muted-foreground">{definition}</span>
    </div>
  );
}

// ─── Bullet Point ────────────────────────────────────────────────────────────
function BulletPoint({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
      <span className="text-muted-foreground">{children}</span>
    </li>
  );
}

// ─── Data Usage Item ─────────────────────────────────────────────────────────
function DataUsageItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface-2/50 border-border/30 hover:border-primary/30 group rounded-xl border p-4 transition-all duration-200">
      <span className="text-foreground group-hover:text-primary font-semibold transition-colors">
        {title}:
      </span>
      <span className="text-muted-foreground ml-2">{description}</span>
    </div>
  );
}

// ─── Retention Item ──────────────────────────────────────────────────────────
function RetentionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface-2/50 border-border/30 hover:border-primary/20 rounded-xl border p-5 transition-all duration-200">
      <h4 className="text-foreground mb-2 font-semibold">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ─── Floating Orbs Background ────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-primary/8 absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full blur-[150px]" />
      <div className="bg-accent/6 absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-[120px]" />
      <div className="bg-warning/4 absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
    </div>
  );
}

// ─── Table of Contents ───────────────────────────────────────────────────────
const tocItems = [
  { icon: FileText, label: "Interpretation & Definitions", id: "definitions" },
  { icon: Eye, label: "Data Collection", id: "collection" },
  { icon: Shield, label: "Data Retention", id: "retention" },
  { icon: Globe, label: "Data Transfer", id: "transfer" },
  { icon: Trash2, label: "Delete Your Data", id: "delete" },
  { icon: FileText, label: "Disclosure", id: "disclosure" },
  { icon: Lock, label: "Security", id: "security" },
  { icon: Baby, label: "Children's Privacy", id: "children" },
  { icon: CreditCard, label: "Subscriptions", id: "subscriptions" },
  { icon: ExternalLink, label: "External Links", id: "links" },
  { icon: Pencil, label: "Policy Changes", id: "changes" },
  { icon: Mail, label: "Contact Us", id: "contact" },
];

// ─── Privacy definitions data ────────────────────────────────────────────────
const definitions = [
  {
    term: "Account",
    definition:
      "A unique account created for You to access our Service or parts of our Service.",
  },
  {
    term: "Affiliate",
    definition:
      'An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares.',
  },
  {
    term: "Application",
    definition: "Get Gains, the software program provided by the Company.",
  },
  {
    term: "Company",
    definition:
      'Get Gains (referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy).',
  },
  { term: "Country", definition: "Philippines" },
  {
    term: "Device",
    definition:
      "Any device that can access the Service such as a computer, a cell phone or a digital tablet.",
  },
  {
    term: "Personal Data",
    definition:
      "Any information that relates to an identified or identifiable individual.",
  },
  { term: "Service", definition: "The Application." },
  {
    term: "Service Provider",
    definition:
      "Any natural or legal person who processes the data on behalf of the Company.",
  },
  {
    term: "Usage Data",
    definition:
      "Data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.",
  },
  {
    term: "You",
    definition:
      "The individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.",
  },
];

// ─── Data usage items ────────────────────────────────────────────────────────
const dataUsageItems = [
  {
    title: "To provide and maintain our Service",
    desc: "Including to monitor the usage of our Service.",
  },
  {
    title: "To manage Your Account",
    desc: "To manage Your registration as a user of the Service.",
  },
  {
    title: "For the performance of a contract",
    desc: "Development, compliance and undertaking of purchase contracts.",
  },
  {
    title: "To contact You",
    desc: "By email, telephone calls, SMS, or other equivalent forms of electronic communication.",
  },
  {
    title: "To provide You with news and offers",
    desc: "About goods, services and events similar to those you have already purchased or inquired about.",
  },
  {
    title: "To manage Your requests",
    desc: "To attend and manage Your requests to Us.",
  },
  {
    title: "For business transfers",
    desc: "To evaluate or conduct a merger, divestiture, restructuring, or other sale.",
  },
  {
    title: "For other purposes",
    desc: "Data analysis, identifying usage trends, and improving our Service.",
  },
];

// ─── Subscription items ──────────────────────────────────────────────────────
const subscriptionItems = [
  {
    title: "Subscription Fees",
    desc: "Premium subscriptions are billed at $9.99 USD per month. Prices may vary by region and are subject to change with notice.",
  },
  {
    title: "Billing Cycle",
    desc: "Subscriptions are billed on a recurring monthly basis. Your payment method will be automatically charged at the start of each billing period unless You cancel.",
  },
  {
    title: "Payment Processing",
    desc: "Payments are processed through Apple App Store or Google Play Store depending on Your device. We do not store Your complete payment card details on our servers.",
  },
  {
    title: "Cancellation",
    desc: "You may cancel Your subscription at any time through Your device's app store settings. Cancellation will take effect at the end of Your current billing period.",
  },
  {
    title: "Refunds",
    desc: "Refund requests are handled according to the policies of Apple App Store or Google Play Store. Please contact the respective platform for refund inquiries.",
  },
  {
    title: "Free Trial",
    desc: "We may offer a 7-day free trial for new Premium subscribers. If You do not cancel before the trial ends, Your subscription will automatically convert to a paid subscription.",
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// Main Component
// ═════════════════════════════════════════════════════════════════════════════
export function PrivacyPageClient() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <PageNavbar activeRoute="/privacy" />

      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="bg-surface-1 relative overflow-hidden pt-32 pb-20">
        <FloatingOrbs />
        <div className="bg-grid absolute inset-0 opacity-20" />

        <div className="relative mx-auto max-w-4xl px-6">
          <AnimatedSection>
            <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
              <Shield className="text-primary h-4 w-4" />
              <span className="text-muted-foreground text-sm font-medium">
                Legal Document
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
              Your privacy is important to us. This policy outlines how we
              collect, use, and protect your personal information.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="text-muted-foreground mt-6 flex items-center gap-4 text-sm">
              <span className="bg-surface-2/80 border-border/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Last updated: January 29, 2026
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Quick Navigation ─────────────────────────────────────────── */}
      <section className="border-border/50 border-b py-8">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedSection delay={100}>
            <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
              Quick Navigation
            </h3>
            <div className="flex flex-wrap gap-2">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="bg-surface-1/80 border-border/50 hover:border-primary/50 hover:bg-primary/5 group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all duration-200"
                >
                  <item.icon className="text-muted-foreground group-hover:text-primary h-3.5 w-3.5 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24">
        <div className="bg-gradient-mesh pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Intro Card */}
          <AnimatedSection className="mb-16">
            <InfoCard variant="gradient">
              <p className="text-foreground text-lg leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal Data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy.
              </p>
            </InfoCard>
          </AnimatedSection>

          {/* ─── Interpretation and Definitions ─────────────── */}
          <div id="definitions">
            <SectionCard
              icon={FileText}
              title="Interpretation and Definitions"
              delay={50}
            >
              <div className="space-y-6">
                <InfoCard>
                  <h3 className="text-primary mb-4 text-xl font-semibold">
                    Interpretation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The words whose initial letters are capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>
                </InfoCard>

                <InfoCard>
                  <h3 className="text-primary mb-6 text-xl font-semibold">
                    Definitions
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    For the purposes of this Privacy Policy:
                  </p>
                  <div className="space-y-3">
                    {definitions.map((item, i) => (
                      <DefinitionItem
                        key={i}
                        term={item.term}
                        definition={item.definition}
                      />
                    ))}
                  </div>
                </InfoCard>
              </div>
            </SectionCard>
          </div>

          {/* ─── Collecting and Using Personal Data ─────────── */}
          <div id="collection">
            <SectionCard
              icon={Eye}
              title="Collecting and Using Your Personal Data"
              delay={50}
            >
              <div className="space-y-6">
                <InfoCard>
                  <h3 className="text-primary mb-6 text-xl font-semibold">
                    Types of Data Collected
                  </h3>

                  <div className="mb-8">
                    <h4 className="text-foreground mb-4 text-lg font-semibold">
                      Personal Data
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      While using Our Service, We may ask You to provide Us with
                      certain personally identifiable information that can be
                      used to contact or identify You. Personally identifiable
                      information may include, but is not limited to:
                    </p>
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {[
                        "Email address",
                        "First name and last name",
                        "Phone number",
                        "Address, State, Province, ZIP/Postal code, City",
                      ].map((item, i) => (
                        <BulletPoint key={i}>{item}</BulletPoint>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-foreground mb-4 text-lg font-semibold">
                      Usage Data
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Usage Data is collected automatically when using the
                      Service. Usage Data may include information such as Your
                      Device&apos;s Internet Protocol address (e.g. IP address),
                      browser type, browser version, the pages of our Service
                      that You visit, the time and date of Your visit, the time
                      spent on those pages, unique device identifiers and other
                      diagnostic data.
                    </p>
                  </div>
                </InfoCard>

                <InfoCard>
                  <h3 className="text-primary mb-6 text-xl font-semibold">
                    Use of Your Personal Data
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    The Company may use Personal Data for the following
                    purposes:
                  </p>
                  <div className="space-y-3">
                    {dataUsageItems.map((item, i) => (
                      <DataUsageItem
                        key={i}
                        title={item.title}
                        description={item.desc}
                      />
                    ))}
                  </div>
                </InfoCard>
              </div>
            </SectionCard>
          </div>

          {/* ─── Data Retention ─────────────────────────────── */}
          <div id="retention">
            <SectionCard
              icon={Shield}
              title="Retention of Your Personal Data"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  The Company will retain Your Personal Data only for as long as
                  is necessary for the purposes set out in this Privacy Policy.
                  We will retain and use Your Personal Data to the extent
                  necessary to comply with our legal obligations, resolve
                  disputes, and enforce our legal agreements and policies.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <RetentionItem
                    title="Account Information"
                    description="Retained for the duration of your account relationship plus up to 24 months after account closure."
                  />
                  <RetentionItem
                    title="Customer Support Data"
                    description="Support tickets and chat transcripts: up to 24 months for quality assurance."
                  />
                  <RetentionItem
                    title="Usage Data"
                    description="Application usage statistics and server logs: up to 24 months for security monitoring."
                  />
                </div>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Transfer of Data ──────────────────────────── */}
          <div id="transfer">
            <SectionCard
              icon={Globe}
              title="Transfer of Your Personal Data"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground leading-relaxed">
                  Your information, including Personal Data, is processed at the
                  Company&apos;s operating offices and in any other places where
                  the parties involved in the processing are located. The
                  Company will take all steps reasonably necessary to ensure
                  that Your data is treated securely and in accordance with this
                  Privacy Policy.
                </p>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Delete Your Data ──────────────────────────── */}
          <div id="delete">
            <SectionCard
              icon={Trash2}
              title="Delete Your Personal Data"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  You have the right to delete or request that We assist in
                  deleting the Personal Data that We have collected about You.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may update, amend, or delete Your information at any time
                  by signing in to Your Account and visiting the account
                  settings section. You may also contact Us to request access
                  to, correct, or delete any Personal Data that You have
                  provided to Us.
                </p>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Disclosure ────────────────────────────────── */}
          <div id="disclosure">
            <SectionCard
              icon={FileText}
              title="Disclosure of Your Personal Data"
              delay={50}
            >
              <InfoCard>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-foreground mb-3 font-semibold">
                      Business Transactions
                    </h4>
                    <p className="text-muted-foreground">
                      If the Company is involved in a merger, acquisition or
                      asset sale, Your Personal Data may be transferred.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-foreground mb-3 font-semibold">
                      Law Enforcement
                    </h4>
                    <p className="text-muted-foreground">
                      The Company may be required to disclose Your Personal Data
                      if required to do so by law or in response to valid
                      requests by public authorities.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-foreground mb-3 font-semibold">
                      Other Legal Requirements
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Comply with a legal obligation",
                        "Protect and defend the rights or property of the Company",
                        "Prevent or investigate possible wrongdoing",
                        "Protect the personal safety of Users or the public",
                        "Protect against legal liability",
                      ].map((item, i) => (
                        <BulletPoint key={i}>{item}</BulletPoint>
                      ))}
                    </ul>
                  </div>
                </div>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Security ─────────────────────────────────── */}
          <div id="security">
            <SectionCard
              icon={Lock}
              title="Security of Your Personal Data"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground leading-relaxed">
                  The security of Your Personal Data is important to Us, but
                  remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While We strive
                  to use commercially reasonable means to protect Your Personal
                  Data, We cannot guarantee its absolute security.
                </p>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Children's Privacy ───────────────────────── */}
          <div id="children">
            <SectionCard icon={Baby} title="Children's Privacy" delay={50}>
              <InfoCard>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service does not address anyone under the age of 16. We do
                  not knowingly collect personally identifiable information from
                  anyone under the age of 16. If You are a parent or guardian
                  and You are aware that Your child has provided Us with
                  Personal Data, please contact Us.
                </p>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Subscriptions and Payments ───────────────── */}
          <div id="subscriptions">
            <SectionCard
              icon={CreditCard}
              title="Subscriptions and Payments"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Get Gains offers both free and premium subscription tiers. By
                  subscribing to our Premium plan, You agree to pay the
                  applicable subscription fees.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {subscriptionItems.map((item, i) => (
                    <RetentionItem
                      key={i}
                      title={item.title}
                      description={item.desc}
                    />
                  ))}
                </div>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Links to Other Websites ──────────────────── */}
          <div id="links">
            <SectionCard
              icon={ExternalLink}
              title="Links to Other Websites"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground leading-relaxed">
                  Our Service may contain links to other websites that are not
                  operated by Us. We strongly advise You to review the Privacy
                  Policy of every site You visit. We have no control over and
                  assume no responsibility for the content, privacy policies or
                  practices of any third party sites or services.
                </p>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Changes ──────────────────────────────────── */}
          <div id="changes">
            <SectionCard
              icon={Pencil}
              title="Changes to this Privacy Policy"
              delay={50}
            >
              <InfoCard>
                <p className="text-muted-foreground leading-relaxed">
                  We may update Our Privacy Policy from time to time. We will
                  notify You of any changes by posting the new Privacy Policy on
                  this page. We will let You know via email and/or a prominent
                  notice on Our Service, prior to the change becoming effective
                  and update the &quot;Last updated&quot; date at the top of
                  this Privacy Policy.
                </p>
              </InfoCard>
            </SectionCard>
          </div>

          {/* ─── Contact Us ───────────────────────────────── */}
          <div id="contact">
            <SectionCard icon={Mail} title="Contact Us" delay={50}>
              <InfoCard variant="gradient">
                <p className="text-foreground mb-8 text-lg">
                  If you have any questions about this Privacy Policy, You can
                  contact us:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="mailto:aparicio.ajb+support@gmail.com"
                    className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <span className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      <Mail className="text-primary h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-muted-foreground text-sm">By email</p>
                      <p className="text-primary group-hover:text-primary-hover font-semibold transition-colors">
                        aparicio.ajb+support@gmail.com
                      </p>
                    </div>
                  </a>
                  <Link
                    href="/contact"
                    className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <span className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      <Globe className="text-primary h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        By visiting our contact page
                      </p>
                      <p className="text-primary group-hover:text-primary-hover font-semibold transition-colors">
                        Contact Us Page
                      </p>
                    </div>
                  </Link>
                </div>
              </InfoCard>
            </SectionCard>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
