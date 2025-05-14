
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';

// Import Lucide icons - make sure not to have duplicate imports
import { 
  LineChart, // This is the Lucide icon, not the Recharts component
  BarChart3, 
  ArrowRight,
  Check,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Dna,
  Bell,
  BellRing
} from 'lucide-react';

// Mock data for strategy performance
const performanceData = [
  { month: 'Jan', pnl: 1200, benchmark: 800 },
  { month: 'Feb', pnl: 1900, benchmark: 1600 },
  { month: 'Mar', pnl: 1500, benchmark: 1900 },
  { month: 'Apr', pnl: 2800, benchmark: 2300 },
  { month: 'May', pnl: 2100, benchmark: 1800 },
  { month: 'Jun', pnl: 3100, benchmark: 2100 },
];

// Mock data for win/loss ratio
const winLossData = [
  { name: 'Wins', value: 68 },
  { name: 'Losses', value: 32 },
];

// Mock data for risk metrics
const riskData = [
  { subject: 'Sharpe', A: 0.87, fullMark: 3 },
  { subject: 'Sortino', A: 1.2, fullMark: 3 },
  { subject: 'Max DD', A: 0.65, fullMark: 1 },
  { subject: 'Recovery', A: 0.8, fullMark: 1 },
  { subject: 'Win Rate', A: 0.75, fullMark: 1 },
  { subject: 'Profit Factor', A: 0.9, fullMark: 2 },
];

// Mock data for optimization results
const optimizationResults = [
  { x: 65, y: 0.87, z: 2300 },
  { x: 73, y: 0.92, z: 2100 },
  { x: 54, y: 0.72, z: 1900 },
  { x: 81, y: 0.94, z: 2700 },
  { x: 42, y: 0.65, z: 1500 },
  { x: 62, y: 0.80, z: 2100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Strategy = () => {
  const [optimizationProgress, setOptimizationProgress] = React.useState(0);
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  // Simulation for genetic optimization process
  const startOptimization = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    const interval = setInterval(() => {
      setOptimizationProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setShowAlert(true);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 500);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Strategy Builder</h1>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="builder">Strategy Builder</TabsTrigger>
          <TabsTrigger value="backtest">Backtest Results</TabsTrigger>
          <TabsTrigger value="optimization">Genetic Optimization</TabsTrigger>
          <TabsTrigger value="alerts">Alert System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder" className="space-y-6">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Create New Strategy</CardTitle>
              <CardDescription>Design your trading algorithm with custom parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="strategyName">Strategy Name</Label>
                <Input id="strategyName" placeholder="e.g. Trend Following MACD" className="bg-metrix-navy border-gray-800" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Select defaultValue="h1">
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m5">5 Minutes</SelectItem>
                      <SelectItem value="m15">15 Minutes</SelectItem>
                      <SelectItem value="h1">1 Hour</SelectItem>
                      <SelectItem value="h4">4 Hours</SelectItem>
                      <SelectItem value="d1">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="market">Market</Label>
                  <Select defaultValue="forex">
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="futures">Futures</SelectItem>
                      <SelectItem value="indices">Indices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Strategy Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="border-metrix-blue text-left justify-start h-auto p-4 bg-metrix-navy hover:bg-metrix-blue/20">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart size={18} className="text-metrix-blue" />
                        <span className="font-medium">Trend Following</span>
                      </div>
                      <p className="text-xs text-gray-400">Strategies that follow the market's direction</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="border-green-500 text-left justify-start h-auto p-4 bg-metrix-navy hover:bg-green-500/20">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={18} className="text-green-500" />
                        <span className="font-medium">Mean Reversion</span>
                      </div>
                      <p className="text-xs text-gray-400">Strategies that capitalize on price reversals</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="border-purple-500 text-left justify-start h-auto p-4 bg-metrix-navy hover:bg-purple-500/20">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <Dna size={18} className="text-purple-500" />
                        <span className="font-medium">Custom Algorithm</span>
                      </div>
                      <p className="text-xs text-gray-400">Create your own custom trading algorithm</p>
                    </div>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Technical Indicators</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="maLength">Moving Average Length</Label>
                      <span className="text-sm text-gray-400">21</span>
                    </div>
                    <Slider defaultValue={[21]} max={100} step={1} className="bg-metrix-navy" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="rsiPeriod">RSI Period</Label>
                      <span className="text-sm text-gray-400">14</span>
                    </div>
                    <Slider defaultValue={[14]} max={50} step={1} className="bg-metrix-navy" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="macdFast">MACD Fast</Label>
                    <Input id="macdFast" type="number" defaultValue="12" className="bg-metrix-navy border-gray-800" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="macdSlow">MACD Slow</Label>
                    <Input id="macdSlow" type="number" defaultValue="26" className="bg-metrix-navy border-gray-800" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Risk Management</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                    <Input id="stopLoss" type="number" defaultValue="2" className="bg-metrix-navy border-gray-800" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="takeProfit">Take Profit (%)</Label>
                    <Input id="takeProfit" type="number" defaultValue="4" className="bg-metrix-navy border-gray-800" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="riskPerTrade">Risk Per Trade (%)</Label>
                    <Input id="riskPerTrade" type="number" defaultValue="1" className="bg-metrix-navy border-gray-800" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="trailingStop" />
                  <Label htmlFor="trailingStop">Enable trailing stop</Label>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label htmlFor="strategyLogic">Custom Logic (JavaScript)</Label>
                <Textarea 
                  id="strategyLogic" 
                  placeholder="// Your custom trading logic here
function onTick(data) {
  if (data.macd > data.signal && data.rsi < 70) {
    return BUY;
  } else if (data.macd < data.signal && data.rsi > 30) {
    return SELL;
  }
  return HOLD;
}" 
                  className="font-mono text-sm h-40 bg-metrix-navy border-gray-800"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-metrix-blue hover:bg-blue-700">Run Backtest <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backtest" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-metrix-card border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Total Return</p>
                  <ArrowUpRight className="text-green-500 h-4 w-4" />
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">+26.4%</p>
                  <Badge className="ml-2 bg-green-500/20 text-green-500">+3.2%</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Sharpe Ratio</p>
                  <ArrowUpRight className="text-green-500 h-4 w-4" />
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">1.87</p>
                  <Badge className="ml-2 bg-green-500/20 text-green-500">Good</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Max Drawdown</p>
                  <ArrowDownRight className="text-red-500 h-4 w-4" />
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">-12.3%</p>
                  <Badge className="ml-2 bg-yellow-500/20 text-yellow-500">Moderate</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Win Rate</p>
                  <Check className="text-green-500 h-4 w-4" />
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold">68%</p>
                  <Badge className="ml-2 bg-green-500/20 text-green-500">Strong</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle>Performance vs Benchmark</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                    <XAxis dataKey="month" stroke="#718096" />
                    <YAxis stroke="#718096" />
                    <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#2D3748' }} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="pnl" 
                      name="Strategy" 
                      stroke="#3182CE" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      name="S&P 500" 
                      stroke="#68D391" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
                    <PolarGrid stroke="#2D3748" />
                    <PolarAngleAxis dataKey="subject" stroke="#718096" />
                    <PolarRadiusAxis stroke="#718096" />
                    <Radar name="Strategy" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#2D3748' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle>Win/Loss Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="70%" height={250}>
                  <PieChart>
                    <Pie
                      data={winLossData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {winLossData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4FD1C5' : '#FC8181'} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#2D3748' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-metrix-card border-gray-800">
              <CardHeader>
                <CardTitle>Monthly Returns (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                    <XAxis dataKey="month" stroke="#718096" />
                    <YAxis stroke="#718096" />
                    <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#2D3748' }} />
                    <Legend />
                    <Bar dataKey="pnl" name="Return" fill="#3182CE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Genetic Algorithm Optimization</CardTitle>
              <CardDescription>Optimize strategy parameters using genetic algorithms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="generations">Number of Generations</Label>
                  <Input id="generations" type="number" defaultValue="50" className="bg-metrix-navy border-gray-800" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="popSize">Population Size</Label>
                  <Input id="popSize" type="number" defaultValue="100" className="bg-metrix-navy border-gray-800" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fitnessMetric">Fitness Metric</Label>
                  <Select defaultValue="sharpe">
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sharpe">Sharpe Ratio</SelectItem>
                      <SelectItem value="sortino">Sortino Ratio</SelectItem>
                      <SelectItem value="profit">Net Profit</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parameters to Optimize</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="optStop" />
                    <Label htmlFor="optStop">Stop Loss</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="optProfit" defaultChecked />
                    <Label htmlFor="optProfit">Take Profit</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="optMaLen" defaultChecked />
                    <Label htmlFor="optMaLen">MA Length</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="optRsiPeriod" defaultChecked />
                    <Label htmlFor="optRsiPeriod">RSI Period</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="optMacdFast" />
                    <Label htmlFor="optMacdFast">MACD Fast</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="optMacdSlow" />
                    <Label htmlFor="optMacdSlow">MACD Slow</Label>
                  </div>
                </div>
              </div>
              
              {isOptimizing ? (
                <div className="space-y-2">
                  <Label>Optimization Progress</Label>
                  <Progress value={optimizationProgress} max={100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Generation: {Math.floor(optimizationProgress / 2)}/50</span>
                    <span>{optimizationProgress}% Complete</span>
                  </div>
                </div>
              ) : null}
              
              {!isOptimizing && optimizationProgress === 100 ? (
                <Card className="border-green-500/30 bg-green-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <Check className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-500">Optimization Complete</p>
                        <p className="text-sm text-gray-400">Best parameters found with Sharpe Ratio of 1.94</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
              
              {!isOptimizing && optimizationProgress === 100 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Optimization Results</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-metrix-navy p-4 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">MA Length</p>
                      <p className="text-xl font-bold">18</p>
                      <p className="text-xs text-green-500">Optimized from 21</p>
                    </div>
                    
                    <div className="bg-metrix-navy p-4 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">RSI Period</p>
                      <p className="text-xl font-bold">12</p>
                      <p className="text-xs text-green-500">Optimized from 14</p>
                    </div>
                    
                    <div className="bg-metrix-navy p-4 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Take Profit</p>
                      <p className="text-xl font-bold">4.8%</p>
                      <p className="text-xs text-green-500">Optimized from 4.0%</p>
                    </div>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Win Rate" 
                        unit="%" 
                        stroke="#718096" 
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Sharpe Ratio" 
                        stroke="#718096" 
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="z" 
                        name="Profit" 
                        unit="$" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }} 
                        contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#2D3748' }}
                        formatter={(value, name) => {
                          if (name === 'Win Rate') return [`${value}%`, name];
                          if (name === 'Sharpe Ratio') return [value, name];
                          if (name === 'Profit') return [`$${value}`, name];
                          return [value, name];
                        }}
                      />
                      <Scatter 
                        name="Optimization Results" 
                        data={optimizationResults} 
                        fill="#8884d8" 
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-metrix-blue hover:bg-blue-700" 
                onClick={startOptimization} 
                disabled={isOptimizing}
              >
                {isOptimizing ? 'Optimizing...' : 'Start Optimization'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Strategy Alerts</CardTitle>
              <CardDescription>Configure notifications for your trading strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Alert Types</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <Switch id="signalAlert" defaultChecked />
                    <div>
                      <Label htmlFor="signalAlert" className="text-base">Trading Signals</Label>
                      <p className="text-sm text-gray-400">Get notified when strategy generates buy/sell signals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Switch id="performanceAlert" defaultChecked />
                    <div>
                      <Label htmlFor="performanceAlert" className="text-base">Performance Alerts</Label>
                      <p className="text-sm text-gray-400">Get notified about strategy performance changes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Switch id="riskAlert" defaultChecked />
                    <div>
                      <Label htmlFor="riskAlert" className="text-base">Risk Threshold Alerts</Label>
                      <p className="text-sm text-gray-400">Get notified when risk metrics exceed thresholds</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Switch id="backtestAlert" />
                    <div>
                      <Label htmlFor="backtestAlert" className="text-base">Backtest Completion</Label>
                      <p className="text-sm text-gray-400">Get notified when backtests are completed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Alert Channels</h3>
                  <Button variant="outline" size="sm">
                    Add Channel
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-metrix-navy rounded-md">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-metrix-blue" />
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-gray-400">All alerts will appear in the app</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-metrix-navy rounded-md">
                    <div className="flex items-center space-x-3">
                      <BellRing className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-400">Send alerts to chris@example.com</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              {showAlert && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md p-4 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-500">Strategy Optimization Alert</h4>
                    <p className="text-sm text-gray-300">Optimization complete. Parameters improved Sharpe Ratio by 12.4%. Click to view results.</p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAlert(false)}>Dismiss</Button>
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">View Results</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="bg-metrix-blue hover:bg-blue-700">Save Alert Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Strategy;
