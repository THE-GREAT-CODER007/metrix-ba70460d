
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Bell, Shield, Key, Smartphone } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    username: 'alextrader',
    bio: 'Professional trader with 5+ years experience in forex and crypto markets',
    avatarUrl: '/placeholder.svg'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    tradingAlerts: true,
    marketNews: false,
    priceAlerts: true,
    soundAlerts: true,
    pushNotifications: true
  });
  
  const [apiSettings, setApiSettings] = useState({
    defaultLeverage: '1:100',
    defaultRiskPerTrade: '1%',
    tradingSessionStart: '09:30',
    tradingSessionEnd: '16:00',
    timezone: 'America/New_York',
    chartTimeframe: '1h'
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
    ipRestriction: false,
  });
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };
  
  const handleSaveApiSettings = () => {
    toast({
      title: "Trading Settings Updated",
      description: "Your trading preferences have been saved",
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been saved",
    });
  };
  
  const handleEnableTwoFactor = () => {
    setSecuritySettings({...securitySettings, twoFactorAuth: true});
    toast({
      title: "Two-Factor Authentication",
      description: "2FA has been enabled for your account",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-metrix-navy border-gray-800 mb-6 grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="trading" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" /> Trading
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})}
                        className="bg-metrix-navy border-gray-800"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        className="bg-metrix-navy border-gray-800"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                        className="bg-metrix-navy border-gray-800"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input 
                        id="bio"
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        className="bg-metrix-navy border-gray-800"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={profileForm.avatarUrl} alt="Profile picture" />
                    <AvatarFallback>{profileForm.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="mb-2">Upload Photo</Button>
                  <Button variant="link" className="text-red-400">Remove Photo</Button>
                </div>
              </div>
              
              <div className="mt-8">
                <Button onClick={handleSaveProfile} className="bg-metrix-blue hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Alerts</h3>
                    <p className="text-sm text-gray-400">Receive important alerts via email</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Trading Alerts</h3>
                    <p className="text-sm text-gray-400">Get notifications about your trades</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.tradingAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, tradingAlerts: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Market News</h3>
                    <p className="text-sm text-gray-400">Receive market news and updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.marketNews}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketNews: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Price Alerts</h3>
                    <p className="text-sm text-gray-400">Get alerts when prices hit your targets</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.priceAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, priceAlerts: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sound Alerts</h3>
                    <p className="text-sm text-gray-400">Play sound for important notifications</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.soundAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, soundAlerts: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <Button onClick={handleSaveNotifications} className="bg-metrix-blue hover:bg-blue-700">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trading">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Trading Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="defaultLeverage">Default Leverage</Label>
                    <Select 
                      value={apiSettings.defaultLeverage}
                      onValueChange={(value) => setApiSettings({...apiSettings, defaultLeverage: value})}
                    >
                      <SelectTrigger id="defaultLeverage" className="bg-metrix-navy border-gray-800">
                        <SelectValue placeholder="Default Leverage" />
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
                  
                  <div className="grid gap-2">
                    <Label htmlFor="defaultRiskPerTrade">Default Risk Per Trade</Label>
                    <Select 
                      value={apiSettings.defaultRiskPerTrade}
                      onValueChange={(value) => setApiSettings({...apiSettings, defaultRiskPerTrade: value})}
                    >
                      <SelectTrigger id="defaultRiskPerTrade" className="bg-metrix-navy border-gray-800">
                        <SelectValue placeholder="Default Risk Per Trade" />
                      </SelectTrigger>
                      <SelectContent className="bg-metrix-navy border-gray-800">
                        <SelectItem value="0.5%">0.5%</SelectItem>
                        <SelectItem value="1%">1%</SelectItem>
                        <SelectItem value="2%">2%</SelectItem>
                        <SelectItem value="3%">3%</SelectItem>
                        <SelectItem value="5%">5%</SelectItem>
                        <SelectItem value="10%">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="tradingSessionStart">Trading Session Start</Label>
                    <Input 
                      id="tradingSessionStart"
                      type="time"
                      value={apiSettings.tradingSessionStart}
                      onChange={(e) => setApiSettings({...apiSettings, tradingSessionStart: e.target.value})}
                      className="bg-metrix-navy border-gray-800"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tradingSessionEnd">Trading Session End</Label>
                    <Input 
                      id="tradingSessionEnd"
                      type="time"
                      value={apiSettings.tradingSessionEnd}
                      onChange={(e) => setApiSettings({...apiSettings, tradingSessionEnd: e.target.value})}
                      className="bg-metrix-navy border-gray-800"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={apiSettings.timezone}
                      onValueChange={(value) => setApiSettings({...apiSettings, timezone: value})}
                    >
                      <SelectTrigger id="timezone" className="bg-metrix-navy border-gray-800">
                        <SelectValue placeholder="Timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-metrix-navy border-gray-800">
                        <SelectItem value="America/New_York">New York (EST/EDT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT/BST)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        <SelectItem value="Australia/Sydney">Sydney (AEST/AEDT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="chartTimeframe">Default Chart Timeframe</Label>
                    <Select 
                      value={apiSettings.chartTimeframe}
                      onValueChange={(value) => setApiSettings({...apiSettings, chartTimeframe: value})}
                    >
                      <SelectTrigger id="chartTimeframe" className="bg-metrix-navy border-gray-800">
                        <SelectValue placeholder="Chart Timeframe" />
                      </SelectTrigger>
                      <SelectContent className="bg-metrix-navy border-gray-800">
                        <SelectItem value="1m">1 Minute</SelectItem>
                        <SelectItem value="5m">5 Minutes</SelectItem>
                        <SelectItem value="15m">15 Minutes</SelectItem>
                        <SelectItem value="30m">30 Minutes</SelectItem>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="4h">4 Hours</SelectItem>
                        <SelectItem value="1d">Daily</SelectItem>
                        <SelectItem value="1w">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button onClick={handleSaveApiSettings} className="bg-metrix-blue hover:bg-blue-700">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                      className="data-[state=checked]:bg-metrix-cyan"
                    />
                    {!securitySettings.twoFactorAuth && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleEnableTwoFactor}
                        className="text-metrix-cyan border-metrix-cyan hover:bg-metrix-cyan hover:text-white"
                      >
                        <Key className="h-4 w-4 mr-2" /> Setup
                      </Button>
                    )}
                  </div>
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-gray-400">Automatically log out after inactivity</p>
                  </div>
                  <Select 
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}
                    className="w-[180px]"
                  >
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Session Timeout" />
                    </SelectTrigger>
                    <SelectContent className="bg-metrix-navy border-gray-800">
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Login Alerts</h3>
                    <p className="text-sm text-gray-400">Get notified of new login attempts</p>
                  </div>
                  <Switch 
                    checked={securitySettings.loginAlerts}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginAlerts: checked})}
                    className="data-[state=checked]:bg-metrix-cyan"
                  />
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">IP Restriction</h3>
                    <p className="text-sm text-gray-400">Limit account access to specific IP addresses</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={securitySettings.ipRestriction}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
                      className="data-[state=checked]:bg-metrix-cyan"
                    />
                    {securitySettings.ipRestriction && (
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Configure
                      </Button>
                    )}
                  </div>
                </div>
                <Separator className="bg-gray-800" />
                
                <div className="pt-2">
                  <h3 className="font-medium">Connected Devices</h3>
                  <p className="text-sm text-gray-400 mb-4">Devices that are currently logged into your account</p>
                  
                  <div className="space-y-4">
                    <div className="bg-metrix-navy border border-gray-800 p-4 rounded-md flex justify-between items-center">
                      <div className="flex items-center">
                        <Smartphone className="h-8 w-8 mr-3 text-metrix-cyan" />
                        <div>
                          <h4 className="font-medium">iPhone 13 Pro</h4>
                          <p className="text-xs text-gray-400">Last active: 2 minutes ago • New York, USA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-500 hover:text-white">
                        Revoke
                      </Button>
                    </div>
                    
                    <div className="bg-metrix-navy border border-gray-800 p-4 rounded-md flex justify-between items-center">
                      <div className="flex items-center">
                        <Smartphone className="h-8 w-8 mr-3 text-metrix-cyan" />
                        <div>
                          <h4 className="font-medium">MacBook Pro</h4>
                          <p className="text-xs text-gray-400">Last active: Now • Current device</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" disabled className="opacity-50">
                        Current
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button onClick={handleSaveSecurity} className="bg-metrix-blue hover:bg-blue-700">
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
