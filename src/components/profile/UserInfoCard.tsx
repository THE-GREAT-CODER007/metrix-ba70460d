
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, Key, Clock } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

type UserInfoCardProps = {
  formatTime: (date: Date, timezone: string) => string;
  currentTime: Date;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ formatTime, currentTime }) => {
  const { toast } = useToast();
  const [isApiKeysDialogOpen, setIsApiKeysDialogOpen] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState("https://assets-global.website-files.com/5c4004b5b11b6939a133b415/62ebc617eafeec75b502e68c_Animation%201.gif");

  return (
    <Card className="bg-metrix-card border-gray-800 h-fit">
      <CardContent className="pt-6 flex flex-col items-center">
        <ProfileAvatar defaultAvatarUrl={avatarUrl} onAvatarChange={setAvatarUrl} />
        
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
          <MarketSessionsCard formatTime={formatTime} currentTime={currentTime} />
        </div>
      </CardContent>
    </Card>
  );
};

// Extract the market sessions card into its own component
const MarketSessionsCard: React.FC<{ formatTime: (date: Date, timezone: string) => string; currentTime: Date }> = ({ formatTime, currentTime }) => {
  return (
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
  );
};

export default UserInfoCard;
