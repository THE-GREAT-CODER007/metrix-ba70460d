
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Trophy, Wallet } from "lucide-react";

interface AccountClassificationFilterProps {
  onFilterChange: (classification: string | null) => void;
  activeFilter: string | null;
}

const AccountClassificationFilter: React.FC<AccountClassificationFilterProps> = ({ 
  onFilterChange, 
  activeFilter 
}) => {
  const filters = [
    { id: 'real', label: 'Real', icon: TrendingUp },
    { id: 'demo', label: 'Demo', icon: TrendingDown },
    { id: 'challenge', label: 'Challenge', icon: Trophy },
    { id: 'funded', label: 'Funded', icon: Wallet },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      <Button
        variant={activeFilter === null ? "default" : "outline"}
        className={`${activeFilter === null ? 'bg-metrix-blue' : 'bg-transparent'}`}
        onClick={() => onFilterChange(null)}
      >
        All Accounts
      </Button>
      
      {filters.map(filter => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          className={`${activeFilter === filter.id ? 'bg-metrix-blue' : 'bg-transparent'}`}
          onClick={() => onFilterChange(filter.id)}
        >
          <filter.icon className="mr-1 h-4 w-4" />
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default AccountClassificationFilter;
