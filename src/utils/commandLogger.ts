
// We'll temporarily disable the actual database operations since the command_logs table doesn't exist
// This will serve as a placeholder until we create the table in Supabase

export interface CommandLog {
  id: string;
  user_id: string;
  command: string;
  timestamp: string;
  status: 'success' | 'error';
  response?: string;
}

// Mock data for command logs
const mockCommandLogs: CommandLog[] = [];

export const logCommand = async (
  command: string,
  status: 'success' | 'error',
  response?: string
): Promise<void> => {
  try {
    // Instead of writing to the database, we'll log to the console and store in memory
    const commandLog = {
      id: Math.random().toString(36).substring(2, 9),
      user_id: 'current-user',
      command,
      timestamp: new Date().toISOString(),
      status,
      response
    };
    
    mockCommandLogs.unshift(commandLog);
    console.log('Command logged:', commandLog);
  } catch (error) {
    console.error('Error logging command:', error);
  }
};

export const getCommandHistory = async (): Promise<CommandLog[]> => {
  try {
    // Return mock data instead of querying the database
    return [...mockCommandLogs];
  } catch (error) {
    console.error('Error fetching command history:', error);
    return [];
  }
};
