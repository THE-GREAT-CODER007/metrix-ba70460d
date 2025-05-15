import { useState, useRef, useEffect } from 'react';
import { processCommand } from '@/utils/terminalCommands';
import { useToast } from '@/hooks/use-toast';

interface TerminalOptions {
  userRole: 'admin' | 'developer' | 'user';
}

interface HistoryItem {
  type: 'input' | 'info' | 'error' | 'success' | 'system' | 'output';
  content: string;
}

const useTerminal = ({ userRole }: TerminalOptions) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'info', content: 'Welcome to Metrix Terminal v2.0.0' },
    { type: 'info', content: "Type 'help' for available commands" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);

    try {
      // Process command and get response
      const response = await processCommand(cmd, userRole);

      // Special handling for system commands
      if (response.type === 'system' && response.content === 'Terminal cleared') {
        setHistory([{ type: 'info', content: 'Terminal cleared' }]);
        return;
      }

      // Add response to history
      setHistory(prev => [...prev, response]);

      // Show toast for important operations
      if (response.type === 'success' || response.type === 'error') {
        toast({
          title: response.type === 'success' ? 'Success' : 'Error',
          description: response.content,
          variant: response.type === 'success' ? 'default' : 'destructive',
        });
      }
    } catch (error) {
      setHistory(prev => [...prev, {
        type: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred'
      }]);
    }
  };

  const clearTerminal = () => {
    setHistory([{ type: 'info', content: 'Terminal cleared' }]);
  };

  return {
    command,
    setCommand,
    history,
    executeCommand,
    clearTerminal,
    scrollRef
  };
};

export default useTerminal;