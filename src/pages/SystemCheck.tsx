
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Database, RefreshCw, Server, ShieldAlert, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { runDatabaseChecks } from '@/utils/dbChecker';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';

interface StatusBadgeProps {
  status: boolean | null;
  loadingState: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, loadingState }) => {
  if (loadingState) {
    return <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />;
  }
  
  if (status === null) {
    return <AlertCircle className="h-5 w-5 text-amber-500" />;
  }
  
  return status ? 
    <CheckCircle className="h-5 w-5 text-green-500" /> : 
    <XCircle className="h-5 w-5 text-red-500" />;
};

const SystemCheck = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dbConnection, setDbConnection] = useState<boolean | null>(null);
  const [dbStructure, setDbStructure] = useState<boolean | null>(null);
  const [dbFunctions, setDbFunctions] = useState<boolean | null>(null);
  const [missingTables, setMissingTables] = useState<string[]>([]);
  const [supabseVersion, setSupabaseVersion] = useState<string | null>(null);

  const runChecks = async () => {
    setLoading(true);
    try {
      const { isConnected, structureValid, functionsValid, missingTables } = await runDatabaseChecks();
      
      setDbConnection(isConnected);
      setDbStructure(structureValid);
      setDbFunctions(functionsValid);
      setMissingTables(missingTables);
      
      if (!isConnected || !structureValid || !functionsValid) {
        toast('System Check Complete', {
          description: 'Some checks failed. Please review the results.',
        });
      } else {
        toast('System Check Complete', {
          description: 'All systems operational.',
        });
      }

      // Get Supabase version from metadata
      try {
        const { data } = await supabase.rpc('get_service_version', {});
        setSupabaseVersion(data?.version || 'Unknown');
      } catch (error) {
        console.error('Error fetching Supabase version:', error);
        setSupabaseVersion('Unknown');
      }
    } catch (error) {
      console.error('Error running system checks:', error);
      toast('System Check Error', {
        description: 'An error occurred while running system checks.',
      });
      
      setDbConnection(false);
      setDbStructure(false);
      setDbFunctions(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    runChecks();
  };

  useEffect(() => {
    runChecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">System Check</h1>
          <Button 
            onClick={handleRefresh} 
            disabled={loading || refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="h-5 w-5" /> Database Status
              </CardTitle>
              <CardDescription>
                Check the connection status to the Supabase database
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Connection:</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={dbConnection} loadingState={loading} />
                    <span>{loading ? 'Checking...' : dbConnection ? 'Connected' : 'Disconnected'}</span>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>Structure:</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={dbStructure} loadingState={loading} />
                    <span>{loading ? 'Checking...' : dbStructure ? 'Valid' : 'Invalid'}</span>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>Database Functions:</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={dbFunctions} loadingState={loading} />
                    <span>{loading ? 'Checking...' : dbFunctions ? 'Valid' : 'Invalid'}</span>
                  </div>
                </li>
              </ul>
              
              {missingTables.length > 0 && (
                <div className="mt-4 p-3 bg-red-500/10 rounded border border-red-500/20">
                  <h4 className="font-medium text-red-400 mb-2">Missing or inaccessible tables:</h4>
                  <ul className="list-disc list-inside text-sm">
                    {missingTables.map(table => (
                      <li key={table}>{table}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Server className="h-5 w-5" /> System Information
              </CardTitle>
              <CardDescription>
                Details about the current system environment
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Environment:</span>
                  <span className="text-right">{process.env.NODE_ENV || 'development'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Supabase:</span>
                  <span className="text-right">{loading ? 'Checking...' : (supabseVersion || 'Unknown')}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>React Version:</span>
                  <span className="text-right">{React.version}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-4">
              <h4 className="font-medium mb-2">Browser Information</h4>
              <p className="text-sm text-gray-500">{navigator.userAgent}</p>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Security Status
            </CardTitle>
            <CardDescription>
              Information about the current security configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Authentication</h3>
                <Separator className="mb-4" />
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Status:</span>
                    <span>Enabled</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Method:</span>
                    <span>Supabase Auth</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Row Level Security (RLS)</h3>
                <Separator className="mb-4" />
                <p className="text-sm text-gray-500 mb-2">
                  RLS protects your data by controlling access at the row level.
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Tables with RLS:</span>
                    <span>{loading ? 'Checking...' : dbStructure ? 'Configured' : 'Check Failed'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default SystemCheck;
