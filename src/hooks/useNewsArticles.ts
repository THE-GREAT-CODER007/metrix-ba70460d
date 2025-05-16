
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { NewsArticle } from '@/types/news';

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
        query = query.overlaps('categories', categories);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching news articles:', error);
        throw new Error(error.message);
      }
      
      // Map Supabase data to the NewsArticle type used in our components
      return data?.map(article => ({
        id: article.id,
        title: article.title,
        source: article.source,
        time: new Date(article.published_at).toLocaleDateString(),
        summary: article.summary || article.content?.substring(0, 150) + '...',
        category: article.categories?.[0] || 'News',
        impact: article.sentiment === 'positive' ? 'low' : 
               article.sentiment === 'negative' ? 'high' : 'medium',
        url: article.url,
        imageUrl: article.image_url
      })) || [];
    },
    staleTime: 60000, // 1 minute
    retry: 3
  });
};
