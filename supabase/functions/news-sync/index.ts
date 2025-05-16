import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.1.0';
import { load } from 'npm:cheerio@1.0.0-rc.12';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch news from Investing.com
    const response = await fetch('https://www.investing.com/news/latest-news');
    const html = await response.text();
    const $ = load(html);

    const articles = [];
    $('.articleItem').each((i, el) => {
      const title = $(el).find('.title').text().trim();
      const url = $(el).find('.title a').attr('href');
      const imageUrl = $(el).find('img').attr('src');
      const summary = $(el).find('.description').text().trim();
      const source = 'Investing.com';
      const publishedAt = new Date($(el).find('.date').text()).toISOString();

      articles.push({
        title,
        url: `https://www.investing.com${url}`,
        image_url: imageUrl,
        summary,
        source,
        published_at: publishedAt,
        category: ['Markets'],
        impact: 'medium'
      });
    });

    // Store in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data, error } = await supabase
      .from('market_news')
      .upsert(articles, { onConflict: 'url' });

    if (error) throw error;

    return new Response(
      JSON.stringify({ data }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});