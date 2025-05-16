export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      command_logs: {
        Row: {
          command: string
          id: string
          response: string | null
          status: string
          timestamp: string
          user_id: string
        }
        Insert: {
          command: string
          id?: string
          response?: string | null
          status: string
          timestamp?: string
          user_id: string
        }
        Update: {
          command?: string
          id?: string
          response?: string | null
          status?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      dashboard_widgets: {
        Row: {
          created_at: string
          height: number
          id: string
          position_x: number
          position_y: number
          settings: Json | null
          updated_at: string
          user_id: string
          widget_type: string
          width: number
        }
        Insert: {
          created_at?: string
          height: number
          id?: string
          position_x: number
          position_y: number
          settings?: Json | null
          updated_at?: string
          user_id: string
          widget_type: string
          width: number
        }
        Update: {
          created_at?: string
          height?: number
          id?: string
          position_x?: number
          position_y?: number
          settings?: Json | null
          updated_at?: string
          user_id?: string
          widget_type?: string
          width?: number
        }
        Relationships: []
      }
      economic_events: {
        Row: {
          actual: string | null
          country: string
          created_at: string
          currency: string
          event_name: string
          event_time: string
          forecast: string | null
          id: string
          impact: string
          previous: string | null
          updated_at: string
        }
        Insert: {
          actual?: string | null
          country: string
          created_at?: string
          currency: string
          event_name: string
          event_time: string
          forecast?: string | null
          id?: string
          impact: string
          previous?: string | null
          updated_at?: string
        }
        Update: {
          actual?: string | null
          country?: string
          created_at?: string
          currency?: string
          event_name?: string
          event_time?: string
          forecast?: string | null
          id?: string
          impact?: string
          previous?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          account_id: string | null
          created_at: string
          direction: string
          entry_date: string
          entry_price: number
          exit_price: number | null
          id: string
          instrument: string
          notes: string | null
          profit_loss: number | null
          screenshots: string[] | null
          size: number
          status: string
          stop_loss: number | null
          tags: string[] | null
          take_profit: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          direction: string
          entry_date?: string
          entry_price: number
          exit_price?: number | null
          id?: string
          instrument: string
          notes?: string | null
          profit_loss?: number | null
          screenshots?: string[] | null
          size: number
          status?: string
          stop_loss?: number | null
          tags?: string[] | null
          take_profit?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          created_at?: string
          direction?: string
          entry_date?: string
          entry_price?: number
          exit_price?: number | null
          id?: string
          instrument?: string
          notes?: string | null
          profit_loss?: number | null
          screenshots?: string[] | null
          size?: number
          status?: string
          stop_loss?: number | null
          tags?: string[] | null
          take_profit?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "trading_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      market_data_cache: {
        Row: {
          data: Json
          data_type: string
          expiry: string
          id: string
          instrument: string
          last_updated: string
          timeframe: string
        }
        Insert: {
          data: Json
          data_type: string
          expiry: string
          id?: string
          instrument: string
          last_updated?: string
          timeframe: string
        }
        Update: {
          data?: Json
          data_type?: string
          expiry?: string
          id?: string
          instrument?: string
          last_updated?: string
          timeframe?: string
        }
        Relationships: []
      }
      markets: {
        Row: {
          close_time: string | null
          created_at: string
          id: string
          is_24h: boolean | null
          name: string
          open_time: string | null
          timezone: string
          type: string
          updated_at: string
        }
        Insert: {
          close_time?: string | null
          created_at?: string
          id?: string
          is_24h?: boolean | null
          name: string
          open_time?: string | null
          timezone: string
          type: string
          updated_at?: string
        }
        Update: {
          close_time?: string | null
          created_at?: string
          id?: string
          is_24h?: boolean | null
          name?: string
          open_time?: string | null
          timezone?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author: string | null
          categories: string[] | null
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          published_at: string
          sentiment: string | null
          source: string
          summary: string | null
          tickers: string[] | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          author?: string | null
          categories?: string[] | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          published_at: string
          sentiment?: string | null
          source: string
          summary?: string | null
          tickers?: string[] | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          author?: string | null
          categories?: string[] | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          published_at?: string
          sentiment?: string | null
          source?: string
          summary?: string | null
          tickers?: string[] | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      price_alerts: {
        Row: {
          condition: string
          created_at: string
          expiry_date: string | null
          id: string
          instrument: string
          is_active: boolean | null
          notification_sent: boolean | null
          price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          condition: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          instrument: string
          is_active?: boolean | null
          notification_sent?: boolean | null
          price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          condition?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          instrument?: string
          is_active?: boolean | null
          notification_sent?: boolean | null
          price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      strategies: {
        Row: {
          created_at: string
          description: string | null
          entry_rules: Json | null
          exit_rules: Json | null
          id: string
          is_active: boolean | null
          market_type: string | null
          name: string
          performance_metrics: Json | null
          risk_management: Json | null
          timeframe: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          entry_rules?: Json | null
          exit_rules?: Json | null
          id?: string
          is_active?: boolean | null
          market_type?: string | null
          name: string
          performance_metrics?: Json | null
          risk_management?: Json | null
          timeframe?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          entry_rules?: Json | null
          exit_rules?: Json | null
          id?: string
          is_active?: boolean | null
          market_type?: string | null
          name?: string
          performance_metrics?: Json | null
          risk_management?: Json | null
          timeframe?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trading_accounts: {
        Row: {
          account_number: string | null
          account_type: string
          api_key: string | null
          api_secret: string | null
          auto_sync: boolean | null
          balance: number
          broker: string
          classification: string
          created_at: string
          currency: string
          id: string
          last_sync: string | null
          leverage: string | null
          name: string
          status: string
          sync_interval: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_number?: string | null
          account_type: string
          api_key?: string | null
          api_secret?: string | null
          auto_sync?: boolean | null
          balance?: number
          broker: string
          classification?: string
          created_at?: string
          currency?: string
          id?: string
          last_sync?: string | null
          leverage?: string | null
          name: string
          status?: string
          sync_interval?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_number?: string | null
          account_type?: string
          api_key?: string | null
          api_secret?: string | null
          auto_sync?: boolean | null
          balance?: number
          broker?: string
          classification?: string
          created_at?: string
          currency?: string
          id?: string
          last_sync?: string | null
          leverage?: string | null
          name?: string
          status?: string
          sync_interval?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          chart_preferences: Json | null
          created_at: string
          date_format: string | null
          language: string | null
          notification_preferences: Json | null
          theme: string | null
          time_format: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chart_preferences?: Json | null
          created_at?: string
          date_format?: string | null
          language?: string | null
          notification_preferences?: Json | null
          theme?: string | null
          time_format?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chart_preferences?: Json | null
          created_at?: string
          date_format?: string | null
          language?: string | null
          notification_preferences?: Json | null
          theme?: string | null
          time_format?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      sync_trading_account: {
        Args: { account_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
