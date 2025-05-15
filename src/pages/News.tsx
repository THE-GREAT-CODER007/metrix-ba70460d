import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Search, ArrowRight, Clock } from "lucide-react";
import { toast } from "sonner";

// Import components
import NewsCard from '@/components/news/NewsCard';
import EconomicEventRow from '@/components/news/EconomicEventRow';
import NewsFilters from '@/components/news/NewsFilters';
import EconomicCalendarFilters from '@/components/news/EconomicCalendarFilters';
import { newsData, economicData } from '@/components/news/NewsData';

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
  
  // Setup news alerts
  const handleSetupAlerts = () => {
    toast("Alerts Setup", {
      description: "News alerts have been configured successfully",
      duration: 3000,
    });
  };

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
        <Button 
          className="bg-metrix-blue hover:bg-blue-700 flex items-center gap-2"
          onClick={handleSetupAlerts}
        >
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
              
              <NewsFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedImpact={selectedImpact}
                setSelectedImpact={setSelectedImpact}
              />
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
                      <NewsCard key={item.id} item={item} />
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
              
              <EconomicCalendarFilters 
                calendarDate={calendarDate}
                setCalendarDate={setCalendarDate}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
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
                        <EconomicEventRow key={event.id} event={event} />
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
