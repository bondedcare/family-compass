import { Heart, Shield, Clock, Users } from "lucide-react";
export const AboutSection = () => {
  const values = [{
    icon: <Heart className="w-7 h-7" />,
    title: "Kindness First",
    description: "We treat everyone with warmth, respect, and genuine care—like we would our own family."
  }, {
    icon: <Shield className="w-7 h-7" />,
    title: "Trustworthy & Reliable",
    description: "When we say we'll be there, we mean it. You can count on us to follow through."
  }, {
    icon: <Clock className="w-7 h-7" />,
    title: "Flexible & Understanding",
    description: "Life happens. We work around your schedule and adapt to your needs."
  }, {
    icon: <Users className="w-7 h-7" />,
    title: "Here for Families",
    description: "Whether you're nearby or far away, we help families care for the people they love."
  }];
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-base font-medium mb-6">
            Our Values
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            What Guides Us
          </h2>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/30 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">{value.icon}</div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};