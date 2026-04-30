import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export const HeroSection = () => {
  const trustPoints = [
    "Reliable & dependable",
    "Caring, respectful service",
    "Peace of mind for families",
  ];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-accent/60 via-accent/30 to-background overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-16 right-[10%] w-72 h-72 bg-primary/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-8 left-[5%] w-56 h-56 bg-primary/[0.06] rounded-full blur-2xl" />

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.15] text-balance">
            Reliable Everyday Help for{" "}
            <span className="text-primary">Seniors & Families</span>
          </h1>

          {/* Subheadline — tightened copy, no raw line breaks */}
          <p className="text-lg md:text-xl text-muted-foreground mb-5 max-w-2xl mx-auto leading-relaxed">
            Bonded Care provides affordable, friendly assistance with errands,
            deliveries, and everyday tasks — giving you and your loved ones peace
            of mind so nothing slips through the cracks.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Live in another city, province, or country? Have a reliable
            connection in Ottawa looking out for the people you care about.
          </p>

          {/* Trust points */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-base md:text-lg font-medium">{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              asChild
            >
              <a href="#contact">
                Request Help Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-lg px-10 py-7 border-2"
              asChild
            >
              <a href="#services">View Services</a>
            </Button>
          </div>

          <p className="mt-10 text-muted-foreground text-base">
            No accounts. No commitments. Just friendly, helpful service.
          </p>
        </div>
      </div>
    </section>
  );
};
