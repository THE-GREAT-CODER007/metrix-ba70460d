
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Widget {
  id: string;
  type: 'chart' | 'trades' | 'stats' | 'performance';
  title: string;
  size: 'small' | 'medium' | 'large' | 'full';
}

interface WidgetManagerProps {
  availableWidgets: Widget[];
  activeWidgets: Widget[];
  onAddWidget: (widget: Widget) => void;
  onRemoveWidget: (widgetId: string) => void;
  onReorderWidgets: (widgets: Widget[]) => void;
}

const WidgetManager: React.FC<WidgetManagerProps> = ({
  availableWidgets,
  activeWidgets,
  onAddWidget,
  onRemoveWidget,
  onReorderWidgets
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddWidget = (widget: Widget) => {
    onAddWidget(widget);
    setIsOpen(false);
    toast({
      title: "Widget added",
      description: `${widget.title} has been added to your dashboard`,
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Dashboard Widgets</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-metrix-blue/20 text-metrix-blue border-metrix-blue/40"
        >
          <Plus size={16} className="mr-2" /> Add Widget
        </Button>
      </div>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="mb-3 text-sm font-medium text-gray-400">Available Widgets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableWidgets
              .filter(widget => !activeWidgets.some(active => active.id === widget.id))
              .map(widget => (
                <div 
                  key={widget.id}
                  className="p-4 bg-metrix-card border border-gray-700 rounded-md hover:border-metrix-blue cursor-pointer"
                  onClick={() => handleAddWidget(widget)}
                >
                  <div className="flex justify-between items-center">
                    <span>{widget.title}</span>
                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                      <Plus size={14} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} - {widget.size}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetManager;
