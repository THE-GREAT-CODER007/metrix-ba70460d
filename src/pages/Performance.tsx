
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChartWidget from '@/components/dashboard/widgets/AreaChartWidget';
import ChartWidget from '@/components/dashboard/widgets/ChartWidget';
import MultiLineChartWidget from '@/components/dashboard/widgets/MultiLineChartWidget';
import PieChartWidget from '@/components/dashboard/PieChartWidget';

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

const strategyComparisonData = [
  { name: 'Jan', trend: 5.2, momentum: 3.9, value: 2.7 },
  { name: 'Feb', trend: -2.1, momentum: 1.5, value: -0.8 },
  { name: 'Mar', trend: 7.8, momentum: 4.3, value: 3.2 },
  { name: 'Apr', trend: 3.4, momentum: 5.1, value: 2.9 },
  { name: 'May', trend: -1.5, momentum: -0.6, value: -2.3 },
  { name: 'Jun', trend: 4.2, momentum: 3.5, value: 1.7 },
];

const risksData = [
  { name: 'Market Risk', value: 35, color: '#4D7CFE' },
  { name: 'Volatility', value: 25, color: '#10B981' },
  { name: 'Concentration', value: 20, color: '#7C4DFE' },
  { name: 'Leverage', value: 15, color: '#F59E0B' },
  { name: 'Liquidity', value: 5, color: '#EC4899' }
];

const monthlyPerformanceByYear = [
  { name: 'Jan', y2022: 4.1, y2023: 5.2 },
  { name: 'Feb', y2022: 3.5, y2023: -2.1 },
  { name: 'Mar', y2022: -1.2, y2023: 7.8 },
  { name: 'Apr', y2022: 2.8, y2023: 3.4 },
  { name: 'May', y2022: -0.5, y2023: -1.5 },
  { name: 'Jun', y2022: 3.1, y2023: 4.2 },
  { name: 'Jul', y2022: 5.2, y2023: 6.7 },
  { name: 'Aug', y2022: 3.0, y2023: 2.3 },
  { name: 'Sep', y2022: -0.8, y2023: null },
  { name: 'Oct', y2022: 1.5, y2023: null },
  { name: 'Nov', y2022: 4.2, y2023: null },
  { name: 'Dec', y2022: 3.7, y2023: null },
];

const Performance = () => {
  const [timeRange, setTimeRange] = useState('1y');

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Performance Analysis</h1>
        <p className="text-gray-400 mt-2">Track and analyze your trading metrics</p>
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
        <Badge variant="outline" className="bg-metrix-blue/10 text-metrix-blue border-metrix-blue/40 py-1.5">
          +18.5% YTD
        </Badge>
      </div>

      <Tabs defaultValue="overall" className="mb-6">
        <TabsList>
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="strategies">By Strategy</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
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
            <AreaChartWidget
              title="Monthly Performance (%)"
              data={performanceData}
              gradientColors={{ start: '#4D7CFE', end: 'rgba(77, 124, 254, 0.1)' }}
            />
            
            <ChartWidget
              title="Win Rate by Day of Week (%)"
              data={winRateData}
              type="bar"
              colors={{ stroke: '#7C4DFE' }}
            />
          </div>

          <AreaChartWidget
            title="Profit/Loss by Time of Day"
            data={timeData}
            gradientColors={{ start: '#00E1FF', end: 'rgba(0, 225, 255, 0.1)' }}
          />
        </TabsContent>

        <TabsContent value="monthly" className="mt-4">
          <div className="mb-6">
            <MultiLineChartWidget
              title="Monthly Performance By Year (%)"
              data={monthlyPerformanceByYear}
              lines={[
                { dataKey: 'y2022', stroke: '#7C4DFE', name: '2022' },
                { dataKey: 'y2023', stroke: '#4D7CFE', name: '2023' }
              ]}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm">Best Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-500">+7.8%</p>
                <p className="text-sm text-gray-400">March 2023</p>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm">Worst Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-500">-2.1%</p>
                <p className="text-sm text-gray-400">February 2023</p>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-sm">Average Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-metrix-blue">+3.2%</p>
                <p className="text-sm text-gray-400">Since inception</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="mt-4">
          <MultiLineChartWidget
            title="Strategy Performance Comparison (%)"
            data={strategyComparisonData}
            lines={[
              { dataKey: 'trend', stroke: '#4D7CFE', name: 'Trend Following' },
              { dataKey: 'momentum', stroke: '#10B981', name: 'Momentum' },
              { dataKey: 'value', stroke: '#F59E0B', name: 'Value' }
            ]}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Trend Following</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-400">Return</p>
                    <p className="text-xl font-bold text-metrix-blue">+16.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-xl font-bold">62%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sharpe</p>
                    <p className="text-xl font-bold">1.85</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-400">Return</p>
                    <p className="text-xl font-bold text-green-500">+17.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-xl font-bold">54%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sharpe</p>
                    <p className="text-xl font-bold">1.92</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-400">Return</p>
                    <p className="text-xl font-bold text-metrix-purple">+7.4%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-xl font-bold">48%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sharpe</p>
                    <p className="text-xl font-bold">1.32</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risks" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-400">Beta</p>
                      <p className="text-xl font-bold">0.87</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Standard Deviation</p>
                      <p className="text-xl font-bold">12.4%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Sortino Ratio</p>
                      <p className="text-xl font-bold text-green-500">2.13</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Max Drawdown</p>
                      <p className="text-xl font-bold text-amber-500">14.3%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Sharpe Ratio</p>
                      <p className="text-xl font-bold text-green-500">1.87</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Value at Risk</p>
                      <p className="text-xl font-bold">$1,250</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Correlation (SPY)</p>
                      <p className="text-xl font-bold">0.65</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Recovery Factor</p>
                      <p className="text-xl font-bold">2.8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <PieChartWidget
                title="Risk Breakdown"
                data={risksData}
                className="h-full"
                innerRadius={50}
                outerRadius={90}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Drawdown Periods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Mar 2023</p>
                      <p className="text-sm text-gray-400">14 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">-14.3%</p>
                      <p className="text-sm text-gray-400">Recovered: 28 days</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Nov 2022</p>
                      <p className="text-sm text-gray-400">9 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">-9.7%</p>
                      <p className="text-sm text-gray-400">Recovered: 17 days</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Aug 2022</p>
                      <p className="text-sm text-gray-400">21 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">-12.2%</p>
                      <p className="text-sm text-gray-400">Recovered: 32 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Risk Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                    <p className="font-medium text-amber-500">Reduce sector concentration</p>
                    <p className="text-sm text-gray-300">Technology sector makes up 45% of your portfolio</p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                    <p className="font-medium text-green-500">Good position sizing</p>
                    <p className="text-sm text-gray-300">Average position is 4.2% of portfolio</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <p className="font-medium text-blue-500">Consider hedging</p>
                    <p className="text-sm text-gray-300">Market volatility is increasing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Performance;
