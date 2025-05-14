
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Search, Calendar as CalendarIcon, Bell, Filter, Clock, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// News data types
type NewsItem = {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  category: string;
  impact: string;
  url: string;
  imageUrl: string;
};

type EconomicEvent = {
  id: string;
  title: string;
  date: string;
  country: string;
  impact: "low" | "medium" | "high";
  previous: string;
  forecast: string;
  actual: string;
};

// Sample news data with actual financial news images
const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Fed Signals Potential Rate Cut in September",
    source: "Bloomberg",
    time: "2 hours ago",
    summary: "Federal Reserve officials indicated they're getting closer to cutting interest rates amid cooling inflation and a moderating labor market.",
    category: "Central Banks",
    impact: "high",
    url: "https://www.bloomberg.com",
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
    url: "https://www.ft.com",
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
    url: "https://www.reuters.com",
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
    url: "https://www.cnbc.com",
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
    url: "https://www.wsj.com",
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
    url: "https://www.nikkei.com",
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
    url: "https://www.bbc.com",
    imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/A0E0/production/_122197511_gettyimages-1356990363.jpg"
  },
];

// Economic calendar data
const economicData: EconomicEvent[] = [
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

// News sources
const newsSources = [
  { label: "All Sources", value: "all" },
  { label: "Bloomberg", value: "Bloomberg" },
  { label: "Reuters", value: "Reuters" },
  { label: "CNBC", value: "CNBC" },
  { label: "FX Street", value: "FXStreet" },
  { label: "Financial Times", value: "Financial Times" },
  { label: "Wall Street Journal", value: "Wall Street Journal" },
  { label: "Investing.com", value: "Investing.com" },
  { label: "FX Blue", value: "FXBlue" },
];

// Asset categories
const assetCategories = [
  { label: "All Categories", value: "all" },
  { label: "Forex", value: "Forex" },
  { label: "Stocks", value: "Stocks" },
  { label: "Commodities", value: "Commodities" },
  { label: "Crypto", value: "Crypto" },
  { label: "Indices", value: "Indices" },
  { label: "Bonds", value: "Bonds" },
  { label: "Central Banks", value: "Central Banks" },
  { label: "Economic Data", value: "Economic Data" },
];

// Impact levels
const impactLevels = [
  { label: "All Impacts", value: "all" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

// Countries for economic calendar
const countries = [
  { label: "All Countries", value: "all" },
  { label: "United States", value: "United States" },
  { label: "Eurozone", value: "Eurozone" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Japan", value: "Japan" },
  { label: "Australia", value: "Australia" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "Egypt", value: "Egypt" },
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter news based on search and filters
  const filteredNews = newsData.filter(item => {
    return (
      (searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSource === "all" || item.source === selectedSource) &&
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (selectedImpact === "all" || item.impact === selectedImpact)
    );
  });

  // Filter economic calendar based on selected date and country
  const filteredEconomicData = economicData.filter(item => {
    const itemDate = new Date(item.date).toDateString();
    const selectedDateStr = calendarDate ? calendarDate.toDateString() : "";
    
    return (
      (calendarDate === undefined || itemDate === selectedDateStr) &&
      (selectedCountry === "all" || item.country === selectedCountry)
    );
  });

  // Function to get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  // Function to compare actual vs forecast
  const compareValues = (actual: string, forecast: string) => {
    const actualNum = parseFloat(actual.replace('%', ''));
    const forecastNum = parseFloat(forecast.replace('%', ''));
    
    if (isNaN(actualNum) || isNaN(forecastNum)) return "";
    
    return actualNum > forecastNum ? "text-green-500" :
           actualNum < forecastNum ? "text-red-500" : "";
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Market News & Events</h1>
        <Button className="bg-metrix-blue hover:bg-blue-700 flex items-center gap-2">
          <Bell size={18} />
          <span>Setup Alerts</span>
        </Button>
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="economic">Economic Calendar</TabsTrigger>
        </TabsList>

        {/* News Tab Content */}
        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Latest Market News</CardTitle>
              <CardDescription>Stay updated with the latest financial market news</CardDescription>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search"
                    placeholder="Search news..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsSources.map(source => (
                        <SelectItem key={source.value} value={source.value}>
                          {source.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetCategories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Impact" />
                    </SelectTrigger>
                    <SelectContent>
                      {impactLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="overflow-hidden border border-gray-800 animate-pulse">
                      <div className="flex h-full">
                        <div className="w-1/3 bg-gray-800 h-[180px]"></div>
                        <div className="w-2/3 p-4">
                          <div className="h-4 bg-gray-800 rounded mb-4 w-3/4"></div>
                          <div className="h-3 bg-gray-700 rounded mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded mb-2 w-4/5"></div>
                          <div className="h-3 bg-gray-700 rounded mb-4 w-1/2"></div>
                          <div className="flex justify-between mt-4">
                            <div className="h-3 bg-gray-800 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-800 rounded w-1/5"></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredNews.length > 0 ? (
                    filteredNews.map(item => (
                      <Card key={item.id} className="overflow-hidden border border-gray-800 hover:border-metrix-blue transition-all duration-300 group">
                        <div className="flex flex-col h-full">
                          <div className="w-full h-40 relative">
                            <AspectRatio ratio={16/9} className="bg-gray-800 h-full">
                              <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </AspectRatio>
                            <div className="absolute top-2 right-2">
                              <Badge className={`${getImpactColor(item.impact)} text-white shadow-lg`}>
                                {item.impact} impact
                              </Badge>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <div className="flex justify-between text-xs">
                                <span className="font-semibold px-2 py-0.5 bg-metrix-navy/70 rounded-full text-white">
                                  {item.category}
                                </span>
                                <span className="text-white flex items-center gap-1 text-xs">
                                  <Clock className="w-3 h-3" />
                                  {item.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{item.summary}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-metrix-blue font-medium">{item.source}</span>
                              <Button variant="link" size="sm" className="text-xs p-0">
                                Read more
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="absolute inset-0"
                            aria-label={`Read more about ${item.title}`}
                          >
                            <span className="sr-only">Read more</span>
                          </a>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10 text-gray-400">
                      No news matching your search criteria
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Economic Calendar Tab Content */}
        <TabsContent value="economic" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Economic Calendar</CardTitle>
              <CardDescription>Track important economic events and releases</CardDescription>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full md:w-auto justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {calendarDate ? format(calendarDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={calendarDate}
                      onSelect={setCalendarDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Button 
                  variant="outline" 
                  onClick={() => setCalendarDate(undefined)}
                  className="w-full md:w-auto"
                >
                  Show All Dates
                </Button>
                
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-3">Date/Time</th>
                      <th className="text-left p-3">Country</th>
                      <th className="text-left p-3">Event</th>
                      <th className="text-center p-3">Impact</th>
                      <th className="text-right p-3">Previous</th>
                      <th className="text-right p-3">Forecast</th>
                      <th className="text-right p-3">Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      [1, 2, 3, 4].map(i => (
                        <tr key={i} className="border-b border-gray-800">
                          <td className="p-3"><div className="h-4 bg-gray-800 animate-pulse rounded w-20"></div></td>
                          <td className="p-3"><div className="h-4 bg-gray-800 animate-pulse rounded w-24"></div></td>
                          <td className="p-3"><div className="h-4 bg-gray-800 animate-pulse rounded w-40"></div></td>
                          <td className="p-3 text-center"><div className="h-4 bg-gray-800 animate-pulse rounded w-16 mx-auto"></div></td>
                          <td className="p-3 text-right"><div className="h-4 bg-gray-800 animate-pulse rounded w-12 ml-auto"></div></td>
                          <td className="p-3 text-right"><div className="h-4 bg-gray-800 animate-pulse rounded w-12 ml-auto"></div></td>
                          <td className="p-3 text-right"><div className="h-4 bg-gray-800 animate-pulse rounded w-12 ml-auto"></div></td>
                        </tr>
                      ))
                    ) : filteredEconomicData.length > 0 ? (
                      filteredEconomicData.map(event => (
                        <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
                          <td className="p-3">{event.date}</td>
                          <td className="p-3">{event.country}</td>
                          <td className="p-3 font-medium">{event.title}</td>
                          <td className="p-3 text-center">
                            <Badge className={getImpactColor(event.impact)}>
                              {event.impact}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">{event.previous}</td>
                          <td className="p-3 text-right">{event.forecast}</td>
                          <td className={`p-3 text-right font-medium ${compareValues(event.actual, event.forecast)}`}>
                            {event.actual}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-400">
                          No events for the selected date/country
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default News;
