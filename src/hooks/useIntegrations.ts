
import { useState } from 'react';
import { IntegrationType } from '@/types/account';

// Initial integrations data
const initialIntegrations: IntegrationType[] = [
  { 
    id: 'mt4',
    name: 'MetaTrader 4', 
    description: 'Connect to MT4 accounts',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'mt5',
    name: 'MetaTrader 5', 
    description: 'Connect to MT5 accounts',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'tradingview',
    name: 'TradingView', 
    description: 'Connect to TradingView',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'dxtrade',
    name: 'DxTrade', 
    description: 'Connect to DxTrade platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'matchtrader',
    name: 'Match-Trader', 
    description: 'Connect to Match-Trader platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'tradelocker',
    name: 'TradeLocker', 
    description: 'Connect to TradeLocker',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'ib',
    name: 'Interactive Brokers', 
    description: 'Connect to Interactive Brokers platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'ninjatrader',
    name: 'NinjaTrader', 
    description: 'Connect to NinjaTrader platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'ctrader',
    name: 'cTrader', 
    description: 'Connect to cTrader platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'tradovate',
    name: 'Tradovate', 
    description: 'Connect to Tradovate platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'rethmic',
    name: 'Rethmic', 
    description: 'Connect to Rethmic platform',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'binance',
    name: 'Binance', 
    description: 'Connect to Binance exchange',
    status: 'available',
    logo: '/placeholder.svg',
  },
  { 
    id: 'fxblue',
    name: 'FX Blue', 
    description: 'FX Blue aggregator to connect to many brokers',
    status: 'available',
    logo: '/placeholder.svg',
  },
];

export const useIntegrations = () => {
  const [integrations] = useState<IntegrationType[]>(initialIntegrations);
  
  return {
    integrations,
  };
};
