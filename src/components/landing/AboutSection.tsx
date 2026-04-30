import { Heart, Shield, Clock, Users } from "lucide-react";

export const AboutSection = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Kindness First",
      description:
        "Everyone is treated with warmth, respect, and genuine care — like family.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trustworthy & Reliable",
      description:
        "When Bonded Care says it will be there, it will be. You can count on follow-through.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible & Understanding",
      description:
        "Life happens. Schedules are flexible and services adapt to your needs.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Here for Families",
      description:
        "Whether you're nearby or far away, Bonded Care helps families care for the people they love.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
            Our Values
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            What Guides Us
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything Bonded Care does is rooted in these principles.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/20 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
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
