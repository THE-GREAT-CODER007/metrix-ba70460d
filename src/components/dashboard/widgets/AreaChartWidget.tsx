
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

interface AreaChartWidgetProps {
  title: string;
  data: any[];
  className?: string;
  gradientColors?: {
    start: string;
    end: string;
  };
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({
  title,
  data,
  className,
  gradientColors = {
    start: '#4D7CFE',
    end: 'rgba(77, 124, 254, 0.1)'
  }
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
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`colorGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientColors.start} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={gradientColors.end} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis dataKey="name" stroke="#8E9196" />
              <YAxis stroke="#8E9196" />
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
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={gradientColors.start} 
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#colorGradient-${title.replace(/\s+/g, '')})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaChartWidget;
