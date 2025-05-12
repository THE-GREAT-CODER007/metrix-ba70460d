
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface AccountIntegrationCardProps {
  name: string;
  description: string;
  logo: string;
  onConnect: () => void;
}

const AccountIntegrationCard: React.FC<AccountIntegrationCardProps> = ({
  name,
  description,
  logo,
  onConnect
}) => {
  return (
    <Card className="bg-metrix-card border-gray-800 hover:shadow-md hover:shadow-metrix-blue/10 transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={logo} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{description}</p>
        <Button 
          variant="outline" 
          onClick={onConnect}
          className="w-full border-metrix-blue text-metrix-blue hover:bg-metrix-blue hover:text-white"
        >
          <Link className="h-4 w-4 mr-2" /> Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountIntegrationCard;
