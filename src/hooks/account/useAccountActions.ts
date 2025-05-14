import { AccountType } from '@/types/account';
import { useToast } from "../use-toast";
import { useSyncService } from "../useSyncService";
import { useAccountState, FormDataType } from "./useAccountState";
import { useIntegrations } from "../useIntegrations";

export const useAccountActions = () => {
  const { toast } = useToast();
  const { syncProgress, startSyncProgress } = useSyncService();
  const { integrations } = useIntegrations();
  
  const { 
    accountsList, 
    setAccountsList, 
    formData, 
    setFormData, 
    defaultFormData, 
    setEditingAccount,
    setIsAddDialogOpen,
    setIsOAuthDialogOpen,
    selectedIntegration
  } = useAccountState();

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
    if (!formData.id || !formData.name || !formData.balance) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedAccounts = accountsList.map(account => 
      account.id === formData.id ? {
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
    const editData: FormDataType = {
      ...defaultFormData,
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      currency: account.currency,
      classification: account.classification || 'real',
    };
    setFormData(editData);
  };

  const handleIntegrationConnect = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    
    // For oauth-based brokers, open the auth flow
    if (['ib', 'tradovate', 'ninjatrader', 'ctrader', 'rethmic', 'binance', 'fxblue'].includes(integrationId)) {
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

  return {
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
  };
};
