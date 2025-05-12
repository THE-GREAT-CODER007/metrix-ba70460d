
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip
} from 'recharts';
import { cn } from '@/lib/utils';

interface PieChartWidgetProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  animated?: boolean;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
    </text>
  );
};

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ 
  title, 
  data, 
  className,
  innerRadius = 0,
  outerRadius = 80,
  animated = true,
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
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={animated}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#272e3f"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E2A3B', 
                  borderColor: '#2D3748',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                  color: '#fff' 
                }}
                formatter={(value: number, name: string, props: any) => (
                  [`${value} (${((value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)`, name]
                )}
              />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartWidget;
