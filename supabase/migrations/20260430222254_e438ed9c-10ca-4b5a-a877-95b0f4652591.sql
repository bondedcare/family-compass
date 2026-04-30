
-- 1. Fix service_request_comments: hide internal comments from family-only users
DROP POLICY IF EXISTS "Can view comments for accessible requests" ON public.service_request_comments;

CREATE POLICY "Can view comments for accessible requests"
  ON public.service_request_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = service_request_comments.service_request_id
        AND can_access_senior(auth.uid(), sr.senior_id)
    )
    AND (
      is_internal = false
      OR has_role(auth.uid(), 'caregiver'::app_role)
      OR author_profile_id = get_profile_id(auth.uid())
    )
  );

-- 2. Explicit restrictive policies on user_roles to prevent privilege escalation
CREATE POLICY "No user inserts to user_roles"
  ON public.user_roles AS RESTRICTIVE FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No user updates to user_roles"
  ON public.user_roles AS RESTRICTIVE FOR UPDATE
  USING (false);

CREATE POLICY "No user deletes to user_roles"
  ON public.user_roles AS RESTRICTIVE FOR DELETE
  USING (false);

-- 3. Caregiver assignments: only family members linked to that senior can manage
CREATE POLICY "Family can assign caregivers"
  ON public.caregiver_assignments FOR INSERT
  WITH CHECK (
    has_role(auth.uid(), 'family'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.family_senior_links fsl
      JOIN public.profiles p ON fsl.family_profile_id = p.id
      WHERE fsl.senior_id = caregiver_assignments.senior_id
        AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Family can update caregiver assignments"
  ON public.caregiver_assignments FOR UPDATE
  USING (
    has_role(auth.uid(), 'family'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.family_senior_links fsl
      JOIN public.profiles p ON fsl.family_profile_id = p.id
      WHERE fsl.senior_id = caregiver_assignments.senior_id
        AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Family can remove caregiver assignments"
  ON public.caregiver_assignments FOR DELETE
  USING (
    has_role(auth.uid(), 'family'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.family_senior_links fsl
      JOIN public.profiles p ON fsl.family_profile_id = p.id
      WHERE fsl.senior_id = caregiver_assignments.senior_id
        AND p.user_id = auth.uid()
    )
  );

-- 4. Input validation CHECK constraints
ALTER TABLE public.appointments
  ADD CONSTRAINT appt_title_length CHECK (char_length(title) > 0 AND char_length(title) <= 100),
  ADD CONSTRAINT appt_description_length CHECK (description IS NULL OR char_length(description) <= 500),
  ADD CONSTRAINT appt_location_length CHECK (location IS NULL OR char_length(location) <= 200),
  ADD CONSTRAINT appt_notes_length CHECK (notes IS NULL OR char_length(notes) <= 1000);

ALTER TABLE public.transportation_plans
  ADD CONSTRAINT trans_notes_length CHECK (notes IS NULL OR char_length(notes) <= 500);

ALTER TABLE public.care_notes
  ADD CONSTRAINT care_content_length CHECK (char_length(content) > 0 AND char_length(content) <= 2000);

ALTER TABLE public.emergency_info
  ADD CONSTRAINT em_phone_format CHECK (
    emergency_contact_phone IS NULL OR
    emergency_contact_phone ~ '^\+?[0-9\s\-\(\)]{7,20}$'
  ),
  ADD CONSTRAINT em_allergies_length CHECK (allergies IS NULL OR char_length(allergies) <= 1000),
  ADD CONSTRAINT em_medications_length CHECK (medications IS NULL OR char_length(medications) <= 2000),
  ADD CONSTRAINT em_additional_notes_length CHECK (additional_notes IS NULL OR char_length(additional_notes) <= 2000),
  ADD CONSTRAINT em_doctor_name_length CHECK (doctor_name IS NULL OR char_length(doctor_name) <= 100),
  ADD CONSTRAINT em_hospital_length CHECK (hospital_preference IS NULL OR char_length(hospital_preference) <= 200),
  ADD CONSTRAINT em_contact_name_length CHECK (emergency_contact_name IS NULL OR char_length(emergency_contact_name) <= 100),
  ADD CONSTRAINT em_contact_rel_length CHECK (emergency_contact_relationship IS NULL OR char_length(emergency_contact_relationship) <= 50),
  ADD CONSTRAINT em_doctor_phone_format CHECK (
    doctor_phone IS NULL OR doctor_phone ~ '^\+?[0-9\s\-\(\)]{7,20}$'
  );

ALTER TABLE public.profiles
  ADD CONSTRAINT prof_full_name_length CHECK (char_length(full_name) > 0 AND char_length(full_name) <= 100),
  ADD CONSTRAINT prof_phone_format CHECK (
    phone IS NULL OR phone ~ '^\+?[0-9\s\-\(\)]{7,20}$'
  );

ALTER TABLE public.service_requests
  ADD CONSTRAINT sr_title_length CHECK (char_length(title) > 0 AND char_length(title) <= 100),
  ADD CONSTRAINT sr_description_length CHECK (description IS NULL OR char_length(description) <= 1000),
  ADD CONSTRAINT sr_special_length CHECK (special_instructions IS NULL OR char_length(special_instructions) <= 1000),
  ADD CONSTRAINT sr_budget_length CHECK (budget_notes IS NULL OR char_length(budget_notes) <= 500);

ALTER TABLE public.service_request_comments
  ADD CONSTRAINT src_content_length CHECK (char_length(content) > 0 AND char_length(content) <= 2000);

-- 5. Restrict SECURITY DEFINER helper functions so anon role cannot execute them
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.get_profile_id(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.can_access_senior(uuid, uuid) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_senior(uuid, uuid) TO authenticated;
