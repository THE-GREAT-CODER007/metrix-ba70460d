
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CommandLog {
  id: string;
  user_id: string;
  command: string;
  timestamp: string;
  status: 'success' | 'error';
  response?: string;
}

export const logCommand = async (
  command: string,
  status: 'success' | 'error',
  response?: string
): Promise<void> => {
  try {
    // Get current session - for anonymous users we'll use a placeholder ID
    const { data: sessionData } = await supabase.auth.getSession();
    const user_id = sessionData.session?.user.id || 'anonymous-user';
    
    const { error } = await supabase
      .from('command_logs')
      .insert({
        user_id,
        command,
        status,
        response
      });
    
    if (error) {
      console.error('Error logging command to database:', error);
      // Fall back to console logging if database insertion fails
      console.log('Command logged (fallback):', {
        command,
        status,
        response,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error logging command:', error);
  }
};

export const getCommandHistory = async (): Promise<CommandLog[]> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const user_id = sessionData.session?.user.id || 'anonymous-user';
    
    const { data, error } = await supabase
      .from('command_logs')
      .select('*')
      .eq('user_id', user_id)
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error fetching command history:', error);
      // Return empty array if database query fails
      return [];
    }
    
    return data as CommandLog[];
  } catch (error) {
    console.error('Error fetching command history:', error);
    return [];
  }
};
