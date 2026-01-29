import { Package, ShoppingCart, Gift, Home, Wrench, Car } from "lucide-react";
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const ServiceCard = ({
  icon,
  title,
  description
}: ServiceCardProps) => {
  return <div className="group bg-card rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/30">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground text-lg leading-relaxed">
        {description}
      </p>
    </div>;
};
export const ServicesSection = () => {
  const services = [{
    icon: <Package className="w-8 h-8" />,
    title: "Courier & Deliveries",
    description: "Need something picked up or dropped off? We handle packages, documents, and more with care and reliability."
  }, {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Grocery Runs & Errands",
    description: "From weekly groceries to pharmacy pickups, we take care of the running around so you don't have to."
  }, {
    icon: <Gift className="w-8 h-8" />,
    title: "Gift Pickup & Delivery",
    description: "Sending a gift to a loved one? We'll pick it up and deliver it with a personal touch."
  }, {
    icon: <Home className="w-8 h-8" />,
    title: "General Home Help",
    description: "Light organizing, tidying up, or preparing for visitors—we help keep things comfortable and manageable."
  }, {
    icon: <Wrench className="w-8 h-8" />,
    title: "Odd Jobs & Small Tasks",
    description: "Those little things that pile up—changing batteries, sorting mail, small fixes—we're happy to help."
  }, {
    icon: <Car className="w-8 h-8" />,
    title: "Car Detailing & Care",
    description: "Basic vehicle cleaning and care to keep your car looking good and ready when you need it."
  }];
  return <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-base font-medium mb-6">
            How We Help
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Practical Help for Everyday Life
          </h2>
          
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => <div key={service.title} className="opacity-0 animate-fade-in-up" style={{
          animationDelay: `${index * 100}ms`
        }}>
              <ServiceCard {...service} />
            </div>)}
        </div>

        {/* Additional reassurance */}
        <div className="mt-16 text-center">
          
        </div>
      </div>
    </section>;
};