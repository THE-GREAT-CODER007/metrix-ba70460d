import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change_percent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previous_close: number;
  market_cap: number;
  type: 'stock' | 'forex' | 'crypto' | 'commodity' | 'index';
  exchange: string;
  currency: string;
  updated_at: string;
}

export const useMarketData = (symbol?: string) => {
  return useQuery({
    queryKey: ['market-data', symbol],
    queryFn: async (): Promise<MarketData[]> => {
      let query = supabase
        .from('market_data')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (symbol) {
        query = query.eq('symbol', symbol);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching market data:', error);
        throw error;
      }
      
      return data || [];
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};

export const useMarketNews = () => {
  return useQuery({
    queryKey: ['market-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching market news:', error);
        throw error;
      }
      
      return data || [];
    },
    refetchInterval: 60000 // Refetch every minute
  });
};