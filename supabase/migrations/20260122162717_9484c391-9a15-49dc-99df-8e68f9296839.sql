-- Create enum for service request types
CREATE TYPE public.service_type AS ENUM (
  'gifts_care_packages',
  'grocery_essentials',
  'errands_pickups',
  'home_tech_setup'
);

-- Create enum for service request status
CREATE TYPE public.service_request_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- Create enum for urgency level
CREATE TYPE public.urgency_level AS ENUM (
  'flexible',
  'this_week',
  'urgent'
);

-- Create the service_requests table
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  senior_id UUID NOT NULL REFERENCES public.seniors(id) ON DELETE CASCADE,
  requested_by_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_type public.service_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  special_instructions TEXT,
  preferred_date DATE,
  preferred_time_slot TEXT,
  urgency public.urgency_level NOT NULL DEFAULT 'flexible',
  status public.service_request_status NOT NULL DEFAULT 'pending',
  budget_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Family can view service requests for their linked seniors
CREATE POLICY "Family can view service requests"
  ON public.service_requests
  FOR SELECT
  USING (can_access_senior(auth.uid(), senior_id));

-- Family can create service requests for their linked seniors
CREATE POLICY "Family can create service requests"
  ON public.service_requests
  FOR INSERT
  WITH CHECK (
    has_role(auth.uid(), 'family'::app_role) 
    AND can_access_senior(auth.uid(), senior_id)
    AND requested_by_profile_id = get_profile_id(auth.uid())
  );

-- Family can update their own service requests
CREATE POLICY "Family can update own service requests"
  ON public.service_requests
  FOR UPDATE
  USING (
    has_role(auth.uid(), 'family'::app_role) 
    AND requested_by_profile_id = get_profile_id(auth.uid())
  );

-- Family can cancel (delete) their own service requests
CREATE POLICY "Family can delete own service requests"
  ON public.service_requests
  FOR DELETE
  USING (
    has_role(auth.uid(), 'family'::app_role) 
    AND requested_by_profile_id = get_profile_id(auth.uid())
  );

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();