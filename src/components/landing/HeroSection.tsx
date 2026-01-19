import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MapPin } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Serving Ottawa & Surrounding Areas
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Caring for your loved ones,{" "}
                <span className="text-primary">like family</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Bonded Care provides compassionate accompaniment, health
                tracking, and family connection for Ottawa's seniors. Because
                everyone deserves care that feels like home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 rounded-xl border-2 hover:bg-muted"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-sage-200 border-2 border-background flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">200+</span>{" "}
                families trust us
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden lg:block">
            <div className="relative bg-gradient-to-br from-sage-100 to-cream-100 rounded-3xl p-8 shadow-xl">
              {/* Decorative card stack */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        Today's Check-in
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Mom is feeling great! Had a lovely visit with Sarah.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        Upcoming Appointment
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dr. Thompson - Thursday at 2:00 PM
                      </p>
                      <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Transportation confirmed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-sage-200 border-2 border-card" />
                      <div className="w-8 h-8 rounded-full bg-terracotta-100 border-2 border-card" />
                      <div className="w-8 h-8 rounded-full bg-sage-300 border-2 border-card" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Family members connected
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
