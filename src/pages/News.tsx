
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const newsItems = [
  {
    id: '1',
    title: 'Fed Signals Interest Rate Cut in September',
    source: 'Financial Times',
    time: '2 hours ago',
    summary: 'Federal Reserve hints at potential interest rate cuts in September as inflation pressure eases.',
    category: 'macro',
    impact: 'high'
  },
  {
    id: '2',
    title: 'Apple Reports Record Q3 Earnings',
    source: 'Bloomberg',
    time: '4 hours ago',
    summary: 'Apple Inc. reported better-than-expected earnings for the third quarter, with iPhone sales up 7%.',
    category: 'earnings',
    impact: 'medium'
  },
  {
    id: '3',
    title: 'Crude Oil Drops 2% Following OPEC Meeting',
    source: 'Reuters',
    time: '6 hours ago',
    summary: 'Crude oil prices fell after OPEC announced plans to increase production starting next month.',
    category: 'commodities',
    impact: 'high'
  },
  {
    id: '4',
    title: 'Tesla Announces New Battery Technology',
    source: 'CNBC',
    time: '10 hours ago',
    summary: 'Tesla unveils new battery technology with 30% longer range and faster charging capabilities.',
    category: 'technology',
    impact: 'medium'
  },
  {
    id: '5',
    title: 'USD Strengthens Against Major Currencies',
    source: 'Wall Street Journal',
    time: '12 hours ago',
    summary: 'The US dollar strengthened against a basket of major currencies following strong economic data.',
    category: 'forex',
    impact: 'medium'
  }
];

const News = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Market News</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search news..." className="pl-8 h-9 w-64" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="macro">Macro</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card className="bg-metrix-card border-gray-800 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Latest Market News</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {newsItems.map(news => (
                    <Card key={news.id} className="bg-metrix-navy border-gray-800">
                      <CardContent className="p-4">
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
                          <Button variant="ghost" size="sm">Read More</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="macro">
          <div className="p-4 text-center text-gray-400">
            Displaying macro economic news
          </div>
        </TabsContent>
        <TabsContent value="earnings">
          <div className="p-4 text-center text-gray-400">
            Displaying earnings news
          </div>
        </TabsContent>
        <TabsContent value="technology">
          <div className="p-4 text-center text-gray-400">
            Displaying technology news
          </div>
        </TabsContent>
        <TabsContent value="watchlist">
          <div className="p-4 text-center text-gray-400">
            No watchlist items configured
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default News;
