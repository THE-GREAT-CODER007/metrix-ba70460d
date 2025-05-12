
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical, X, Move, Settings, LayoutGrid } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';

export interface Widget {
  id: string;
  type: 'chart' | 'trades' | 'stats' | 'performance' | 'heatmap' | 'multi-line' | 'area' | 'donut';
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
  const [showWidgetTools, setShowWidgetTools] = useState(false);

  const handleAddWidget = (widget: Widget) => {
    onAddWidget(widget);
    setIsOpen(false);
    toast({
      title: "Widget added",
      description: `${widget.title} has been added to your dashboard`,
    });
  };

  // Check what widgets are available to add
  const availableToAdd = availableWidgets.filter(widget => 
    !activeWidgets.some(active => active.id === widget.id)
  );

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Dashboard Widgets</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowWidgetTools(!showWidgetTools)}
            className={`${showWidgetTools 
              ? 'bg-metrix-blue text-white border-metrix-blue' 
              : 'bg-metrix-blue/20 text-metrix-blue border-metrix-blue/40'}`}
          >
            <Settings size={16} className="mr-2" /> Manage
          </Button>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-metrix-blue/20 text-metrix-blue border-metrix-blue/40"
              >
                <Plus size={16} className="mr-2" /> Add Widget
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-metrix-navy border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add Widgets to Dashboard</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                {availableToAdd.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">All available widgets are already added to your dashboard.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableToAdd.map(widget => (
                      <Card 
                        key={widget.id}
                        className="p-4 bg-metrix-card border border-gray-700 rounded-md hover:border-metrix-blue hover:bg-metrix-blue/5 cursor-pointer transition-all duration-200"
                        onClick={() => handleAddWidget(widget)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{widget.title}</span>
                          <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-metrix-blue/20">
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <p className="text-xs text-gray-400">
                            {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}
                          </p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                            {widget.size}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              // Reset to default widgets
              onReorderWidgets(availableWidgets.filter(w => 
                ['stats', 'portfolio-growth', 'performance-trends', 'trades'].includes(w.id)
              ));
              toast({
                title: "Dashboard reset",
                description: "Your dashboard has been reset to the default layout",
              });
            }}
            className="bg-metrix-blue/20 text-metrix-blue border-metrix-blue/40"
          >
            <LayoutGrid size={16} className="mr-2" /> Reset
          </Button>
        </div>
      </div>

      {showWidgetTools && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 animate-fade-in">
          <h3 className="mb-3 text-sm font-medium text-gray-400">Manage Dashboard Widgets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeWidgets.map(widget => (
              <div 
                key={widget.id}
                className="p-3 bg-metrix-card border border-gray-700 rounded-md flex justify-between items-center"
              >
                <div className="flex items-center">
                  <Move size={16} className="mr-2 text-gray-500" />
                  <span>{widget.title}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-6 w-6 hover:bg-red-500/20 hover:text-red-500"
                  onClick={() => onRemoveWidget(widget.id)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Drag and drop widgets to reorder them (coming soon)
          </p>
        </div>
      )}
    </div>
  );
};

export default WidgetManager;
