
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Link, RefreshCcw, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import AccountIntegrationCard from "@/components/accounts/AccountIntegrationCard";

const accounts = [
  {
    id: '1',
    name: 'Interactive Brokers',
    type: 'Margin',
    balance: 25432.87,
    currency: 'USD',
    status: 'active',
    logo: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'TD Ameritrade',
    type: 'Cash',
    balance: 12543.32,
    currency: 'USD',
    status: 'active',
    logo: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Robinhood',
    type: 'Margin',
    balance: 7865.45,
    currency: 'USD',
    status: 'inactive',
    logo: '/placeholder.svg',
  },
];

const integrations = [
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
];

const Accounts = () => {
  const { toast } = useToast();
  const [accountsList, setAccountsList] = useState(accounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<null | typeof accounts[0]>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Cash',
    balance: '',
    currency: 'USD',
  });

  const handleAddAccount = () => {
    if (!formData.name || !formData.balance) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAccount = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      balance: parseFloat(formData.balance),
      currency: formData.currency,
      status: 'active',
      logo: '/placeholder.svg',
    };

    setAccountsList([...accountsList, newAccount]);
    setFormData({ name: '', type: 'Cash', balance: '', currency: 'USD' });
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
      } : account
    );

    setAccountsList(updatedAccounts);
    setEditingAccount(null);
    setFormData({ name: '', type: 'Cash', balance: '', currency: 'USD' });

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

  const handleEditClick = (account: typeof accounts[0]) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      currency: account.currency,
    });
  };

  const handleIntegrationConnect = (integrationId: string) => {
    toast({
      title: "Connecting to Integration",
      description: `Connecting to ${integrations.find(i => i.id === integrationId)?.name}...`,
    });
    
    // In a real app, this would open an OAuth flow or API configuration
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
    
    // Simulate a sync delay
    setTimeout(() => {
      toast({
        title: "Account Synced",
        description: "Account data successfully updated",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Accounts</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-metrix-blue hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-metrix-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl">Add Trading Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="col-span-3 bg-metrix-navy border-gray-800"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger className="col-span-3 bg-metrix-navy border-gray-800">
                    <SelectValue placeholder="Account Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-metrix-navy border-gray-800">
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Margin">Margin</SelectItem>
                    <SelectItem value="IRA">IRA</SelectItem>
                    <SelectItem value="Crypto">Crypto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  Balance
                </Label>
                <Input
                  id="balance"
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  className="col-span-3 bg-metrix-navy border-gray-800"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currency" className="text-right">
                  Currency
                </Label>
                <Select 
                  value={formData.currency}
                  onValueChange={(value) => setFormData({...formData, currency: value})}
                >
                  <SelectTrigger className="col-span-3 bg-metrix-navy border-gray-800">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-metrix-navy border-gray-800">
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleAddAccount}>Add Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingAccount} onOpenChange={(open) => !open && setEditingAccount(null)}>
          <DialogContent className="sm:max-w-[425px] bg-metrix-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="col-span-3 bg-metrix-navy border-gray-800"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger id="edit-type" className="col-span-3 bg-metrix-navy border-gray-800">
                    <SelectValue placeholder="Account Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-metrix-navy border-gray-800">
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Margin">Margin</SelectItem>
                    <SelectItem value="IRA">IRA</SelectItem>
                    <SelectItem value="Crypto">Crypto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-balance" className="text-right">
                  Balance
                </Label>
                <Input
                  id="edit-balance"
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  className="col-span-3 bg-metrix-navy border-gray-800"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-currency" className="text-right">
                  Currency
                </Label>
                <Select 
                  value={formData.currency}
                  onValueChange={(value) => setFormData({...formData, currency: value})}
                >
                  <SelectTrigger id="edit-currency" className="col-span-3 bg-metrix-navy border-gray-800">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-metrix-navy border-gray-800">
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingAccount(null)}>Cancel</Button>
              <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleEditAccount}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="accounts" className="mb-6">
        <TabsList className="bg-metrix-navy border-gray-800">
          <TabsTrigger value="accounts">My Accounts</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="mt-4">
          <div className="grid grid-cols-1 gap-6 mb-6">
            {accountsList.map(account => (
              <Card key={account.id} className="bg-metrix-card border-gray-800">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={account.logo} alt={account.name} />
                      <AvatarFallback>{account.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{account.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={account.status === 'active'}
                      onCheckedChange={() => handleStatusToggle(account.id)}
                      className="data-[state=checked]:bg-metrix-cyan"
                    />
                    <Badge
                      variant={account.status === 'active' ? 'default' : 'secondary'}
                    >
                      {account.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-400">Account Type</p>
                      <p className="font-medium">{account.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Balance</p>
                      <p className="font-medium text-metrix-cyan">
                        {account.currency} {account.balance.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSyncAccount(account.id)}
                        className="text-metrix-cyan hover:text-white hover:bg-metrix-cyan"
                      >
                        <RefreshCcw className="h-4 w-4 mr-1" /> Sync
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditClick(account)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-white hover:bg-red-500"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map(integration => (
              <AccountIntegrationCard 
                key={integration.id}
                name={integration.name}
                description={integration.description}
                logo={integration.logo}
                onConnect={() => handleIntegrationConnect(integration.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Accounts;
