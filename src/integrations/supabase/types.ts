export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string
          created_by_profile_id: string | null
          description: string | null
          id: string
          location: string | null
          notes: string | null
          senior_id: string
          title: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string
          created_by_profile_id?: string | null
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          senior_id: string
          title: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          created_by_profile_id?: string | null
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          senior_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_created_by_profile_id_fkey"
            columns: ["created_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
      care_notes: {
        Row: {
          appointment_id: string | null
          author_profile_id: string
          content: string
          created_at: string
          id: string
          senior_id: string
        }
        Insert: {
          appointment_id?: string | null
          author_profile_id: string
          content: string
          created_at?: string
          id?: string
          senior_id: string
        }
        Update: {
          appointment_id?: string | null
          author_profile_id?: string
          content?: string
          created_at?: string
          id?: string
          senior_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_notes_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_notes_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_notes_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_assignments: {
        Row: {
          assigned_at: string
          caregiver_profile_id: string
          id: string
          is_active: boolean | null
          senior_id: string
        }
        Insert: {
          assigned_at?: string
          caregiver_profile_id: string
          id?: string
          is_active?: boolean | null
          senior_id: string
        }
        Update: {
          assigned_at?: string
          caregiver_profile_id?: string
          id?: string
          is_active?: boolean | null
          senior_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "caregiver_assignments_caregiver_profile_id_fkey"
            columns: ["caregiver_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caregiver_assignments_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_info: {
        Row: {
          additional_notes: string | null
          allergies: string | null
          doctor_name: string | null
          doctor_phone: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          hospital_preference: string | null
          id: string
          medications: string | null
          senior_id: string
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          allergies?: string | null
          doctor_name?: string | null
          doctor_phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          hospital_preference?: string | null
          id?: string
          medications?: string | null
          senior_id: string
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          allergies?: string | null
          doctor_name?: string | null
          doctor_phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          hospital_preference?: string | null
          id?: string
          medications?: string | null
          senior_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_info_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: true
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
      family_senior_links: {
        Row: {
          created_at: string
          family_profile_id: string
          id: string
          is_primary_contact: boolean | null
          relationship: string | null
          senior_id: string
        }
        Insert: {
          created_at?: string
          family_profile_id: string
          id?: string
          is_primary_contact?: boolean | null
          relationship?: string | null
          senior_id: string
        }
        Update: {
          created_at?: string
          family_profile_id?: string
          id?: string
          is_primary_contact?: boolean | null
          relationship?: string | null
          senior_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_senior_links_family_profile_id_fkey"
            columns: ["family_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_senior_links_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          caregiver_type: Database["public"]["Enums"]["caregiver_type"] | null
          created_at: string
          full_name: string
          id: string
          notification_preferences: Json | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          caregiver_type?: Database["public"]["Enums"]["caregiver_type"] | null
          created_at?: string
          full_name: string
          id?: string
          notification_preferences?: Json | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          caregiver_type?: Database["public"]["Enums"]["caregiver_type"] | null
          created_at?: string
          full_name?: string
          id?: string
          notification_preferences?: Json | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seniors: {
        Row: {
          created_at: string
          date_of_birth: string | null
          id: string
          medical_notes: string | null
          mobility_notes: string | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          id?: string
          medical_notes?: string | null
          mobility_notes?: string | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          id?: string
          medical_notes?: string | null
          mobility_notes?: string | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "seniors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_request_comments: {
        Row: {
          author_profile_id: string
          content: string
          created_at: string
          id: string
          is_internal: boolean
          service_request_id: string
          updated_at: string
        }
        Insert: {
          author_profile_id: string
          content: string
          created_at?: string
          id?: string
          is_internal?: boolean
          service_request_id: string
          updated_at?: string
        }
        Update: {
          author_profile_id?: string
          content?: string
          created_at?: string
          id?: string
          is_internal?: boolean
          service_request_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_request_comments_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_request_comments_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_request_status_history: {
        Row: {
          changed_by_profile_id: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["service_request_status"]
          notes: string | null
          old_status:
            | Database["public"]["Enums"]["service_request_status"]
            | null
          service_request_id: string
        }
        Insert: {
          changed_by_profile_id?: string | null
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["service_request_status"]
          notes?: string | null
          old_status?:
            | Database["public"]["Enums"]["service_request_status"]
            | null
          service_request_id: string
        }
        Update: {
          changed_by_profile_id?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["service_request_status"]
          notes?: string | null
          old_status?:
            | Database["public"]["Enums"]["service_request_status"]
            | null
          service_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_request_status_history_changed_by_profile_id_fkey"
            columns: ["changed_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_request_status_history_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          assigned_to_profile_id: string | null
          budget_notes: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          preferred_date: string | null
          preferred_time_slot: string | null
          requested_by_profile_id: string
          senior_id: string
          service_type: Database["public"]["Enums"]["service_type"]
          special_instructions: string | null
          status: Database["public"]["Enums"]["service_request_status"]
          title: string
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          assigned_to_profile_id?: string | null
          budget_notes?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          preferred_date?: string | null
          preferred_time_slot?: string | null
          requested_by_profile_id: string
          senior_id: string
          service_type: Database["public"]["Enums"]["service_type"]
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["service_request_status"]
          title: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          assigned_to_profile_id?: string | null
          budget_notes?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          preferred_date?: string | null
          preferred_time_slot?: string | null
          requested_by_profile_id?: string
          senior_id?: string
          service_type?: Database["public"]["Enums"]["service_type"]
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["service_request_status"]
          title?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_assigned_to_profile_id_fkey"
            columns: ["assigned_to_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_requested_by_profile_id_fkey"
            columns: ["requested_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "seniors"
            referencedColumns: ["id"]
          },
        ]
      }
      transportation_plans: {
        Row: {
          appointment_id: string
          created_at: string
          id: string
          method: Database["public"]["Enums"]["transportation_method"]
          notes: string | null
          pickup_time: string | null
          responsible_profile_id: string | null
          status: Database["public"]["Enums"]["transportation_status"]
          updated_at: string
        }
        Insert: {
          appointment_id: string
          created_at?: string
          id?: string
          method: Database["public"]["Enums"]["transportation_method"]
          notes?: string | null
          pickup_time?: string | null
          responsible_profile_id?: string | null
          status?: Database["public"]["Enums"]["transportation_status"]
          updated_at?: string
        }
        Update: {
          appointment_id?: string
          created_at?: string
          id?: string
          method?: Database["public"]["Enums"]["transportation_method"]
          notes?: string | null
          pickup_time?: string | null
          responsible_profile_id?: string | null
          status?: Database["public"]["Enums"]["transportation_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transportation_plans_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: true
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportation_plans_responsible_profile_id_fkey"
            columns: ["responsible_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_senior: {
        Args: { _senior_id: string; _user_id: string }
        Returns: boolean
      }
      get_profile_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "family" | "caregiver" | "senior" | "admin"
      caregiver_type:
        | "primary_coordinator"
        | "working_caregiver"
        | "long_distance_caregiver"
      service_request_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      service_type:
        | "gifts_care_packages"
        | "grocery_essentials"
        | "errands_pickups"
        | "home_tech_setup"
      transportation_method:
        | "family_member"
        | "caregiver"
        | "taxi_rideshare"
        | "public_transit"
        | "other"
      transportation_status:
        | "planned"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      urgency_level: "flexible" | "this_week" | "urgent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["family", "caregiver", "senior", "admin"],
      caregiver_type: [
        "primary_coordinator",
        "working_caregiver",
        "long_distance_caregiver",
      ],
      service_request_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      service_type: [
        "gifts_care_packages",
        "grocery_essentials",
        "errands_pickups",
        "home_tech_setup",
      ],
      transportation_method: [
        "family_member",
        "caregiver",
        "taxi_rideshare",
        "public_transit",
        "other",
      ],
      transportation_status: [
        "planned",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      urgency_level: ["flexible", "this_week", "urgent"],
    },
  },
} as const
