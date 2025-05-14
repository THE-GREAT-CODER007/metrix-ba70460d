
import React, { useState } from 'react';
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
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = React.useContext(ThemeContext);
  
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://github.com/shadcn.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your trading preferences have been updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    if (previewUrl) {
      setAvatarUrl(previewUrl);
      setIsAvatarDialogOpen(false);
      toast({
        title: "Profile Photo Updated",
        description: "Your profile photo has been changed successfully.",
      });
    }
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
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-xl">CN</AvatarFallback>
              </Avatar>
              <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2">Change</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Profile Photo</DialogTitle>
                    <DialogDescription>
                      Upload a new profile photo to personalize your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={previewUrl || avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Input 
                        id="picture" 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <p className="text-sm text-gray-500">Supported formats: JPEG, PNG. Max size: 5MB.</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAvatarUpload}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

            <div className="w-full border-t border-gray-800 my-4"></div>
            
            <div className="w-full">
              <Button variant="outline" className="w-full">
                View API Keys
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 555-123-4567" className="bg-metrix-navy border-gray-800" />
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
                          <SelectItem value="eg">Egypt</SelectItem>
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
                          <SelectItem value="cairo">Cairo (EET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Account Security</Label>
                    <div className="flex justify-between bg-metrix-navy p-3 rounded-md">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex justify-between bg-metrix-navy p-3 rounded-md">
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-gray-400">Update your password regularly</p>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
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

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Trade Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">One-Click Trading</Label>
                        <p className="text-gray-400 text-sm">Enable quick trade execution with a single click</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Trade Confirmations</Label>
                        <p className="text-gray-400 text-sm">Show confirmation dialog before placing trades</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Default to Market Orders</Label>
                        <p className="text-gray-400 text-sm">Use market orders as the default order type</p>
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

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-gray-400 text-sm">Send critical alerts via SMS</p>
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

            <TabsContent value="appearance">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Theme</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div 
                        className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'dark' ? 'border-metrix-blue' : 'border-transparent'} bg-[#1A1F2C] flex flex-col items-center gap-2`}
                        onClick={() => setTheme('dark')}
                      >
                        <Moon size={24} className="text-gray-300" />
                        <span>Dark</span>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'light' ? 'border-metrix-blue' : 'border-transparent'} bg-[#f8f9fa] text-gray-800 flex flex-col items-center gap-2`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun size={24} className="text-yellow-500" />
                        <span>Light</span>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'blue' ? 'border-metrix-blue' : 'border-transparent'} bg-[#0f172a] flex flex-col items-center gap-2`}
                        onClick={() => setTheme('blue')}
                      >
                        <Palette size={24} className="text-blue-400" />
                        <span>Blue</span>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'purple' ? 'border-metrix-blue' : 'border-transparent'} bg-[#2d1b69] flex flex-col items-center gap-2`}
                        onClick={() => setTheme('purple')}
                      >
                        <Palette size={24} className="text-purple-400" />
                        <span>Purple</span>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-md cursor-pointer border-2 ${theme === 'green' ? 'border-metrix-blue' : 'border-transparent'} bg-[#0f291e] flex flex-col items-center gap-2`}
                        onClick={() => setTheme('green')}
                      >
                        <Palette size={24} className="text-green-400" />
                        <span>Green</span>
                      </div>
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
                        <Label className="text-base">Large Fonts</Label>
                        <p className="text-gray-400 text-sm">Increase text size for better readability</p>
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
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Chart Appearance</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Default Chart Style</Label>
                        <p className="text-gray-400 text-sm">Choose your preferred chart visualization</p>
                      </div>
                      <Select defaultValue="candle">
                        <SelectTrigger className="w-32 bg-metrix-navy border-gray-800">
                          <SelectValue placeholder="Style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="candle">Candlestick</SelectItem>
                          <SelectItem value="line">Line</SelectItem>
                          <SelectItem value="bar">OHLC Bar</SelectItem>
                          <SelectItem value="area">Area</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Grid Lines</Label>
                        <p className="text-gray-400 text-sm">Show grid lines on charts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Extended Hours</Label>
                        <p className="text-gray-400 text-sm">Show extended trading hours on charts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleSaveAppearance}>Save Appearance Settings</Button>
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
