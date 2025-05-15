
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface JournalEntry {
  id: string;
  user_id: string;
  account_id: string | null;
  entry_date: string;
  instrument: string;
  direction: 'long' | 'short';
  entry_price: number;
  exit_price: number | null;
  size: number;
  stop_loss: number | null;
  take_profit: number | null;
  profit_loss: number | null;
  status: 'open' | 'closed' | 'canceled';
  notes: string | null;
  tags: string[] | null;
  screenshots: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CreateJournalEntryInput {
  account_id?: string;
  entry_date?: string;
  instrument: string;
  direction: 'long' | 'short';
  entry_price: number;
  exit_price?: number;
  size: number;
  stop_loss?: number;
  take_profit?: number;
  profit_loss?: number;
  status?: 'open' | 'closed' | 'canceled';
  notes?: string;
  tags?: string[];
  screenshots?: string[];
}

export const useJournalEntries = (accountId?: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['journalEntries', { accountId }],
    queryFn: async (): Promise<JournalEntry[]> => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        return [];
      }
      
      let query = supabase
        .from('journal_entries')
        .select('*')
        .order('entry_date', { ascending: false });
      
      if (accountId) {
        query = query.eq('account_id', accountId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching journal entries:', error);
        throw new Error(error.message);
      }
      
      // Cast the direction field to ensure it's either 'long' or 'short'
      return (data || []).map(entry => ({
        ...entry,
        direction: entry.direction.toLowerCase() === 'short' ? 'short' : 'long'
      } as JournalEntry));
    }
  });

  const createEntry = useMutation({
    mutationFn: async (input: CreateJournalEntryInput) => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error('You must be logged in to create a journal entry');
      }
      
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: sessionData.session.user.id,
          account_id: input.account_id || null,
          entry_date: input.entry_date || new Date().toISOString().split('T')[0],
          instrument: input.instrument,
          direction: input.direction,
          entry_price: input.entry_price,
          exit_price: input.exit_price || null,
          size: input.size,
          stop_loss: input.stop_loss || null,
          take_profit: input.take_profit || null,
          profit_loss: input.profit_loss || null,
          status: input.status || 'open',
          notes: input.notes || null,
          tags: input.tags || null,
          screenshots: input.screenshots || null,
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast('Entry Created', {
        description: 'Your journal entry has been created successfully',
      });
    },
    onError: (error) => {
      console.error('Error creating journal entry:', error);
      toast('Error', {
        description: `Could not create journal entry: ${error.message}`,
      });
    }
  });

  const updateEntry = useMutation({
    mutationFn: async ({ id, ...input }: CreateJournalEntryInput & { id: string }) => {
      const { error } = await supabase
        .from('journal_entries')
        .update({
          account_id: input.account_id || null,
          entry_date: input.entry_date,
          instrument: input.instrument,
          direction: input.direction,
          entry_price: input.entry_price,
          exit_price: input.exit_price || null,
          size: input.size,
          stop_loss: input.stop_loss || null,
          take_profit: input.take_profit || null,
          profit_loss: input.profit_loss || null,
          status: input.status || 'open',
          notes: input.notes || null,
          tags: input.tags || null,
          screenshots: input.screenshots || null,
        })
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast('Entry Updated', {
        description: 'Your journal entry has been updated successfully',
      });
    },
    onError: (error) => {
      console.error('Error updating journal entry:', error);
      toast('Error', {
        description: `Could not update journal entry: ${error.message}`,
      });
    }
  });

  const deleteEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
      toast('Entry Deleted', {
        description: 'Your journal entry has been deleted successfully',
      });
    },
    onError: (error) => {
      console.error('Error deleting journal entry:', error);
      toast('Error', {
        description: `Could not delete journal entry: ${error.message}`,
      });
    }
  });

  return {
    entries: data || [],
    isLoading,
    error,
    createEntry,
    updateEntry,
    deleteEntry
  };
};
