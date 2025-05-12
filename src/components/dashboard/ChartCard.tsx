
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip, 
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  data: any[];
  type?: 'area' | 'bar' | 'line';
  colors?: {
    stroke?: string;
    fill?: string;
  };
  className?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  animated?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  type = 'area',
  colors = { stroke: '#4D7CFE', fill: 'rgba(77, 124, 254, 0.2)' },
  className,
  showGrid = true,
  showAxis = true,
  animated = true,
}) => {
  return (
    <Card className={cn("bg-metrix-card border-gray-800 overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'area' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />}
                {showAxis && <XAxis dataKey="name" stroke="#8E9196" />}
                {showAxis && <YAxis stroke="#8E9196" />}
                <defs>
                  <linearGradient id={`colorGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.stroke || '#4D7CFE'} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.fill || 'rgba(77, 124, 254, 0.2)'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2A3B', 
                    borderColor: '#2D3748',
                    borderRadius: '0.375rem',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                  }} 
                  cursor={{ stroke: '#4D7CFE', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={colors.stroke}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#colorGradient-${title.replace(/\s+/g, '')})`}
                  isAnimationActive={animated}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            ) : type === 'line' ? (
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />}
                {showAxis && <XAxis dataKey="name" stroke="#8E9196" />}
                {showAxis && <YAxis stroke="#8E9196" />}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2A3B', 
                    borderColor: '#2D3748',
                    borderRadius: '0.375rem',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                  }} 
                  cursor={{ stroke: '#4D7CFE', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={colors.stroke} 
                  strokeWidth={2}
                  dot={{ stroke: colors.stroke, strokeWidth: 2, r: 4, fill: '#1E2A3B' }}
                  activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: colors.stroke }}
                  isAnimationActive={animated}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />}
                {showAxis && <XAxis dataKey="name" stroke="#8E9196" />}
                {showAxis && <YAxis stroke="#8E9196" />}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2A3B', 
                    borderColor: '#2D3748',
                    borderRadius: '0.375rem',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill={colors.stroke} 
                  radius={[4, 4, 0, 0]} 
                  isAnimationActive={animated}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  minPointSize={3}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
