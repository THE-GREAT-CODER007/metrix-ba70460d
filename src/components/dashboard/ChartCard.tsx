
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
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
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  type = 'area',
  colors = { stroke: '#4D7CFE', fill: 'rgba(77, 124, 254, 0.2)' },
  className,
}) => {
  return (
    <Card className={cn("bg-metrix-card border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'area' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.fill} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.fill} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2A3B', 
                    borderColor: '#2D3748',
                    borderRadius: '0.375rem',
                    color: '#fff' 
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={colors.stroke}
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2A3B', 
                    borderColor: '#2D3748',
                    borderRadius: '0.375rem',
                    color: '#fff' 
                  }}
                />
                <Bar dataKey="value" fill={colors.stroke} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
