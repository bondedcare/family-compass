import { Package, Gift, Home, Wrench, Car, Heart } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const ServiceCard = ({ icon, title, description, image, imageAlt }: ServiceCardProps) => {
  return (
    <div className="group h-full flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-border hover:border-primary/20">
      {/* Service image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <div className="text-primary">{icon}</div>
        </div>
      </div>
      {/* Card content */}
      <div className="p-7 flex flex-col flex-grow">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const services = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Errands & Deliveries",
      description:
        "Groceries, prescriptions, packages, and essential deliveries — handled with care and attention.",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Paper grocery bags filled with fresh produce",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Check-Ins & Connection",
      description:
        "In-person visits or scheduled video calls with family members for reassurance, companionship, and peace of mind.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Two people sharing a warm conversation over tea",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gift Pickup & Delivery",
      description:
        "Gifts for loved ones picked up and delivered with a personal touch — birthdays, holidays, or just because.",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Beautifully wrapped gift with ribbon and personal card",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "General Home Help",
      description:
        "Light organizing, tidying up, or preparing for visitors — support to keep things comfortable and manageable.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Bright and tidy living room with warm natural light",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Odd Jobs & Pet Care",
      description:
        "Small fixes around the house, dog walking, pet feeding, and other everyday tasks — help is always available.",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Friendly golden retriever enjoying a walk outdoors",
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Car Detailing & Care",
      description:
        "From basic washes to thorough detailing — keeping your vehicle looking good and ready when you need it.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Clean, freshly detailed car gleaming in the sunlight",
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
            Whether it's a one-time errand or ongoing support, Bonded Care is
            here when you need it.
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
