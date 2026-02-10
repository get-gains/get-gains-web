import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTASection } from "@/components/landing/cta-section";
import { ScrollSection } from "@/components/landing/scroll-section";

export default function Home() {
  return (
    <main className="bg-background flex flex-1 flex-col overflow-x-hidden">
      <Navbar />

      {/* Hero — sticky behind scroll content */}
      <div className="sticky top-0 h-screen">
        <HeroSection />
      </div>

      {/* Content sections scroll over the hero */}
      <div className="bg-background relative z-10">
        <ScrollSection>
          <ProblemSection />
        </ScrollSection>

        <ScrollSection delay={100}>
          <FeaturesSection />
        </ScrollSection>

        <ScrollSection delay={100}>
          <HowItWorksSection />
        </ScrollSection>

        <ScrollSection delay={100}>
          <PricingSection />
        </ScrollSection>

        <ScrollSection>
          <CTASection />
        </ScrollSection>

        <Footer />
      </div>
    </main>
  );
}
