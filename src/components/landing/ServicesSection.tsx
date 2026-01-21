import { Gift, ShoppingCart, Package, Home, Heart, Users } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/20">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export const ServicesSection = () => {
  const services = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gifts & Care Packages",
      description:
        "Send thoughtful gifts and care packages with personal notes—delivered with warmth, not just dropped off.",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Grocery & Essentials",
      description:
        "Weekly shopping or one-time runs, always with attention to preferences, brands, and special requests.",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Errands & Pickups",
      description:
        "Pharmacy runs, returns, drop-offs—small tasks handled with care so nothing falls through the cracks.",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Light Household Help",
      description:
        "Simple, non-skilled tasks like tidying, organizing, or watering plants—respectful help that maintains dignity.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personal Context",
      description:
        "Every request includes preferences, routines, and comfort notes—because care is about knowing the person.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Coordination",
      description:
        "A shared space for families to plan, track, and coordinate support—so caregiving feels less scattered.",
    },
  ];

  return (
    <section id="services" className="py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            How We Help
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Everyday support, thoughtfully done
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Not a delivery app. Not a gig marketplace. Just personalized,
            family-coordinated help that treats seniors with the dignity and
            care they deserve.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
