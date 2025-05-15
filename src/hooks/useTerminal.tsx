
import { useState, useEffect, useRef } from 'react';
import { processCommand, CommandResponse } from '@/utils/terminalCommands';

export type TerminalHistoryItem = {
  type: 'input' | 'info' | 'error' | 'success' | 'system' | 'output' | 'ai' | 'warning';
  content: string;
};

interface UseTerminalOptions {
  initialHistory?: TerminalHistoryItem[];
  autoScroll?: boolean;
  userRole?: string;  // Pass current user role for command permission checks
}

export const useTerminal = (options?: UseTerminalOptions) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<TerminalHistoryItem[]>(
    options?.initialHistory || [
      { type: 'info', content: 'Welcome to Metrix Trading Terminal' },
      { type: 'info', content: "Type 'help' to see available commands" },
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

  // Make this async to support AI calls, API calls, and async command processing
  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return false;

    setHistory((prev) => [...prev, { type: 'input', content: cmd }]);

    // Pass userRole or context to processCommand for permission checks
    const response: CommandResponse = await processCommand(cmd, { userRole: options?.userRole });

    if (response.type === 'system' && response.content === 'Terminal cleared') {
      setHistory([{ type: 'info', content: 'Terminal cleared' }]);
      return true;
    }

    setHistory((prev) => [...prev, { type: response.type, content: response.content }]);
    return true;
  };

  const clearTerminal = () => {
    setHistory([{ type: 'info', content: 'Terminal cleared' }]);
  };

  // Support async/await for script execution as well
  const executeScript = async (script: string): Promise<number> => {
    if (!script.trim()) {
      return 0;
    }

    const commands = script
      .trim()
      .split('\n')
      .filter((line) => line.trim() && !line.trim().startsWith('#'));

    let count = 0;
    for (const cmd of commands) {
      const executed = await executeCommand(cmd);
      if (executed) count++;
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
  };
};

export default useTerminal;
