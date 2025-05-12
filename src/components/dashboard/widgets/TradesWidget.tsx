
import React from 'react';
import TradeJournal, { TradeEntry } from '@/components/dashboard/TradeJournal';

interface TradesWidgetProps {
  trades: TradeEntry[];
  onAdd: (trade: Omit<TradeEntry, 'id'>) => void;
  onEdit: (trade: TradeEntry) => void;
  onDelete: (id: string) => void;
  title: string;
}

const TradesWidget: React.FC<TradesWidgetProps> = ({ 
  trades, 
  onAdd, 
  onEdit, 
  onDelete, 
  title 
}) => {
  return (
    <div className="mb-6 w-full">
      <TradeJournal 
        trades={trades} 
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TradesWidget;
