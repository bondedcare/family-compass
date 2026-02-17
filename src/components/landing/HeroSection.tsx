import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, CheckCircle } from "lucide-react";
export const HeroSection = () => {
  const trustPoints = ["Reliable & dependable service", "Caring, respectful helpers", "Peace of mind for families"];
  return <section className="relative py-20 md:py-32 bg-gradient-to-b from-accent/50 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-base font-medium mb-8">
            <Heart className="w-5 h-5" />
            <span>Everyday Help You Can Trust</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight text-balance">
            Reliable Everyday Help for{" "}
            <span className="text-primary">Seniors & Families</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">Bonded Care provides affordable, friendly, dependable assistance with errands, deliveries, and everyday tasks—giving you and your loved ones peace of mind and the flexibility of not letting milestones slip through the cracks. 

If you live in another city, province or country, have a reliable connection in Ottawa to give you peace of mind and feedback.                        
        </p>

          {/* Trust points */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {trustPoints.map((point) => <div key={point} className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-base md:text-lg">{point}</span>
              </div>)}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-shadow" asChild>
              <a href="#contact">
                Request Help Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full text-lg px-10 py-7 border-2" asChild>
              <a href="#services">View Services</a>
            </Button>
          </div>

          {/* Reassurance text */}
          <p className="mt-10 text-muted-foreground text-base">No accounts. No commitments. Just friendly, helpful service.</p>
        </div>
      </div>
    </section>;};