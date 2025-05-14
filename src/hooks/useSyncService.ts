
import { useState } from 'react';
import { useToast } from './use-toast';

export const useSyncService = () => {
  const { toast } = useToast();
  const [syncProgress, setSyncProgress] = useState<Record<string, number>>({});
  const [syncTimers, setSyncTimers] = useState<Record<string, NodeJS.Timeout>>({});
  
  const startSyncProgress = (id: string) => {
    // Reset progress
    setSyncProgress(prev => ({
      ...prev,
      [id]: 0
    }));
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        const currentProgress = prev[id] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Remove from active timers
          setSyncTimers(prev => {
            const newTimers = { ...prev };
            delete newTimers[id];
            return newTimers;
          });
          return prev;
        }
        return {
          ...prev,
          [id]: Math.min(currentProgress + 10, 100)
        };
      });
    }, 300);
    
    // Store the interval timer reference
    setSyncTimers(prev => ({
      ...prev,
      [id]: interval
    }));
  };
  
  // Start scheduled sync for an account
  const scheduleSync = (id: string, intervalMinutes: number = 60) => {
    // Convert minutes to milliseconds
    const intervalMs = intervalMinutes * 60 * 1000;
    
    // Initial sync
    startSyncProgress(id);
    
    // Setup interval for recurring syncs
    const timer = setInterval(() => {
      toast({
        title: "Auto-Sync Started",
        description: "Scheduled synchronization in progress",
      });
      
      startSyncProgress(id);
    }, intervalMs);
    
    // Store the timer
    setSyncTimers(prev => ({
      ...prev,
      [`scheduled_${id}`]: timer
    }));
    
    return () => {
      clearInterval(timer);
    };
  };
  
  // Cancel all syncs for an account
  const cancelSync = (id: string) => {
    // Clear immediate sync timer
    if (syncTimers[id]) {
      clearInterval(syncTimers[id]);
    }
    
    // Clear scheduled sync timer
    if (syncTimers[`scheduled_${id}`]) {
      clearInterval(syncTimers[`scheduled_${id}`]);
    }
    
    // Remove from timers state
    setSyncTimers(prev => {
      const newTimers = { ...prev };
      delete newTimers[id];
      delete newTimers[`scheduled_${id}`];
      return newTimers;
    });
    
    // Reset progress
    setSyncProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };
  
  // Clean up all timers on unmount
  const cleanupAllSyncs = () => {
    Object.values(syncTimers).forEach(timer => {
      clearInterval(timer);
    });
  };
  
  return {
    syncProgress,
    startSyncProgress,
    scheduleSync,
    cancelSync,
    cleanupAllSyncs
  };
};
