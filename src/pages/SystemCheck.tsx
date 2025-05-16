
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { runDatabaseChecks } from '@/utils/dbChecker';
import { useNotifications } from '@/hooks/useNotifications';
import { useMarketData } from '@/hooks/useMarketData';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { useTradingAccounts } from '@/hooks/useTradingAccounts';
import { useNewsArticles } from '@/hooks/useNewsArticles';
import { toast } from 'sonner';

const SystemCheck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<{
    isConnected: boolean;
    structureValid: boolean;
    functionsValid: boolean;
    missingTables: string[];
  } | null>(null);
  
  const { notifications } = useNotifications();
  const { data: marketData, isLoading: marketsLoading } = useMarketData();
  const { entries } = useJournalEntries();
  const { accounts } = useTradingAccounts();
  const { data: newsArticles } = useNewsArticles(5);
  
  const runChecks = async () => {
    setIsLoading(true);
    try {
      const status = await runDatabaseChecks();
      setDbStatus(status);
      
      if (status.isConnected) {
        toast('Connection Check', {
          description: 'Successfully connected to the database.',
        });
      } else {
        toast('Connection Error', {
          description: 'Failed to connect to the database.',
        });
      }
    } catch (error) {
      console.error('Error running checks:', error);
      toast('Check Error', {
        description: 'An error occurred while running system checks.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    runChecks();
  }, []);
  
  const StatusIndicator = ({ status, label }: { status: boolean; label: string }) => (
    <div className="flex items-center gap-2 mb-2">
      {status ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )}
      <span>{label}</span>
    </div>
  );
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">System Check</h1>
          <Button 
            onClick={runChecks} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Run Checks
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                Database Connectivity
              </CardTitle>
              <CardDescription>Verifies connection to Supabase and database structure</CardDescription>
            </CardHeader>
            <CardContent>
              {dbStatus ? (
                <>
                  <StatusIndicator 
                    status={dbStatus.isConnected} 
                    label="Database Connection" 
                  />
                  <StatusIndicator 
                    status={dbStatus.structureValid} 
                    label="Database Structure" 
                  />
                  <StatusIndicator 
                    status={dbStatus.functionsValid} 
                    label="Database Functions" 
                  />
                  
                  {dbStatus.missingTables.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2 text-amber-500">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Missing Tables</span>
                      </div>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {dbStatus.missingTables.map(table => (
                          <li key={table}>{table}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center h-24">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                Data Services
              </CardTitle>
              <CardDescription>Tests connectivity to various data endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusIndicator 
                status={!!marketData && marketData.length > 0} 
                label="Markets Data" 
              />
              <StatusIndicator 
                status={!!accounts} 
                label="Trading Accounts" 
              />
              <StatusIndicator 
                status={!!entries} 
                label="Journal Entries" 
              />
              <StatusIndicator 
                status={!!notifications} 
                label="Notifications" 
              />
              <StatusIndicator 
                status={!!newsArticles && newsArticles.length > 0} 
                label="News Articles" 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemCheck;
