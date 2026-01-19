import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { 
  CaregiverType, 
  CaregiverTypeConfig, 
  CAREGIVER_TYPE_CONFIGS,
  NotificationPreferences,
  DEFAULT_NOTIFICATION_PREFERENCES 
} from '@/types/caregiver';

interface CaregiverPreferencesContextType {
  // Current caregiver type (null if not set)
  caregiverType: CaregiverType | null;
  
  // Full config for the current type (with sensible defaults if not set)
  config: CaregiverTypeConfig | null;
  
  // Notification preferences
  notificationPreferences: NotificationPreferences;
  
  // Loading state
  isLoading: boolean;
  
  // Update functions
  setCaregiverType: (type: CaregiverType | null) => Promise<void>;
  setNotificationPreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  
  // Adaptive helpers - these provide graceful defaults when type is not set
  shouldShowDetail: (feature: 'coordination' | 'assignments' | 'visibility') => boolean;
  getAlertStyle: () => 'detailed' | 'concise' | 'proactive';
  getInformationDensity: () => 'full' | 'moderate' | 'minimal';
}

const CaregiverPreferencesContext = createContext<CaregiverPreferencesContextType | undefined>(undefined);

export const CaregiverPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [caregiverType, setCaregiverTypeState] = useState<CaregiverType | null>(null);
  const [notificationPreferences, setNotificationPreferencesState] = useState<NotificationPreferences>(
    DEFAULT_NOTIFICATION_PREFERENCES
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch preferences from profile
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('caregiver_type, notification_preferences')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          // Handle the caregiver_type as a string from database
          const dbCaregiverType = data.caregiver_type as string | null;
          if (dbCaregiverType && isValidCaregiverType(dbCaregiverType)) {
            setCaregiverTypeState(dbCaregiverType);
          }
          
          if (data.notification_preferences && typeof data.notification_preferences === 'object') {
            const prefs = data.notification_preferences as Record<string, unknown>;
            setNotificationPreferencesState({
              alert_frequency: (prefs.alert_frequency as NotificationPreferences['alert_frequency']) ?? DEFAULT_NOTIFICATION_PREFERENCES.alert_frequency,
              summary_mode: typeof prefs.summary_mode === 'boolean' ? prefs.summary_mode : DEFAULT_NOTIFICATION_PREFERENCES.summary_mode,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching caregiver preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  // Type guard for caregiver type
  const isValidCaregiverType = (value: string): value is CaregiverType => {
    return ['primary_coordinator', 'working_caregiver', 'long_distance_caregiver'].includes(value);
  };

  // Update caregiver type in database
  const setCaregiverType = useCallback(async (type: CaregiverType | null) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ caregiver_type: type })
        .eq('user_id', user.id);

      if (error) throw error;
      setCaregiverTypeState(type);
    } catch (error) {
      console.error('Error updating caregiver type:', error);
      throw error;
    }
  }, [user]);

  // Update notification preferences
  const setNotificationPreferences = useCallback(async (prefs: Partial<NotificationPreferences>) => {
    if (!user) return;

    const newPrefs = { ...notificationPreferences, ...prefs };

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: newPrefs })
        .eq('user_id', user.id);

      if (error) throw error;
      setNotificationPreferencesState(newPrefs);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }, [user, notificationPreferences]);

  // Get current config (null if no type set)
  const config = caregiverType ? CAREGIVER_TYPE_CONFIGS[caregiverType] : null;

  // Adaptive helper: should show specific detail types
  // Returns sensible defaults when no type is set (show everything)
  const shouldShowDetail = useCallback((feature: 'coordination' | 'assignments' | 'visibility'): boolean => {
    if (!config) return true; // Default: show everything when no preference set

    switch (feature) {
      case 'coordination':
        return config.priorities.showCoordinationDetails;
      case 'assignments':
        return config.priorities.showAssignmentManagement;
      case 'visibility':
        return config.priorities.emphasizeVisibility;
      default:
        return true;
    }
  }, [config]);

  // Adaptive helper: get alert style
  const getAlertStyle = useCallback((): 'detailed' | 'concise' | 'proactive' => {
    return config?.alertStyle ?? 'detailed';
  }, [config]);

  // Adaptive helper: get information density
  const getInformationDensity = useCallback((): 'full' | 'moderate' | 'minimal' => {
    return config?.informationDensity ?? 'full';
  }, [config]);

  return (
    <CaregiverPreferencesContext.Provider
      value={{
        caregiverType,
        config,
        notificationPreferences,
        isLoading,
        setCaregiverType,
        setNotificationPreferences,
        shouldShowDetail,
        getAlertStyle,
        getInformationDensity,
      }}
    >
      {children}
    </CaregiverPreferencesContext.Provider>
  );
};

export const useCaregiverPreferences = () => {
  const context = useContext(CaregiverPreferencesContext);
  if (context === undefined) {
    throw new Error('useCaregiverPreferences must be used within a CaregiverPreferencesProvider');
  }
  return context;
};
