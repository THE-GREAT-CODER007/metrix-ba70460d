
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EconomicEvent {
  id: string;
  event_time: string;
  country: string;
  currency: string;
  event_name: string;
  impact: string;
  actual: string | null;
  forecast: string | null;
  previous: string | null;
}

export const useEconomicCalendar = (startDate?: Date, endDate?: Date, impact?: string[], countries?: string[]) => {
  return useQuery({
    queryKey: ['economic-events', { startDate, endDate, impact, countries }],
    queryFn: async (): Promise<EconomicEvent[]> => {
      let query = supabase
        .from('economic_events')
        .select('*')
        .order('event_time', { ascending: true });
      
      if (startDate) {
        query = query.gte('event_time', startDate.toISOString());
      }
      
      if (endDate) {
        query = query.lte('event_time', endDate.toISOString());
      }
      
      if (impact && impact.length > 0) {
        query = query.in('impact', impact);
      }
      
      if (countries && countries.length > 0) {
        query = query.in('country', countries);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching economic events:', error);
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });
};
