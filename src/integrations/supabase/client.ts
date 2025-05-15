
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Initialize the Supabase client
export const supabase = createClient<Database>(
  'https://hqfvwdyzpfulnctosokf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnZ3ZHl6cGZ1bG5jdG9zb2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjQwMzQsImV4cCI6MjA2MjUwMDAzNH0.ULVbsTL7kYdtmK4q4x0V8Em3lNJsnuZnCn8TK5YrFE0'
);
