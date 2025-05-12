
import React from 'react';
import { CircleDollarSign, BookMarked, Package } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

interface StatsWidgetProps {
  title: string;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ title }) => {
  return (
    <div className="mb-8 w-full">
      <h2 className="text-xl text-gray-400 mb-4">{title}</h2>
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
};

export default StatsWidget;
