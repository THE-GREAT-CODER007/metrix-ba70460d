
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TradingAccount {
  id: string;
  user_id: string;
  name: string;
  broker: string;
  account_number: string | null;
  account_type: string;
  balance: number;
  currency: string;
  leverage: string | null;
  status: string;
  classification: string;
  auto_sync: boolean | null;
  sync_interval: number | null;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountInput {
  name: string;
  broker: string;
  account_number?: string;
  account_type: string;
  balance: number;
  currency?: string;
  leverage?: string;
  classification?: string;
  auto_sync?: boolean;
  sync_interval?: number;
  api_key?: string;
  api_secret?: string;
}

export const useTradingAccounts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tradingAccounts'],
    queryFn: async (): Promise<TradingAccount[]> => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('trading_accounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching trading accounts:', error);
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });

  const createAccount = useMutation({
    mutationFn: async (input: CreateAccountInput) => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error('You must be logged in to create an account');
      }
      
      const { data, error } = await supabase
        .from('trading_accounts')
        .insert({
          user_id: sessionData.session.user.id,
          name: input.name,
          broker: input.broker,
          account_number: input.account_number || null,
          account_type: input.account_type,
          balance: input.balance,
          currency: input.currency || 'USD',
          leverage: input.leverage || null,
          classification: input.classification || 'real',
          auto_sync: input.auto_sync !== undefined ? input.auto_sync : true,
          sync_interval: input.sync_interval || 60,
          api_key: input.api_key || null,
          api_secret: input.api_secret || null,
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingAccounts'] });
      toast('Account Created', {
        description: 'Your trading account has been created successfully',
      });
    },
    onError: (error) => {
      console.error('Error creating account:', error);
      toast('Error', {
        description: `Could not create account: ${error.message}`,
      });
    }
  });

  const syncAccount = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .rpc('sync_trading_account', { account_id: id });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tradingAccounts'] });
      toast('Account Synced', {
        description: 'Your trading account has been synced successfully',
      });
    },
    onError: (error) => {
      console.error('Error syncing account:', error);
      toast('Error', {
        description: `Could not sync account: ${error.message}`,
      });
    }
  });

  return {
    accounts: data || [],
    isLoading,
    error,
    createAccount,
    syncAccount
  };
};
