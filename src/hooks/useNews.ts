
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NewsArticle, FilterSource, FilterCategory, FilterImpact } from '@/types/news';
import { newsData } from '@/components/news/NewsData';

export const useNews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<FilterSource>("all");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [selectedImpact, setSelectedImpact] = useState<FilterImpact>("all");

  // Simulated data fetching with react-query
  const { data, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async (): Promise<NewsArticle[]> => {
      // In a real app, this would be a fetch call to an API
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return newsData;
    },
    staleTime: 60000, // 1 minute
  });

  // Filter news based on search and filters
  const filteredNews = (data || []).filter(item => {
    return (
      (searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSource === "all" || item.source === selectedSource) &&
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (selectedImpact === "all" || item.impact === selectedImpact)
    );
  });

  return {
    news: data || [],
    filteredNews,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedSource,
    setSelectedSource,
    selectedCategory,
    setSelectedCategory,
    selectedImpact,
    setSelectedImpact
  };
};
