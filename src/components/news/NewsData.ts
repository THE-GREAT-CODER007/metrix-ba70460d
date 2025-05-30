
import { NewsArticle, EconomicEvent } from '@/types/news';

// Sample news data with actual financial news images
export const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "Fed Signals Potential Rate Cut in September",
    source: "Bloomberg",
    time: "2 hours ago",
    summary: "Federal Reserve officials indicated they're getting closer to cutting interest rates amid cooling inflation and a moderating labor market.",
    category: "Central Banks",
    impact: "high",
    url: "https://www.bloomberg.com/news/articles/2023-07-28/fed-signals-potential-rate-cut-in-september",
    imageUrl: "https://www.investors.com/wp-content/uploads/2022/09/Stock-FederalReserve-07-shutter.jpg"
  },
  {
    id: "2",
    title: "ECB Holds Rates Steady, Hints at September Cut",
    source: "Financial Times",
    time: "5 hours ago",
    summary: "The European Central Bank left interest rates unchanged but signaled it may lower borrowing costs next month as inflation continues to ease.",
    category: "Central Banks",
    impact: "high",
    url: "https://www.ft.com/content/ecb-rates-decision",
    imageUrl: "https://www.ecb.europa.eu/shared/img/background-images/ecb-building-sunset.jpg"
  },
  {
    id: "3",
    title: "Oil Prices Rise on Middle East Tensions",
    source: "Reuters",
    time: "Yesterday",
    summary: "Oil prices climbed as geopolitical tensions in the Middle East raised concerns about potential supply disruptions.",
    category: "Commodities",
    impact: "medium",
    url: "https://www.reuters.com/business/energy/oil-prices-rise-middle-east-tensions",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9_WXV2SbQ5D6wnnYGbJ1wue4VcsqyHMtpyd7nBu_&s"
  },
  {
    id: "4",
    title: "US Dollar Weakens After Soft Employment Data",
    source: "CNBC",
    time: "2 days ago",
    summary: "The dollar fell against major currencies following weaker-than-expected U.S. jobs data, reinforcing expectations for Fed rate cuts.",
    category: "Forex",
    impact: "medium",
    url: "https://www.cnbc.com/markets/currencies",
    imageUrl: "https://fm-static.cnbc.com/awsmedia/chart/2023/10/11/image%20(20).1697044637468.jpg"
  },
  {
    id: "5",
    title: "Tech Stocks Rally on Strong Earnings",
    source: "Wall Street Journal",
    time: "3 days ago",
    summary: "Technology shares led market gains after several big tech companies reported better-than-expected quarterly results.",
    category: "Stocks",
    impact: "medium",
    url: "https://www.wsj.com/tech-stocks-rally",
    imageUrl: "https://media.marketrealist.com/brand-img/TaE_bdFRr/0x0/tech-stocks-1-1652417652453.jpg"
  },
  {
    id: "6",
    title: "Bank of Japan Adjusts Yield Curve Control",
    source: "Nikkei",
    time: "4 days ago",
    summary: "The BOJ tweaked its yield curve control policy, allowing more flexibility in bond yields amid persistent inflation pressures.",
    category: "Central Banks",
    impact: "high",
    url: "https://www.nikkei.com/article/bank-of-japan",
    imageUrl: "https://www.nippon.com/en/ncommon/contents/guide-to-japan/1437171/1437171.jpg"
  },
  {
    id: "7",
    title: "UK Inflation Drops to 2.4%, Lowest in Three Years",
    source: "BBC",
    time: "5 days ago",
    summary: "British inflation fell to its lowest level since 2021, boosting expectations for Bank of England rate cuts later this year.",
    category: "Economic Data",
    impact: "medium",
    url: "https://www.bbc.com/news/business/uk-inflation",
    imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/A0E0/production/_122197511_gettyimages-1356990363.jpg"
  },
  {
    id: "8",
    title: "Gold Hits All-Time High on Safe-Haven Demand",
    source: "MarketWatch",
    time: "1 day ago",
    summary: "Gold prices reached a new record high as investors seek safe-haven assets amid global economic uncertainty and geopolitical risks.",
    category: "Commodities",
    impact: "high",
    url: "https://www.marketwatch.com/investing/commodity/gold",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "9",
    title: "Bitcoin Surpasses $60,000 as Institutional Adoption Grows",
    source: "Investing.com",
    time: "3 hours ago",
    summary: "The world's largest cryptocurrency broke through psychological resistance as more financial institutions embrace digital assets.",
    category: "Crypto",
    impact: "high",
    url: "https://www.investing.com/crypto/bitcoin",
    imageUrl: "https://images.unsplash.com/photo-1625527575307-616f0bb84ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    id: "10",
    title: "Chinese Manufacturing PMI Shows Unexpected Contraction",
    source: "Investing.com",
    time: "6 hours ago",
    summary: "China's manufacturing activity contracted unexpectedly in July, raising concerns about the country's economic recovery.",
    category: "Economic Data",
    impact: "high",
    url: "https://www.investing.com/economic-calendar/chinese-manufacturing-pmi-753",
    imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  }
];

// Economic calendar data
export const economicData: EconomicEvent[] = [
  {
    id: "1",
    title: "US Non-Farm Payrolls",
    date: "2025-05-03",
    country: "United States",
    impact: "high",
    previous: "175K",
    forecast: "180K",
    actual: "165K"
  },
  {
    id: "2",
    title: "Eurozone CPI",
    date: "2025-05-05",
    country: "Eurozone",
    impact: "high",
    previous: "2.4%",
    forecast: "2.2%",
    actual: "2.2%"
  },
  {
    id: "3",
    title: "UK GDP",
    date: "2025-05-10",
    country: "United Kingdom",
    impact: "high",
    previous: "0.6%",
    forecast: "0.5%",
    actual: "0.7%"
  },
  {
    id: "4",
    title: "Japan Interest Rate Decision",
    date: "2025-05-15",
    country: "Japan",
    impact: "high",
    previous: "-0.1%",
    forecast: "-0.1%",
    actual: "-0.1%"
  },
  {
    id: "5",
    title: "Australia Unemployment Rate",
    date: "2025-05-18",
    country: "Australia",
    impact: "medium",
    previous: "4.0%",
    forecast: "4.1%",
    actual: "4.2%"
  },
  {
    id: "6",
    title: "Canada Retail Sales",
    date: "2025-05-20",
    country: "Canada",
    impact: "medium",
    previous: "0.8%",
    forecast: "0.5%",
    actual: "0.3%"
  },
];
