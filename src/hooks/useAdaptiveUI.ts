import { useCaregiverPreferences } from '@/contexts/CaregiverPreferencesContext';
import { cn } from '@/lib/utils';

/**
 * Hook for adaptive UI based on caregiver type preferences.
 * Provides utilities for conditional rendering and styling without
 * fragmenting the app into separate versions.
 */
export const useAdaptiveUI = () => {
  const { 
    caregiverType, 
    config, 
    shouldShowDetail, 
    getAlertStyle, 
    getInformationDensity 
  } = useCaregiverPreferences();

  const density = getInformationDensity();
  const alertStyle = getAlertStyle();

  /**
   * Get appropriate card padding based on information density
   */
  const getCardPadding = (): string => {
    switch (density) {
      case 'minimal':
        return 'p-3';
      case 'moderate':
        return 'p-4';
      case 'full':
      default:
        return 'p-5';
    }
  };

  /**
   * Get appropriate text size for secondary content
   */
  const getSecondaryTextSize = (): string => {
    switch (density) {
      case 'minimal':
        return 'text-xs';
      case 'moderate':
        return 'text-sm';
      case 'full':
      default:
        return 'text-sm';
    }
  };

  /**
   * Determine if detailed descriptions should be shown
   */
  const shouldShowDetailedDescription = (): boolean => {
    return density === 'full';
  };

  /**
   * Determine if quick action buttons should be emphasized
   */
  const shouldEmphasizeQuickActions = (): boolean => {
    return caregiverType === 'working_caregiver';
  };

  /**
   * Get emphasis style for upcoming items based on caregiver type
   */
  const getUpcomingEmphasis = (): 'high' | 'medium' | 'low' => {
    if (!config) return 'medium';
    if (config.priorities.emphasizeUpcoming) return 'high';
    if (config.priorities.emphasizeVisibility) return 'medium';
    return 'low';
  };

  /**
   * Get adaptive classes for alert components
   */
  const getAlertClasses = (): string => {
    switch (alertStyle) {
      case 'concise':
        return 'py-2 px-3';
      case 'proactive':
        return 'py-3 px-4 border-l-4 border-l-primary';
      case 'detailed':
      default:
        return 'py-4 px-5';
    }
  };

  /**
   * Format alert message based on style preference
   */
  const formatAlertMessage = (
    detailed: string, 
    concise: string, 
    proactive: string
  ): string => {
    switch (alertStyle) {
      case 'concise':
        return concise;
      case 'proactive':
        return proactive;
      case 'detailed':
      default:
        return detailed;
    }
  };

  /**
   * Get visibility indicator classes for long-distance caregivers
   */
  const getVisibilityIndicatorClasses = (): string => {
    if (caregiverType === 'long_distance_caregiver') {
      return 'ring-2 ring-primary/20 ring-offset-2';
    }
    return '';
  };

  /**
   * Determine section visibility based on preferences
   */
  const getSectionVisibility = (section: 'coordination' | 'assignments' | 'updates' | 'visibility'): {
    show: boolean;
    emphasized: boolean;
    collapsed: boolean;
  } => {
    const baseShow = true; // Never hide sections, just adjust emphasis

    switch (section) {
      case 'coordination':
        return {
          show: baseShow,
          emphasized: shouldShowDetail('coordination'),
          collapsed: !shouldShowDetail('coordination'),
        };
      case 'assignments':
        return {
          show: baseShow,
          emphasized: shouldShowDetail('assignments'),
          collapsed: !shouldShowDetail('assignments'),
        };
      case 'visibility':
        return {
          show: baseShow,
          emphasized: shouldShowDetail('visibility'),
          collapsed: false, // Never collapse visibility for long-distance
        };
      case 'updates':
        return {
          show: baseShow,
          emphasized: caregiverType === 'long_distance_caregiver',
          collapsed: false,
        };
      default:
        return { show: true, emphasized: false, collapsed: false };
    }
  };

  /**
   * Get supportive messaging tone based on caregiver type
   */
  const getSupportiveMessage = (context: 'dashboard' | 'appointment' | 'alert'): string | null => {
    if (!caregiverType) return null;

    const messages: Record<string, Record<string, string>> = {
      primary_coordinator: {
        dashboard: "You're keeping everything on track. Here's your overview.",
        appointment: "All the details you need to coordinate care.",
        alert: "Action needed to keep care coordinated.",
      },
      working_caregiver: {
        dashboard: "Here's what matters most right now.",
        appointment: "Quick view of what's coming up.",
        alert: "Heads up—when you have a moment.",
      },
      long_distance_caregiver: {
        dashboard: "Staying connected from wherever you are.",
        appointment: "Everything's being taken care of. Here's the update.",
        alert: "Just keeping you in the loop.",
      },
    };

    return messages[caregiverType]?.[context] ?? null;
  };

  return {
    caregiverType,
    config,
    density,
    alertStyle,
    getCardPadding,
    getSecondaryTextSize,
    shouldShowDetailedDescription,
    shouldEmphasizeQuickActions,
    getUpcomingEmphasis,
    getAlertClasses,
    formatAlertMessage,
    getVisibilityIndicatorClasses,
    getSectionVisibility,
    getSupportiveMessage,
  };
};
