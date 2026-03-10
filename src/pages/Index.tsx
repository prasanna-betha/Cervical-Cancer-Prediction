import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CellTypesSection } from "@/components/CellTypesSection";
import { AITechnologySection } from "@/components/AITechnologySection";
import { HealthSuggestionsSection } from "@/components/HealthSuggestionsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CellTypesSection />
        <AITechnologySection />
        <HealthSuggestionsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
