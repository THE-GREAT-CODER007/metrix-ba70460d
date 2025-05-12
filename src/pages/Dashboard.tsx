
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import TradeJournal, { TradeEntry } from '@/components/dashboard/TradeJournal';
import PieChartWidget from '@/components/dashboard/PieChartWidget';
import CandlestickChart from '@/components/dashboard/CandlestickChart';
import WidgetManager, { Widget } from '@/components/dashboard/WidgetManager';
import { CircleDollarSign, BookMarked, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

const revenueData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 400 },
  { name: 'Jun', value: 600 },
  { name: 'Jul', value: 800 },
  { name: 'Aug', value: 700 },
];

const satisfactionData = [
  { name: 'Jan', value: 80 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 90 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 60 },
  { name: 'Aug', value: 85 },
];

const volumeData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 180 },
  { name: 'May', value: 120 },
  { name: 'Jun', value: 200 },
];

const portfolioCompositionData = [
  { name: 'Technology', value: 35, color: '#4D7CFE' },
  { name: 'Healthcare', value: 20, color: '#10B981' },
  { name: 'Finance', value: 15, color: '#7C4DFE' },
  { name: 'Consumer', value: 10, color: '#F59E0B' },
  { name: 'Energy', value: 20, color: '#EC4899' }
];

const candlestickData = [
  { date: 'Mon', open: 100, high: 110, low: 95, close: 105 },
  { date: 'Tue', open: 105, high: 112, low: 101, close: 102 },
  { date: 'Wed', open: 102, high: 108, low: 95, close: 107 },
  { date: 'Thu', open: 107, high: 115, low: 105, close: 110 },
  { date: 'Fri', open: 110, high: 118, low: 109, close: 116 }
];

const initialTrades: TradeEntry[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'buy',
    price: 165.23,
    quantity: 10,
    date: '2023-05-12',
    pnl: 243.50,
  },
  {
    id: '2',
    symbol: 'MSFT',
    type: 'sell',
    price: 325.75,
    quantity: 5,
    date: '2023-05-11',
    pnl: -120.25,
  },
  {
    id: '3',
    symbol: 'TSLA',
    type: 'buy',
    price: 183.45,
    quantity: 15,
    date: '2023-05-10',
    pnl: 567.80,
  },
  {
    id: '4',
    symbol: 'AMZN',
    type: 'sell',
    price: 105.87,
    quantity: 20,
    date: '2023-05-09',
    pnl: 305.90,
  },
  {
    id: '5',
    symbol: 'GOOG',
    type: 'buy',
    price: 125.30,
    quantity: 8,
    date: '2023-05-08',
    pnl: -87.45,
  },
];

// Available widget definitions
const availableWidgets: Widget[] = [
  { id: 'stats', type: 'stats', title: 'Trading Summary', size: 'full' },
  { id: 'portfolio-growth', type: 'chart', title: 'Portfolio Growth', size: 'medium' },
  { id: 'performance-trends', type: 'chart', title: 'Performance Trends', size: 'medium' },
  { id: 'win-loss', type: 'chart', title: 'Win/Loss Ratio', size: 'medium' },
  { id: 'daily-pnl', type: 'chart', title: 'Daily P&L', size: 'medium' },
  { id: 'trades', type: 'trades', title: 'Latest Trades', size: 'full' },
  { id: 'portfolio-composition', type: 'chart', title: 'Portfolio Composition', size: 'medium' },
  { id: 'market-overview', type: 'chart', title: 'Market Overview', size: 'medium' },
];

// Default active widgets
const defaultActiveWidgets: Widget[] = [
  { id: 'stats', type: 'stats', title: 'Trading Summary', size: 'full' },
  { id: 'portfolio-growth', type: 'chart', title: 'Portfolio Growth', size: 'medium' },
  { id: 'performance-trends', type: 'chart', title: 'Performance Trends', size: 'medium' },
  { id: 'trades', type: 'trades', title: 'Latest Trades', size: 'full' },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [trades, setTrades] = useState<TradeEntry[]>(initialTrades);
  const [activeWidgets, setActiveWidgets] = useState<Widget[]>(defaultActiveWidgets);
  
  // Load widgets from localStorage on component mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      setActiveWidgets(JSON.parse(savedWidgets));
    }
  }, []);
  
  // Save widgets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(activeWidgets));
  }, [activeWidgets]);
  
  const handleAddTrade = (trade: Omit<TradeEntry, 'id'>) => {
    const newTrade = { ...trade, id: uuidv4() };
    setTrades([newTrade, ...trades]);
  };
  
  const handleEditTrade = (updatedTrade: TradeEntry) => {
    setTrades(trades.map(trade => 
      trade.id === updatedTrade.id ? updatedTrade : trade
    ));
  };
  
  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(trade => trade.id !== id));
  };
  
  const handleAddWidget = (widget: Widget) => {
    setActiveWidgets([...activeWidgets, widget]);
  };
  
  const handleRemoveWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter(widget => widget.id !== widgetId));
    toast({
      title: "Widget removed",
      description: "The widget has been removed from your dashboard",
    });
  };
  
  const handleReorderWidgets = (reorderedWidgets: Widget[]) => {
    setActiveWidgets(reorderedWidgets);
  };

  // Render widget based on its type
  const renderWidget = (widget: Widget) => {
    switch (widget.id) {
      case 'stats':
        return (
          <div key={widget.id} className="mb-8 w-full">
            <h2 className="text-xl text-gray-400 mb-4">{widget.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Profit"
                value="$5k"
                description="Total Profits"
                icon={<CircleDollarSign className="text-metrix-blue" size={18} />}
                colorClass="bg-metrix-blue/10"
              />
              <StatCard
                title="Total Orders"
                value="300"
                description="Total Orders"
                icon={<BookMarked className="text-metrix-purple" size={18} />}
                colorClass="bg-metrix-purple/10"
              />
              <StatCard
                title="Assets"
                value="5"
                description="Trading Assets"
                icon={<Package className="text-metrix-cyan" size={18} />}
                colorClass="bg-metrix-cyan/10"
              />
            </div>
          </div>
        );
      
      case 'portfolio-growth':
        return (
          <ChartCard
            key={widget.id}
            title={widget.title}
            data={revenueData}
            type="bar"
            colors={{ stroke: '#4D7CFE' }}
            className="mb-6"
          />
        );
      
      case 'performance-trends':
        return (
          <ChartCard
            key={widget.id}
            title={widget.title}
            data={satisfactionData}
            type="area"
            colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
            className="mb-6"
          />
        );
      
      case 'win-loss':
        return (
          <ChartCard
            key={widget.id}
            title={widget.title}
            data={volumeData}
            type="bar"
            colors={{ stroke: '#7C4DFE' }}
            className="mb-6"
          />
        );
      
      case 'daily-pnl':
        return (
          <ChartCard
            key={widget.id}
            title={widget.title}
            data={satisfactionData}
            type="area"
            colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
            className="mb-6"
          />
        );
      
      case 'trades':
        return (
          <div key={widget.id} className="mb-6 w-full">
            <TradeJournal 
              trades={trades} 
              onAdd={handleAddTrade}
              onEdit={handleEditTrade}
              onDelete={handleDeleteTrade}
            />
          </div>
        );
      
      case 'portfolio-composition':
        return (
          <PieChartWidget
            key={widget.id}
            title={widget.title}
            data={portfolioCompositionData}
            className="mb-6"
          />
        );
      
      case 'market-overview':
        return (
          <CandlestickChart
            key={widget.id}
            title={widget.title}
            data={candlestickData}
            className="mb-6"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Today's Goals</h1>
      
      <WidgetManager
        availableWidgets={availableWidgets}
        activeWidgets={activeWidgets}
        onAddWidget={handleAddWidget}
        onRemoveWidget={handleRemoveWidget}
        onReorderWidgets={handleReorderWidgets}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeWidgets.map(widget => {
          // Full width widgets
          if (widget.size === 'full') {
            return (
              <div className="lg:col-span-2" key={widget.id}>
                {renderWidget(widget)}
              </div>
            );
          }
          
          // Regular widgets
          return (
            <div key={widget.id}>
              {renderWidget(widget)}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
</lov-add-dependency>uuid@latest</lov-add-dependency>
