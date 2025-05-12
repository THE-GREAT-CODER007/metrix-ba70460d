
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import AreaChartWidget from '@/components/dashboard/widgets/AreaChartWidget';
import ChartWidget from '@/components/dashboard/widgets/ChartWidget';
import MultiLineChartWidget from '@/components/dashboard/widgets/MultiLineChartWidget';
import HeatmapWidget from '@/components/dashboard/widgets/HeatmapWidget';
import PieChartWidget from '@/components/dashboard/PieChartWidget';

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

const correlationData = [
  { name: 'SPY', value: 0.65, color: '#4D7CFE' },
  { name: 'QQQ', value: 0.72, color: '#7C4DFE' },
  { name: 'IWM', value: 0.48, color: '#10B981' },
  { name: 'GLD', value: -0.25, color: '#F59E0B' },
  { name: 'TLT', value: -0.42, color: '#EC4899' }
];

const sentimentData = [
  { name: 'Jan', positive: 65, negative: 35, neutral: 15 },
  { name: 'Feb', positive: 50, negative: 45, neutral: 20 },
  { name: 'Mar', positive: 70, negative: 20, neutral: 10 },
  { name: 'Apr', positive: 60, negative: 30, neutral: 25 },
  { name: 'May', positive: 45, negative: 50, neutral: 15 },
  { name: 'Jun', positive: 55, negative: 35, neutral: 20 },
];

const performanceByWeekdayHour = [
  { day: 'Mon', hour: '9am', value: 0.8 },
  { day: 'Mon', hour: '10am', value: 1.2 },
  { day: 'Mon', hour: '11am', value: -0.5 },
  { day: 'Mon', hour: '12pm', value: -0.1 },
  { day: 'Mon', hour: '1pm', value: 0.3 },
  { day: 'Mon', hour: '2pm', value: 0.7 },
  { day: 'Mon', hour: '3pm', value: 1.5 },
  { day: 'Mon', hour: '4pm', value: 0.9 },
  
  { day: 'Tue', hour: '9am', value: 0.6 },
  { day: 'Tue', hour: '10am', value: 1.0 },
  { day: 'Tue', hour: '11am', value: 1.5 },
  { day: 'Tue', hour: '12pm', value: 0.4 },
  { day: 'Tue', hour: '1pm', value: 0.2 },
  { day: 'Tue', hour: '2pm', value: 0.9 },
  { day: 'Tue', hour: '3pm', value: 1.7 },
  { day: 'Tue', hour: '4pm', value: 1.1 },
  
  { day: 'Wed', hour: '9am', value: 0.4 },
  { day: 'Wed', hour: '10am', value: 0.9 },
  { day: 'Wed', hour: '11am', value: 1.2 },
  { day: 'Wed', hour: '12pm', value: 0.5 },
  { day: 'Wed', hour: '1pm', value: 0.3 },
  { day: 'Wed', hour: '2pm', value: 1.2 },
  { day: 'Wed', hour: '3pm', value: 1.5 },
  { day: 'Wed', hour: '4pm', value: 0.7 },
  
  { day: 'Thu', hour: '9am', value: 0.7 },
  { day: 'Thu', hour: '10am', value: 1.6 },
  { day: 'Thu', hour: '11am', value: 0.9 },
  { day: 'Thu', hour: '12pm', value: 0.3 },
  { day: 'Thu', hour: '1pm', value: 0.6 },
  { day: 'Thu', hour: '2pm', value: 0.8 },
  { day: 'Thu', hour: '3pm', value: 1.0 },
  { day: 'Thu', hour: '4pm', value: 1.4 },
  
  { day: 'Fri', hour: '9am', value: 0.5 },
  { day: 'Fri', hour: '10am', value: 1.1 },
  { day: 'Fri', hour: '11am', value: 0.7 },
  { day: 'Fri', hour: '12pm', value: 0.2 },
  { day: 'Fri', hour: '1pm', value: 0.8 },
  { day: 'Fri', hour: '2pm', value: 1.3 },
  { day: 'Fri', hour: '3pm', value: 1.8 },
  { day: 'Fri', hour: '4pm', value: 0.9 },
];

const performanceHeatmapColorRanges = [
  { min: -1.0, max: -0.1, color: '#EF4444' },
  { min: 0.0, max: 0.5, color: '#4D7CFE' },
  { min: 0.6, max: 1.0, color: '#8B5CF6' },
  { min: 1.1, max: 2.0, color: '#10B981' }
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Advanced Analytics</h1>
        <p className="text-gray-400 mt-2">Deep insights into your trading patterns and performance</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
          <TabsList>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
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
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-4">
          <AreaChartWidget
            title="Monthly Performance (%)"
            data={monthlyPerformance}
            gradientColors={{ start: '#4D7CFE', end: 'rgba(77, 124, 254, 0.1)' }}
          />
        </TabsContent>
        <TabsContent value="timing" className="mt-4">
          <div className="mb-6">
            <AreaChartWidget
              title="Performance by Time of Day (%)"
              data={hourlyPerformance}
              gradientColors={{ start: '#00E1FF', end: 'rgba(0, 225, 255, 0.1)' }}
            />
          </div>
          <HeatmapWidget
            title="Performance Heatmap by Day/Hour (%)"
            data={performanceByWeekdayHour}
            colorRanges={performanceHeatmapColorRanges}
          />
        </TabsContent>
        <TabsContent value="assets" className="mt-4">
          <ChartWidget
            title="Performance by Asset (%)"
            data={assetPerformance}
            type="bar"
            colors={{ stroke: '#7C4DFE' }}
          />
        </TabsContent>
        <TabsContent value="correlations" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChartWidget
              title="Asset Correlations"
              data={correlationData}
              innerRadius={60}
            />
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">SPY (S&P 500)</span>
                      <span className="font-medium">0.65</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">QQQ (NASDAQ)</span>
                      <span className="font-medium">0.72</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">IWM (Russell 2000)</span>
                      <span className="font-medium">0.48</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">GLD (Gold)</span>
                      <span className="font-medium">-0.25</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%', marginLeft: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">TLT (Bonds)</span>
                      <span className="font-medium">-0.42</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '42%', marginLeft: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sentiment" className="mt-4">
          <MultiLineChartWidget
            title="Market Sentiment Analysis"
            data={sentimentData}
            lines={[
              { dataKey: 'positive', stroke: '#10B981', name: 'Positive' },
              { dataKey: 'negative', stroke: '#EF4444', name: 'Negative' },
              { dataKey: 'neutral', stroke: '#9CA3AF', name: 'Neutral' }
            ]}
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
              <div className="flex justify-between">
                <span className="text-gray-400">Calmar Ratio</span>
                <span>1.91</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Upside Capture</span>
                <span>82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Downside Capture</span>
                <span>65%</span>
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
              <div className="flex justify-between">
                <span className="text-gray-400">Risk Consistency</span>
                <span className="text-green-500">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">FOMO Factor</span>
                <span className="text-amber-500">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Decision Quality</span>
                <span className="text-green-500">Above Average</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
