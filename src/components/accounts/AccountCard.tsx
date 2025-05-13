
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, RefreshCcw } from "lucide-react";
import { AccountType } from '@/types/account';
import { getClassificationIcon } from '@/utils/accountUtils';

interface AccountCardProps {
  account: AccountType;
  onEdit: (account: AccountType) => void;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string) => void;
  onSync: (id: string) => void;
  onAutoSyncToggle: (id: string) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onEdit,
  onDelete,
  onStatusToggle,
  onSync,
  onAutoSyncToggle
}) => {
  return (
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
            onCheckedChange={() => onStatusToggle(account.id)}
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
                onCheckedChange={() => onAutoSyncToggle(account.id)}
                className="data-[state=checked]:bg-metrix-cyan"
              />
              <span className="text-sm">Every 60 min</span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSync(account.id)}
              className="text-metrix-cyan hover:text-white hover:bg-metrix-cyan"
            >
              <RefreshCcw className="h-4 w-4 mr-1" /> Sync
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(account)}
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 hover:text-white hover:bg-red-500"
              onClick={() => onDelete(account.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
