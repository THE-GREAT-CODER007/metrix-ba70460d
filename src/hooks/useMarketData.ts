
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MarketData {
  id: string;
  name: string;
  type: string;
  timezone: string;
  open_time: string | null;
  close_time: string | null;
  is_24h: boolean | null;
}

export const useMarketData = () => {
  return useQuery({
    queryKey: ['markets'],
    queryFn: async (): Promise<MarketData[]> => {
      const { data, error } = await supabase
        .from('markets')
        .select('*');
      
      if (error) {
        console.error('Error fetching market data:', error);
        throw new Error(error.message);
      }
      
      return data || [];
    },
    staleTime: 300000, // 5 minutes
    retry: 3
  });
};
