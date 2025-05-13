
import { useState } from 'react';
import { AccountType, IntegrationType } from '@/types/account';
import { useToast } from "@/hooks/use-toast";

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

const defaultFormData = {
  name: '',
  type: 'Cash',
  balance: '',
  currency: 'USD',
  classification: 'real',
  broker: '',
  accountNumber: '',
  leverage: '1:100',
  autoSync: true,
  syncInterval: '60',
};

export const useAccounts = () => {
  const { toast } = useToast();
  const [accountsList, setAccountsList] = useState<AccountType[]>(initialAccounts);
  const [integrations] = useState<IntegrationType[]>(initialIntegrations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<null | AccountType>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [isOAuthDialogOpen, setIsOAuthDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [syncProgress, setSyncProgress] = useState<Record<string, number>>({});

  const filteredAccounts = activeFilter 
    ? accountsList.filter(account => account.classification === activeFilter)
    : accountsList;

  const handleAddAccount = () => {
    if (!formData.name || !formData.balance) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAccount: AccountType = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      balance: parseFloat(formData.balance),
      currency: formData.currency,
      status: 'active', 
      classification: formData.classification,
      logo: '/placeholder.svg',
    };

    setAccountsList([...accountsList, newAccount]);
    setFormData(defaultFormData);
    setIsAddDialogOpen(false);

    toast({
      title: "Account Added",
      description: "The trading account has been successfully added",
    });
  };

  const handleEditAccount = () => {
    if (!editingAccount || !formData.name || !formData.balance) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedAccounts = accountsList.map(account => 
      account.id === editingAccount.id ? {
        ...account,
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance),
        currency: formData.currency,
        classification: formData.classification,
      } : account
    );

    setAccountsList(updatedAccounts);
    setEditingAccount(null);
    setFormData(defaultFormData);

    toast({
      title: "Account Updated",
      description: "The trading account has been successfully updated",
    });
  };

  const handleDeleteAccount = (id: string) => {
    setAccountsList(accountsList.filter(account => account.id !== id));
    
    toast({
      title: "Account Removed",
      description: "The trading account has been successfully removed",
    });
  };

  const handleEditClick = (account: AccountType) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      currency: account.currency,
      classification: account.classification || 'real',
      broker: '',
      accountNumber: '',
      leverage: '1:100',
      autoSync: true,
      syncInterval: '60',
    });
  };

  const handleIntegrationConnect = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    
    // For oauth-based brokers, open the auth flow
    if (['ib', 'tradovate', 'ninjatrader', 'ctrader', 'rethmic', 'binance'].includes(integrationId)) {
      setSelectedIntegration(integrationId);
      setIsOAuthDialogOpen(true);
      return;
    }

    toast({
      title: "Connecting to Integration",
      description: `Connecting to ${integration?.name}...`,
    });
    
    // Simulate an API connection
    setTimeout(() => {
      toast({
        title: "Integration Connected",
        description: `Successfully connected to ${integration?.name}`,
      });

      // Start auto-sync progress simulation
      startSyncProgress(integrationId);
    }, 2000);
  };

  const handleOAuthConnect = () => {
    if (!selectedIntegration) return;
    
    const integration = integrations.find(i => i.id === selectedIntegration);
    
    // In a real app, this would redirect to broker's OAuth page
    toast({
      title: "OAuth Flow Initiated",
      description: `Redirecting to ${integration?.name} login...`,
    });
    
    // Simulate OAuth success after delay
    setTimeout(() => {
      toast({
        title: "Authorization Successful",
        description: `Connected to ${integration?.name}. Fetching accounts...`,
      });
      
      // Simulate account discovery
      setTimeout(() => {
        // Create a new account from the connection
        const newAccount: AccountType = {
          id: Date.now().toString(),
          name: `${integration?.name} Account`,
          type: 'Margin',
          balance: 15000 + Math.random() * 5000,
          currency: 'USD',
          status: 'active',
          classification: 'real',
          logo: '/placeholder.svg',
        };
        
        setAccountsList([...accountsList, newAccount]);
        setIsOAuthDialogOpen(false);
        
        toast({
          title: "Account Imported",
          description: "Your trading account has been successfully imported",
        });
        
        // Start auto-sync progress simulation
        startSyncProgress(newAccount.id);
      }, 2000);
    }, 3000);
  };

  const handleStatusToggle = (id: string) => {
    setAccountsList(accountsList.map(account => 
      account.id === id ? {
        ...account,
        status: account.status === 'active' ? 'inactive' : 'active'
      } : account
    ));

    const account = accountsList.find(a => a.id === id);
    const newStatus = account?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Account Status Updated",
      description: `Account is now ${newStatus}`,
    });
  };

  const handleSyncAccount = (id: string) => {
    toast({
      title: "Account Syncing",
      description: "Syncing account data from broker...",
    });
    
    // Start sync progress simulation
    startSyncProgress(id);
    
    // Simulate a sync delay
    setTimeout(() => {
      // Update account with "new" data
      const updatedAccounts = accountsList.map(account => 
        account.id === id ? {
          ...account,
          balance: account.balance * (1 + (Math.random() * 0.02 - 0.01)) // +/- 1%
        } : account
      );
      
      setAccountsList(updatedAccounts);
      
      toast({
        title: "Account Synced",
        description: "Account data successfully updated",
      });
      
      // Clear progress
      setSyncProgress(prev => ({
        ...prev,
        [id]: 100
      }));
    }, 3000);
  };

  const startSyncProgress = (id: string) => {
    // Reset progress
    setSyncProgress(prev => ({
      ...prev,
      [id]: 0
    }));
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        const currentProgress = prev[id] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return {
          ...prev,
          [id]: Math.min(currentProgress + 10, 100)
        };
      });
    }, 300);
  };

  const handleAutoSyncToggle = (id: string) => {
    toast({
      title: "Auto Sync Updated",
      description: "Auto sync settings have been updated",
    });
  };

  const handleFilterChange = (classification: string | null) => {
    setActiveFilter(classification);
  };

  return {
    accountsList,
    filteredAccounts,
    integrations,
    isAddDialogOpen,
    setIsAddDialogOpen,
    editingAccount,
    setEditingAccount,
    activeFilter,
    formData,
    setFormData,
    isOAuthDialogOpen,
    setIsOAuthDialogOpen,
    selectedIntegration,
    syncProgress,
    handleAddAccount,
    handleEditAccount,
    handleDeleteAccount,
    handleEditClick,
    handleIntegrationConnect,
    handleOAuthConnect,
    handleStatusToggle,
    handleSyncAccount,
    handleAutoSyncToggle,
    handleFilterChange,
  };
};
