
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WidgetManager, { Widget } from '@/components/dashboard/WidgetManager';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { TradeEntry } from '@/components/dashboard/TradeJournal';

// Widget Components
import StatsWidget from '@/components/dashboard/widgets/StatsWidget';
import TradesWidget from '@/components/dashboard/widgets/TradesWidget';
import ChartWidget from '@/components/dashboard/widgets/ChartWidget';
import PieChartWidgetWrapper from '@/components/dashboard/widgets/PieChartWidgetWrapper';
import CandlestickWidgetWrapper from '@/components/dashboard/widgets/CandlestickWidgetWrapper';
import AreaChartWidget from '@/components/dashboard/widgets/AreaChartWidget';
import MultiLineChartWidget from '@/components/dashboard/widgets/MultiLineChartWidget';
import HeatmapWidget from '@/components/dashboard/widgets/HeatmapWidget';

// Data
import { 
  revenueData, 
  satisfactionData, 
  volumeData, 
  portfolioCompositionData,
  candlestickData,
  multiLineData,
  tradesByHourData,
  heatmapColorRanges,
  allCryptoData,
  weeklyReturnData,
  riskProfileData
} from '@/data/dashboardData';

// Initial data
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
  { id: 'trading-activity', type: 'heatmap', title: 'Trading Activity', size: 'full' },
  { id: 'crypto-comparison', type: 'multi-line', title: 'Crypto Comparison', size: 'medium' },
  { id: 'weekly-return', type: 'area', title: 'Weekly Return', size: 'medium' },
  { id: 'risk-profile', type: 'donut', title: 'Risk Profile', size: 'medium' },
];

// Default active widgets
const defaultActiveWidgets: Widget[] = [
  { id: 'stats', type: 'stats', title: 'Trading Summary', size: 'full' },
  { id: 'portfolio-growth', type: 'chart', title: 'Portfolio Growth', size: 'medium' },
  { id: 'performance-trends', type: 'chart', title: 'Performance Trends', size: 'medium' },
  { id: 'crypto-comparison', type: 'multi-line', title: 'Crypto Comparison', size: 'medium' },
  { id: 'weekly-return', type: 'area', title: 'Weekly Return', size: 'medium' },
  { id: 'trades', type: 'trades', title: 'Latest Trades', size: 'full' },
  { id: 'trading-activity', type: 'heatmap', title: 'Trading Activity', size: 'full' },
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
    toast({
      title: "Widget added",
      description: `${widget.title} has been added to your dashboard`,
    });
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
        return <StatsWidget title={widget.title} />;
      
      case 'portfolio-growth':
        return (
          <ChartWidget
            title={widget.title}
            data={revenueData}
            type="bar"
            colors={{ stroke: '#4D7CFE' }}
          />
        );
      
      case 'performance-trends':
        return (
          <ChartWidget
            title={widget.title}
            data={satisfactionData}
            type="area"
            colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
          />
        );
      
      case 'win-loss':
        return (
          <ChartWidget
            title={widget.title}
            data={volumeData}
            type="bar"
            colors={{ stroke: '#7C4DFE' }}
          />
        );
      
      case 'daily-pnl':
        return (
          <ChartWidget
            title={widget.title}
            data={satisfactionData}
            type="line"
            colors={{ stroke: '#10B981' }}
          />
        );
      
      case 'trades':
        return (
          <TradesWidget
            title={widget.title}
            trades={trades}
            onAdd={handleAddTrade}
            onEdit={handleEditTrade}
            onDelete={handleDeleteTrade}
          />
        );
      
      case 'portfolio-composition':
        return (
          <PieChartWidgetWrapper
            title={widget.title}
            data={portfolioCompositionData}
          />
        );
      
      case 'market-overview':
        return (
          <CandlestickWidgetWrapper
            title={widget.title}
            data={candlestickData}
          />
        );
        
      case 'trading-activity':
        return (
          <HeatmapWidget
            title={widget.title}
            data={tradesByHourData}
            colorRanges={heatmapColorRanges}
          />
        );
        
      case 'crypto-comparison':
        return (
          <MultiLineChartWidget
            title={widget.title}
            data={allCryptoData}
            lines={[
              { dataKey: 'btc', stroke: '#F7931A', name: 'Bitcoin' },
              { dataKey: 'eth', stroke: '#627EEA', name: 'Ethereum' },
              { dataKey: 'sol', stroke: '#00FFA3', name: 'Solana' }
            ]}
          />
        );
        
      case 'weekly-return':
        return (
          <AreaChartWidget
            title={widget.title}
            data={weeklyReturnData}
            gradientColors={{ start: '#8B5CF6', end: 'rgba(139, 92, 246, 0.1)' }}
          />
        );
        
      case 'risk-profile':
        return (
          <PieChartWidgetWrapper
            title={widget.title}
            data={riskProfileData}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Today's Overview</h1>
      
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
