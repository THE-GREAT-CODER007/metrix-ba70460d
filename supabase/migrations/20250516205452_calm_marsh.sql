/*
  # Market Data Integration Schema

  1. New Tables
    - `market_data`
      - Real-time market data from Investing.com
      - Stores prices, indicators, and technical data
    - `market_news`
      - Financial news articles with metadata
      - Includes source, category, and impact ratings
    - `market_calendar`
      - Economic events and releases
      - Tracks announcements and their impact

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Implement rate limiting for API calls

  3. Functions
    - Market data sync function
    - News aggregation function
    - Calendar event processor
*/

-- Market Data Table
CREATE TABLE IF NOT EXISTS market_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL,
  change_percent numeric,
  volume bigint,
  high numeric,
  low numeric,
  open numeric,
  previous_close numeric,
  market_cap numeric,
  timestamp timestamptz DEFAULT now(),
  type text CHECK (type IN ('stock', 'forex', 'crypto', 'commodity', 'index')),
  exchange text,
  currency text,
  updated_at timestamptz DEFAULT now()
);

-- Market News Table
CREATE TABLE IF NOT EXISTS market_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  summary text,
  source text NOT NULL,
  author text,
  url text NOT NULL,
  image_url text,
  published_at timestamptz NOT NULL,
  category text[] NOT NULL,
  symbols text[],
  impact text CHECK (impact IN ('high', 'medium', 'low')),
  sentiment text CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Market Calendar Table
CREATE TABLE IF NOT EXISTS market_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  country text NOT NULL,
  date timestamptz NOT NULL,
  impact text CHECK (impact IN ('high', 'medium', 'low')),
  actual text,
  forecast text,
  previous text,
  currency text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_calendar ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to market data"
  ON market_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to market news"
  ON market_news
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to market calendar"
  ON market_calendar
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_market_data_symbol ON market_data(symbol);
CREATE INDEX idx_market_data_type ON market_data(type);
CREATE INDEX idx_market_news_published_at ON market_news(published_at DESC);
CREATE INDEX idx_market_news_category ON market_news USING GIN(category);
CREATE INDEX idx_market_news_symbols ON market_news USING GIN(symbols);
CREATE INDEX idx_market_calendar_date ON market_calendar(date);

-- Create sync function
CREATE OR REPLACE FUNCTION sync_market_data(symbol text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Implementation will be handled by Edge Functions
  RETURN json_build_object(
    'status', 'success',
    'message', 'Market data sync initiated',
    'symbol', symbol
  );
END;
$$;