import { supabase } from '@/integrations/supabase/client';

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
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return;

    const { error } = await supabase
      .from('command_logs')
      .insert({
        user_id: session.user.id,
        command,
        status,
        response
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging command:', error);
  }
};

export const getCommandHistory = async (): Promise<CommandLog[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return [];

    const { data, error } = await supabase
      .from('command_logs')
      .select('*')
      .eq('user_id', session.user.id)
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching command history:', error);
    return [];
  }
};