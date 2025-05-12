
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, ArrowUp, ArrowDown, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface TradeEntry {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  date: string;
  pnl?: number;
}

interface TradeJournalProps {
  trades: TradeEntry[];
  onAdd?: (trade: Omit<TradeEntry, 'id'>) => void;
  onEdit?: (trade: TradeEntry) => void;
  onDelete?: (id: string) => void;
}

const TradeJournal: React.FC<TradeJournalProps> = ({
  trades,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  
  const handleEdit = (trade: TradeEntry) => {
    if (onEdit) {
      onEdit(trade);
      toast({
        title: "Trade updated",
        description: `${trade.symbol} trade has been updated`,
      });
    }
  };
  
  const handleDelete = (id: string, symbol: string) => {
    if (onDelete) {
      onDelete(id);
      toast({
        title: "Trade deleted",
        description: `${symbol} trade has been removed`,
      });
    }
  };
  
  const handleAdd = () => {
    if (onAdd) {
      // This would normally open a modal or form
      // For now we'll just create a sample trade
      const newTrade = {
        symbol: "NVDA",
        type: "buy" as const,
        price: 110.45,
        quantity: 5,
        date: new Date().toISOString().split('T')[0],
        pnl: 0
      };
      
      onAdd(newTrade);
      toast({
        title: "Trade added",
        description: `New ${newTrade.symbol} trade has been added`,
      });
    }
  };

  return (
    <Card className="bg-metrix-card border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Latest Trades</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setEditMode(!editMode)} 
            className="text-gray-400 hover:text-white"
          >
            <Edit size={16} />
          </Button>
          {onAdd && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAdd} 
              className="text-gray-400 hover:text-white"
            >
              <Plus size={16} />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreVertical size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left py-3 px-4">Symbol</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-right py-3 px-4">Price</th>
                <th className="text-right py-3 px-4">Quantity</th>
                <th className="text-right py-3 px-4">P&L</th>
                <th className="text-right py-3 px-4">Date</th>
                {editMode && <th className="text-right py-3 px-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-4 px-4 font-medium">{trade.symbol}</td>
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      trade.type === 'buy' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {trade.type === 'buy' ? (
                        <ArrowUp size={12} className="mr-1" />
                      ) : (
                        <ArrowDown size={12} className="mr-1" />
                      )}
                      {trade.type}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">${trade.price.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">{trade.quantity}</td>
                  <td className={`py-4 px-4 text-right font-medium ${
                    trade.pnl && trade.pnl > 0 
                      ? 'text-green-500' 
                      : trade.pnl && trade.pnl < 0 
                        ? 'text-red-500' 
                        : 'text-gray-400'
                  }`}>
                    {trade.pnl ? (
                      `${trade.pnl > 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`
                    ) : '-'}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-400">{trade.date}</td>
                  {editMode && (
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(trade)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-blue-500"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(trade.id, trade.symbol)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeJournal;
