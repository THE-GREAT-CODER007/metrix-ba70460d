
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical, ArrowUp, ArrowDown } from 'lucide-react';

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
}

const TradeJournal: React.FC<TradeJournalProps> = ({ trades }) => {
  return (
    <Card className="bg-metrix-card border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Latest Trades</CardTitle>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
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
