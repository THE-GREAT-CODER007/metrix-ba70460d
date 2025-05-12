
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Filter, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const journalEntries = [
  {
    id: '1',
    date: '2023-05-12',
    title: 'AAPL Earnings Play',
    content: 'Entered a position ahead of earnings announcement based on positive sector performance.',
    tags: ['earnings', 'tech', 'long'],
    mood: 'confident'
  },
  {
    id: '2',
    date: '2023-05-10',
    title: 'SPY Pullback Strategy',
    content: 'Market showing signs of pullback. Implementing hedging strategy to protect portfolio.',
    tags: ['market', 'hedge', 'short'],
    mood: 'cautious'
  },
  {
    id: '3',
    date: '2023-05-08',
    title: 'TSLA Technical Analysis',
    content: 'TSLA forming a double bottom pattern. Looking for entry points if support holds.',
    tags: ['technical', 'patterns', 'watchlist'],
    mood: 'neutral'
  }
];

const Journal = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Journal</h1>
        <Button className="bg-metrix-blue hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Button variant="outline" size="sm" className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" /> Date Range
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search journal entries..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Entries</TabsTrigger>
          <TabsTrigger value="ideas">Trade Ideas</TabsTrigger>
          <TabsTrigger value="lessons">Lessons Learned</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            {journalEntries.map(entry => (
              <Card key={entry.id} className="bg-metrix-card border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-400">{entry.date}</div>
                      <CardTitle className="mt-1">{entry.title}</CardTitle>
                    </div>
                    <Badge 
                      className={entry.mood === 'confident' ? 'bg-green-600/20 text-green-400' : 
                               entry.mood === 'cautious' ? 'bg-amber-600/20 text-amber-400' : 
                               'bg-blue-600/20 text-blue-400'}
                    >
                      {entry.mood}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">{entry.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ideas">
          <div className="p-4 text-center text-gray-400">
            No trade ideas to display
          </div>
        </TabsContent>
        <TabsContent value="lessons">
          <div className="p-4 text-center text-gray-400">
            No lessons learned entries
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Journal;
