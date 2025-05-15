
import React from 'react';
import useTerminal from '@/hooks/useTerminal';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const Terminal: React.FC = () => {
  const {
    command,
    setCommand,
    history,
    executeCommand,
    clearTerminal,
    scrollRef
  } = useTerminal({ userRole: 'admin' });

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await executeCommand(command);
      setCommand('');
    }
  };

  return (
    <div className="terminal-container p-4 bg-black text-green-400 h-full flex flex-col">
      <ScrollArea className="flex-1 overflow-auto" ref={scrollRef}>
        <div className="space-y-2">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line terminal-${item.type}`}>
              {item.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="pt-2">
        <Input
          value={command}
          onChange={e => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="> Enter command"
          className="bg-black text-green-300 border-green-500"
        />
      </div>
    </div>
  );
};

export default Terminal;
