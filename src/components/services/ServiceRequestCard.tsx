import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  ShoppingCart, 
  Package, 
  Wifi, 
  Calendar, 
  Clock, 
  User,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export interface ServiceRequest {
  id: string;
  service_type: string;
  title: string;
  description: string | null;
  status: string;
  urgency: string;
  preferred_date: string | null;
  preferred_time_slot: string | null;
  created_at: string;
  completed_at: string | null;
  assigned_to_profile: {
    full_name: string;
  } | null;
  senior: {
    profiles: {
      full_name: string;
    } | null;
  } | null;
  comments_count?: number;
}

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onClick: () => void;
}

const SERVICE_TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string }> = {
  'gifts_care_packages': { icon: <Gift className="w-4 h-4" />, label: 'Gifts & Care' },
  'grocery_essentials': { icon: <ShoppingCart className="w-4 h-4" />, label: 'Grocery' },
  'errands_pickups': { icon: <Package className="w-4 h-4" />, label: 'Errands' },
  'home_tech_setup': { icon: <Wifi className="w-4 h-4" />, label: 'Tech Setup' },
};

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  'pending': { label: 'Pending', variant: 'secondary' },
  'confirmed': { label: 'Confirmed', variant: 'default' },
  'in_progress': { label: 'In Progress', variant: 'default' },
  'completed': { label: 'Completed', variant: 'outline' },
  'cancelled': { label: 'Cancelled', variant: 'destructive' },
};

const URGENCY_CONFIG: Record<string, { label: string; className: string }> = {
  'flexible': { label: 'Flexible', className: 'text-muted-foreground' },
  'this_week': { label: 'This Week', className: 'text-amber-600' },
  'urgent': { label: 'Urgent', className: 'text-destructive font-medium' },
};

export const ServiceRequestCard = ({ request, onClick }: ServiceRequestCardProps) => {
  const typeConfig = SERVICE_TYPE_CONFIG[request.service_type] || { icon: <Package className="w-4 h-4" />, label: 'Service' };
  const statusConfig = STATUS_CONFIG[request.status] || STATUS_CONFIG['pending'];
  const urgencyConfig = URGENCY_CONFIG[request.urgency] || URGENCY_CONFIG['flexible'];

  const seniorName = request.senior?.profiles?.full_name || 'Unknown';
  const assignedName = request.assigned_to_profile?.full_name;

  return (
    <Card 
      className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border hover:border-primary/20"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <div className="text-primary">{typeConfig.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{request.title}</h3>
                <p className="text-xs text-muted-foreground">For {seniorName}</p>
              </div>
            </div>

            {/* Status and urgency */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={statusConfig.variant} className="text-xs">
                {statusConfig.label}
              </Badge>
              <span className={`text-xs ${urgencyConfig.className}`}>
                {urgencyConfig.label}
              </span>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {request.preferred_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{format(new Date(request.preferred_date), 'MMM d')}</span>
                </div>
              )}
              {request.preferred_time_slot && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="capitalize">{request.preferred_time_slot.replace('_', ' ')}</span>
                </div>
              )}
              {assignedName && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{assignedName}</span>
                </div>
              )}
              {request.comments_count && request.comments_count > 0 && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{request.comments_count}</span>
                </div>
              )}
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
