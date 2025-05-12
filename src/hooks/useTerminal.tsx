
import { useState, useEffect, useRef } from 'react';
import { processCommand, CommandResponse } from '@/utils/terminalCommands';

export type TerminalHistoryItem = {
  type: 'input' | 'info' | 'error' | 'success' | 'system' | 'output';
  content: string;
};

interface UseTerminalOptions {
  initialHistory?: TerminalHistoryItem[];
  autoScroll?: boolean;
}

export const useTerminal = (options?: UseTerminalOptions) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<TerminalHistoryItem[]>(
    options?.initialHistory || [
      {type: 'info', content: 'Welcome to Metrix Trading Terminal'},
      {type: 'info', content: "Type 'help' to see available commands"},
    ]
  );
  const [autoScroll, setAutoScroll] = useState(options?.autoScroll !== false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [history, autoScroll]);

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return false;
    
    setHistory(prev => [...prev, {type: 'input', content: cmd}]);
    
    // Process command
    const response = processCommand(cmd);
    
    if (response.type === 'system' && response.content === 'Terminal cleared') {
      setHistory([{type: 'info', content: 'Terminal cleared'}]);
      return true;
    }
    
    setHistory(prev => [...prev, {type: response.type, content: response.content}]);
    return true;
  };

  const clearTerminal = () => {
    setHistory([{type: 'info', content: 'Terminal cleared'}]);
  };

  const executeScript = (script: string): number => {
    if (!script.trim()) {
      return 0;
    }
    
    const commands = script
      .trim()
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('#'));
    
    let count = 0;
    commands.forEach(cmd => {
      if (executeCommand(cmd)) {
        count++;
      }
    });
    
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
  };
};

export default useTerminal;
