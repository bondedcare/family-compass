import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const serviceRequestSchema = z.object({
  senior_id: z.string().min(1, 'Please select who this service is for'),
  title: z.string().trim().min(1, 'Please provide a brief title').max(100, 'Title must be under 100 characters'),
  description: z.string().trim().max(500, 'Description must be under 500 characters').optional(),
  special_instructions: z.string().trim().max(1000, 'Instructions must be under 1000 characters').optional(),
  preferred_date: z.date().optional(),
  preferred_time_slot: z.string().optional(),
  urgency: z.enum(['flexible', 'this_week', 'urgent']),
  budget_notes: z.string().trim().max(200, 'Budget notes must be under 200 characters').optional(),
});

type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

interface Senior {
  id: string;
  profile: {
    full_name: string;
  } | null;
}

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: string;
  serviceTitle: string;
  onSuccess?: () => void;
}

const SERVICE_TYPE_MAP: Record<string, string> = {
  'gifts': 'gifts_care_packages',
  'grocery': 'grocery_essentials',
  'errands': 'errands_pickups',
  'tech-setup': 'home_tech_setup',
};

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (8am - 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
  { value: 'evening', label: 'Evening (5pm - 8pm)' },
  { value: 'flexible', label: 'Flexible / Any time' },
];

export const ServiceRequestDialog = ({
  open,
  onOpenChange,
  serviceType,
  serviceTitle,
  onSuccess,
}: ServiceRequestDialogProps) => {
  const { user } = useAuth();
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSeniors, setLoadingSeniors] = useState(true);

  const form = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      senior_id: '',
      title: '',
      description: '',
      special_instructions: '',
      urgency: 'flexible',
      budget_notes: '',
    },
  });

  useEffect(() => {
    if (open && user) {
      fetchSeniorsAndProfile();
    }
  }, [open, user]);

  const fetchSeniorsAndProfile = async () => {
    if (!user) return;
    
    setLoadingSeniors(true);
    try {
      // Get profile ID
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (profile) {
        setProfileId(profile.id);
      }

      // Get linked seniors
      const { data: links, error } = await supabase
        .from('family_senior_links')
        .select(`
          senior_id,
          seniors (
            id,
            profiles (
              full_name
            )
          )
        `);

      if (error) throw error;

      const seniorsData: Senior[] = (links || [])
        .filter(link => link.seniors)
        .map(link => ({
          id: (link.seniors as any).id,
          profile: (link.seniors as any).profiles,
        }));

      setSeniors(seniorsData);

      // Auto-select if only one senior
      if (seniorsData.length === 1) {
        form.setValue('senior_id', seniorsData[0].id);
      }
    } catch (error) {
      console.error('Error fetching seniors:', error);
      toast.error('Failed to load seniors');
    } finally {
      setLoadingSeniors(false);
    }
  };

  const onSubmit = async (data: ServiceRequestFormData) => {
    if (!profileId) {
      toast.error('Could not find your profile. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const dbServiceType = SERVICE_TYPE_MAP[serviceType] || 'errands_pickups';

      const { error } = await supabase
        .from('service_requests' as any)
        .insert({
          senior_id: data.senior_id,
          requested_by_profile_id: profileId,
          service_type: dbServiceType,
          title: data.title,
          description: data.description || null,
          special_instructions: data.special_instructions || null,
          preferred_date: data.preferred_date ? format(data.preferred_date, 'yyyy-MM-dd') : null,
          preferred_time_slot: data.preferred_time_slot || null,
          urgency: data.urgency,
          budget_notes: data.budget_notes || null,
        });

      if (error) throw error;

      toast.success('Service request submitted successfully!');
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error submitting service request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Request {serviceTitle}
          </DialogTitle>
          <DialogDescription>
            Tell us what you need and we'll coordinate with a trusted helper.
          </DialogDescription>
        </DialogHeader>

        {loadingSeniors ? (
          <div className="py-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : seniors.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground mb-4">
              You haven't added a loved one yet. Add a senior first to request services.
            </p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Senior Selection */}
              {seniors.length > 1 && (
                <FormField
                  control={form.control}
                  name="senior_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who is this for?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a loved one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {seniors.map((senior) => (
                            <SelectItem key={senior.id} value={senior.id}>
                              {senior.profile?.full_name || 'Unknown'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you need?</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Pick up prescription from CVS" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional details about the request..."
                        className="resize-none"
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Special Instructions */}
              <FormField
                control={form.control}
                name="special_instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Preferences, brand requirements, delivery instructions..."
                        className="resize-none"
                        rows={2}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include any preferences or things the helper should know.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date and Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="preferred_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
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
                  name="preferred_time_slot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TIME_SLOTS.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Urgency */}
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How soon do you need this?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible" className="font-normal cursor-pointer">
                            Flexible
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="this_week" id="this_week" />
                          <Label htmlFor="this_week" className="font-normal cursor-pointer">
                            This week
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" />
                          <Label htmlFor="urgent" className="font-normal cursor-pointer text-destructive">
                            Urgent
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Budget Notes */}
              <FormField
                control={form.control}
                name="budget_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Notes (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Up to $50 for groceries" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Request
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
