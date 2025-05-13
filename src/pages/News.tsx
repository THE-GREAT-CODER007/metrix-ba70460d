
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Search, Calendar, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock data for news items
const newsItems = [
  {
    id: '1',
    title: 'Fed Signals Interest Rate Cut in September',
    source: 'Financial Times',
    time: '2 hours ago',
    summary: 'Federal Reserve hints at potential interest rate cuts in September as inflation pressure eases.',
    category: 'macro',
    impact: 'high',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1170&auto=format&fit=crop',
    url: 'https://www.ft.com'
  },
  {
    id: '2',
    title: 'Apple Reports Record Q3 Earnings',
    source: 'Bloomberg',
    time: '4 hours ago',
    summary: 'Apple Inc. reported better-than-expected earnings for the third quarter, with iPhone sales up 7%.',
    category: 'earnings',
    impact: 'medium',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1021&auto=format&fit=crop',
    url: 'https://www.bloomberg.com'
  },
  {
    id: '3',
    title: 'Crude Oil Drops 2% Following OPEC Meeting',
    source: 'Reuters',
    time: '6 hours ago',
    summary: 'Crude oil prices fell after OPEC announced plans to increase production starting next month.',
    category: 'commodities',
    impact: 'high',
    url: 'https://www.reuters.com'
  },
  {
    id: '4',
    title: 'Tesla Announces New Battery Technology',
    source: 'CNBC',
    time: '10 hours ago',
    summary: 'Tesla unveils new battery technology with 30% longer range and faster charging capabilities.',
    category: 'technology',
    impact: 'medium',
    url: 'https://www.cnbc.com'
  },
  {
    id: '5',
    title: 'USD Strengthens Against Major Currencies',
    source: 'Wall Street Journal',
    time: '12 hours ago',
    summary: 'The US dollar strengthened against a basket of major currencies following strong economic data.',
    category: 'forex',
    impact: 'medium',
    url: 'https://www.wsj.com'
  }
];

// Additional sources
const additionalNews = [
  {
    id: '6',
    title: 'EUR/USD Technical Analysis: Key Resistance Levels to Watch',
    source: 'FXStreet',
    time: '3 hours ago',
    summary: 'EUR/USD faces resistance at 1.0950 with support at 1.0880. Technical indicators suggest bullish momentum may be building.',
    category: 'forex',
    impact: 'medium',
    url: 'https://www.fxstreet.com'
  },
  {
    id: '7',
    title: 'Gold Outlook: Precious Metal Set for Weekly Gains Amid Geopolitical Tensions',
    source: 'Investing.com',
    time: '5 hours ago',
    summary: 'Gold prices are headed for their third consecutive weekly gain as investors seek safe-haven assets amid rising tensions in the Middle East.',
    category: 'commodities',
    impact: 'high',
    url: 'https://www.investing.com'
  },
  {
    id: '8',
    title: 'FX Blue Analytics Shows Increased Retail Positioning in JPY Crosses',
    source: 'FX Blue',
    time: '8 hours ago',
    summary: 'Latest market sentiment data from FX Blue shows retail traders increasingly positioning for JPY weakness against major currencies.',
    category: 'forex',
    impact: 'medium',
    url: 'https://www.fxblue.com'
  }
];

// Combine all news items
const allNewsItems = [...newsItems, ...additionalNews];

// Economic calendar events
const economicEvents = [
  {
    id: '1',
    time: '08:30 EST',
    date: 'Today',
    country: 'US',
    event: 'Non-Farm Payrolls',
    actual: '223K',
    forecast: '205K',
    previous: '187K',
    impact: 'high'
  },
  {
    id: '2',
    time: '08:30 EST',
    date: 'Today',
    country: 'US',
    event: 'Unemployment Rate',
    actual: '3.8%',
    forecast: '3.9%',
    previous: '3.9%',
    impact: 'high'
  },
  {
    id: '3',
    time: '10:00 EST',
    date: 'Today',
    country: 'US',
    event: 'ISM Non-Manufacturing PMI',
    actual: '53.4',
    forecast: '52.7',
    previous: '52.6',
    impact: 'medium'
  },
  {
    id: '4',
    time: '05:00 EST',
    date: 'Tomorrow',
    country: 'EU',
    event: 'Retail Sales m/m',
    actual: '-',
    forecast: '0.2%',
    previous: '0.1%',
    impact: 'medium'
  },
  {
    id: '5',
    time: '20:30 EST',
    date: 'Tomorrow',
    country: 'AUS',
    event: 'RBA Rate Decision',
    actual: '-',
    forecast: '5.00%',
    previous: '5.00%',
    impact: 'high'
  }
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredNews = allNewsItems.filter(news => {
    // Filter by category
    const categoryMatch = activeCategory === 'all' || news.category === activeCategory;
    
    // Filter by search text
    const searchMatch = 
      news.title.toLowerCase().includes(searchText.toLowerCase()) || 
      news.summary.toLowerCase().includes(searchText.toLowerCase()) ||
      news.source.toLowerCase().includes(searchText.toLowerCase());
    
    // Filter by source
    const sourceMatch = sourceFilter === 'all' || news.source === sourceFilter;
    
    return categoryMatch && searchMatch && sourceMatch;
  });

  // Get unique sources for the filter dropdown
  const sources = ['all', ...new Set(allNewsItems.map(item => item.source))];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Market News</h1>
        <div className="flex space-x-2">
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources.map(source => (
                <SelectItem key={source} value={source}>
                  {source === 'all' ? 'All Sources' : source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search news..." 
              className="pl-8 h-9 w-64" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="macro">Macro</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="calendar">Economic Calendar</TabsTrigger>
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-4">
          <Card className="bg-metrix-card border-gray-800 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Economic Calendar</CardTitle>
              <CardDescription>Important economic releases and events</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {economicEvents.map(event => (
                    <Card key={event.id} className="bg-metrix-navy border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{event.country}</span>
                              <span className="text-sm text-gray-400">{event.date} {event.time}</span>
                            </div>
                            <h3 className="font-bold text-lg">{event.event}</h3>
                          </div>
                          <Badge 
                            className={event.impact === 'high' ? 'bg-red-600/20 text-red-400' : 
                                   event.impact === 'medium' ? 'bg-amber-600/20 text-amber-400' : 
                                   'bg-blue-600/20 text-blue-400'}
                          >
                            {event.impact} impact
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                          <div>
                            <div className="text-gray-400">Actual</div>
                            <div className={`font-bold ${event.actual === '-' ? 'text-gray-500' : 'text-green-400'}`}>{event.actual}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Forecast</div>
                            <div className="font-bold">{event.forecast}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Previous</div>
                            <div className="font-bold">{event.previous}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="watchlist">
          <div className="p-4 text-center text-gray-400">
            No watchlist items configured
          </div>
        </TabsContent>
        
        {/* This TabsContent handles all news categories */}
        {['all', 'macro', 'earnings', 'forex', 'commodities', 'technology'].includes(activeCategory) && (
          <TabsContent value={activeCategory} className="mt-4">
            <Card className="bg-metrix-card border-gray-800 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {activeCategory === 'all' 
                    ? 'Latest Market News' 
                    : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredNews.length > 0 ? filteredNews.map(news => (
                      <Card key={news.id} className="bg-metrix-navy border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-metrix-blue/5 transition-all">
                        <CardContent className="p-0">
                          {news.image && (
                            <div className="aspect-w-16 aspect-h-9">
                              <AspectRatio ratio={16/9}>
                                <img src={news.image} alt={news.title} className="object-cover w-full" />
                              </AspectRatio>
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">{news.title}</h3>
                              <Badge 
                                className={news.impact === 'high' ? 'bg-red-600/20 text-red-400' : 
                                      news.impact === 'medium' ? 'bg-amber-600/20 text-amber-400' : 
                                      'bg-blue-600/20 text-blue-400'}
                              >
                                {news.impact} impact
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300">{news.summary}</p>
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2">
                                  {news.category}
                                </Badge>
                                <span className="text-xs text-gray-400">
                                  {news.source} • {news.time}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                  Read More <ExternalLink size={12} />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )) : (
                      <div className="col-span-2 p-10 text-center text-gray-400">
                        No news found matching your criteria
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* News sources section */}
      <Card className="bg-metrix-card border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Featured News Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
              { name: 'Reuters', url: 'https://www.reuters.com' },
              { name: 'Financial Times', url: 'https://www.ft.com' },
              { name: 'Wall Street Journal', url: 'https://www.wsj.com' },
              { name: 'CNBC', url: 'https://www.cnbc.com' },
              { name: 'FXStreet', url: 'https://www.fxstreet.com' },
              { name: 'Investing.com', url: 'https://www.investing.com' },
              { name: 'FX Blue', url: 'https://www.fxblue.com' },
              { name: 'ForexLive', url: 'https://www.forexlive.com' },
              { name: 'DailyFX', url: 'https://www.dailyfx.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatch.com' },
              { name: 'TradingView', url: 'https://www.tradingview.com' },
            ].map(source => (
              <a 
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-metrix-navy border border-gray-800 rounded-md p-3 text-center hover:border-metrix-blue transition-colors"
              >
                {source.name}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default News;
