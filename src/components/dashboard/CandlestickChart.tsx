
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
  CartesianGrid,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

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
  bullishColor?: string;
  bearishColor?: string;
  animated?: boolean;
  showVolume?: boolean;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  title,
  data,
  className,
  bullishColor = '#10B981', // Green for bullish candles
  bearishColor = '#EF4444', // Red for bearish candles
  animated = true,
  showVolume = false,
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
    wickBottom: Math.min(item.open, item.close) - item.low,
    // Generate random volume
    volume: showVolume ? Math.floor(Math.random() * 100) + 50 : undefined
  }));

  return (
    <Card className={cn("bg-metrix-card border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
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
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toFixed(2)}`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              
              {/* High-Low wicks */}
              {formattedData.map((item, index) => (
                <ReferenceLine
                  key={`wick-${index}`}
                  segment={[
                    { x: item.date, y: item.low },
                    { x: item.date, y: item.high }
                  ]}
                  stroke={item.bullish ? bullishColor : bearishColor}
                  strokeWidth={1.5}
                />
              ))}

              {/* Bullish candles (green) */}
              <Bar
                dataKey="body"
                fill={bullishColor}
                stroke={bullishColor}
                yAxisId={0}
                barSize={8}
                stackId="stack"
                name="Bullish"
                isAnimationActive={animated}
                animationDuration={1000}
              />

              {/* Bearish candles (red) */}
              <Bar
                dataKey="body"
                fill={bearishColor}
                stroke={bearishColor}
                yAxisId={0}
                barSize={8}
                stackId="stack"
                name="Bearish"
                isAnimationActive={animated}
                animationDuration={1000}
              />

              {/* Volume bars if enabled */}
              {showVolume && (
                <Bar
                  dataKey="volume"
                  fill="#4D7CFE"
                  opacity={0.3}
                  yAxisId={1}
                  barSize={6}
                  name="Volume"
                  isAnimationActive={animated}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandlestickChart;
