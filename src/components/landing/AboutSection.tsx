import { Heart, Shield, Clock, Users } from "lucide-react";

export const AboutSection = () => {
  const values = [
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Kindness First",
      description:
        "We treat everyone with warmth, respect, and genuine care—like we would our own family.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Trustworthy & Reliable",
      description:
        "When we say we'll be there, we mean it. You can count on us to follow through.",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Flexible & Understanding",
      description:
        "Life happens. We work around your schedule and adapt to your needs.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Here for Families",
      description:
        "Whether you're nearby or far away, we help families care for the people they love.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-base font-medium mb-6">
              About Bonded Care
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
              A Helping Hand You Can Rely On
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Bonded Care was created with a simple idea: everyone deserves a little 
                help sometimes. We're here for seniors who want to stay independent, 
                and for families who want peace of mind knowing their loved ones are 
                looked after.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're not a big corporation or a faceless app. We're friendly, 
                trustworthy people who genuinely care about making your day a 
                little easier.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 text-primary">
                  {value.icon}
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

          {/* Quote/Testimonial style message */}
          <div className="mt-20 bg-card rounded-3xl p-10 md:p-14 text-center shadow-sm border border-border">
            <blockquote className="font-display text-2xl md:text-3xl text-foreground italic mb-6 leading-relaxed">
              "We believe in old-fashioned values: showing up when we say we will, 
              doing the job right, and treating people the way we'd want to be treated."
            </blockquote>
            <p className="text-muted-foreground text-lg">
              — The Bonded Care Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
