import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User, CheckCircle2, Key, Zap, Calendar, Lock, Bell, Clock, Switch } from 'lucide-react';

// Define avatar options - animated avatars
const avatarOptions = [
  {
    id: 'default',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/62ebc617eafeec75b502e68c_Animation%201.gif',
    name: 'Default'
  },
  {
    id: 'avatar1',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/6424718b1cc4f5a1f10af748_6.gif',
    name: 'Avatar 1'
  },
  {
    id: 'avatar2',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/63b603f6f3d0b04a1d312d3f_Phone%20Anim.gif',
    name: 'Avatar 2'
  },
  {
    id: 'avatar3',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/64db9dc1ef95d1e0c33a6826_Vici%20floating%20head%2002.gif',
    name: 'Avatar 3'
  },
  {
    id: 'avatar4',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/6388a0af5cee76e186178b9e_Transparent_AV.gif',
    name: 'Avatar 4'
  },
  {
    id: 'avatar5',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/63e2a3ae8ea1d296a1de9dca_Head%20Shake.gif',
    name: 'Avatar 5'
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Profile states
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://assets-global.website-files.com/5c4004b5b11b6939a133b415/62ebc617eafeec75b502e68c_Animation%201.gif");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState('default');
  
  // API Keys dialog state
  const [isApiKeysDialogOpen, setIsApiKeysDialogOpen] = useState(false);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date, timezone: string) => {
    try {
      return date.toLocaleTimeString('en-US', { 
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '--:--';
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
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
      setSelectedAvatarId('custom');
    }
  };

  const handleAvatarUpload = () => {
    if (selectedAvatarId === 'custom' && previewUrl) {
      setAvatarUrl(previewUrl);
    } else {
      const selectedAvatar = avatarOptions.find(avatar => avatar.id === selectedAvatarId);
      if (selectedAvatar) {
        setAvatarUrl(selectedAvatar.url);
      }
    }
    setIsAvatarDialogOpen(false);
    toast({
      title: "Profile Photo Updated",
      description: "Your profile photo has been changed successfully.",
    });
  };

  const selectAvatar = (id: string, url: string) => {
    setSelectedAvatarId(id);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - User card */}
        <Card className="bg-metrix-card border-gray-800 h-fit">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="relative mb-4 group">
              <Avatar className="w-28 h-28 ring-4 ring-offset-2 ring-offset-background ring-primary/30 transition-all duration-300 group-hover:scale-105">
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="text-xl">CN</AvatarFallback>
              </Avatar>
              <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/40"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Profile Avatar</DialogTitle>
                    <DialogDescription>
                      Choose an animated avatar or upload your own image.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="w-32 h-32 ring-2 ring-primary/40">
                        <AvatarImage src={previewUrl || avatarUrl} className="object-cover" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      
                      <div className="grid grid-cols-3 gap-4 w-full">
                        {avatarOptions.map(avatar => (
                          <div 
                            key={avatar.id}
                            className={`cursor-pointer transition-all rounded-md ${selectedAvatarId === avatar.id ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'}`}
                            onClick={() => selectAvatar(avatar.id, avatar.url)}
                          >
                            <Avatar className="w-full h-auto">
                              <AvatarImage src={avatar.url} className="object-cover" />
                              <AvatarFallback>{avatar.name[0]}</AvatarFallback>
                            </Avatar>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-1 w-full">
                        <Label htmlFor="picture" className="text-sm">Or upload your own:</Label>
                        <Input 
                          id="picture" 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="text-sm"
                        />
                      </div>
                      <p className="text-sm text-gray-500">Supported formats: JPEG, PNG, GIF. Max size: 5MB.</p>
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
              <Badge className="animate-pulse bg-gradient-to-r from-blue-500 to-purple-500">Pro Plan</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </Badge>
            </div>
            
            <div className="w-full border-t border-gray-800 my-4"></div>
            
            <div className="w-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">Member since</span>
                <span>Jan 2023</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">Last login</span>
                <span>Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total trades</span>
                <span>1,542</span>
              </div>
            </div>

            <div className="w-full border-t border-gray-800 my-4"></div>
            
            <div className="w-full">
              <Dialog open={isApiKeysDialogOpen} onOpenChange={setIsApiKeysDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    View API Keys
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      API Keys
                    </DialogTitle>
                    <DialogDescription>
                      Manage your API keys for third-party integrations
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Trading API Key</h3>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="password" 
                          value="sk_live_12345abcdefg" 
                          className="font-mono bg-metrix-navy border-gray-800" 
                          readOnly
                        />
                        <Button size="sm" variant="outline" onClick={() => {
                          navigator.clipboard.writeText("sk_live_12345abcdefg");
                          toast({
                            title: "Copied",
                            description: "API key copied to clipboard",
                          });
                        }}>Copy</Button>
                      </div>
                      <p className="text-sm text-gray-400">Created on Jan 15, 2023</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Data API Key</h3>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="password" 
                          value="data_key_67890xyzabc" 
                          className="font-mono bg-metrix-navy border-gray-800" 
                          readOnly
                        />
                        <Button size="sm" variant="outline" onClick={() => {
                          navigator.clipboard.writeText("data_key_67890xyzabc");
                          toast({
                            title: "Copied",
                            description: "API key copied to clipboard",
                          });
                        }}>Copy</Button>
                      </div>
                      <p className="text-sm text-gray-400">Created on Feb 23, 2023</p>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <Button className="w-full">Generate New API Key</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="w-full mt-4">
              <Card className="bg-metrix-navy">
                <CardContent className="p-4 text-center">
                  <h3 className="text-sm font-semibold mb-2 flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />Market Sessions
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className={`text-xs rounded px-2 py-1 ${formatTime(currentTime, 'America/New_York').split(':')[0] >= '09' && formatTime(currentTime, 'America/New_York').split(':')[0] < '16' ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/30 text-gray-400'}`}>
                      <p className="font-bold">New York</p>
                      <p>{formatTime(currentTime, 'America/New_York')}</p>
                    </div>
                    <div className={`text-xs rounded px-2 py-1 ${formatTime(currentTime, 'Europe/London').split(':')[0] >= '08' && formatTime(currentTime, 'Europe/London').split(':')[0] < '16' ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/30 text-gray-400'}`}>
                      <p className="font-bold">London</p>
                      <p>{formatTime(currentTime, 'Europe/London')}</p>
                    </div>
                    <div className={`text-xs rounded px-2 py-1 ${formatTime(currentTime, 'Asia/Tokyo').split(':')[0] >= '09' && formatTime(currentTime, 'Asia/Tokyo').split(':')[0] < '15' ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/30 text-gray-400'}`}>
                      <p className="font-bold">Tokyo</p>
                      <p>{formatTime(currentTime, 'Asia/Tokyo')}</p>
                    </div>
                    <div className={`text-xs rounded px-2 py-1 ${formatTime(currentTime, 'Australia/Sydney').split(':')[0] >= '09' && formatTime(currentTime, 'Australia/Sydney').split(':')[0] < '16' ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/30 text-gray-400'}`}>
                      <p className="font-bold">Sydney</p>
                      <p>{formatTime(currentTime, 'Australia/Sydney')}</p>
                    </div>
                    <div className={`text-xs rounded px-2 py-1 ${formatTime(currentTime, 'Africa/Cairo').split(':')[0] >= '09' && formatTime(currentTime, 'Africa/Cairo').split(':')[0] < '16' ? 'bg-green-500/20 text-green-300' : 'bg-gray-700/30 text-gray-400'}`}>
                      <p className="font-bold">Cairo</p>
                      <p>{formatTime(currentTime, 'Africa/Cairo')}</p>
                    </div>
                    <div className="text-xs rounded px-2 py-1 bg-blue-500/20 text-blue-300">
                      <p className="font-bold">Local</p>
                      <p>{formatTime(currentTime, Intl.DateTimeFormat().resolvedOptions().timeZone)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="trading">Trading Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
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
                    <Label className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Account Security
                    </Label>
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
            
            <TabsContent value="trading">
              <Card className="bg-metrix-card border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Trading Statistics
                  </CardTitle>
                  <CardDescription>Overview of your trading performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-metrix-navy border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Performance Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Win Rate</span>
                            <span className="font-medium text-green-400">67%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Profit Factor</span>
                            <span className="font-medium text-green-400">2.3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Expected Value</span>
                            <span className="font-medium text-green-400">1.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Drawdown</span>
                            <span className="font-medium text-red-400">12.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Trades</span>
                            <span>1,542</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-metrix-navy border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Today</span>
                            <span className="font-medium text-green-400">+$345.20</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">This Week</span>
                            <span className="font-medium text-green-400">+$1,267.50</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">This Month</span>
                            <span className="font-medium text-green-400">+$5,682.30</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Active Trades</span>
                            <span>3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pending Orders</span>
                            <span>5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-4">
                    <Card className="bg-metrix-navy border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Trading Calendar</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">May 2025</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">←</Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">→</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                            <div key={i} className="text-xs text-gray-400 py-1">{day}</div>
                          ))}
                          <div className="text-xs text-gray-600 py-1">28</div>
                          <div className="text-xs text-gray-600 py-1">29</div>
                          <div className="text-xs text-gray-600 py-1">30</div>
                          <div className="text-xs py-1">1</div>
                          <div className="text-xs py-1 rounded-full bg-green-500/20">2</div>
                          <div className="text-xs py-1 rounded-full bg-red-500/20">3</div>
                          <div className="text-xs py-1">4</div>
                          <div className="text-xs py-1 rounded-full bg-green-500/20">5</div>
                          <div className="text-xs py-1">6</div>
                          <div className="text-xs py-1 rounded-full bg-green-500/20">7</div>
                          <div className="text-xs py-1 rounded-full bg-green-500/20">8</div>
                          <div className="text-xs py-1 rounded-full bg-red-500/20">9</div>
                          <div className="text-xs py-1">10</div>
                          <div className="text-xs py-1">11</div>
                          <div className="text-xs py-1 rounded-full bg-blue-500/30">12</div>
                          <div className="text-xs py-1 rounded-full bg-green-500/20">13</div>
                          <div className="text-xs py-1 font-bold bg-primary/20 ring-1 ring-primary rounded-full">14</div>
                          <div className="text-xs py-1">15</div>
                          <div className="text-xs py-1">16</div>
                          <div className="text-xs py-1">17</div>
                          <div className="text-xs py-1">18</div>
                          {/* More days would go here */}
                        </div>
                        <div className="flex mt-2 text-xs gap-4 justify-center">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                            <span>Profit</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                            <span>Loss</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500/80"></div>
                            <span>Event</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Detailed Trading Analytics</Button>
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
