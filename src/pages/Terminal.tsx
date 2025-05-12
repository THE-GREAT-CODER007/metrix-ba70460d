
import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  ChevronRight, 
  XCircle, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Terminal as TerminalIcon, 
  Code, 
  Database 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Terminal command processor
const processCommand = (cmd: string): { type: string; content: string } => {
  const command = cmd.trim().toLowerCase();
  
  if (command === 'help') {
    return {
      type: 'info',
      content: `Available commands:
      - help: Show this help message
      - clear: Clear the terminal
      - status: Check system status
      - account: View account information
      - position: View open positions
      - order: View recent orders
      - market [symbol]: Get market data for symbol
      - buy [symbol] [quantity] [price]: Place buy order
      - sell [symbol] [quantity] [price]: Place sell order
      - cancel [orderid]: Cancel an order
      - version: Show system version`,
    };
  } else if (command === 'clear') {
    return { type: 'system', content: 'Terminal cleared' };
  } else if (command === 'status') {
    return { 
      type: 'success', 
      content: 'System status: Online | Connected to Exchange | Market is Open' 
    };
  } else if (command === 'account') {
    return { 
      type: 'info', 
      content: 'Account: Interactive Brokers | Balance: $25,432.87 | Margin Used: 15%' 
    };
  } else if (command === 'position') {
    return { 
      type: 'info', 
      content: 'Open Positions:\n- AAPL: 10 shares @ $165.23 ($1,652.30)\n- MSFT: 15 shares @ $325.75 ($4,886.25)\n- TSLA: 5 shares @ $183.45 ($917.25)' 
    };
  } else if (command === 'order') {
    return { 
      type: 'info', 
      content: 'Recent Orders:\n- BUY AAPL 10 @ $165.23 (Filled)\n- SELL MSFT 5 @ $325.75 (Filled)' 
    };
  } else if (command === 'version') {
    return { 
      type: 'info', 
      content: 'Metrix Trading System v1.2.3 | Core v0.9.8 | API v2.1.0' 
    };
  } else if (command.startsWith('market ')) {
    const symbol = command.split(' ')[1]?.toUpperCase();
    if (!symbol) {
      return { type: 'error', content: 'Error: Please specify a symbol (e.g., market AAPL)' };
    }
    
    // Mock market data response
    return { 
      type: 'info', 
      content: `Market Data for ${symbol}:\nPrice: $${(100 + Math.random() * 200).toFixed(2)}\nChange: ${(Math.random() * 5 - 2.5).toFixed(2)}%\nVolume: ${Math.floor(Math.random() * 1000000).toLocaleString()}\nBid: $${(100 + Math.random() * 200).toFixed(2)}\nAsk: $${(100 + Math.random() * 200).toFixed(2)}` 
    };
  } else if (command.startsWith('buy ') || command.startsWith('sell ')) {
    const parts = command.split(' ');
    const action = parts[0].toUpperCase();
    const symbol = parts[1]?.toUpperCase();
    const quantity = parts[2];
    const price = parts[3];
    
    if (!symbol || !quantity || !price) {
      return { 
        type: 'error', 
        content: `Error: Invalid ${action} command format. Use: ${action.toLowerCase()} [symbol] [quantity] [price]` 
      };
    }
    
    // Mock order placement response
    const orderId = Math.floor(Math.random() * 1000000);
    return { 
      type: 'success', 
      content: `${action} Order Placed:\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: $${price}\nOrder ID: ${orderId}` 
    };
  } else if (command.startsWith('cancel ')) {
    const orderId = command.split(' ')[1];
    
    if (!orderId) {
      return { type: 'error', content: 'Error: Please specify an order ID (e.g., cancel 123456)' };
    }
    
    // Mock cancel response
    return { 
      type: 'success', 
      content: `Order ${orderId} canceled successfully` 
    };
  } else {
    return { 
      type: 'error', 
      content: `Unknown command: ${cmd}. Type 'help' for available commands.` 
    };
  }
};

const Terminal = () => {
  const { toast } = useToast();
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<{type: 'input' | 'info' | 'error' | 'success' | 'system' | 'output'; content: string}[]>([
    {type: 'info', content: 'Welcome to Metrix Trading Terminal v1.2.3'},
    {type: 'info', content: "Type 'help' to see available commands"},
  ]);
  const [script, setScript] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [history, autoScroll]);

  const handleCommand = () => {
    if (!command.trim()) return;
    
    setHistory(prev => [...prev, {type: 'input', content: command}]);
    
    // Process command
    const response = processCommand(command);
    
    if (response.type === 'system' && response.content === 'Terminal cleared') {
      setHistory([{type: 'info', content: 'Terminal cleared'}]);
      setCommand('');
      return;
    }
    
    setHistory(prev => [...prev, {type: response.type as any, content: response.content}]);
    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  const clearTerminal = () => {
    setHistory([{type: 'info', content: 'Terminal cleared'}]);
  };
  
  const executeScript = () => {
    if (!script.trim()) {
      toast({
        title: "Empty Script",
        description: "Please enter commands to execute",
        variant: "destructive",
      });
      return;
    }
    
    const commands = script.trim().split('\n');
    
    toast({
      title: "Script Execution Started",
      description: `Executing ${commands.length} commands...`,
    });
    
    // Execute each command with a slight delay
    let index = 0;
    const executeNext = () => {
      if (index < commands.length) {
        const cmd = commands[index].trim();
        if (cmd) {
          setHistory(prev => [...prev, {type: 'input', content: cmd}]);
          const response = processCommand(cmd);
          setHistory(prev => [...prev, {type: response.type as any, content: response.content}]);
        }
        index++;
        setTimeout(executeNext, 500);
      } else {
        toast({
          title: "Script Executed",
          description: "All commands have been processed",
        });
      }
    };
    
    executeNext();
  };

  const getIconForMessageType = (type: string) => {
    switch (type) {
      case 'info': return <Info className="h-4 w-4 text-blue-400" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'system': return <TerminalIcon className="h-4 w-4 text-gray-400" />;
      case 'input': return <ChevronRight className="h-4 w-4 text-metrix-cyan" />;
      default: return null;
    }
  };

  const getClassForMessageType = (type: string) => {
    switch (type) {
      case 'info': return "text-blue-400";
      case 'error': return "text-red-400";
      case 'success': return "text-green-400";
      case 'system': return "text-gray-400";
      case 'input': return "text-metrix-cyan";
      default: return "text-gray-300";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Terminal</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearTerminal}>
            <XCircle className="mr-2 h-4 w-4" /> Clear Terminal
          </Button>
        </div>
      </div>

      <Tabs defaultValue="command" className="mb-4">
        <TabsList className="bg-metrix-navy border-gray-800">
          <TabsTrigger value="command">Command Terminal</TabsTrigger>
          <TabsTrigger value="script">Script Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="command" className="mt-4">
          <Card className="bg-metrix-card border-gray-800 mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Command Terminal</CardTitle>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autoscroll" 
                    checked={autoScroll}
                    onCheckedChange={(checked) => setAutoScroll(!!checked)}
                  />
                  <Label htmlFor="autoscroll" className="text-sm text-gray-400">Auto-scroll</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea 
                ref={scrollAreaRef}
                className="h-[400px] rounded-md border border-gray-800 bg-black p-4 font-mono text-sm"
              >
                {history.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className={`flex items-start ${getClassForMessageType(item.type)}`}>
                      <div className="mr-2 mt-1">{getIconForMessageType(item.type)}</div>
                      <div className="whitespace-pre-wrap">{item.content}</div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              
              <div className="flex mt-4 gap-2">
                <Input 
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command..."
                  className="font-mono bg-metrix-navy border-gray-800"
                />
                <Button onClick={handleCommand} className="bg-metrix-blue hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="script" className="mt-4">
          <Card className="bg-metrix-card border-gray-800 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Script Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter multiple commands, one per line..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="h-[400px] font-mono bg-metrix-navy border-gray-800 mb-4"
              />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setScript('')}>
                  <XCircle className="mr-2 h-4 w-4" /> Clear
                </Button>
                <Button onClick={executeScript} className="bg-metrix-blue hover:bg-blue-700">
                  <Code className="mr-2 h-4 w-4" /> Execute Script
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Terminal;
