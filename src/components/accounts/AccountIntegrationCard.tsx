
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, ExternalLink, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AccountIntegrationCardProps {
  name: string;
  description: string;
  logo: string;
  onConnect: () => void;
  status?: 'available' | 'connected' | 'maintenance';
  syncProgress?: number;
}

const AccountIntegrationCard: React.FC<AccountIntegrationCardProps> = ({
  name,
  description,
  logo,
  onConnect,
  status = 'available',
  syncProgress,
}) => {
  return (
    <Card className="bg-metrix-card border-gray-800 hover:shadow-md hover:shadow-metrix-blue/10 transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={logo} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            {status === 'connected' && (
              <Badge className="bg-green-600 text-white text-xs mt-1">Connected</Badge>
            )}
            {status === 'maintenance' && (
              <Badge className="bg-amber-500 text-white text-xs mt-1">Maintenance</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{description}</p>
        
        {syncProgress !== undefined && syncProgress > 0 && syncProgress < 100 && (
          <div className="mb-3">
            <Progress value={syncProgress} className="h-1 bg-metrix-navy" />
            <p className="text-xs text-gray-400 mt-1">Synchronizing... {syncProgress}%</p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onConnect}
            className="flex-1 border-metrix-blue text-metrix-blue hover:bg-metrix-blue hover:text-white"
            disabled={status === 'maintenance' || (syncProgress !== undefined && syncProgress > 0 && syncProgress < 100)}
          >
            {status === 'connected' ? (
              <>
                <Database className="h-4 w-4 mr-2" /> Sync Account
              </>
            ) : (
              <>
                <Link className="h-4 w-4 mr-2" /> Connect
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            size="icon"
            className="border-gray-700"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountIntegrationCard;
