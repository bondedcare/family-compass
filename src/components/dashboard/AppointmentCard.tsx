import { format, parseISO } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { TransportationBadge } from './TransportationBadge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface AppointmentCardProps {
  appointment: {
    id: string;
    title: string;
    description?: string | null;
    appointment_date: string;
    appointment_time: string;
    location?: string | null;
    transportation_plans?: {
      status: 'planned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
      method: string;
      responsible_profile_id?: string | null;
      pickup_time?: string | null;
    } | null;
    senior?: {
      profiles?: {
        full_name: string;
      } | null;
    } | null;
  };
  responsiblePerson?: string;
  onClick?: () => void;
}

export const AppointmentCard = ({ appointment, responsiblePerson, onClick }: AppointmentCardProps) => {
  const transportStatus = appointment.transportation_plans?.status ?? 'missing';
  const seniorName = appointment.senior?.profiles?.full_name ?? 'Senior';
  
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <h3 className="font-display font-semibold text-foreground">{appointment.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {seniorName}
            </p>
          </div>
          <TransportationBadge status={transportStatus} />
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {format(parseISO(appointment.appointment_date), 'EEE, MMM d')}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {formatTime(appointment.appointment_time)}
          </span>
          {appointment.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              {appointment.location}
            </span>
          )}
        </div>

        {responsiblePerson && transportStatus !== 'missing' && (
          <p className="text-sm text-muted-foreground">
            Transport by: <span className="font-medium text-foreground">{responsiblePerson}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
