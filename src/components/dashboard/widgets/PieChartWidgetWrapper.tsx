
import React from 'react';
import PieChartWidget from '@/components/dashboard/PieChartWidget';

interface PieChartWidgetWrapperProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const PieChartWidgetWrapper: React.FC<PieChartWidgetWrapperProps> = ({
  title,
  data
}) => {
  return (
    <PieChartWidget
      title={title}
      data={data}
      className="mb-6 hover:shadow-lg transition-all duration-300 hover:shadow-purple-500/10"
    />
  );
};

export default PieChartWidgetWrapper;
