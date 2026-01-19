// Caregiver type definitions for personalized experience

export type CaregiverType = 
  | 'primary_coordinator'    // Manages planning, assignments, and oversight
  | 'working_caregiver'      // Balances care with work, limited availability
  | 'long_distance_caregiver'; // Coordinates remotely, relies on visibility

export interface CaregiverTypeConfig {
  type: CaregiverType;
  label: string;
  description: string;
  icon: string;
  priorities: {
    showCoordinationDetails: boolean;
    showQuickSummaries: boolean;
    emphasizeUpcoming: boolean;
    emphasizeVisibility: boolean;
    showAssignmentManagement: boolean;
  };
  alertStyle: 'detailed' | 'concise' | 'proactive';
  informationDensity: 'full' | 'moderate' | 'minimal';
}

export const CAREGIVER_TYPE_CONFIGS: Record<CaregiverType, CaregiverTypeConfig> = {
  primary_coordinator: {
    type: 'primary_coordinator',
    label: 'Primary Coordinator',
    description: 'You manage the care plan, coordinate with others, and keep everything running smoothly.',
    icon: 'clipboard-list',
    priorities: {
      showCoordinationDetails: true,
      showQuickSummaries: false,
      emphasizeUpcoming: true,
      emphasizeVisibility: false,
      showAssignmentManagement: true,
    },
    alertStyle: 'detailed',
    informationDensity: 'full',
  },
  working_caregiver: {
    type: 'working_caregiver',
    label: 'Working Caregiver',
    description: 'You balance caregiving with work or other responsibilities and need information at a glance.',
    icon: 'briefcase',
    priorities: {
      showCoordinationDetails: false,
      showQuickSummaries: true,
      emphasizeUpcoming: true,
      emphasizeVisibility: false,
      showAssignmentManagement: false,
    },
    alertStyle: 'concise',
    informationDensity: 'moderate',
  },
  long_distance_caregiver: {
    type: 'long_distance_caregiver',
    label: 'Long-Distance Caregiver',
    description: 'You coordinate from afar and rely on updates to stay connected and informed.',
    icon: 'globe',
    priorities: {
      showCoordinationDetails: false,
      showQuickSummaries: true,
      emphasizeUpcoming: false,
      emphasizeVisibility: true,
      showAssignmentManagement: false,
    },
    alertStyle: 'proactive',
    informationDensity: 'moderate',
  },
};

export interface NotificationPreferences {
  alert_frequency: 'realtime' | 'standard' | 'digest';
  summary_mode: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  alert_frequency: 'standard',
  summary_mode: false,
};
