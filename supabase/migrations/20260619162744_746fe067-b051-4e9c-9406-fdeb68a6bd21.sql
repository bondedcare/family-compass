
-- 1) Remove overly-permissive family_senior_links INSERT policy
DROP POLICY IF EXISTS "Family can insert own links" ON public.family_senior_links;

-- 2) Restrict is_internal on service_request_comments so only caregivers can mark a comment internal
DROP POLICY IF EXISTS "Family and caregivers can add comments" ON public.service_request_comments;

CREATE POLICY "Family and caregivers can add comments"
ON public.service_request_comments
FOR INSERT
TO public
WITH CHECK (
  (
    public.has_role(auth.uid(), 'family'::app_role)
    OR public.has_role(auth.uid(), 'caregiver'::app_role)
  )
  AND EXISTS (
    SELECT 1 FROM public.service_requests sr
    WHERE sr.id = service_request_comments.service_request_id
      AND public.can_access_senior(auth.uid(), sr.senior_id)
  )
  AND author_profile_id = public.get_profile_id(auth.uid())
  AND (
    is_internal = false
    OR public.has_role(auth.uid(), 'caregiver'::app_role)
  )
);

-- 3) Lock down SECURITY DEFINER helpers from anon callers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_access_senior(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_profile_id(uuid) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_senior(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_id(uuid) TO authenticated;
