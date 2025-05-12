
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const accounts = [
  {
    id: '1',
    name: 'Interactive Brokers',
    type: 'Margin',
    balance: 25432.87,
    currency: 'USD',
    status: 'active',
  },
  {
    id: '2',
    name: 'TD Ameritrade',
    type: 'Cash',
    balance: 12543.32,
    currency: 'USD',
    status: 'active',
  },
  {
    id: '3',
    name: 'Robinhood',
    type: 'Margin',
    balance: 7865.45,
    currency: 'USD',
    status: 'inactive',
  },
];

const Accounts = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Accounts</h1>
        <Button className="bg-metrix-blue hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {accounts.map(account => (
          <Card key={account.id} className="bg-metrix-card border-gray-800">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={`/placeholder.svg`} alt={account.name} />
                  <AvatarFallback>{account.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle>{account.name}</CardTitle>
              </div>
              <Badge
                variant={account.status === 'active' ? 'default' : 'secondary'}
              >
                {account.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-400">Account Type</p>
                  <p className="font-medium">{account.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Balance</p>
                  <p className="font-medium text-metrix-cyan">{account.currency} {account.balance.toLocaleString()}</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-white hover:bg-red-500">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
