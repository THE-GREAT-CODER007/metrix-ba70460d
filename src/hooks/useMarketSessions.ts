
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatTime } from '@/utils/TimeUtils';

export interface MarketSession {
  id: string;
  name: string;
  type: string;
  timezone: string;
  open_time: string | null;
  close_time: string | null;
  is_24h: boolean | null;
  is_open: boolean;
  local_time: string;
  status: 'open' | 'closed' | '24h';
}

export const useMarketSessions = () => {
  return useQuery({
    queryKey: ['market-sessions'],
    queryFn: async (): Promise<MarketSession[]> => {
      const { data, error } = await supabase
        .from('markets')
        .select('*');
      
      if (error) {
        console.error('Error fetching market sessions:', error);
        throw new Error(error.message);
      }
      
      // Process the market data to add current status
      return (data || []).map(market => {
        const now = new Date();
        const localTime = formatTime(now, market.timezone);
        
        let status: 'open' | 'closed' | '24h';
        let is_open = false;
        
        if (market.is_24h) {
          status = '24h';
          is_open = true;
        } else if (!market.open_time || !market.close_time) {
          status = 'closed';
          is_open = false;
        } else {
          const currentTime = now.toLocaleTimeString('en-US', { 
            timeZone: market.timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          
          is_open = currentTime >= market.open_time && currentTime <= market.close_time;
          status = is_open ? 'open' : 'closed';
        }
        
        return {
          ...market,
          is_open,
          local_time: localTime,
          status
        };
      });
    },
    refetchInterval: 60000, // Refetch every minute to update status
  });
};
