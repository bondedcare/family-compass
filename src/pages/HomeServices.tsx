import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ServiceRequestDialog } from '@/components/services/ServiceRequestDialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  Gift, 
  ShoppingCart, 
  Package, 
  Wifi, 
  ArrowRight,
  Smartphone,
  Speaker,
  AlertTriangle,
  Wrench
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  available: boolean;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'gifts',
    icon: <Gift className="w-6 h-6" />,
    title: 'Gifts & Care Packages',
    description: 'Send thoughtful gifts and care packages with personal notes—delivered with warmth, not just dropped off.',
    features: ['Personal notes included', 'Photo confirmation', 'Special occasion reminders'],
    available: true,
  },
  {
    id: 'grocery',
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'Grocery & Essentials',
    description: 'Weekly shopping or one-time runs, always with attention to preferences, brands, and special requests.',
    features: ['Brand preferences saved', 'Dietary restrictions noted', 'Recurring schedules'],
    available: true,
  },
  {
    id: 'errands',
    icon: <Package className="w-6 h-6" />,
    title: 'Errands & Pickups',
    description: 'Pharmacy runs, returns, drop-offs—small tasks handled with care so nothing falls through the cracks.',
    features: ['Prescription pickups', 'Package returns', 'Document delivery'],
    available: true,
  },
  {
    id: 'tech-setup',
    icon: <Wifi className="w-6 h-6" />,
    title: 'Home Tech Setup',
    description: 'Setting up voice assistants, emergency systems, and smart devices—plus gentle troubleshooting when things don\'t work.',
    features: ['Voice assistant setup', 'Emergency systems', 'Smart device help'],
    available: true,
  },
];

const techServices = [
  {
    icon: <Speaker className="w-5 h-5" />,
    title: 'Voice Assistants',
    description: 'Google Home, Nest, Alexa setup and personalization',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Emergency Systems',
    description: 'Medical alert devices, fall detection, panic buttons',
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Smart Devices',
    description: 'Tablets, phones, video calling setup for staying connected',
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: 'Troubleshooting',
    description: 'Gentle tech support when things aren\'t working right',
  },
];

const HomeServices = () => {
  const { user, loading: authLoading } = useAuth();
  const [selectedService, setSelectedService] = useState<{ id: string; title: string } | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading services…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleRequestService = (serviceId: string, serviceTitle: string) => {
    setSelectedService({ id: serviceId, title: serviceTitle });
  };

  const handleServiceRequestSuccess = () => {
    toast.success('Your request has been submitted. We\'ll coordinate with a helper soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="User" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Home Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everyday support, thoughtfully done. Request help with gifts, groceries, errands, or home tech—all coordinated with your family's preferences in mind.
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {serviceCategories.map((service) => (
            <Card 
              key={service.id} 
              className="group hover:shadow-md transition-all duration-300 border-border hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">{service.icon}</div>
                  </div>
                  {service.available && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      Available
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-display text-xl mt-4">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full group-hover:bg-primary/90"
                  onClick={() => handleRequestService(service.id, service.title)}
                >
                  Request Service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Home Tech Setup Spotlight */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Home Tech Setup Services
              </h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Technology should make life easier, not harder. We help set up and maintain the devices that keep your loved ones safe, connected, and comfortable at home.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {techServices.map((tech, idx) => (
                <div 
                  key={idx}
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="text-primary">{tech.icon}</div>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{tech.title}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Request', description: 'Choose a service and share any preferences or special instructions.' },
              { step: '2', title: 'Coordinate', description: 'We match your request with a trusted helper who understands elder care.' },
              { step: '3', title: 'Complete', description: 'Get updates and confirmation when the service is done—peace of mind included.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Service Request Dialog */}
      <ServiceRequestDialog
        open={!!selectedService}
        onOpenChange={(open) => !open && setSelectedService(null)}
        serviceType={selectedService?.id || ''}
        serviceTitle={selectedService?.title || ''}
        onSuccess={handleServiceRequestSuccess}
      />
    </div>
  );
};

export default HomeServices;
