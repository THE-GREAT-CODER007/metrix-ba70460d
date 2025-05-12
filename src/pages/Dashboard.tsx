
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import TradeJournal from '@/components/dashboard/TradeJournal';
import { CircleDollarSign, BookMarked, Package } from 'lucide-react';

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

const sampleTrades = [
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

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Today's Goals</h1>
      <div className="mb-8">
        <h2 className="text-xl text-gray-400 mb-4">Trading Summary</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Portfolio Growth"
          data={revenueData}
          type="bar"
          colors={{ stroke: '#4D7CFE' }}
        />
        <ChartCard
          title="Performance Trends"
          data={satisfactionData}
          type="area"
          colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Win/Loss Ratio"
          data={volumeData}
          type="bar"
          colors={{ stroke: '#7C4DFE' }}
        />
        <ChartCard
          title="Daily P&L"
          data={satisfactionData}
          type="area"
          colors={{ stroke: '#00E1FF', fill: '#00E1FF' }}
        />
      </div>

      <div className="mb-6">
        <TradeJournal trades={sampleTrades} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
