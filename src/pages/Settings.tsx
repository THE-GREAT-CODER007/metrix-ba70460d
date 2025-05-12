
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-2">Configure your trading platform preferences</p>
      </div>

      <Tabs defaultValue="general" className="mb-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-4">
          <Card className="bg-metrix-card border-gray-800 mb-6">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interface Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-gray-400">Enable dark mode for the interface</p>
                  </div>
                  <Switch id="darkMode" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-gray-400">Reduce spacing in the interface</p>
                  </div>
                  <Switch id="compactMode" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone" className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Trade Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="confirmTrades">Trade Confirmation</Label>
                    <p className="text-sm text-gray-400">Require confirmation before placing trades</p>
                  </div>
                  <Switch id="confirmTrades" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultSize">Default Position Size</Label>
                  <Input id="defaultSize" type="number" defaultValue="100" className="w-full" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-metrix-blue hover:bg-blue-700 mr-2">Save Changes</Button>
                <Button variant="outline">Reset to Default</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="mt-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-metrix-blue hover:bg-blue-700">Update Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive important updates via email</p>
                  </div>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="priceAlerts">Price Alerts</Label>
                    <p className="text-sm text-gray-400">Get notified of significant price movements</p>
                  </div>
                  <Switch id="priceAlerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tradeNotifications">Trade Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications for executed trades</p>
                  </div>
                  <Switch id="tradeNotifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsAlerts">News Alerts</Label>
                    <p className="text-sm text-gray-400">Get breaking market news alerts</p>
                  </div>
                  <Switch id="newsAlerts" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-metrix-blue hover:bg-blue-700">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <Card className="bg-metrix-card border-gray-800">
            <CardHeader>
              <CardTitle>API Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connect Brokers</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded-md">
                    <div>
                      <h4 className="font-medium">Interactive Brokers</h4>
                      <p className="text-sm text-gray-400">Connect your IBKR account</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded-md">
                    <div>
                      <h4 className="font-medium">TD Ameritrade</h4>
                      <p className="text-sm text-gray-400">Connect your TD account</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded-md">
                    <div>
                      <h4 className="font-medium">Alpaca</h4>
                      <p className="text-sm text-gray-400">Connect your Alpaca account</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Providers</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded-md">
                    <div>
                      <h4 className="font-medium">Alpha Vantage</h4>
                      <p className="text-sm text-gray-400">Market data and indicators</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded-md">
                    <div>
                      <h4 className="font-medium">Polygon.io</h4>
                      <p className="text-sm text-gray-400">Real-time market data</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
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
