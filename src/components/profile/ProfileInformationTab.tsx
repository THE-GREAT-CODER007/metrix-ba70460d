
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock } from 'lucide-react';

const ProfileInformationTab = () => {
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
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
  );
};

export default ProfileInformationTab;
