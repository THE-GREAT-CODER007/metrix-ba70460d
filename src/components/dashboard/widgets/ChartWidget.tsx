
import React from 'react';
import ChartCard from '@/components/dashboard/ChartCard';

interface ChartWidgetProps {
  title: string;
  data: any[];
  type: 'area' | 'bar' | 'line';
  colors: {
    stroke: string;
    fill?: string;
  };
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  data,
  type,
  colors
}) => {
  return (
    <ChartCard
      title={title}
      data={data}
      type={type}
      colors={colors}
      className="mb-6 hover:shadow-lg transition-all duration-300 hover:shadow-blue-500/10"
    />
  );
};

export default ChartWidget;
