import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Car, AlertCircle, Plus } from 'lucide-react';

interface QuickActionsProps {
  onAddAppointment: () => void;
  onAddTransportation: () => void;
  onUpdateEmergencyInfo: () => void;
}

export const QuickActions = ({ 
  onAddAppointment, 
  onAddTransportation, 
  onUpdateEmergencyInfo 
}: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button 
          onClick={onAddAppointment}
          className="w-full justify-start h-12 text-base"
          variant="outline"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Appointment
        </Button>
        <Button 
          onClick={onAddTransportation}
          className="w-full justify-start h-12 text-base"
          variant="outline"
        >
          <Car className="mr-2 h-5 w-5" />
          Add Transportation Plan
        </Button>
        <Button 
          onClick={onUpdateEmergencyInfo}
          className="w-full justify-start h-12 text-base"
          variant="outline"
        >
          <AlertCircle className="mr-2 h-5 w-5" />
          Update Emergency Info
        </Button>
      </CardContent>
    </Card>
  );
};
