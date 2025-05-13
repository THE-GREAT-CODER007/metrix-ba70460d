
import React from 'react';
import { TrendingUp, TrendingDown, Trophy, Wallet } from "lucide-react";

export const getClassificationIcon = (classification: string) => {
  switch (classification) {
    case 'real': return <TrendingUp className="h-4 w-4" />;
    case 'demo': return <TrendingDown className="h-4 w-4" />;
    case 'challenge': return <Trophy className="h-4 w-4" />;
    case 'funded': return <Wallet className="h-4 w-4" />;
    default: return null;
  }
};

export const getFilters = () => {
  return [
    { id: 'real', label: 'Real', icon: TrendingUp },
    { id: 'demo', label: 'Demo', icon: TrendingDown },
    { id: 'challenge', label: 'Challenge', icon: Trophy },
    { id: 'funded', label: 'Funded', icon: Wallet },
  ];
};
