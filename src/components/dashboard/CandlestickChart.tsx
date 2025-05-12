
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid
} from 'recharts';

interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  title: string;
  data: CandlestickData[];
  className?: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  title,
  data,
  className
}) => {
  const formattedData = data.map(item => ({
    ...item,
    // For rendering candlesticks
    bullish: item.close > item.open,
    bearish: item.open > item.close,
    amplitude: Math.abs(item.high - item.low),
    body: Math.abs(item.close - item.open),
    bodyStart: item.close > item.open ? item.open : item.close,
    wickTop: item.high - Math.max(item.open, item.close),
    wickBottom: Math.min(item.open, item.close) - item.low
  }));

  return (
    <Card className={`bg-metrix-card border-gray-800 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="date" stroke="#8E9196" />
              <YAxis domain={['dataMin', 'dataMax']} stroke="#8E9196" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E2A3B',
                  borderColor: '#2D3748',
                  borderRadius: '0.375rem',
                  color: '#fff'
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toFixed(2)}`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              
              {/* High-Low wicks */}
              {formattedData.map((item, index) => (
                <ReferenceLine
                  key={`wick-${index}`}
                  segment={[
                    { x: item.date, y: item.low },
                    { x: item.date, y: item.high }
                  ]}
                  stroke={item.bullish ? "#10B981" : "#EF4444"}
                  strokeWidth={1}
                />
              ))}

              {/* Bullish candles (green) */}
              <Bar
                dataKey="body"
                fill="#10B981"
                stroke="#10B981"
                yAxisId={0}
                barSize={8}
                stackId="stack"
                name="Bullish"
                isAnimationActive={false}
              />

              {/* Bearish candles (red) */}
              <Bar
                dataKey="body"
                fill="#EF4444"
                stroke="#EF4444"
                yAxisId={0}
                barSize={8}
                stackId="stack"
                name="Bearish"
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandlestickChart;
