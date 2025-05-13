
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface AccountFormProps {
  formData: {
    name: string;
    type: string;
    balance: string;
    currency: string;
    classification: string;
    broker: string;
    accountNumber: string;
    leverage: string;
    autoSync: boolean;
    syncInterval: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    balance: string;
    currency: string;
    classification: string;
    broker: string;
    accountNumber: string;
    leverage: string;
    autoSync: boolean;
    syncInterval: string;
  }>>;
  isEditing: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({ formData, setFormData, isEditing }) => {
  return (
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
          <Label htmlFor={isEditing ? "edit-name" : "name"}>Account Name</Label>
          <Input
            id={isEditing ? "edit-name" : "name"}
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
          <Label htmlFor={isEditing ? "edit-type" : "type"}>Account Type</Label>
          <Select 
            value={formData.type}
            onValueChange={(value) => setFormData({...formData, type: value})}
          >
            <SelectTrigger id={isEditing ? "edit-type" : "type"} className="mt-1 bg-metrix-navy border-gray-800">
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
          <Label htmlFor={isEditing ? "edit-balance" : "balance"}>Balance</Label>
          <Input
            id={isEditing ? "edit-balance" : "balance"}
            type="number"
            value={formData.balance}
            onChange={(e) => setFormData({...formData, balance: e.target.value})}
            className="mt-1 bg-metrix-navy border-gray-800"
          />
        </div>
        
        <div>
          <Label htmlFor={isEditing ? "edit-currency" : "currency"}>Currency</Label>
          <Select 
            value={formData.currency}
            onValueChange={(value) => setFormData({...formData, currency: value})}
          >
            <SelectTrigger id={isEditing ? "edit-currency" : "currency"} className="mt-1 bg-metrix-navy border-gray-800">
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
        
        {!isEditing && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AccountForm;
