
import { useState } from 'react';
import { AccountType, IntegrationType } from '@/types/account';
import { useToast } from "@/hooks/use-toast";
import { useAccountData } from './useAccountData';
import { useIntegrations } from './useIntegrations';
import { useSyncService } from './useSyncService';

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
  const { accountsList, setAccountsList } = useAccountData();
  const { integrations } = useIntegrations();
  const { syncProgress, startSyncProgress } = useSyncService();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<null | AccountType>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [isOAuthDialogOpen, setIsOAuthDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

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
    if (['ib', 'tradovate', 'ninjatrader', 'ctrader', 'rethmic', 'binance', 'fxblue'].includes(integrationId)) {
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
    }, 3000);
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
