-- Create table for tracking status history on service requests
CREATE TABLE public.service_request_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  old_status public.service_request_status,
  new_status public.service_request_status NOT NULL,
  changed_by_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_request_status_history ENABLE ROW LEVEL SECURITY;

-- Users can view status history for requests they can access
CREATE POLICY "Can view status history for accessible requests"
  ON public.service_request_status_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_request_id
      AND can_access_senior(auth.uid(), sr.senior_id)
    )
  );

-- Family can insert status history (when updating request status)
CREATE POLICY "Family can add status history"
  ON public.service_request_status_history
  FOR INSERT
  WITH CHECK (
    has_role(auth.uid(), 'family'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_request_id
      AND can_access_senior(auth.uid(), sr.senior_id)
    )
    AND (changed_by_profile_id IS NULL OR changed_by_profile_id = get_profile_id(auth.uid()))
  );

-- Create table for comments/notes on service requests
CREATE TABLE public.service_request_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  author_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_request_comments ENABLE ROW LEVEL SECURITY;

-- Users can view comments for requests they can access
CREATE POLICY "Can view comments for accessible requests"
  ON public.service_request_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_request_id
      AND can_access_senior(auth.uid(), sr.senior_id)
    )
  );

-- Family and caregivers can add comments
CREATE POLICY "Family and caregivers can add comments"
  ON public.service_request_comments
  FOR INSERT
  WITH CHECK (
    (has_role(auth.uid(), 'family'::app_role) OR has_role(auth.uid(), 'caregiver'::app_role))
    AND EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_request_id
      AND can_access_senior(auth.uid(), sr.senior_id)
    )
    AND author_profile_id = get_profile_id(auth.uid())
  );

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
  ON public.service_request_comments
  FOR UPDATE
  USING (author_profile_id = get_profile_id(auth.uid()));

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON public.service_request_comments
  FOR DELETE
  USING (author_profile_id = get_profile_id(auth.uid()));

-- Add assigned_to_profile_id column to service_requests for helper assignments
ALTER TABLE public.service_requests 
  ADD COLUMN assigned_to_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Add completed_at timestamp for tracking completion
ALTER TABLE public.service_requests 
  ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE;

-- Create trigger for updating comment timestamps
CREATE TRIGGER update_service_request_comments_updated_at
  BEFORE UPDATE ON public.service_request_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Allow caregivers to view service requests for seniors they're assigned to
CREATE POLICY "Caregivers can view assigned service requests"
  ON public.service_requests
  FOR SELECT
  USING (
    has_role(auth.uid(), 'caregiver'::app_role)
    AND can_access_senior(auth.uid(), senior_id)
  );

-- Allow caregivers to update requests assigned to them
CREATE POLICY "Caregivers can update assigned requests"
  ON public.service_requests
  FOR UPDATE
  USING (
    has_role(auth.uid(), 'caregiver'::app_role)
    AND assigned_to_profile_id = get_profile_id(auth.uid())
  );

-- Caregivers can add status history for requests assigned to them
CREATE POLICY "Caregivers can add status history for assigned requests"
  ON public.service_request_status_history
  FOR INSERT
  WITH CHECK (
    has_role(auth.uid(), 'caregiver'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_request_id
      AND sr.assigned_to_profile_id = get_profile_id(auth.uid())
    )
    AND changed_by_profile_id = get_profile_id(auth.uid())
  );