
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { checkDatabaseConnection } from '@/utils/dbChecker';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type StatusState = 'checking' | 'connected' | 'disconnected' | 'unknown';

const SystemStatusBanner = () => {
  const [status, setStatus] = useState<StatusState>('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await checkDatabaseConnection();
        setStatus(isConnected ? 'connected' : 'disconnected');
        
        if (isConnected) {
          console.log('System is connected and ready');
        } else {
          console.error('Database connection issues detected');
          toast('Connection Issue', {
            description: 'Database connection issue detected. Check System Check page for details.',
          });
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        setStatus('unknown');
        toast('Connection Error', {
          description: 'Could not verify system status. Please check network connection.',
        });
      }
    };

    checkConnection();
    
    // Set up a periodic check every 60 seconds
    const interval = setInterval(checkConnection, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'checking':
        return <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'System is connected and ready';
      case 'disconnected':
        return 'Database connection issue detected';
      case 'checking':
        return 'Checking system status...';
      default:
        return 'System status unknown';
    }
  };

  return (
    <div className="rounded-lg bg-card/50 backdrop-blur-sm p-4 mb-6 border shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-medium">{getStatusText()}</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/system-check">System Check</Link>
        </Button>
      </div>
    </div>
  );
};

export default SystemStatusBanner;
