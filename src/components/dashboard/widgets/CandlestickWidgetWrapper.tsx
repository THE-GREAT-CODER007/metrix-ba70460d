
import React from 'react';
import CandlestickChart from '@/components/dashboard/CandlestickChart';

interface CandlestickWidgetWrapperProps {
  title: string;
  data: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
}

const CandlestickWidgetWrapper: React.FC<CandlestickWidgetWrapperProps> = ({
  title,
  data
}) => {
  return (
    <CandlestickChart
      title={title}
      data={data}
      className="mb-6 hover:shadow-lg transition-all duration-300 hover:shadow-cyan-500/10"
    />
  );
};

export default CandlestickWidgetWrapper;
