
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const navigate = useNavigate();
  
  const handleSaveProfile = () => {
    // Handle profile save
    console.log('Profile saved');
  };

  const handleSavePreferences = () => {
    // Handle preferences save
    console.log('Preferences saved');
  };

  const handleSaveNotifications = () => {
    // Handle notifications save
    console.log('Notification preferences saved');
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - User card */}
        <Card className="bg-metrix-card border-gray-800">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-xl">CN</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2">Change</Button>
            </div>
            
            <h2 className="text-xl font-bold mb-1">Chris Newton</h2>
            <p className="text-gray-400 mb-2">Professional Trader</p>
            
            <div className="flex gap-2 mb-4">
              <Badge>Pro Plan</Badge>
              <Badge variant="outline">Verified</Badge>
            </div>
            
            <div className="w-full border-t border-gray-800 my-4"></div>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">Member since</span>
                <span>Jan 2023</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">Last login</span>
                <span>Today, 09:42 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total trades</span>
                <span>1,542</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Chris" className="bg-metrix-navy border-gray-800" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Newton" className="bg-metrix-navy border-gray-800" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="chris@example.com" className="bg-metrix-navy border-gray-800" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      rows={3}
                      className="w-full rounded-md border border-gray-800 bg-metrix-navy p-3"
                      defaultValue="Professional trader specializing in forex and commodities markets."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger className="bg-metrix-navy border-gray-800">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger className="bg-metrix-navy border-gray-800">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="cst">Central Time (CT)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle>Trading Preferences</CardTitle>
                  <CardDescription>Customize your trading experience</CardDescription>
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
                      <Select defaultValue="h1">
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleSavePreferences}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Trading Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Trade Executions</Label>
                        <p className="text-gray-400 text-sm">Get notified when trades are executed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Price Alerts</Label>
                        <p className="text-gray-400 text-sm">Receive alerts for price targets</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Margin Calls</Label>
                        <p className="text-gray-400 text-sm">Get notified about margin requirements</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Market Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Economic Calendar Events</Label>
                        <p className="text-gray-400 text-sm">Get notified about upcoming economic events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Breaking News</Label>
                        <p className="text-gray-400 text-sm">Receive alerts for important market news</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Earnings Announcements</Label>
                        <p className="text-gray-400 text-sm">Get notified about earnings releases</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notification Methods</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">In-App Notifications</Label>
                        <p className="text-gray-400 text-sm">Show notifications within the application</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-gray-400 text-sm">Send notifications to your email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-gray-400 text-sm">Send push notifications to your device</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleSaveNotifications}>Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
