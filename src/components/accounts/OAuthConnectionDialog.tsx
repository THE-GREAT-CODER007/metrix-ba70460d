
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, ShieldCheck, AlertTriangle } from "lucide-react";

interface OAuthConnectionDialogProps {
  isOpen: boolean; 
  onClose: () => void;
  onConnect: () => void;
  integrationName?: string;
}

const OAuthConnectionDialog: React.FC<OAuthConnectionDialogProps> = ({
  isOpen,
  onClose,
  onConnect,
  integrationName = "Broker"
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-metrix-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Connect to {integrationName}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Alert className="bg-metrix-navy border-metrix-blue mb-4">
            <ShieldCheck className="h-4 w-4 text-metrix-cyan" />
            <AlertDescription>
              You're about to securely connect to {integrationName} using OAuth. This process will:
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-metrix-blue rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p>Redirect you to {integrationName}'s secure login page</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-metrix-blue rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p>Ask you to authorize MetriX to access your account data</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-metrix-blue rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p>Create a secure connection between MetriX and your {integrationName} account</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-metrix-blue rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <p>Import your account details and trading history</p>
            </div>
          </div>
          
          <Alert className="bg-metrix-navy border-amber-600 mt-5">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              MetriX will never have access to your {integrationName} password.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <Button variant="outline" onClick={onClose} className="sm:w-auto w-full order-2 sm:order-1">
            Cancel
          </Button>
          <Button 
            onClick={onConnect} 
            className="bg-metrix-blue hover:bg-blue-700 sm:w-auto w-full order-1 sm:order-2 flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Connect to {integrationName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OAuthConnectionDialog;
