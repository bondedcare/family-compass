import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Calendar, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string;
}

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  appointment_date: string;
  appointment_time: string;
  location: string | null;
  notes: string | null;
  senior_id: string;
  transportation_plans: {
    id: string;
    status: 'planned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    method: string;
    responsible_profile_id: string | null;
    pickup_time: string | null;
    notes: string | null;
  } | null;
  senior: {
    id: string;
    profiles: {
      full_name: string;
    } | null;
  } | null;
}

interface Alert {
  id: string;
  type: 'transportation' | 'caregiver_notes' | 'general';
  title: string;
  message: string;
  appointmentId?: string;
}

const FamilyDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch upcoming appointments with transportation plans
      const today = new Date().toISOString().split('T')[0];
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
          id,
          title,
          description,
          appointment_date,
          appointment_time,
          location,
          notes,
          senior_id,
          transportation_plans (
            id,
            status,
            method,
            responsible_profile_id,
            pickup_time,
            notes
          ),
          senior:seniors (
            id,
            profiles (
              full_name
            )
          )
        `)
        .gte('appointment_date', today)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true })
        .limit(10);

      if (appointmentsError) throw appointmentsError;
      
      // Transform the data to match our interface
      const transformedAppointments: Appointment[] = (appointmentsData || []).map(apt => ({
        ...apt,
        transportation_plans: Array.isArray(apt.transportation_plans) 
          ? apt.transportation_plans[0] || null 
          : apt.transportation_plans,
        senior: Array.isArray(apt.senior) ? apt.senior[0] || null : apt.senior
      }));
      
      setAppointments(transformedAppointments);

      // Generate alerts for missing transportation
      const missingTransportAlerts: Alert[] = transformedAppointments
        .filter(apt => !apt.transportation_plans)
        .map(apt => ({
          id: `transport-${apt.id}`,
          type: 'transportation' as const,
          title: 'Transportation not confirmed',
          message: `"${apt.title}" on ${new Date(apt.appointment_date).toLocaleDateString()} needs a transportation plan.`,
          appointmentId: apt.id
        }));

      setAlerts(missingTransportAlerts);

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">We're gathering today's care details…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleAddAppointment = () => {
    toast.info('Add Appointment feature coming soon!');
  };

  const handleAddTransportation = () => {
    toast.info('Add Transportation Plan feature coming soon!');
  };

  const handleUpdateEmergencyInfo = () => {
    toast.info('Emergency Info feature coming soon!');
  };

  const handleAppointmentClick = (appointmentId: string) => {
    toast.info('Appointment detail view coming soon!');
  };

  const handleAlertClick = (alert: Alert) => {
    if (alert.appointmentId) {
      handleAppointmentClick(alert.appointmentId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={profile?.full_name || 'User'} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Hello, {profile?.full_name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your loved ones' care.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Alerts Section */}
            {alerts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="h-5 w-5 text-destructive" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Care Coordination Alerts
                  </h2>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      type={alert.type}
                      title={alert.title}
                      message={alert.message}
                      onClick={() => handleAlertClick(alert)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Appointments */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Upcoming Appointments
                </h2>
              </div>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onClick={() => handleAppointmentClick(appointment.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Calendar}
                  title="No upcoming appointments"
                  description="When you add appointments, they'll show up here with their transportation status."
                  actionLabel="Add Appointment"
                  onAction={handleAddAppointment}
                />
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <QuickActions
              onAddAppointment={handleAddAppointment}
              onAddTransportation={handleAddTransportation}
              onUpdateEmergencyInfo={handleUpdateEmergencyInfo}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default FamilyDashboard;
