-- Fix: Auto-assign 'family' role to new users during signup
-- This ensures all new users can immediately use the application

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  
  -- Auto-assign family role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'family');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Allow family users to create senior profiles for their loved ones
CREATE POLICY "Family can create seniors"
  ON public.seniors FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'family'::app_role));

-- Allow family users to link themselves to seniors
-- This ensures they can only link their own profile to seniors
CREATE POLICY "Family can link themselves to seniors"
  ON public.family_senior_links FOR INSERT
  WITH CHECK (
    has_role(auth.uid(), 'family'::app_role)
    AND family_profile_id = get_profile_id(auth.uid())
  );