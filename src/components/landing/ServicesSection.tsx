import { Package, Gift, Home, Wrench, Car, Heart } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="group h-full flex flex-col bg-card rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/20">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
};

export const ServicesSection = () => {
  const services = [
    {
      icon: <Package className="w-7 h-7" />,
      title: "Errands & Deliveries",
      description:
        "Groceries, prescriptions, packages, and essential deliveries — handled with care and attention.",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Check-Ins & Connection",
      description:
        "In-person visits or scheduled video calls with family members for reassurance, companionship, and peace of mind.",
    },
    {
      icon: <Gift className="w-7 h-7" />,
      title: "Gift Pickup & Delivery",
      description:
        "Gifts for loved ones picked up and delivered with a personal touch — birthdays, holidays, or just because.",
    },
    {
      icon: <Home className="w-7 h-7" />,
      title: "General Home Help",
      description:
        "Light organizing, tidying up, or preparing for visitors — support to keep things comfortable and manageable.",
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: "Odd Jobs & Pet Care",
      description:
        "Small fixes around the house, dog walking, pet feeding, and other everyday tasks — help is always available.",
    },
    {
      icon: <Car className="w-7 h-7" />,
      title: "Car Detailing & Care",
      description:
        "From basic washes to thorough detailing — keeping your vehicle looking good and ready when you need it.",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
            How We Help
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Practical Help for Everyday Life
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether it's a one-time errand or ongoing support, Bonded Care is here when you need it.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
