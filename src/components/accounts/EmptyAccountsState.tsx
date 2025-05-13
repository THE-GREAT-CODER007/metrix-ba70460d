
import React from 'react';
import { Database } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EmptyAccountsStateProps {
  clearFilter: () => void;
}

const EmptyAccountsState: React.FC<EmptyAccountsStateProps> = ({ clearFilter }) => {
  return (
    <div className="text-center py-8 bg-metrix-card border border-gray-800 rounded-md">
      <Database className="mx-auto h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-xl font-medium mb-1">No accounts found</h3>
      <p className="text-gray-400 mb-4">No accounts match the selected filter</p>
      <Button onClick={clearFilter} variant="outline">
        Clear Filter
      </Button>
    </div>
  );
};

export default EmptyAccountsState;
