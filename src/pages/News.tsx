
import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Loader } from "lucide-react";
import { toast } from "sonner";

// Import custom hooks
import { useNews } from '@/hooks/useNews';
import { useEconomicCalendar } from '@/hooks/useEconomicCalendar';

// Import components
import NewsCard from '@/components/news/NewsCard';
import EconomicEventRow from '@/components/news/EconomicEventRow';
import NewsFilters from '@/components/news/NewsFilters';
import EconomicCalendarFilters from '@/components/news/EconomicCalendarFilters';

// Loading skeleton component
const NewsSkeleton = () => (
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
);

const EventsSkeleton = () => (
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
        {[1, 2, 3, 4].map(i => (
          <tr key={i} className="border-b border-gray-800">
            <td className="p-3"><div className="h-4 bg-gray-800 animate-pulse rounded w-20"></div></td>
            <td className="p-3"><div className="h-4 bg-gray-800 animate-pulse rounded w-24"></div></td>
            <td className="p-3"><div className="h-4 bg-gray-800 animate-pulse rounded w-40"></div></td>
            <td className="p-3 text-center"><div className="h-4 bg-gray-800 animate-pulse rounded w-16 mx-auto"></div></td>
            <td className="p-3 text-right"><div className="h-4 bg-gray-800 animate-pulse rounded w-12 ml-auto"></div></td>
            <td className="p-3 text-right"><div className="h-4 bg-gray-800 animate-pulse rounded w-12 ml-auto"></div></td>
            <td className="p-3 text-right"><div className="h-4 bg-gray-800 animate-pulse rounded w-12 ml-auto"></div></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const News = () => {
  // Use our custom hooks
  const { 
    filteredNews, 
    isLoading: newsLoading, 
    searchQuery,
    setSearchQuery,
    selectedSource,
    setSelectedSource,
    selectedCategory,
    setSelectedCategory,
    selectedImpact,
    setSelectedImpact
  } = useNews();
  
  const { 
    filteredEvents, 
    isLoading: eventsLoading, 
    calendarDate,
    setCalendarDate,
    selectedCountry,
    setSelectedCountry
  } = useEconomicCalendar();
  
  // Setup news alerts
  const handleSetupAlerts = () => {
    toast("Alerts Setup", {
      description: "News alerts have been configured successfully",
      duration: 3000,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
                <Suspense fallback={<NewsSkeleton />}>
                  <AnimatePresence>
                    {newsLoading ? (
                      <NewsSkeleton />
                    ) : (
                      <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                      >
                        {filteredNews.length > 0 ? (
                          filteredNews.map((item, index) => (
                            <NewsCard key={item.id} item={item} index={index} />
                          ))
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="col-span-2 text-center py-10 text-gray-400"
                          >
                            No news matching your search criteria
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Suspense>
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
                <Suspense fallback={<EventsSkeleton />}>
                  {eventsLoading ? (
                    <EventsSkeleton />
                  ) : (
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
                          {filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => (
                              <EconomicEventRow key={event.id} event={event} index={index} />
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
                  )}
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default News;
