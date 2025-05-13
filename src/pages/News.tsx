
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
import { Search, Calendar as CalendarIcon, Bell, Filter } from "lucide-react";

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
  imageUrl?: string; // Changed from image to imageUrl to fix the error
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

// Sample news data
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
    imageUrl: "/placeholder.svg"
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
    imageUrl: "/placeholder.svg"
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
    imageUrl: "/placeholder.svg"
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
    imageUrl: "/placeholder.svg"
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
    imageUrl: "/placeholder.svg"
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
    imageUrl: "/placeholder.svg"
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
    imageUrl: "/placeholder.svg"
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
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [selectedCountry, setSelectedCountry] = useState("all");

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredNews.length > 0 ? (
                  filteredNews.map(item => (
                    <Card key={item.id} className="overflow-hidden border border-gray-800 hover:border-metrix-blue transition-all">
                      <div className="flex h-full">
                        {item.imageUrl && (
                          <div className="w-1/4 bg-gray-800 flex-shrink-0">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className={item.imageUrl ? "w-3/4 p-4" : "w-full p-4"}>
                          <div className="flex justify-between items-start mb-2">
                            <Badge 
                              className={
                                item.impact === "high" ? "bg-red-500" : 
                                item.impact === "medium" ? "bg-yellow-500" : "bg-green-500"
                              }
                            >
                              {item.impact} impact
                            </Badge>
                            <span className="text-xs text-gray-400">{item.time}</span>
                          </div>
                          <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-gray-400 mb-2 line-clamp-2">{item.summary}</p>
                          <div className="flex justify-between items-center mt-auto">
                            <span className="text-xs font-medium bg-gray-800 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                            <span className="text-xs text-metrix-blue">{item.source}</span>
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
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10 text-gray-400">
                    No news matching your search criteria
                  </div>
                )}
              </div>
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
                    {filteredEconomicData.length > 0 ? (
                      filteredEconomicData.map(event => (
                        <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-900/40">
                          <td className="p-3">{event.date}</td>
                          <td className="p-3">{event.country}</td>
                          <td className="p-3 font-medium">{event.title}</td>
                          <td className="p-3 text-center">
                            <Badge 
                              className={
                                event.impact === "high" ? "bg-red-500" : 
                                event.impact === "medium" ? "bg-yellow-500" : "bg-green-500"
                              }
                            >
                              {event.impact}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">{event.previous}</td>
                          <td className="p-3 text-right">{event.forecast}</td>
                          <td className={`p-3 text-right font-medium ${
                            event.actual > event.forecast ? "text-green-500" :
                            event.actual < event.forecast ? "text-red-500" : ""
                          }`}>
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
