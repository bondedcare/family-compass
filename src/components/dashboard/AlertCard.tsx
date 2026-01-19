import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Bell, Car, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdaptiveUI } from '@/hooks/useAdaptiveUI';

type AlertType = 'transportation' | 'caregiver_notes' | 'general';

interface AlertCardProps {
  type: AlertType;
  title: string;
  message: string;
  // Optional: provide alternative messages for different caregiver types
  conciseMessage?: string;
  proactiveMessage?: string;
  appointmentId?: string;
  onClick?: () => void;
}

const alertConfig: Record<AlertType, { 
  icon: React.ElementType;
  className: string;
}> = {
  transportation: {
    icon: Car,
    className: 'border-l-destructive bg-destructive/5'
  },
  caregiver_notes: {
    icon: FileText,
    className: 'border-l-secondary bg-secondary/10'
  },
  general: {
    icon: Bell,
    className: 'border-l-primary bg-primary/5'
  }
};

export const AlertCard = ({ 
  type, 
  title, 
  message, 
  conciseMessage,
  proactiveMessage,
  onClick 
}: AlertCardProps) => {
  const config = alertConfig[type];
  const Icon = config.icon;
  const { getAlertClasses, formatAlertMessage, alertStyle } = useAdaptiveUI();

  // Use adaptive message formatting
  const displayMessage = formatAlertMessage(
    message,
    conciseMessage || message,
    proactiveMessage || message
  );

  return (
    <Card 
      className={cn(
        'cursor-pointer hover:shadow-md transition-shadow border-l-4',
        config.className
      )}
      onClick={onClick}
    >
      <CardContent className={cn('flex items-start gap-3', getAlertClasses())}>
        <div className="mt-0.5">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className={cn(
            "text-muted-foreground mt-0.5",
            alertStyle === 'concise' ? 'text-xs' : 'text-sm'
          )}>
            {displayMessage}
          </p>
        </div>
        <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
      </CardContent>
    </Card>
  );
};
