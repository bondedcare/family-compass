import { Heart, Calendar, Users, Phone, Shield } from "lucide-react";

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
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointment Accompaniment",
      description:
        "We're there with your loved one at every doctor's visit, ensuring they never face an appointment alone.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Tracking",
      description:
        "Simple tools to track medications, vitals, and health trends—giving you peace of mind.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Connection",
      description:
        "Stay informed and connected with real-time updates and shared care coordination.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Emergency Support",
      description:
        "Quick access to emergency contacts, medical info, and care history when it matters most.",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24/7 Care Line",
      description:
        "Always someone to call. Our caring team is here whenever you need support or reassurance.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Caregiver Portal",
      description:
        "A dedicated space for caregivers to manage assignments, log visit notes, and stay connected with families.",
    },
  ];

  return (
    <section id="services" className="py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Care that feels like family
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From appointments to daily check-ins, we provide comprehensive
            support that helps seniors live independently while keeping families
            connected.
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
