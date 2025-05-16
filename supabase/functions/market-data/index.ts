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
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol');

    if (!symbol) {
      throw new Error('Symbol is required');
    }

    // Fetch data from Investing.com
    const response = await fetch(`https://www.investing.com/instruments/${symbol}`);
    const html = await response.text();
    const $ = load(html);

    // Extract market data
    const price = $('.instrument-price_last__KQzyA').text();
    const change = $('.instrument-price_change-percent__3p1Dw').text();
    const volume = $('.key-info_row__3Qfqn:contains("Volume")').find('.key-info_value__3UF_4').text();

    // Store in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data, error } = await supabase
      .from('market_data')
      .upsert({
        symbol,
        price: parseFloat(price),
        change_percent: parseFloat(change),
        volume: parseInt(volume.replace(/,/g, '')),
        updated_at: new Date().toISOString()
      });

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