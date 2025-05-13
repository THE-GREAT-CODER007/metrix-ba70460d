
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  CircleDot,
  Copy,
  Dna,
  LineChart,
  Puzzle,
  Settings,
  Sliders,
  TrendingUp
} from "lucide-react";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  BarChart,
  Bar
} from "recharts";

// Strategy types
interface Strategy {
  id: string;
  name: string;
  type: string;
  winRate: number;
  description: string;
  status: 'active' | 'testing' | 'archived';
  parameters?: Record<string, any>;
  performance?: any[];
  alerts?: Alert[];
  backtest?: BacktestResult;
  optimization?: OptimizationResult;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface BacktestResult {
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  expectancy: number;
  data: any[];
}

interface OptimizationResult {
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  iterations: number;
  bestParams: Record<string, any>;
  results: OptimizationIteration[];
}

interface OptimizationIteration {
  id: number;
  params: Record<string, any>;
  performance: {
    profitFactor: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}

// Sample data
const strategies: Strategy[] = [
  {
    id: '1',
    name: 'Momentum Breakout',
    type: 'Momentum',
    winRate: 62,
    description: 'Buy breakouts above key resistance levels with increased volume.',
    status: 'active',
    parameters: {
      timeframe: 'H4',
      entryThreshold: 0.5,
      exitThreshold: 0.3,
      stopLoss: 2.5,
      takeProfit: 5.0,
      maxOpenTrades: 3,
      useTrailingStop: true,
      trailingStopDistance: 1.5
    },
    performance: [
      { month: 'Jan', pnl: 3.2 },
      { month: 'Feb', pnl: -1.4 },
      { month: 'Mar', pnl: 5.7 },
      { month: 'Apr', pnl: 2.8 },
      { month: 'May', pnl: -0.9 },
      { month: 'Jun', pnl: 4.3 },
    ],
    alerts: [
      { 
        id: 'a1', 
        type: 'warning', 
        message: 'Drawdown threshold of 5% reached', 
        timestamp: '2025-05-12T15:23:00Z',
        isRead: false
      },
      { 
        id: 'a2', 
        type: 'success', 
        message: 'Performance target achieved', 
        timestamp: '2025-05-10T09:15:00Z',
        isRead: true
      }
    ],
    backtest: {
      profitFactor: 1.75,
      sharpeRatio: 1.32,
      maxDrawdown: 8.7,
      totalTrades: 245,
      winningTrades: 152,
      losingTrades: 93,
      expectancy: 0.87,
      data: [
        { trade: 1, equity: 10000, pnl: 0 },
        { trade: 10, equity: 10450, pnl: 450 },
        { trade: 20, equity: 10780, pnl: 780 },
        { trade: 30, equity: 11120, pnl: 1120 },
        { trade: 40, equity: 10890, pnl: 890 },
        { trade: 50, equity: 11340, pnl: 1340 },
        { trade: 60, equity: 11680, pnl: 1680 },
        { trade: 70, equity: 12100, pnl: 2100 },
        { trade: 80, equity: 11860, pnl: 1860 },
        { trade: 90, equity: 12250, pnl: 2250 },
        { trade: 100, equity: 12680, pnl: 2680 }
      ]
    },
    optimization: {
      status: 'completed',
      progress: 100,
      iterations: 500,
      bestParams: {
        entryThreshold: 0.65,
        exitThreshold: 0.25,
        stopLoss: 2.8,
        takeProfit: 5.5
      },
      results: [
        {
          id: 1,
          params: { entryThreshold: 0.5, stopLoss: 2.5, takeProfit: 5.0 },
          performance: { profitFactor: 1.65, sharpeRatio: 1.25, maxDrawdown: 9.2 }
        },
        {
          id: 2,
          params: { entryThreshold: 0.55, stopLoss: 2.6, takeProfit: 5.2 },
          performance: { profitFactor: 1.68, sharpeRatio: 1.27, maxDrawdown: 9.0 }
        },
        {
          id: 3,
          params: { entryThreshold: 0.6, stopLoss: 2.7, takeProfit: 5.3 },
          performance: { profitFactor: 1.72, sharpeRatio: 1.29, maxDrawdown: 8.8 }
        },
        {
          id: 4,
          params: { entryThreshold: 0.65, stopLoss: 2.8, takeProfit: 5.5 },
          performance: { profitFactor: 1.75, sharpeRatio: 1.32, maxDrawdown: 8.7 }
        },
        {
          id: 5,
          params: { entryThreshold: 0.7, stopLoss: 2.9, takeProfit: 5.7 },
          performance: { profitFactor: 1.73, sharpeRatio: 1.30, maxDrawdown: 8.9 }
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Swing Trading',
    type: 'Trend Following',
    winRate: 57,
    description: 'Hold positions for several days to profit from expected upward or downward market moves.',
    status: 'active',
    parameters: {
      timeframe: 'D1',
      entryThreshold: 0.6,
      exitThreshold: 0.4,
      stopLoss: 3.0,
      takeProfit: 7.0,
      maxOpenTrades: 2,
      useTrailingStop: true,
      trailingStopDistance: 2.0
    },
    performance: [
      { month: 'Jan', pnl: 2.7 },
      { month: 'Feb', pnl: 3.5 },
      { month: 'Mar', pnl: -0.8 },
      { month: 'Apr', pnl: 4.2 },
      { month: 'May', pnl: 2.1 },
      { month: 'Jun', pnl: -1.2 },
    ],
    alerts: [
      { 
        id: 'a3', 
        type: 'info', 
        message: 'New setup detected for EUR/USD', 
        timestamp: '2025-05-13T08:45:00Z',
        isRead: false
      }
    ],
    backtest: {
      profitFactor: 1.68,
      sharpeRatio: 1.25,
      maxDrawdown: 9.8,
      totalTrades: 187,
      winningTrades: 107,
      losingTrades: 80,
      expectancy: 0.76,
      data: [
        { trade: 1, equity: 10000, pnl: 0 },
        { trade: 10, equity: 10320, pnl: 320 },
        { trade: 20, equity: 10850, pnl: 850 },
        { trade: 30, equity: 11270, pnl: 1270 },
        { trade: 40, equity: 11020, pnl: 1020 },
        { trade: 50, equity: 11490, pnl: 1490 },
        { trade: 60, equity: 12010, pnl: 2010 },
        { trade: 70, equity: 11760, pnl: 1760 },
        { trade: 80, equity: 12240, pnl: 2240 },
        { trade: 90, equity: 12580, pnl: 2580 },
        { trade: 100, equity: 12970, pnl: 2970 }
      ]
    }
  },
  {
    id: '3',
    name: 'Gap and Go',
    type: 'Momentum',
    winRate: 54,
    description: 'Enter trades in the direction of the gap with target at previous day levels.',
    status: 'testing',
    parameters: {
      timeframe: 'H1',
      gapThreshold: 0.4,
      entryDelay: 15,
      stopLoss: 1.8,
      takeProfit: 3.5,
      maxOpenTrades: 2,
      useTrailingStop: false
    },
    performance: [
      { month: 'Jan', pnl: 1.8 },
      { month: 'Feb', pnl: -0.7 },
      { month: 'Mar', pnl: 2.9 },
      { month: 'Apr', pnl: 1.5 },
      { month: 'May', pnl: -1.2 },
      { month: 'Jun', pnl: 2.4 },
    ],
    optimization: {
      status: 'in_progress',
      progress: 68,
      iterations: 320,
      bestParams: {
        gapThreshold: 0.45,
        entryDelay: 12,
        stopLoss: 1.9
      },
      results: [
        {
          id: 1,
          params: { gapThreshold: 0.4, entryDelay: 15, stopLoss: 1.8 },
          performance: { profitFactor: 1.48, sharpeRatio: 1.1, maxDrawdown: 10.5 }
        },
        {
          id: 2,
          params: { gapThreshold: 0.45, entryDelay: 12, stopLoss: 1.9 },
          performance: { profitFactor: 1.53, sharpeRatio: 1.15, maxDrawdown: 10.2 }
        },
      ]
    }
  }
];

const strategyTypes = [
  { value: 'momentum', label: 'Momentum' },
  { value: 'trend-following', label: 'Trend Following' },
  { value: 'mean-reversion', label: 'Mean Reversion' },
  { value: 'breakout', label: 'Breakout' },
  { value: 'pattern-based', label: 'Pattern Based' },
  { value: 'statistical-arbitrage', label: 'Statistical Arbitrage' },
  { value: 'news-based', label: 'News Based' },
  { value: 'volume-based', label: 'Volume Based' },
  { value: 'volatility-based', label: 'Volatility Based' },
];

const timeframes = [
  { value: 'M1', label: '1 Minute' },
  { value: 'M5', label: '5 Minutes' },
  { value: 'M15', label: '15 Minutes' },
  { value: 'M30', label: '30 Minutes' },
  { value: 'H1', label: '1 Hour' },
  { value: 'H4', label: '4 Hours' },
  { value: 'D1', label: 'Daily' },
  { value: 'W1', label: 'Weekly' },
];

const markets = [
  { value: 'forex', label: 'Forex' },
  { value: 'stocks', label: 'Stocks' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'commodities', label: 'Commodities' },
  { value: 'indices', label: 'Indices' },
  { value: 'futures', label: 'Futures' },
];

const Strategy = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showOptimizationDialog, setShowOptimizationDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  
  // New strategy form state
  const [newStrategy, setNewStrategy] = useState({
    name: '',
    type: '',
    description: '',
    timeframe: '',
    market: '',
    entryThreshold: 0.5,
    exitThreshold: 0.3,
    stopLoss: 2.0,
    takeProfit: 4.0,
    maxOpenTrades: 2,
    useTrailingStop: true,
    trailingStopDistance: 1.5,
  });
  
  // Optimization form state
  const [optimizationParams, setOptimizationParams] = useState({
    iterations: 500,
    populationSize: 50,
    mutationRate: 0.05,
    crossoverRate: 0.8,
    objectives: ['profit', 'drawdown', 'sharpe'],
    optimizeParams: ['entryThreshold', 'exitThreshold', 'stopLoss', 'takeProfit'],
  });

  // Alert settings form state
  const [alertSettings, setAlertSettings] = useState({
    profitTarget: 5.0,
    drawdownThreshold: 5.0,
    consecutiveLosses: 3,
    winRateThreshold: 50,
    profitFactorThreshold: 1.5,
    notifyEmail: true,
    notifyPush: true,
  });

  const handleCreateStrategy = () => {
    console.log("Creating new strategy:", newStrategy);
    setShowCreateDialog(false);
    // In a real app, you would add the strategy to the database here
  };

  const handleStartOptimization = () => {
    console.log("Starting optimization with params:", optimizationParams);
    console.log("For strategy:", selectedStrategy?.name);
    setShowOptimizationDialog(false);
    // In a real app, you would start the optimization process here
  };

  const handleSaveAlerts = () => {
    console.log("Saving alert settings:", alertSettings);
    console.log("For strategy:", selectedStrategy?.name);
    setShowAlertDialog(false);
    // In a real app, you would save the alert settings here
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedStrategy(null);
  };

  const handleViewStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleBackToList = () => {
    setSelectedStrategy(null);
  };

  return (
    <DashboardLayout>
      {!selectedStrategy ? (
        // Strategy List View
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Trading Strategies</h1>
            <Button 
              className="bg-metrix-blue hover:bg-blue-700"
              onClick={() => setShowCreateDialog(true)}
            >
              Create Strategy
            </Button>
          </div>

          <Tabs defaultValue="active" className="mb-6" onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <div className="grid grid-cols-1 gap-6">
                {strategies.filter(s => s.status === 'active').map(strategy => (
                  <Card key={strategy.id} className="bg-metrix-card border-gray-800 hover:border-metrix-blue transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{strategy.name}</CardTitle>
                        <Badge>{strategy.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">{strategy.description}</p>
                      
                      {/* Performance mini-chart */}
                      <div className="h-24 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={strategy.performance}>
                            <Line 
                              type="monotone" 
                              dataKey="pnl" 
                              stroke="#3b82f6" 
                              strokeWidth={2} 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-400">Win Rate:</span>
                          <span className="ml-2 font-bold text-metrix-cyan">{strategy.winRate}%</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewStrategy(strategy)}
                          >
                            View Details
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
                  <Card key={strategy.id} className="bg-metrix-card border-gray-800 hover:border-metrix-blue transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{strategy.name}</CardTitle>
                        <Badge variant="secondary">{strategy.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">{strategy.description}</p>
                      
                      {/* Performance mini-chart */}
                      <div className="h-24 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={strategy.performance}>
                            <Line 
                              type="monotone" 
                              dataKey="pnl" 
                              stroke="#3b82f6" 
                              strokeWidth={2} 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {strategy.optimization && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Optimization: {strategy.optimization.progress}%</span>
                            <span>{strategy.optimization.iterations} iterations</span>
                          </div>
                          <Progress value={strategy.optimization.progress} className="h-1.5" />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-400">Win Rate:</span>
                          <span className="ml-2 font-bold text-metrix-cyan">{strategy.winRate}%</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewStrategy(strategy)}
                          >
                            View Details
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
        </>
      ) : (
        // Strategy Detail View
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleBackToList}
              >
                Back
              </Button>
              <h1 className="text-3xl font-bold">{selectedStrategy.name}</h1>
              <Badge className="ml-2">{selectedStrategy.type}</Badge>
              <Badge variant={selectedStrategy.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                {selectedStrategy.status.charAt(0).toUpperCase() + selectedStrategy.status.slice(1)}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAlertDialog(true)}
              >
                <Bell size={16} className="mr-1" />
                Alerts
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setShowOptimizationDialog(true)}
              >
                <Dna size={16} className="mr-1" />
                Optimize
              </Button>
              <Button size="sm">
                <Settings size={16} className="mr-1" />
                Edit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Strategy Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-400">{selectedStrategy.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Win Rate</p>
                    <p className="text-xl font-bold text-metrix-cyan">{selectedStrategy.winRate}%</p>
                  </div>
                  {selectedStrategy.backtest && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Profit Factor</p>
                        <p className="text-xl font-bold text-green-500">
                          {selectedStrategy.backtest.profitFactor.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Max Drawdown</p>
                        <p className="text-xl font-bold text-red-500">
                          {selectedStrategy.backtest.maxDrawdown.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sharpe Ratio</p>
                        <p className="text-xl font-bold">
                          {selectedStrategy.backtest.sharpeRatio.toFixed(2)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Strategy Parameters */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Parameters</CardTitle>
                <Button variant="ghost" size="sm">
                  <Sliders size={16} className="mr-1" />
                  Tune
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedStrategy.parameters && Object.entries(selectedStrategy.parameters).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1 border-b border-gray-800 last:border-none">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-medium">
                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Alerts</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAlertDialog(true)}
                >
                  <Bell size={16} className="mr-1" />
                  Configure
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedStrategy.alerts && selectedStrategy.alerts.length > 0 ? (
                  selectedStrategy.alerts.map(alert => (
                    <Alert key={alert.id} variant={alert.isRead ? "default" : "destructive"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="flex justify-between items-center">
                        <span>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</span>
                        <span className="text-xs opacity-70">{new Date(alert.timestamp).toLocaleDateString()}</span>
                      </AlertTitle>
                      <AlertDescription>
                        {alert.message}
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No alerts configured</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="mb-6">
            <TabsList className="w-full">
              <TabsTrigger value="performance" className="flex-1">
                <LineChart size={16} className="mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="backtest" className="flex-1">
                <BarChart3 size={16} className="mr-2" />
                Backtest Results
              </TabsTrigger>
              <TabsTrigger value="optimization" className="flex-1">
                <Dna size={16} className="mr-2" />
                Optimization
              </TabsTrigger>
            </TabsList>
            
            {/* Performance Tab */}
            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Monthly performance of the strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ChartContainer 
                      config={{
                        positive: { color: "#4ade80" },
                        negative: { color: "#f87171" }
                      }}
                    >
                      <BarChart
                        data={selectedStrategy.performance}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const value = payload[0].value as number;
                            return (
                              <div className="bg-card border p-2 shadow-md rounded">
                                <p>{`${label}: ${value > 0 ? '+' : ''}${value.toFixed(2)}%`}</p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Legend />
                        <Bar dataKey="pnl" name="Monthly P&L %" fill={`var(--color-${(d: any) => d.pnl >= 0 ? 'positive' : 'negative'})`}>
                          {selectedStrategy.performance?.map((entry, index) => (
                            <Bar key={`bar-${index}`} fill={entry.pnl >= 0 ? "var(--color-positive)" : "var(--color-negative)"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Backtest Tab */}
            <TabsContent value="backtest" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Backtest Results</CardTitle>
                  <CardDescription>Historical performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStrategy.backtest ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-card/30 p-4 rounded-lg">
                          <p className="text-xs text-gray-500">Total Trades</p>
                          <p className="text-2xl font-bold">{selectedStrategy.backtest.totalTrades}</p>
                        </div>
                        <div className="bg-card/30 p-4 rounded-lg">
                          <p className="text-xs text-gray-500">Win Rate</p>
                          <p className="text-2xl font-bold text-green-500">
                            {(selectedStrategy.backtest.winningTrades / selectedStrategy.backtest.totalTrades * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div className="bg-card/30 p-4 rounded-lg">
                          <p className="text-xs text-gray-500">Profit Factor</p>
                          <p className="text-2xl font-bold text-metrix-cyan">
                            {selectedStrategy.backtest.profitFactor.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-card/30 p-4 rounded-lg">
                          <p className="text-xs text-gray-500">Max Drawdown</p>
                          <p className="text-2xl font-bold text-red-500">
                            {selectedStrategy.backtest.maxDrawdown.toFixed(2)}%
                          </p>
                        </div>
                      </div>

                      <div className="h-72 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={selectedStrategy.backtest.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="trade" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line 
                              yAxisId="left"
                              type="monotone" 
                              dataKey="equity" 
                              stroke="#3b82f6" 
                              name="Equity"
                              dot={false}
                              strokeWidth={2}
                            />
                            <Line 
                              yAxisId="right"
                              type="monotone" 
                              dataKey="pnl" 
                              stroke="#10b981" 
                              name="P&L"
                              dot={false}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Win/Loss Ratio</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-32">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={[
                                    { 
                                      name: 'Trades', 
                                      wins: selectedStrategy.backtest.winningTrades, 
                                      losses: selectedStrategy.backtest.losingTrades 
                                    }
                                  ]}
                                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                >
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="wins" name="Winning" fill="#10b981" />
                                  <Bar dataKey="losses" name="Losing" fill="#ef4444" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <BarChart3 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No backtest data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Optimization Tab */}
            <TabsContent value="optimization" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Genetic Optimization</CardTitle>
                  <CardDescription>Parameter optimization using genetic algorithms</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStrategy.optimization ? (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium">Status: {selectedStrategy.optimization.status.replace('_', ' ')}</h3>
                          <p className="text-sm text-gray-400">
                            {selectedStrategy.optimization.iterations} iterations, {selectedStrategy.optimization.results.length} unique parameter sets
                          </p>
                        </div>
                        {selectedStrategy.optimization.status === 'in_progress' ? (
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowOptimizationDialog(true)}
                          >
                            <Dna size={16} className="mr-1" />
                            New Run
                          </Button>
                        )}
                      </div>

                      {selectedStrategy.optimization.status === 'in_progress' && (
                        <div className="mb-6">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress: {selectedStrategy.optimization.progress}%</span>
                            <span>{selectedStrategy.optimization.iterations} iterations</span>
                          </div>
                          <Progress value={selectedStrategy.optimization.progress} className="h-2" />
                        </div>
                      )}

                      <Separator className="my-4" />

                      <div className="mb-6">
                        <h3 className="text-md font-medium mb-2">Best Parameters</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(selectedStrategy.optimization.bestParams).map(([key, value]) => (
                            <div key={key} className="bg-card/30 p-4 rounded-lg">
                              <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-xl font-bold">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left p-2">#</th>
                              <th className="text-left p-2">Parameters</th>
                              <th className="text-right p-2">Profit Factor</th>
                              <th className="text-right p-2">Sharpe</th>
                              <th className="text-right p-2">Drawdown</th>
                              <th className="text-right p-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedStrategy.optimization.results.map((result, index) => (
                              <tr key={index} className={`border-b border-gray-800 hover:bg-gray-900/40 ${index === 0 ? 'bg-green-900/10' : ''}`}>
                                <td className="p-2">{result.id}</td>
                                <td className="p-2">
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(result.params).map(([key, value]) => (
                                      <Badge key={key} variant="outline" className="whitespace-nowrap">
                                        {key}: {value}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-2 text-right">{result.performance.profitFactor.toFixed(2)}</td>
                                <td className="p-2 text-right">{result.performance.sharpeRatio.toFixed(2)}</td>
                                <td className="p-2 text-right">{result.performance.maxDrawdown.toFixed(2)}%</td>
                                <td className="p-2 text-right">
                                  <Button size="sm" variant="ghost">
                                    <Copy size={14} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <Dna className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No optimization data available</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setShowOptimizationDialog(true)}
                      >
                        Start Optimization
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Create Strategy Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Strategy</DialogTitle>
            <DialogDescription>
              Define the parameters for your new trading strategy.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <Label htmlFor="name">Strategy Name</Label>
              <Input
                id="name"
                value={newStrategy.name}
                onChange={(e) => setNewStrategy({...newStrategy, name: e.target.value})}
                placeholder="Momentum Breakout"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="type">Strategy Type</Label>
              <Select 
                value={newStrategy.type}
                onValueChange={(value) => setNewStrategy({...newStrategy, type: value})}
              >
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue placeholder="Select strategy type" />
                </SelectTrigger>
                <SelectContent>
                  {strategyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select 
                value={newStrategy.timeframe}
                onValueChange={(value) => setNewStrategy({...newStrategy, timeframe: value})}
              >
                <SelectTrigger id="timeframe" className="mt-1">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((tf) => (
                    <SelectItem key={tf.value} value={tf.value}>
                      {tf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="market">Market</Label>
              <Select 
                value={newStrategy.market}
                onValueChange={(value) => setNewStrategy({...newStrategy, market: value})}
              >
                <SelectTrigger id="market" className="mt-1">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map((market) => (
                    <SelectItem key={market.value} value={market.value}>
                      {market.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="maxOpenTrades">Max Open Trades</Label>
              <Input
                id="maxOpenTrades"
                type="number"
                value={newStrategy.maxOpenTrades}
                onChange={(e) => setNewStrategy({...newStrategy, maxOpenTrades: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newStrategy.description}
                onChange={(e) => setNewStrategy({...newStrategy, description: e.target.value})}
                placeholder="Describe your strategy..."
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="entryThreshold">Entry Threshold</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="entryThreshold"
                  value={[newStrategy.entryThreshold]}
                  onValueChange={(value) => setNewStrategy({...newStrategy, entryThreshold: value[0]})}
                  min={0}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{newStrategy.entryThreshold.toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="exitThreshold">Exit Threshold</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="exitThreshold"
                  value={[newStrategy.exitThreshold]}
                  onValueChange={(value) => setNewStrategy({...newStrategy, exitThreshold: value[0]})}
                  min={0}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{newStrategy.exitThreshold.toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="stopLoss">Stop Loss (%)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="stopLoss"
                  value={[newStrategy.stopLoss]}
                  onValueChange={(value) => setNewStrategy({...newStrategy, stopLoss: value[0]})}
                  min={0.5}
                  max={10}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{newStrategy.stopLoss.toFixed(1)}%</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="takeProfit">Take Profit (%)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="takeProfit"
                  value={[newStrategy.takeProfit]}
                  onValueChange={(value) => setNewStrategy({...newStrategy, takeProfit: value[0]})}
                  min={1}
                  max={20}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{newStrategy.takeProfit.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="useTrailingStop"
                checked={newStrategy.useTrailingStop}
                onCheckedChange={(checked) => setNewStrategy({...newStrategy, useTrailingStop: checked})}
              />
              <Label htmlFor="useTrailingStop">Use Trailing Stop</Label>
            </div>
            
            <div>
              <Label htmlFor="trailingStopDistance">Trailing Distance (%)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="trailingStopDistance"
                  value={[newStrategy.trailingStopDistance]}
                  onValueChange={(value) => setNewStrategy({...newStrategy, trailingStopDistance: value[0]})}
                  min={0.5}
                  max={5}
                  step={0.1}
                  className="flex-1"
                  disabled={!newStrategy.useTrailingStop}
                />
                <span className="w-12 text-right">{newStrategy.trailingStopDistance.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateStrategy}>Create Strategy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Optimization Dialog */}
      <Dialog open={showOptimizationDialog} onOpenChange={setShowOptimizationDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Genetic Optimization</DialogTitle>
            <DialogDescription>
              {selectedStrategy ? `Configure optimization for ${selectedStrategy.name}` : 'Configure optimization settings'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="iterations">Iterations</Label>
              <Input
                id="iterations"
                type="number"
                value={optimizationParams.iterations}
                onChange={(e) => setOptimizationParams({...optimizationParams, iterations: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="populationSize">Population Size</Label>
              <Input
                id="populationSize"
                type="number"
                value={optimizationParams.populationSize}
                onChange={(e) => setOptimizationParams({...optimizationParams, populationSize: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="mutationRate">Mutation Rate</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="mutationRate"
                  value={[optimizationParams.mutationRate]}
                  onValueChange={(value) => setOptimizationParams({...optimizationParams, mutationRate: value[0]})}
                  min={0.01}
                  max={0.2}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{optimizationParams.mutationRate.toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="crossoverRate">Crossover Rate</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="crossoverRate"
                  value={[optimizationParams.crossoverRate]}
                  onValueChange={(value) => setOptimizationParams({...optimizationParams, crossoverRate: value[0]})}
                  min={0.5}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{optimizationParams.crossoverRate.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="col-span-2">
              <Label className="block mb-2">Parameters to Optimize</Label>
              <div className="grid grid-cols-2 gap-2">
                {['entryThreshold', 'exitThreshold', 'stopLoss', 'takeProfit', 'trailingStopDistance'].map(param => (
                  <div key={param} className="flex items-center space-x-2">
                    <Switch
                      id={`optimize-${param}`}
                      checked={optimizationParams.optimizeParams.includes(param)}
                      onCheckedChange={(checked) => {
                        const newParams = checked 
                          ? [...optimizationParams.optimizeParams, param]
                          : optimizationParams.optimizeParams.filter(p => p !== param);
                        setOptimizationParams({...optimizationParams, optimizeParams: newParams});
                      }}
                    />
                    <Label htmlFor={`optimize-${param}`}>{param.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-2">
              <Label className="block mb-2">Optimization Objectives</Label>
              <div className="grid grid-cols-3 gap-2">
                {['profit', 'drawdown', 'sharpe', 'winRate', 'expectancy'].map(objective => (
                  <div key={objective} className="flex items-center space-x-2">
                    <Switch
                      id={`objective-${objective}`}
                      checked={optimizationParams.objectives.includes(objective)}
                      onCheckedChange={(checked) => {
                        const newObjectives = checked 
                          ? [...optimizationParams.objectives, objective]
                          : optimizationParams.objectives.filter(o => o !== objective);
                        setOptimizationParams({...optimizationParams, objectives: newObjectives});
                      }}
                    />
                    <Label htmlFor={`objective-${objective}`}>{objective}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOptimizationDialog(false)}>Cancel</Button>
            <Button onClick={handleStartOptimization}>Start Optimization</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Settings Dialog */}
      <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Alert Settings</DialogTitle>
            <DialogDescription>
              Configure alerts for your strategy
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="profitTarget">Profit Target (%)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="profitTarget"
                  value={[alertSettings.profitTarget]}
                  onValueChange={(value) => setAlertSettings({...alertSettings, profitTarget: value[0]})}
                  min={1}
                  max={20}
                  step={0.5}
                  className="flex-1"
                />
                <span className="w-12 text-right">{alertSettings.profitTarget.toFixed(1)}%</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="drawdownThreshold">Drawdown Threshold (%)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="drawdownThreshold"
                  value={[alertSettings.drawdownThreshold]}
                  onValueChange={(value) => setAlertSettings({...alertSettings, drawdownThreshold: value[0]})}
                  min={1}
                  max={20}
                  step={0.5}
                  className="flex-1"
                />
                <span className="w-12 text-right">{alertSettings.drawdownThreshold.toFixed(1)}%</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="consecutiveLosses">Consecutive Losses</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="consecutiveLosses"
                  value={[alertSettings.consecutiveLosses]}
                  onValueChange={(value) => setAlertSettings({...alertSettings, consecutiveLosses: value[0]})}
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{alertSettings.consecutiveLosses}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="winRateThreshold">Win Rate Threshold (%)</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="winRateThreshold"
                  value={[alertSettings.winRateThreshold]}
                  onValueChange={(value) => setAlertSettings({...alertSettings, winRateThreshold: value[0]})}
                  min={30}
                  max={70}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{alertSettings.winRateThreshold}%</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="profitFactorThreshold">Profit Factor Threshold</Label>
              <div className="flex items-center gap-4 mt-1">
                <Slider
                  id="profitFactorThreshold"
                  value={[alertSettings.profitFactorThreshold]}
                  onValueChange={(value) => setAlertSettings({...alertSettings, profitFactorThreshold: value[0]})}
                  min={1}
                  max={3}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-right">{alertSettings.profitFactorThreshold.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="col-span-2">
              <h3 className="text-sm font-medium mb-2">Notification Methods</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyEmail"
                    checked={alertSettings.notifyEmail}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, notifyEmail: checked})}
                  />
                  <Label htmlFor="notifyEmail">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifyPush"
                    checked={alertSettings.notifyPush}
                    onCheckedChange={(checked) => setAlertSettings({...alertSettings, notifyPush: checked})}
                  />
                  <Label htmlFor="notifyPush">Push Notifications</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlertDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveAlerts}>Save Alert Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Strategy;
