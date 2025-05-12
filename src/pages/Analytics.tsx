
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const monthlyPerformance = [
  { name: 'Jan', value: 5.2 },
  { name: 'Feb', value: -2.1 },
  { name: 'Mar', value: 7.8 },
  { name: 'Apr', value: 3.4 },
  { name: 'May', value: -1.5 },
  { name: 'Jun', value: 4.2 },
  { name: 'Jul', value: 6.7 },
  { name: 'Aug', value: 2.3 },
];

const hourlyPerformance = [
  { name: '9am', value: 1.2 },
  { name: '10am', value: 2.3 },
  { name: '11am', value: -0.8 },
  { name: '12pm', value: -1.5 },
  { name: '1pm', value: 0.7 },
  { name: '2pm', value: 1.9 },
  { name: '3pm', value: 2.8 },
  { name: '4pm', value: 1.2 },
];

const assetPerformance = [
  { name: 'AAPL', value: 7.8 },
  { name: 'MSFT', value: 4.3 },
  { name: 'AMZN', value: -2.1 },
  { name: 'GOOG', value: 3.5 },
  { name: 'META', value: -1.8 },
  { name: 'TSLA', value: 9.7 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Advanced Analytics</h1>
        <p className="text-gray-400 mt-2">Deep insights into your trading patterns and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-metrix-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Annual Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold">23.7%</span>
              <span className="ml-2 flex items-center text-green-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" /> 4.2%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-metrix-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Sharpe Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold">1.87</span>
              <span className="ml-2 flex items-center text-green-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" /> 0.23
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-metrix-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Maximum Drawdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-3xl font-bold">12.4%</span>
              <span className="ml-2 flex items-center text-red-500">
                <ArrowDownIcon className="h-4 w-4 mr-1" /> 3.1%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="mb-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-4">
          <ChartCard
            title="Monthly Performance (%)"
            data={monthlyPerformance}
            type="bar"
            colors={{ stroke: '#4D7CFE' }}
          />
        </TabsContent>
        <TabsContent value="timing" className="mt-4">
          <ChartCard
            title="Performance by Time of Day (%)"
            data={hourlyPerformance}
            type="area"
            colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
          />
        </TabsContent>
        <TabsContent value="assets" className="mt-4">
          <ChartCard
            title="Performance by Asset (%)"
            data={assetPerformance}
            type="bar"
            colors={{ stroke: '#7C4DFE' }}
          />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-metrix-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Beta</span>
                <span>0.87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Standard Deviation</span>
                <span>12.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sortino Ratio</span>
                <span>2.13</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Value at Risk (95%)</span>
                <span>$1,250</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-metrix-card border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Behavioral Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Hold Time (Winners)</span>
                <span>3.2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Hold Time (Losers)</span>
                <span>5.7 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Revenge Trading Score</span>
                <span className="text-amber-500">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Emotional Trading Index</span>
                <span className="text-green-500">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
