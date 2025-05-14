
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import {
  LineChart,
  Clock,
  Repeat,
  CheckCircle2,
  Settings as SettingsIcon,
  Lock,
  Shield,
  Zap,
  Palette,
  Font
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState('1h');
  const { theme, setTheme } = useContext(ThemeContext);
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('system-ui');

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully",
    });
    document.documentElement.style.fontSize = getFontSizeValue();
    document.body.style.fontFamily = fontFamily;
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

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated",
    });
    document.documentElement.style.fontSize = getFontSizeValue();
    document.body.style.fontFamily = fontFamily;
  };

  const getFontSizeValue = () => {
    switch (fontSize) {
      case 'small': return '0.875rem';
      case 'medium': return '1rem';
      case 'large': return '1.125rem';
      case 'xlarge': return '1.25rem';
      default: return '1rem';
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="preferences" className="space-y-4">
        <TabsList className="bg-metrix-navy border-gray-800 grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                General Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Default Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultAccount">Default Trading Account</Label>
                  <Select defaultValue="ib">
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ib">Interactive Brokers</SelectItem>
                      <SelectItem value="td">TD Ameritrade</SelectItem>
                      <SelectItem value="robinhood">Robinhood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultChart">Default Chart Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m5">5 Minutes</SelectItem>
                      <SelectItem value="m15">15 Minutes</SelectItem>
                      <SelectItem value="h1">1 Hour</SelectItem>
                      <SelectItem value="h4">4 Hours</SelectItem>
                      <SelectItem value="d1">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                      <SelectItem value="jpy">JPY</SelectItem>
                      <SelectItem value="egp">EGP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Display Options</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-gray-400 text-sm">Use dark theme throughout the application</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Show P/L in Account Summary</Label>
                    <p className="text-gray-400 text-sm">Display profit/loss figures in the dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Show Percentage Change</Label>
                    <p className="text-gray-400 text-sm">Display percentage changes for asset prices</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Show Market Sessions</Label>
                    <p className="text-gray-400 text-sm">Display market session indicators in the header</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator className="my-4 bg-gray-800" />
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset Defaults</Button>
                <Button onClick={handleSavePreferences} className="bg-metrix-blue hover:bg-blue-700">Save Preferences</Button>
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

                <div>
                  <h3 className="font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    API Key Management
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">Manage your API keys for third-party integrations</p>
                  
                  <Button variant="outline" className="mt-2">
                    Manage API Keys
                  </Button>
                </div>
                
                <Separator className="bg-gray-800 my-4" />
                
                <div className="pt-2">
                  <h3 className="font-medium text-red-500">Danger Zone</h3>
                  <p className="text-sm text-gray-400 mb-3 mt-1">Permanent actions that cannot be undone</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      Delete Account
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
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

        <TabsContent value="appearance" className="space-y-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Theme</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'dark' ? 'border-metrix-blue' : 'border-transparent'} bg-[#1A1F2C] flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A1F2C] border border-white/20"></div>
                    <span>Dark</span>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'light' ? 'border-metrix-blue' : 'border-transparent'} bg-[#f8f9fa] text-gray-800 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#f8f9fa] border border-gray-300"></div>
                    <span>Light</span>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'blue' ? 'border-metrix-blue' : 'border-transparent'} bg-[#0f172a] flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105`}
                    onClick={() => setTheme('blue')}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0f172a] border border-blue-400"></div>
                    <span>Blue</span>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'purple' ? 'border-metrix-blue' : 'border-transparent'} bg-[#2d1b69] flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105`}
                    onClick={() => setTheme('purple')}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2d1b69] border border-purple-400"></div>
                    <span>Purple</span>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'green' ? 'border-metrix-blue' : 'border-transparent'} bg-[#0f291e] flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105`}
                    onClick={() => setTheme('green')}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0f291e] border border-green-400"></div>
                    <span>Green</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Font className="h-5 w-5" />
                  Font Settings
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xlarge">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="bg-metrix-navy border-gray-800">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system-ui">System Default</SelectItem>
                      <SelectItem value="'Segoe UI', sans-serif">Segoe UI</SelectItem>
                      <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                      <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                      <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-metrix-navy rounded-lg">
                  <h3 className="mb-2">Preview</h3>
                  <p style={{ fontSize: getFontSizeValue(), fontFamily: fontFamily }}>
                    This is a preview of your selected font settings. Adjust the options above to see how they look.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Layout Options</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Compact View</Label>
                    <p className="text-gray-400 text-sm">Use less space between elements</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Sidebar Auto-Collapse</Label>
                    <p className="text-gray-400 text-sm">Automatically collapse sidebar on small screens</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator className="my-4 bg-gray-800" />
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset Defaults</Button>
                <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleSaveAppearance}>Save Appearance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
