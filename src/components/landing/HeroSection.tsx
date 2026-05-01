import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export const HeroSection = () => {
  const trustPoints = [
    "Reliable & dependable",
    "Caring, respectful service",
    "Peace of mind for families",
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1543333995-a78aea2eee50?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/30" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          {/* Left — Text content */}
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.12] text-balance">
              Reliable Everyday Help for{" "}
              <span className="text-purple-200">Seniors & Families</span>
            </h1>

            <p className="text-lg md:text-xl text-white/85 mb-5 leading-relaxed max-w-xl">
              Bonded Care provides affordable, friendly assistance with errands,
              deliveries, and everyday tasks — giving you and your loved ones peace
              of mind so nothing slips through the cracks.
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
              Live in another city, province, or country? Have a reliable
              connection in Ottawa looking out for the people you care about.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-3 mb-12">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2.5 text-white">
                  <CheckCircle className="w-5 h-5 text-purple-300 flex-shrink-0" />
                  <span className="text-base md:text-lg font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-full text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-white text-foreground hover:bg-white/90"
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
                className="rounded-full text-lg px-10 py-7 border-2 border-white/40 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#services">View Services</a>
              </Button>
            </div>

            <p className="mt-10 text-white/60 text-base">
              No accounts. No commitments. Just friendly, helpful service.
            </p>
          </div>

          {/* Right — Large featured logo */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              {/* Soft glow behind the logo */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-110" />
              <img
                src={logo}
                alt="Bonded Care owl logo"
                className="relative w-56 lg:w-72 h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
