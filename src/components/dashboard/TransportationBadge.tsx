import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Car, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type TransportationStatus = 'planned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'missing';

interface TransportationBadgeProps {
  status: TransportationStatus;
  className?: string;
}

const statusConfig: Record<TransportationStatus, { 
  label: string; 
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  icon: React.ElementType;
  className: string;
}> = {
  planned: {
    label: 'Planned',
    variant: 'outline',
    icon: Clock,
    className: 'border-muted-foreground/50 text-muted-foreground'
  },
  confirmed: {
    label: 'Confirmed',
    variant: 'default',
    icon: CheckCircle,
    className: 'bg-primary/90 hover:bg-primary'
  },
  in_progress: {
    label: 'In Progress',
    variant: 'secondary',
    icon: Car,
    className: 'bg-secondary text-secondary-foreground animate-pulse'
  },
  completed: {
    label: 'Completed',
    variant: 'default',
    icon: CheckCircle,
    className: 'bg-primary/70'
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive',
    icon: XCircle,
    className: ''
  },
  missing: {
    label: 'Not Set',
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-destructive/20 text-destructive border border-destructive/50'
  }
};

export const TransportationBadge = ({ status, className }: TransportationBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn('gap-1 font-medium', config.className, className)}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
