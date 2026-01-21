import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, MapPin, Gift, ShoppingBag, Package } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
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
                Thoughtful everyday help,{" "}
                <span className="text-primary">coordinated with care</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Bonded Care helps families coordinate personalized support for
                seniors—from groceries and errands to gifts and light household
                help. Not a delivery app. A trusted extension of family care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                asChild
              >
                <Link to="/auth">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
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
                      <Gift className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        Care Package Delivered
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        "Thinking of you, Mom" — Sarah's gift arrived safely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        Weekly Groceries
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Thursday delivery — remembered the extra-ripe bananas.
                      </p>
                      <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Recurring request
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-sage-600" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        Pharmacy Pickup
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Prescriptions collected with care notes attached.
                      </p>
                    </div>
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
