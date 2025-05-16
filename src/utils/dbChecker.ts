
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Utility to check database connection and verify functionality
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    // Check connection by trying to fetch from the markets table
    const { data, error } = await supabase
      .from('markets')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      toast('Database Error', {
        description: 'Could not connect to the database. Check your network connection.',
      });
      return false;
    }
    
    console.info('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    toast('Database Error', {
      description: 'Could not connect to the database. Check your connection.',
    });
    return false;
  }
};

/**
 * Validates that all essential tables are accessible
 */
export const validateDatabaseStructure = async (): Promise<{isValid: boolean; missingTables: string[]}> => {
  // List of tables we expect to exist
  const tables = [
    'markets', 
    'news_articles', 
    'trading_accounts', 
    'journal_entries',
    'notifications',
    'strategies',
    'command_logs'
  ];
  
  const missingTables: string[] = [];
  
  // Check each table by trying to select a single row
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error) {
        console.error(`Error accessing table ${table}:`, error);
        missingTables.push(table);
      }
    } catch (error) {
      console.error(`Error checking table ${table}:`, error);
      missingTables.push(table);
    }
  }
  
  return {
    isValid: missingTables.length === 0,
    missingTables
  };
};

/**
 * Runs basic functionality tests on database functions
 */
export const validateFunctions = async (): Promise<boolean> => {
  try {
    // Check if the sync_trading_account function exists and works
    // by trying to call it with a dummy account_id
    const { data, error } = await supabase
      .rpc('sync_trading_account', { account_id: '00000000-0000-0000-0000-000000000000' });
    
    // It's okay if we get an error saying the account doesn't exist
    // We just want to verify the function exists and can be called
    if (error && !error.message.includes('Account not found')) {
      console.error('Error validating database functions:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error validating database functions:', error);
    return false;
  }
};

/**
 * Run all database checks and return a comprehensive status report
 */
export const runDatabaseChecks = async (): Promise<{ 
  isConnected: boolean;
  structureValid: boolean;
  functionsValid: boolean;
  missingTables: string[];
}> => {
  const isConnected = await checkDatabaseConnection();
  
  if (!isConnected) {
    return {
      isConnected: false,
      structureValid: false,
      functionsValid: false,
      missingTables: []
    };
  }
  
  const { isValid, missingTables } = await validateDatabaseStructure();
  const functionsValid = await validateFunctions();
  
  return {
    isConnected,
    structureValid: isValid,
    functionsValid,
    missingTables
  };
};
