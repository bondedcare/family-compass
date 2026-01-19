import { Heart, Users, MapPin, Star } from "lucide-react";

export const AboutSection = () => {
  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "200+", label: "Families Served" },
    { icon: <MapPin className="w-5 h-5" />, value: "Ottawa", label: "& Surrounding Areas" },
    { icon: <Star className="w-5 h-5" />, value: "4.9", label: "Average Rating" },
    { icon: <Heart className="w-5 h-5" />, value: "24/7", label: "Support Available" },
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main visual card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 lg:p-12">
                <div className="aspect-square rounded-2xl bg-card shadow-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-primary" />
                    </div>
                    <p className="font-display text-2xl font-semibold text-foreground mb-2">
                      Bonded Care
                    </p>
                    <p className="text-muted-foreground">
                      Part of Atomic Bond Consulting
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Trusted</p>
                    <p className="text-xs text-muted-foreground">By families</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg p-4 border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Caring</p>
                    <p className="text-xs text-muted-foreground">Like family</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Built on bonds that last
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Bonded Care was born from a simple belief: every senior
                  deserves care that feels personal, warm, and genuine. We're
                  not just a service—we're an extension of your family.
                </p>
                <p>
                  As part of Atomic Bond Consulting, we bring the same
                  commitment to trust and reliability that defines everything we
                  do. Our caregivers don't just show up; they build real
                  connections with the people they serve.
                </p>
                <p>
                  Based in Ottawa, we understand our community. We know the
                  neighborhoods, the healthcare providers, and the unique needs
                  of seniors in our region. That local knowledge, combined with
                  our caring approach, makes all the difference.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl p-5 border border-border"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    {stat.icon}
                    <span className="font-display text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
