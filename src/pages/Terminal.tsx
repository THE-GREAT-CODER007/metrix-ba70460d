
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronRight, XCircle } from "lucide-react";

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<{type: 'input' | 'output', content: string}[]>([
    {type: 'output', content: 'Welcome to Metrix Trading Terminal'},
    {type: 'output', content: 'Type "help" to see available commands'},
  ]);

  const handleCommand = () => {
    if (!command.trim()) return;
    
    setHistory(prev => [...prev, {type: 'input', content: command}]);
    
    // Simple command processing
    let response = '';
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'help') {
      response = 'Available commands: help, clear, status, account, position, order';
    } else if (cmd === 'clear') {
      setHistory([{type: 'output', content: 'Terminal cleared'}]);
      setCommand('');
      return;
    } else if (cmd === 'status') {
      response = 'System status: Online | Connected to Exchange | Market is Open';
    } else if (cmd === 'account') {
      response = 'Account: Interactive Brokers | Balance: $25,432.87 | Margin Used: 15%';
    } else if (cmd === 'position') {
      response = 'Open Positions: AAPL (10), MSFT (15), TSLA (5)';
    } else if (cmd === 'order') {
      response = 'Recent Orders: BUY AAPL 10 @ $165.23, SELL MSFT 5 @ $325.75';
    } else {
      response = `Unknown command: ${command}`;
    }
    
    setHistory(prev => [...prev, {type: 'output', content: response}]);
    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  const clearTerminal = () => {
    setHistory([{type: 'output', content: 'Terminal cleared'}]);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Terminal</h1>
        <Button variant="outline" size="sm" onClick={clearTerminal}>
          <XCircle className="mr-2 h-4 w-4" /> Clear Terminal
        </Button>
      </div>

      <Card className="bg-metrix-card border-gray-800 mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Command Terminal</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] rounded-md border border-gray-800 bg-black p-4 font-mono text-sm">
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'input' ? (
                  <div className="flex items-center text-metrix-cyan">
                    <ChevronRight className="mr-2 h-4 w-4" />
                    <span>{item.content}</span>
                  </div>
                ) : (
                  <div className="text-gray-300 ml-6">{item.content}</div>
                )}
              </div>
            ))}
          </ScrollArea>
          
          <div className="flex mt-4 gap-2">
            <Input 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="font-mono"
            />
            <Button onClick={handleCommand} className="bg-metrix-blue hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Terminal;
