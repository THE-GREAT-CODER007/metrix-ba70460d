
import { useState } from 'react';
import { AccountType } from '@/types/account';

// Initial data should be imported from a data service in a real app
// This is just for demonstration purposes
const initialAccounts: AccountType[] = [
  {
    id: '1',
    name: 'Interactive Brokers',
    type: 'Margin',
    balance: 25432.87,
    currency: 'USD',
    status: 'active',
    classification: 'real',
    logo: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'TD Ameritrade',
    type: 'Cash',
    balance: 12543.32,
    currency: 'USD',
    status: 'active',
    classification: 'real',
    logo: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Robinhood',
    type: 'Margin',
    balance: 7865.45,
    currency: 'USD',
    status: 'inactive',
    classification: 'demo',
    logo: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Binance Futures',
    type: 'Crypto',
    balance: 3210.78,
    currency: 'USDT',
    status: 'active',
    classification: 'real',
    logo: '/placeholder.svg',
  },
  {
    id: '5',
    name: 'FTMO Challenge',
    type: 'Prop Firm',
    balance: 100000.00,
    currency: 'USD',
    status: 'active',
    classification: 'challenge',
    logo: '/placeholder.svg',
  },
  {
    id: '6',
    name: 'Funded Account',
    type: 'Prop Firm',
    balance: 50000.00,
    currency: 'USD',
    status: 'active',
    classification: 'funded',
    logo: '/placeholder.svg',
  },
];

export const useAccountData = () => {
  const [accountsList, setAccountsList] = useState<AccountType[]>(initialAccounts);
  
  return {
    accountsList,
    setAccountsList,
  };
};
