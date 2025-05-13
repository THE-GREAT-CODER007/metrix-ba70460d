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
import { 
  PlusCircle, Edit, Trash2, Link, RefreshCcw, Database,
  TrendingUp, TrendingDown, Trophy, Wallet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import AccountIntegrationCard from "@/components/accounts/AccountIntegrationCard";
import AccountClassificationFilter from "@/components/accounts/AccountClassificationFilter";

const accounts = [
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
];

const Accounts = () => {
  const { toast } = useToast();
  const [accountsList, setAccountsList] = useState(accounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<null | typeof accounts[0]>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
      classification: formData.classification,
      logo: '/placeholder.svg',
    };

    setAccountsList([...accountsList, newAccount]);
    setFormData({ 
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
    });
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
    setFormData({ 
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
    });

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
      classification: account.classification || 'real',
      broker: '',
      accountNumber: '',
      leverage: '1:100',
      autoSync: true,
      syncInterval: '60',
    });
  };

  const handleIntegrationConnect = (integrationId: string) => {
    toast({
      title: "Connecting to Integration",
      description: `Connecting to ${integrations.find(i => i.id === integrationId)?.name}...`,
    });
    
    // Simulate an OAuth flow
    setTimeout(() => {
      toast({
        title: "Integration Connected",
        description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}`,
      });
    }, 2000);
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

  const handleAutoSyncToggle = (id: string) => {
    toast({
      title: "Auto Sync Updated",
      description: "Auto sync settings have been updated",
    });
  };

  const handleFilterChange = (classification: string | null) => {
    setActiveFilter(classification);
  };

  const filteredAccounts = activeFilter 
    ? accountsList.filter(account => account.classification === activeFilter)
    : accountsList;

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'real': return <TrendingUp className="h-4 w-4" />;
      case 'demo': return <TrendingDown className="h-4 w-4" />;
      case 'challenge': return <Trophy className="h-4 w-4" />;
      case 'funded': return <Wallet className="h-4 w-4" />;
      default: return null;
    }
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
          <DialogContent className="sm:max-w-[550px] bg-metrix-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl">Add Trading Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="classification">Account Classification</Label>
                  <Select 
                    value={formData.classification}
                    onValueChange={(value) => setFormData({...formData, classification: value})}
                  >
                    <SelectTrigger className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Classification" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="real">Real Account</SelectItem>
                      <SelectItem value="demo">Demo Account</SelectItem>
                      <SelectItem value="challenge">Challenge Account</SelectItem>
                      <SelectItem value="funded">Funded Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 bg-metrix-navy border-gray-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="broker">Broker</Label>
                  <Input
                    id="broker"
                    value={formData.broker}
                    onChange={(e) => setFormData({...formData, broker: e.target.value})}
                    className="mt-1 bg-metrix-navy border-gray-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                    className="mt-1 bg-metrix-navy border-gray-800"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Account Type</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger id="type" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Margin">Margin</SelectItem>
                      <SelectItem value="IRA">IRA</SelectItem>
                      <SelectItem value="Crypto">Crypto</SelectItem>
                      <SelectItem value="Prop Firm">Prop Firm</SelectItem>
                      <SelectItem value="Futures">Futures</SelectItem>
                      <SelectItem value="Options">Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="leverage">Leverage</Label>
                  <Select 
                    value={formData.leverage}
                    onValueChange={(value) => setFormData({...formData, leverage: value})}
                  >
                    <SelectTrigger id="leverage" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Leverage" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="1:5">1:5</SelectItem>
                      <SelectItem value="1:10">1:10</SelectItem>
                      <SelectItem value="1:20">1:20</SelectItem>
                      <SelectItem value="1:50">1:50</SelectItem>
                      <SelectItem value="1:100">1:100</SelectItem>
                      <SelectItem value="1:200">1:200</SelectItem>
                      <SelectItem value="1:500">1:500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="balance">Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={formData.balance}
                    onChange={(e) => setFormData({...formData, balance: e.target.value})}
                    className="mt-1 bg-metrix-navy border-gray-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={formData.currency}
                    onValueChange={(value) => setFormData({...formData, currency: value})}
                  >
                    <SelectTrigger id="currency" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <div className="flex items-center justify-between mt-2">
                    <Label htmlFor="autoSync">Enable Auto Sync</Label>
                    <Switch
                      id="autoSync"
                      checked={formData.autoSync}
                      onCheckedChange={(checked) => setFormData({...formData, autoSync: checked})}
                      className="data-[state=checked]:bg-metrix-cyan"
                    />
                  </div>
                </div>
                
                {formData.autoSync && (
                  <div className="col-span-2">
                    <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                    <Select 
                      value={formData.syncInterval}
                      onValueChange={(value) => setFormData({...formData, syncInterval: value})}
                    >
                      <SelectTrigger id="syncInterval" className="mt-1 bg-metrix-navy border-gray-800">
                        <SelectValue placeholder="Sync Interval" />
                      </SelectTrigger>
                      <SelectContent className="bg-metrix-navy border-gray-800">
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="360">6 hours</SelectItem>
                        <SelectItem value="720">12 hours</SelectItem>
                        <SelectItem value="1440">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleAddAccount}>Add Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingAccount} onOpenChange={(open) => !open && setEditingAccount(null)}>
          <DialogContent className="sm:max-w-[550px] bg-metrix-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Account</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-classification">Account Classification</Label>
                  <Select 
                    value={formData.classification}
                    onValueChange={(value) => setFormData({...formData, classification: value})}
                  >
                    <SelectTrigger className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Classification" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="real">Real Account</SelectItem>
                      <SelectItem value="demo">Demo Account</SelectItem>
                      <SelectItem value="challenge">Challenge Account</SelectItem>
                      <SelectItem value="funded">Funded Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-name">Account Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 bg-metrix-navy border-gray-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-type">Account Type</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger id="edit-type" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Margin">Margin</SelectItem>
                      <SelectItem value="IRA">IRA</SelectItem>
                      <SelectItem value="Crypto">Crypto</SelectItem>
                      <SelectItem value="Prop Firm">Prop Firm</SelectItem>
                      <SelectItem value="Futures">Futures</SelectItem>
                      <SelectItem value="Options">Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-balance">Balance</Label>
                  <Input
                    id="edit-balance"
                    type="number"
                    value={formData.balance}
                    onChange={(e) => setFormData({...formData, balance: e.target.value})}
                    className="mt-1 bg-metrix-navy border-gray-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-currency">Currency</Label>
                  <Select 
                    value={formData.currency}
                    onValueChange={(value) => setFormData({...formData, currency: value})}
                  >
                    <SelectTrigger id="edit-currency" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
          <AccountClassificationFilter 
            onFilterChange={handleFilterChange} 
            activeFilter={activeFilter} 
          />
          
          <div className="grid grid-cols-1 gap-6 mb-6 mt-4">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map(account => (
                <Card key={account.id} className="bg-metrix-card border-gray-800">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={account.logo} alt={account.name} />
                        <AvatarFallback>{account.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center">
                          {account.name}
                          <Badge className="ml-2 bg-metrix-navy border-gray-700 text-xs">
                            <span className="flex items-center">
                              {getClassificationIcon(account.classification)}
                              <span className="ml-1 capitalize">{account.classification}</span>
                            </span>
                          </Badge>
                        </CardTitle>
                      </div>
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
                    <div className="grid grid-cols-4 gap-4 mt-2">
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
                      <div>
                        <p className="text-sm text-gray-400">Auto Sync</p>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={true} 
                            onCheckedChange={() => handleAutoSyncToggle(account.id)}
                            className="data-[state=checked]:bg-metrix-cyan"
                          />
                          <span className="text-sm">Every 60 min</span>
                        </div>
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
              ))
            ) : (
              <div className="text-center py-8 bg-metrix-card border border-gray-800 rounded-md">
                <Database className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-xl font-medium mb-1">No accounts found</h3>
                <p className="text-gray-400 mb-4">No accounts match the selected filter</p>
                <Button onClick={() => setActiveFilter(null)} variant="outline">
                  Clear Filter
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
