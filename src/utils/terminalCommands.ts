
/**
 * Utility functions for processing terminal commands
 */

export type CommandResponseType = 'info' | 'error' | 'success' | 'system' | 'output';

export interface CommandResponse {
  type: CommandResponseType;
  content: string;
}

/**
 * Process a terminal command and return a response
 */
export const processCommand = (cmd: string): CommandResponse => {
  const command = cmd.trim().toLowerCase();
  
  // Basic commands
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
  } 
  
  // Market data commands
  else if (command.startsWith('market ')) {
    const symbol = command.split(' ')[1]?.toUpperCase();
    if (!symbol) {
      return { type: 'error', content: 'Error: Please specify a symbol (e.g., market AAPL)' };
    }
    
    // Mock market data response
    return { 
      type: 'info', 
      content: `Market Data for ${symbol}:\nPrice: $${(100 + Math.random() * 200).toFixed(2)}\nChange: ${(Math.random() * 5 - 2.5).toFixed(2)}%\nVolume: ${Math.floor(Math.random() * 1000000).toLocaleString()}\nBid: $${(100 + Math.random() * 200).toFixed(2)}\nAsk: $${(100 + Math.random() * 200).toFixed(2)}` 
    };
  } 
  
  // Trading commands
  else if (command.startsWith('buy ') || command.startsWith('sell ')) {
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

/**
 * Parse a script of multiple commands
 */
export const parseScript = (script: string): string[] => {
  return script
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
};

/**
 * Generate example commands for demonstration
 */
export const getExampleCommands = (): string[] => {
  return [
    'status',
    'account',
    'market AAPL',
    'position',
    'buy AAPL 10 165.50'
  ];
};
