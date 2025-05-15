
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  author: string | null;
  published_at: string;
  content: string | null;
  summary: string | null;
  url: string;
  image_url: string | null;
  categories: string[] | null;
  tickers: string[] | null;
  sentiment: string | null;
}

export const useNewsArticles = (limit = 10, categories?: string[]) => {
  return useQuery({
    queryKey: ['news', { limit, categories }],
    queryFn: async (): Promise<NewsArticle[]> => {
      let query = supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(limit);
      
      if (categories && categories.length > 0) {
        query = query.contains('categories', categories);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching news articles:', error);
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });
};
