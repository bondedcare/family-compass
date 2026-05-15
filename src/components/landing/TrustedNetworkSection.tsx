import { Scissors, Hammer, Sprout } from "lucide-react";

interface PartnerCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PartnerCard = ({ icon, title, description }: PartnerCardProps) => {
  return (
    <div className="h-full flex flex-col bg-card rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-500 border border-border hover:border-primary/20">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
};

export const TrustedNetworkSection = () => {
  const partners = [
    {
      icon: <Scissors className="w-6 h-6" />,
      title: "Hairstyling & Colouring",
      description:
        "An experienced stylist available for in-home cuts, styling, and colour services — a refreshing salon experience without the trip out.",
    },
    {
      icon: <Hammer className="w-6 h-6" />,
      title: "Handyman Services",
      description:
        "A reliable handyman for small repairs, installations, and home maintenance — quality workmanship from a trusted pair of hands.",
    },
    {
      icon: <Sprout className="w-6 h-6" />,
      title: "Gardening & Yard Care",
      description:
        "Seasonal garden care, planting, weeding, and tidy-ups by a knowledgeable gardener — keeping outdoor spaces beautiful year-round.",
    },
  ];

  return (
    <section id="trusted-network" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
            Trusted Network
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            A Vetted Circle of Local Professionals
          </h2>
          <p className="text-muted-foreground text-lg">
            Beyond everyday help, Bonded Care connects clients with a small
            network of trusted Ottawa-area professionals — carefully chosen for
            their skill, dependability, and warmth.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {partners.map((partner, index) => (
            <div
              key={partner.title}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PartnerCard {...partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
