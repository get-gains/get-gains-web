import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Get Gains",
  description:
    "Privacy Policy for Get Gains workout tracker application. Learn how we protect your data.",
};

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
            href="/contact"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Contact
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
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Contact
          </Link>
          <Link href="/privacy" className="text-primary text-sm font-medium">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

// Section Card Component
const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-12">
    <h2 className="mb-6 flex items-center gap-4 text-2xl font-bold md:text-3xl">
      <span className="from-primary/20 to-primary/5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-xl shadow-lg">
        {icon}
      </span>
      <span>{title}</span>
    </h2>
    {children}
  </section>
);

// Info Card Component
const InfoCard = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "gradient";
}) => (
  <div
    className={`rounded-2xl border p-6 md:p-8 ${
      variant === "gradient"
        ? "from-primary/10 via-surface-1 to-accent/5 border-primary/30 bg-gradient-to-br"
        : "bg-surface-1/80 border-border/50 backdrop-blur-sm"
    }`}
  >
    {children}
  </div>
);

// Definition Item Component
const DefinitionItem = ({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) => (
  <div className="bg-surface-2/50 border-border/30 hover:border-primary/30 flex flex-col rounded-xl border p-4 transition-colors md:flex-row md:gap-4">
    <span className="text-foreground font-semibold whitespace-nowrap md:min-w-[140px]">
      {term}:
    </span>
    <span className="text-muted-foreground">{definition}</span>
  </div>
);

// Bullet Point Component
const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
    <span className="text-muted-foreground">{children}</span>
  </li>
);

// Data Usage Item Component
const DataUsageItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-surface-2/50 border-border/30 hover:border-primary/30 group rounded-xl border p-4 transition-colors">
    <span className="text-foreground group-hover:text-primary font-semibold transition-colors">
      {title}:
    </span>
    <span className="text-muted-foreground ml-2">{description}</span>
  </div>
);

// Retention Item Component
const RetentionItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-surface-2/50 border-border/30 rounded-xl border p-5">
    <h4 className="text-foreground mb-2 font-semibold">{title}</h4>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const PrivacyPage = () => {
  return (
    <main className="bg-background flex flex-1 flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-surface-1 relative overflow-hidden pt-32 pb-20">
        {/* Background Effects */}
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="bg-primary/10 absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-4xl px-6">
          <div className="bg-surface-2/80 border-border/50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <span className="bg-primary h-2 w-2 rounded-full" />
            <span className="text-muted-foreground text-sm font-medium">
              Legal Document
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Your privacy is important to us. This policy outlines how we
            collect, use, and protect your personal information.
          </p>
          <div className="text-muted-foreground mt-6 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
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
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Intro Card */}
          <InfoCard variant="gradient">
            <p className="text-foreground text-lg leading-relaxed">
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You. We use Your Personal Data to provide and improve
              the Service. By using the Service, You agree to the collection and
              use of information in accordance with this Privacy Policy.
            </p>
          </InfoCard>

          <div className="h-16" />

          {/* Interpretation and Definitions */}
          <SectionCard icon="📖" title="Interpretation and Definitions">
            <div className="space-y-6">
              <InfoCard>
                <h3 className="text-primary mb-4 text-xl font-semibold">
                  Interpretation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The words whose initial letters are capitalized have meanings
                  defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
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
                  {[
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
                      definition:
                        "Get Gains, the software program provided by the Company.",
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
                  ].map((item, i) => (
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

          {/* Collecting and Using Personal Data */}
          <SectionCard
            icon="📊"
            title="Collecting and Using Your Personal Data"
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
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
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
                    browser type, browser version, the pages of our Service that
                    You visit, the time and date of Your visit, the time spent
                    on those pages, unique device identifiers and other
                    diagnostic data.
                  </p>
                </div>
              </InfoCard>

              <InfoCard>
                <h3 className="text-primary mb-6 text-xl font-semibold">
                  Use of Your Personal Data
                </h3>
                <p className="text-muted-foreground mb-6">
                  The Company may use Personal Data for the following purposes:
                </p>
                <div className="space-y-3">
                  {[
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
                  ].map((item, i) => (
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

          {/* Data Retention */}
          <SectionCard icon="🗄️" title="Retention of Your Personal Data">
            <InfoCard>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations, resolve disputes, and
                enforce our legal agreements and policies.
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

          {/* Transfer of Data */}
          <SectionCard icon="🌐" title="Transfer of Your Personal Data">
            <InfoCard>
              <p className="text-muted-foreground leading-relaxed">
                Your information, including Personal Data, is processed at the
                Company&apos;s operating offices and in any other places where
                the parties involved in the processing are located. The Company
                will take all steps reasonably necessary to ensure that Your
                data is treated securely and in accordance with this Privacy
                Policy.
              </p>
            </InfoCard>
          </SectionCard>

          {/* Delete Your Data */}
          <SectionCard icon="🗑️" title="Delete Your Personal Data">
            <InfoCard>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                You have the right to delete or request that We assist in
                deleting the Personal Data that We have collected about You.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You may update, amend, or delete Your information at any time by
                signing in to Your Account and visiting the account settings
                section. You may also contact Us to request access to, correct,
                or delete any Personal Data that You have provided to Us.
              </p>
            </InfoCard>
          </SectionCard>

          {/* Disclosure */}
          <SectionCard icon="📋" title="Disclosure of Your Personal Data">
            <InfoCard>
              <div className="space-y-6">
                <div>
                  <h4 className="text-foreground mb-3 font-semibold">
                    Business Transactions
                  </h4>
                  <p className="text-muted-foreground">
                    If the Company is involved in a merger, acquisition or asset
                    sale, Your Personal Data may be transferred.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-3 font-semibold">
                    Law Enforcement
                  </h4>
                  <p className="text-muted-foreground">
                    The Company may be required to disclose Your Personal Data
                    if required to do so by law or in response to valid requests
                    by public authorities.
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

          {/* Security */}
          <SectionCard icon="🔒" title="Security of Your Personal Data">
            <InfoCard>
              <p className="text-muted-foreground leading-relaxed">
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially reasonable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p>
            </InfoCard>
          </SectionCard>

          {/* Children's Privacy */}
          <SectionCard icon="👶" title="Children's Privacy">
            <InfoCard>
              <p className="text-muted-foreground leading-relaxed">
                Our Service does not address anyone under the age of 16. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 16. If You are a parent or guardian and
                You are aware that Your child has provided Us with Personal
                Data, please contact Us.
              </p>
            </InfoCard>
          </SectionCard>

          {/* Subscriptions and Payments */}
          <SectionCard icon="💳" title="Subscriptions and Payments">
            <InfoCard>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get Gains offers both free and premium subscription tiers. By
                subscribing to our Premium plan, You agree to pay the applicable
                subscription fees.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {[
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
                ].map((item, i) => (
                  <RetentionItem
                    key={i}
                    title={item.title}
                    description={item.desc}
                  />
                ))}
              </div>
            </InfoCard>
          </SectionCard>

          {/* Links to Other Websites */}
          <SectionCard icon="🔗" title="Links to Other Websites">
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

          {/* Changes */}
          <SectionCard icon="📝" title="Changes to this Privacy Policy">
            <InfoCard>
              <p className="text-muted-foreground leading-relaxed">
                We may update Our Privacy Policy from time to time. We will
                notify You of any changes by posting the new Privacy Policy on
                this page. We will let You know via email and/or a prominent
                notice on Our Service, prior to the change becoming effective
                and update the &quot;Last updated&quot; date at the top of this
                Privacy Policy.
              </p>
            </InfoCard>
          </SectionCard>

          {/* Contact */}
          <SectionCard icon="📧" title="Contact Us">
            <InfoCard variant="gradient">
              <p className="text-foreground mb-8 text-lg">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <a
                  href="mailto:aparicio.ajb+support@gmail.com"
                  className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all"
                >
                  <span className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110">
                    📧
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
                  className="bg-surface-2/50 border-border/30 hover:border-primary/50 group flex items-center gap-4 rounded-xl border p-5 transition-all"
                >
                  <span className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110">
                    🌐
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
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPage;
