
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeatmapData {
  day: string;
  hour: string;
  value: number;
}

interface HeatmapWidgetProps {
  title: string;
  data: HeatmapData[];
  className?: string;
  colorRanges: {
    min: number;
    max: number;
    color: string;
  }[];
}

const HeatmapWidget: React.FC<HeatmapWidgetProps> = ({
  title,
  data,
  className,
  colorRanges
}) => {
  const days = Array.from(new Set(data.map(d => d.day)));
  const hours = Array.from(new Set(data.map(d => d.hour)));

  const getColor = (value: number) => {
    for (const range of colorRanges) {
      if (value >= range.min && value <= range.max) {
        return range.color;
      }
    }
    return colorRanges[colorRanges.length - 1].color;
  };

  return (
    <Card className={cn("bg-metrix-card border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-xs text-gray-400">Hour / Day</th>
                {days.map(day => (
                  <th key={day} className="p-2 text-center text-xs text-gray-400">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map(hour => (
                <tr key={hour}>
                  <td className="p-2 text-left text-xs text-gray-400">{hour}</td>
                  {days.map(day => {
                    const cellData = data.find(d => d.day === day && d.hour === hour);
                    const value = cellData ? cellData.value : 0;
                    return (
                      <td
                        key={`${day}-${hour}`}
                        className="relative p-0"
                        title={`${day} ${hour}: ${value}`}
                      >
                        <div 
                          className="w-10 h-10 mx-auto flex items-center justify-center text-xs font-medium transition-all duration-300 hover:opacity-90 hover:scale-110"
                          style={{ backgroundColor: getColor(value) }}
                        >
                          {value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          {colorRanges.map((range, index) => (
            <div key={index} className="flex items-center text-xs">
              <div 
                className="w-3 h-3 mr-1" 
                style={{ backgroundColor: range.color }}
              ></div>
              <span>{range.min}-{range.max}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapWidget;
