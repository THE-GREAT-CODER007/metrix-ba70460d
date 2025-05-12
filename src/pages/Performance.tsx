
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartCard from '@/components/dashboard/ChartCard';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const performanceData = [
  { name: 'Jan', value: 5.2 },
  { name: 'Feb', value: -2.1 },
  { name: 'Mar', value: 7.8 },
  { name: 'Apr', value: 3.4 },
  { name: 'May', value: -1.5 },
  { name: 'Jun', value: 4.2 },
  { name: 'Jul', value: 6.7 },
  { name: 'Aug', value: 2.3 },
];

const winRateData = [
  { name: 'Mon', value: 62 },
  { name: 'Tue', value: 58 },
  { name: 'Wed', value: 71 },
  { name: 'Thu', value: 45 },
  { name: 'Fri', value: 53 },
];

const timeData = [
  { name: '9am', value: 120 },
  { name: '10am', value: 220 },
  { name: '11am', value: 150 },
  { name: '12pm', value: 80 },
  { name: '1pm', value: 190 },
  { name: '2pm', value: 210 },
  { name: '3pm', value: 280 },
  { name: '4pm', value: 150 },
];

const Performance = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Performance Analysis</h1>
        <p className="text-gray-400 mt-2">Track and analyze your trading metrics</p>
      </div>

      <Tabs defaultValue="overall" className="mb-6">
        <TabsList>
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="strategies">By Strategy</TabsTrigger>
        </TabsList>
        <TabsContent value="overall" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-2xl font-bold text-metrix-cyan">58.3%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Profit Factor</p>
                    <p className="text-2xl font-bold text-metrix-purple">1.72</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Expectancy</p>
                    <p className="text-2xl font-bold text-metrix-blue">$127</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Avg. Return</p>
                    <p className="text-2xl font-bold text-green-500">3.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Trading Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Trades</p>
                    <p className="text-2xl font-bold">326</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Winning Trades</p>
                    <p className="text-2xl font-bold text-green-500">190</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Losing Trades</p>
                    <p className="text-2xl font-bold text-red-500">136</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Largest Win</p>
                    <p className="text-2xl font-bold text-green-500">$4,325</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard
              title="Monthly Performance (%)"
              data={performanceData}
              type="bar"
              colors={{ stroke: '#4D7CFE' }}
            />
            <ChartCard
              title="Win Rate by Day of Week (%)"
              data={winRateData}
              type="bar"
              colors={{ stroke: '#7C4DFE' }}
            />
          </div>

          <ChartCard
            title="Profit/Loss by Time of Day"
            data={timeData}
            type="area"
            colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
          />
        </TabsContent>
        <TabsContent value="monthly">
          <div className="p-4 text-center text-gray-400">
            Monthly analysis coming soon
          </div>
        </TabsContent>
        <TabsContent value="strategies">
          <div className="p-4 text-center text-gray-400">
            Strategy comparison coming soon
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Performance;
