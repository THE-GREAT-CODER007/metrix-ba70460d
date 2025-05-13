
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Lock,
  User,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  Trash2,
  Mail,
  Phone,
  Shield,
  Zap,
  LineChart,
  Clock,
  Repeat,
  CheckCircle2
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState('1h');

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile information has been updated successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSaveTrading = () => {
    toast({
      title: "Trading Settings Saved",
      description: "Your trading preferences have been updated",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-metrix-navy border-gray-800 grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2">Change Avatar</Button>
                  <p className="text-sm text-gray-400">Recommended: 400x400px, Max 2MB</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="mt-1 bg-metrix-navy border-gray-800" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="mt-1 bg-metrix-navy border-gray-800" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="mt-1 bg-metrix-navy border-gray-800" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1 bg-metrix-navy border-gray-800" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" className="mt-1 bg-metrix-navy border-gray-800" defaultValue="Trader with 5 years of experience in forex and cryptocurrency markets." />
                </div>
              </div>
              
              <Separator className="my-4 bg-gray-800" />
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSaveProfile} className="bg-metrix-blue hover:bg-blue-700">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-400">Receive email notifications</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <LineChart className="h-4 w-4 mr-2" />
                      Trading Alerts
                    </h3>
                    <p className="text-sm text-gray-400">Price movements and trade signals</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Order Confirmations
                    </h3>
                    <p className="text-sm text-gray-400">When orders are executed</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      System Updates
                    </h3>
                    <p className="text-sm text-gray-400">New features and maintenance</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="my-4 bg-gray-800" />
                
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">Reset Defaults</Button>
                  <Button onClick={handleSaveNotifications} className="bg-metrix-blue hover:bg-blue-700">Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trading" className="space-y-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Trading Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-timeframe">Default Chart Timeframe</Label>
                  <Select
                    value={timeframe}
                    onValueChange={setTimeframe}
                  >
                    <SelectTrigger id="default-timeframe" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="1m">1 Minute</SelectItem>
                      <SelectItem value="5m">5 Minutes</SelectItem>
                      <SelectItem value="15m">15 Minutes</SelectItem>
                      <SelectItem value="30m">30 Minutes</SelectItem>
                      <SelectItem value="1h">1 Hour</SelectItem>
                      <SelectItem value="4h">4 Hours</SelectItem>
                      <SelectItem value="1d">1 Day</SelectItem>
                      <SelectItem value="1w">1 Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Auto-sync Trading Data
                    </h3>
                    <p className="text-sm text-gray-400">Automatically sync account data</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <Label htmlFor="sync-interval">Sync Interval</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="sync-interval" className="mt-1 bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="5">5 Minutes</SelectItem>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                      <SelectItem value="360">6 Hours</SelectItem>
                      <SelectItem value="720">12 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Repeat className="h-4 w-4 mr-2" />
                      Auto Close Trades
                    </h3>
                    <p className="text-sm text-gray-400">Close trades at the end of day</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="my-4 bg-gray-800" />
                
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">Reset Defaults</Button>
                  <Button onClick={handleSaveTrading} className="bg-metrix-blue hover:bg-blue-700">Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Change Password</h3>
                  <div className="grid gap-3 mt-2">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="mt-1 bg-metrix-navy border-gray-800" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="mt-1 bg-metrix-navy border-gray-800" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="mt-1 bg-metrix-navy border-gray-800" />
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-metrix-cyan" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div className="pt-2">
                  <h3 className="font-medium text-red-500">Danger Zone</h3>
                  <p className="text-sm text-gray-400 mb-3 mt-1">Permanent actions that cannot be undone</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      <LogOut className="h-4 w-4 mr-2" />
                      Revoke All Sessions
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4 bg-gray-800" />
                
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">Cancel</Button>
                  <Button onClick={handleSaveSecurity} className="bg-metrix-blue hover:bg-blue-700">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
