import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { FounderSection } from "@/components/landing/FounderSection";
import { ServiceAreaMap } from "@/components/landing/ServiceAreaMap";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <FounderSection />
        <ServiceAreaMap />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
