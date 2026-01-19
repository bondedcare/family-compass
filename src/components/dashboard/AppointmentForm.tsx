import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, Car, User, FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type TransportationMethod = Database['public']['Enums']['transportation_method'];

const transportationMethods: { value: TransportationMethod; label: string }[] = [
  { value: 'family_member', label: 'Family Member' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'taxi_rideshare', label: 'Taxi / Rideshare' },
  { value: 'public_transit', label: 'Public Transit' },
  { value: 'other', label: 'Other' },
];

const formSchema = z.object({
  title: z.string().min(1, 'Please give this appointment a name').max(100),
  description: z.string().max(500).optional(),
  appointment_date: z.date({ required_error: 'Please select a date' }),
  appointment_time: z.string().min(1, 'Please select a time'),
  location: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
  senior_id: z.string().min(1, 'Please select who this appointment is for'),
  include_transportation: z.boolean().default(false),
  transportation_method: z.enum(['family_member', 'caregiver', 'taxi_rideshare', 'public_transit', 'other']).optional(),
  pickup_time: z.string().optional(),
  transportation_notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Senior {
  id: string;
  profile_name: string;
}

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AppointmentForm = ({ onSuccess, onCancel }: AppointmentFormProps) => {
  const { user } = useAuth();
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSeniors, setLoadingSeniors] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      appointment_time: '',
      location: '',
      notes: '',
      senior_id: '',
      include_transportation: false,
      transportation_method: undefined,
      pickup_time: '',
      transportation_notes: '',
    },
  });

  const includeTransportation = form.watch('include_transportation');

  useEffect(() => {
    if (user) {
      fetchSeniorsAndProfile();
    }
  }, [user]);

  const fetchSeniorsAndProfile = async () => {
    try {
      // Get current user's profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfileId(profileData?.id || null);

      // Fetch linked seniors via family_senior_links
      const { data: linksData, error: linksError } = await supabase
        .from('family_senior_links')
        .select(`
          senior_id,
          seniors (
            id,
            profiles (
              full_name
            )
          )
        `)
        .eq('family_profile_id', profileData?.id);

      if (linksError) throw linksError;

      const seniorsMap = (linksData || [])
        .filter(link => link.seniors)
        .map(link => {
          const senior = Array.isArray(link.seniors) ? link.seniors[0] : link.seniors;
          const profile = senior?.profiles;
          const profileName = Array.isArray(profile) ? profile[0]?.full_name : profile?.full_name;
          return {
            id: senior?.id || '',
            profile_name: profileName || 'Unknown',
          };
        });

      setSeniors(seniorsMap);

      // Auto-select if only one senior
      if (seniorsMap.length === 1) {
        form.setValue('senior_id', seniorsMap[0].id);
      }
    } catch (error: any) {
      console.error('Error fetching seniors:', error);
      toast.error('Could not load your loved ones. Please try again.');
    } finally {
      setLoadingSeniors(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!profileId) {
      toast.error('Unable to identify your profile. Please refresh and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the appointment
      const { data: appointmentData, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          title: values.title.trim(),
          description: values.description?.trim() || null,
          appointment_date: format(values.appointment_date, 'yyyy-MM-dd'),
          appointment_time: values.appointment_time,
          location: values.location?.trim() || null,
          notes: values.notes?.trim() || null,
          senior_id: values.senior_id,
          created_by_profile_id: profileId,
        })
        .select('id')
        .single();

      if (appointmentError) throw appointmentError;

      // Create transportation plan if included
      if (values.include_transportation && values.transportation_method) {
        const { error: transportError } = await supabase
          .from('transportation_plans')
          .insert({
            appointment_id: appointmentData.id,
            method: values.transportation_method,
            pickup_time: values.pickup_time || null,
            notes: values.transportation_notes?.trim() || null,
            status: 'planned',
          });

        if (transportError) throw transportError;
      }

      toast.success('Appointment added successfully!');
      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toast.error('Could not save the appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingSeniors) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground text-sm">Loading your family…</p>
        </div>
      </div>
    );
  }

  if (seniors.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground">
          You haven't linked any seniors to your account yet.
        </p>
        <p className="text-sm text-muted-foreground">
          Please contact support to set up your family connections.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="senior_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Who is this appointment for?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select your loved one" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {seniors.map((senior) => (
                      <SelectItem key={senior.id} value={senior.id}>
                        {senior.profile_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Appointment Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Dr. Thompson checkup, Eye exam"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="appointment_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'h-12 pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appointment_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="time"
                        className="h-12 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Location (optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g., Ottawa General Hospital, 501 Smyth Rd"
                      className="h-12 pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Notes for the appointment (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any details to remember — bring medication list, fasting required, etc."
                    className="min-h-[80px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This helps everyone prepare for the visit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Transportation Section */}
        <div className="border-t pt-6">
          <FormField
            control={form.control}
            name="include_transportation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 bg-muted/30">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-medium flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    Add Transportation Plan
                  </FormLabel>
                  <FormDescription>
                    Coordinate how your loved one will get there
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {includeTransportation && (
            <div className="mt-4 space-y-4 p-4 rounded-xl bg-muted/20 border border-dashed">
              <FormField
                control={form.control}
                name="transportation_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">How will they get there?</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select transportation method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transportationMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickup_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Pickup Time (optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          className="h-12 pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      When should pickup happen to arrive on time?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transportation_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Comfort & accessibility notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Needs wheelchair access, prefers quiet music, arrives 15 min early"
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Help make the journey comfortable and stress-free.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="h-12"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className="h-12 flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Saving…' : 'Add Appointment'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
