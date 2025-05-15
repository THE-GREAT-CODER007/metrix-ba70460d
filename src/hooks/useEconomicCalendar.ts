
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EconomicEvent, FilterCountry } from '@/types/news';
import { economicData } from '@/components/news/NewsData';

export const useEconomicCalendar = () => {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [selectedCountry, setSelectedCountry] = useState<FilterCountry>("all");

  // Simulated data fetching with react-query
  const { data, isLoading } = useQuery({
    queryKey: ['economic-calendar'],
    queryFn: async (): Promise<EconomicEvent[]> => {
      // In a real app, this would be a fetch call to an API
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return economicData;
    },
    staleTime: 60000, // 1 minute
  });

  // Filter economic calendar based on selected date and country
  const filteredEvents = (data || []).filter(item => {
    const itemDate = new Date(item.date).toDateString();
    const selectedDateStr = calendarDate ? calendarDate.toDateString() : "";
    
    return (
      (calendarDate === undefined || itemDate === selectedDateStr) &&
      (selectedCountry === "all" || item.country === selectedCountry)
    );
  });

  return {
    events: data || [],
    filteredEvents,
    isLoading,
    calendarDate,
    setCalendarDate,
    selectedCountry,
    setSelectedCountry
  };
};
