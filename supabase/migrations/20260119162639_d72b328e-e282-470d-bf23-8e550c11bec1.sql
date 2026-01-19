-- Create caregiver type enum
CREATE TYPE public.caregiver_type AS ENUM ('primary_coordinator', 'working_caregiver', 'long_distance_caregiver');

-- Add caregiver_type to profiles (optional, nullable)
ALTER TABLE public.profiles 
ADD COLUMN caregiver_type public.caregiver_type DEFAULT NULL;

-- Add notification preferences for adaptive alerts
ALTER TABLE public.profiles
ADD COLUMN notification_preferences jsonb DEFAULT '{"alert_frequency": "standard", "summary_mode": false}'::jsonb;

-- Add comment explaining the purpose
COMMENT ON COLUMN public.profiles.caregiver_type IS 'Optional caregiver type for personalized experience: primary_coordinator (oversight/planning), working_caregiver (limited time), long_distance_caregiver (remote visibility)';
COMMENT ON COLUMN public.profiles.notification_preferences IS 'Adaptive notification settings based on caregiver type and user preferences';