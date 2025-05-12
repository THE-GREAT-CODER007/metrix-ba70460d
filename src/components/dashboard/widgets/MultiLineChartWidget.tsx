
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

interface MultiLineChartWidgetProps {
  title: string;
  data: any[];
  lines: {
    dataKey: string;
    stroke: string;
    name: string;
  }[];
  className?: string;
}

const MultiLineChartWidget: React.FC<MultiLineChartWidgetProps> = ({
  title,
  data,
  lines,
  className
}) => {
  return (
    <Card className={cn("bg-metrix-card border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
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
              {lines.map((line, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={line.dataKey} 
                  stroke={line.stroke} 
                  strokeWidth={2}
                  name={line.name}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiLineChartWidget;
