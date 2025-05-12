
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const strategies = [
  {
    id: '1',
    name: 'Momentum Breakout',
    type: 'Momentum',
    winRate: 62,
    description: 'Buy breakouts above key resistance levels with increased volume.',
    status: 'active',
  },
  {
    id: '2',
    name: 'Swing Trading',
    type: 'Trend Following',
    winRate: 57,
    description: 'Hold positions for several days to profit from expected upward or downward market moves.',
    status: 'active',
  },
  {
    id: '3',
    name: 'Gap and Go',
    type: 'Momentum',
    winRate: 54,
    description: 'Enter trades in the direction of the gap with target at previous day levels.',
    status: 'testing',
  }
];

const Strategy = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Strategies</h1>
        <Button className="bg-metrix-blue hover:bg-blue-700">
          Create Strategy
        </Button>
      </div>

      <Tabs defaultValue="active" className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            {strategies.filter(s => s.status === 'active').map(strategy => (
              <Card key={strategy.id} className="bg-metrix-card border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{strategy.name}</CardTitle>
                    <Badge>{strategy.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">{strategy.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-400">Win Rate:</span>
                      <span className="ml-2 font-bold text-metrix-cyan">{strategy.winRate}%</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="testing" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            {strategies.filter(s => s.status === 'testing').map(strategy => (
              <Card key={strategy.id} className="bg-metrix-card border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{strategy.name}</CardTitle>
                    <Badge variant="secondary">{strategy.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">{strategy.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-400">Win Rate:</span>
                      <span className="ml-2 font-bold text-metrix-cyan">{strategy.winRate}%</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived">
          <div className="p-4 text-center text-gray-400">
            No archived strategies
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Strategy;
