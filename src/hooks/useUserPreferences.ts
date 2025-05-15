
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserPreferences {
  user_id: string;
  theme: string | null;
  language: string | null;
  date_format: string | null;
  time_format: string | null;
  timezone: string | null;
  notification_preferences: any | null;
  chart_preferences: any | null;
  created_at: string;
  updated_at: string;
}

export interface UpdatePreferencesInput {
  theme?: string;
  language?: string;
  date_format?: string;
  time_format?: string;
  timezone?: string;
  notification_preferences?: any;
  chart_preferences?: any;
}

export const useUserPreferences = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['userPreferences'],
    queryFn: async (): Promise<UserPreferences | null> => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        return null;
      }
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching user preferences:', error);
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  const updatePreferences = useMutation({
    mutationFn: async (input: UpdatePreferencesInput) => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error('You must be logged in to update preferences');
      }
      
      const userId = sessionData.session.user.id;
      const { error: getError } = await supabase
        .from('user_preferences')
        .select('user_id')
        .eq('user_id', userId);

      if (getError) {
        // Insert new preferences if they don't exist
        const { error: insertError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: userId,
            ...input
          });
        
        if (insertError) {
          throw new Error(insertError.message);
        }
      } else {
        // Update existing preferences
        const { error: updateError } = await supabase
          .from('user_preferences')
          .update(input)
          .eq('user_id', userId);
        
        if (updateError) {
          throw new Error(updateError.message);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
      toast('Preferences Updated', {
        description: 'Your preferences have been updated successfully',
      });
    },
    onError: (error) => {
      console.error('Error updating preferences:', error);
      toast('Error', {
        description: `Could not update preferences: ${error.message}`,
      });
    }
  });

  return {
    preferences: data || null,
    isLoading,
    error,
    updatePreferences
  };
};
