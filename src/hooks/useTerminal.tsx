
import { useState, useEffect, useRef } from 'react';
import { processCommand, CommandResponse } from '@/utils/terminalCommands';

export type TerminalHistoryItem = {
  type: 'input' | 'info' | 'error' | 'success' | 'system' | 'output';
  content: string;
};

interface UseTerminalOptions {
  initialHistory?: TerminalHistoryItem[];
  autoScroll?: boolean;
  userRole?: 'admin' | 'developer' | 'user';
}

export const useTerminal = (options?: UseTerminalOptions) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<TerminalHistoryItem[]>(
    options?.initialHistory || [
      { type: 'info', content: 'Welcome to Metrix Trading Terminal' },
      { type: 'info', content: "Type 'help' to see available commands" }
    ]
  );
  const [autoScroll, setAutoScroll] = useState(options?.autoScroll !== false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userRole = options?.userRole || 'user';

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [history, autoScroll]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return false;
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);
    const response: CommandResponse = await processCommand(cmd, userRole);
    if (response.type === 'system' && response.content === 'Terminal cleared') {
      setHistory([{ type: 'info', content: 'Terminal cleared' }]);
      return true;
    }
    setHistory(prev => [...prev, { type: response.type, content: response.content }]);
    return true;
  };

  const clearTerminal = () => {
    setHistory([{ type: 'info', content: 'Terminal cleared' }]);
  };

  const executeScript = async (script: string): Promise<number> => {
    const commands = script
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));

    let count = 0;
    for (const cmd of commands) {
      if (await executeCommand(cmd)) count++;
    }
    return count;
  };

  return {
    command,
    setCommand,
    history,
    setHistory,
    autoScroll,
    setAutoScroll,
    executeCommand,
    clearTerminal,
    executeScript,
    scrollRef,
    userRole
  };
};

export default useTerminal;
