-- ===========================================
-- BONDED CARE DATABASE SCHEMA
-- Transportation Coordination MVP
-- ===========================================

-- 1. Role enum for user types
CREATE TYPE public.app_role AS ENUM ('family', 'caregiver', 'senior');

-- 2. Transportation status enum
CREATE TYPE public.transportation_status AS ENUM (
  'planned', 
  'confirmed', 
  'in_progress', 
  'completed', 
  'cancelled'
);

-- 3. Transportation method enum
CREATE TYPE public.transportation_method AS ENUM (
  'family_member',
  'caregiver',
  'taxi_rideshare',
  'public_transit',
  'other'
);

-- 4. Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 5. User roles table (separate from profiles per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- 6. Seniors table (extended profile for seniors)
CREATE TABLE public.seniors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  date_of_birth DATE,
  medical_notes TEXT,
  mobility_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 7. Family-Senior links (which family members are connected to which seniors)
CREATE TABLE public.family_senior_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  senior_id UUID REFERENCES public.seniors(id) ON DELETE CASCADE NOT NULL,
  relationship TEXT, -- e.g., 'daughter', 'son', 'spouse'
  is_primary_contact BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (family_profile_id, senior_id)
);

-- 8. Caregiver-Senior assignments
CREATE TABLE public.caregiver_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  senior_id UUID REFERENCES public.seniors(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  is_active BOOLEAN DEFAULT true,
  UNIQUE (caregiver_profile_id, senior_id)
);

-- 9. Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID REFERENCES public.seniors(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location TEXT,
  notes TEXT,
  created_by_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 10. Transportation plans (linked to appointments)
CREATE TABLE public.transportation_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE NOT NULL UNIQUE,
  method transportation_method NOT NULL,
  responsible_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pickup_time TIME,
  status transportation_status DEFAULT 'planned' NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 11. Care notes (visit notes from caregivers)
CREATE TABLE public.care_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID REFERENCES public.seniors(id) ON DELETE CASCADE NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  author_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 12. Emergency info
CREATE TABLE public.emergency_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID REFERENCES public.seniors(id) ON DELETE CASCADE NOT NULL UNIQUE,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  allergies TEXT,
  medications TEXT,
  doctor_name TEXT,
  doctor_phone TEXT,
  hospital_preference TEXT,
  additional_notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ===========================================
-- SECURITY DEFINER FUNCTIONS
-- ===========================================

-- Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Get profile ID for a user
CREATE OR REPLACE FUNCTION public.get_profile_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- Check if user is linked to a senior (family or caregiver)
CREATE OR REPLACE FUNCTION public.can_access_senior(_user_id UUID, _senior_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    -- User is the senior themselves
    SELECT 1 FROM public.seniors s
    JOIN public.profiles p ON s.profile_id = p.id
    WHERE s.id = _senior_id AND p.user_id = _user_id
    UNION
    -- User is a family member
    SELECT 1 FROM public.family_senior_links fsl
    JOIN public.profiles p ON fsl.family_profile_id = p.id
    WHERE fsl.senior_id = _senior_id AND p.user_id = _user_id
    UNION
    -- User is an assigned caregiver
    SELECT 1 FROM public.caregiver_assignments ca
    JOIN public.profiles p ON ca.caregiver_profile_id = p.id
    WHERE ca.senior_id = _senior_id AND p.user_id = _user_id AND ca.is_active = true
  )
$$;

-- ===========================================
-- ENABLE RLS ON ALL TABLES
-- ===========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seniors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_senior_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregiver_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transportation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_info ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- RLS POLICIES
-- ===========================================

-- PROFILES: Users can view/edit their own profile, family/caregivers can view linked seniors
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Family/caregivers can view profiles of people they're connected to
CREATE POLICY "Can view linked profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.seniors s
      WHERE s.profile_id = profiles.id
        AND public.can_access_senior(auth.uid(), s.id)
    )
    OR EXISTS (
      SELECT 1 FROM public.family_senior_links fsl
      JOIN public.seniors s ON fsl.senior_id = s.id
      WHERE fsl.family_profile_id = profiles.id
        AND public.can_access_senior(auth.uid(), s.id)
    )
    OR EXISTS (
      SELECT 1 FROM public.caregiver_assignments ca
      JOIN public.seniors s ON ca.senior_id = s.id
      WHERE ca.caregiver_profile_id = profiles.id
        AND public.can_access_senior(auth.uid(), s.id)
    )
  );

-- USER_ROLES: Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- SENIORS: Access based on links
CREATE POLICY "Can view linked seniors"
  ON public.seniors FOR SELECT
  USING (public.can_access_senior(auth.uid(), id));

CREATE POLICY "Family can update linked seniors"
  ON public.seniors FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.family_senior_links fsl
      JOIN public.profiles p ON fsl.family_profile_id = p.id
      WHERE fsl.senior_id = seniors.id AND p.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = seniors.profile_id AND p.user_id = auth.uid()
    )
  );

-- FAMILY_SENIOR_LINKS: Family can manage their own links
CREATE POLICY "Family can view own links"
  ON public.family_senior_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = family_senior_links.family_profile_id AND p.user_id = auth.uid()
    )
    OR public.can_access_senior(auth.uid(), senior_id)
  );

CREATE POLICY "Family can insert own links"
  ON public.family_senior_links FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = family_senior_links.family_profile_id AND p.user_id = auth.uid()
    )
  );

-- CAREGIVER_ASSIGNMENTS: Caregivers can view their assignments
CREATE POLICY "Can view caregiver assignments"
  ON public.caregiver_assignments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = caregiver_assignments.caregiver_profile_id AND p.user_id = auth.uid()
    )
    OR public.can_access_senior(auth.uid(), senior_id)
  );

-- APPOINTMENTS: Based on senior access
CREATE POLICY "Can view appointments for linked seniors"
  ON public.appointments FOR SELECT
  USING (public.can_access_senior(auth.uid(), senior_id));

CREATE POLICY "Family can insert appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'family')
    AND public.can_access_senior(auth.uid(), senior_id)
  );

CREATE POLICY "Family can update appointments"
  ON public.appointments FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'family')
    AND public.can_access_senior(auth.uid(), senior_id)
  );

CREATE POLICY "Family can delete appointments"
  ON public.appointments FOR DELETE
  USING (
    public.has_role(auth.uid(), 'family')
    AND public.can_access_senior(auth.uid(), senior_id)
  );

-- TRANSPORTATION_PLANS: Based on appointment access
CREATE POLICY "Can view transportation plans"
  ON public.transportation_plans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.id = transportation_plans.appointment_id
        AND public.can_access_senior(auth.uid(), a.senior_id)
    )
  );

CREATE POLICY "Family can insert transportation plans"
  ON public.transportation_plans FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.id = transportation_plans.appointment_id
        AND public.has_role(auth.uid(), 'family')
        AND public.can_access_senior(auth.uid(), a.senior_id)
    )
  );

CREATE POLICY "Family and assigned caregivers can update transportation plans"
  ON public.transportation_plans FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.id = transportation_plans.appointment_id
        AND public.can_access_senior(auth.uid(), a.senior_id)
        AND (
          public.has_role(auth.uid(), 'family')
          OR (
            public.has_role(auth.uid(), 'caregiver')
            AND transportation_plans.responsible_profile_id = public.get_profile_id(auth.uid())
          )
        )
    )
  );

-- CARE_NOTES: Caregivers can add, family can view
CREATE POLICY "Can view care notes for linked seniors"
  ON public.care_notes FOR SELECT
  USING (public.can_access_senior(auth.uid(), senior_id));

CREATE POLICY "Caregivers can insert care notes"
  ON public.care_notes FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'caregiver')
    AND public.can_access_senior(auth.uid(), senior_id)
    AND author_profile_id = public.get_profile_id(auth.uid())
  );

-- EMERGENCY_INFO: Family can manage
CREATE POLICY "Can view emergency info for linked seniors"
  ON public.emergency_info FOR SELECT
  USING (public.can_access_senior(auth.uid(), senior_id));

CREATE POLICY "Family can insert emergency info"
  ON public.emergency_info FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'family')
    AND public.can_access_senior(auth.uid(), senior_id)
  );

CREATE POLICY "Family can update emergency info"
  ON public.emergency_info FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'family')
    AND public.can_access_senior(auth.uid(), senior_id)
  );

-- ===========================================
-- TRIGGERS
-- ===========================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seniors_updated_at
  BEFORE UPDATE ON public.seniors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transportation_plans_updated_at
  BEFORE UPDATE ON public.transportation_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_info_updated_at
  BEFORE UPDATE ON public.emergency_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();