/**
 * Terminal command processing module with advanced features:
 * - Role-based command access control
 * - AI-assisted code fixes and syntax checks (mocked)
 * - Dynamic addition of new functions/pages (mocked)
 * - Triggering UI functions (mocked)
 * - App rebuild and library install simulation
 * - Supabase + API integration placeholders
 */

export type CommandResponseType = 'info' | 'error' | 'success' | 'system' | 'output';

export interface CommandResponse {
  type: CommandResponseType;
  content: string;
}

// Mock user roles allowed to run certain commands
const adminOnlyCommands = ['rebuild', 'install', 'addfunction', 'addpage', 'fixcode', 'syntaxcheck'];
const devCommands = ['fixcode', 'syntaxcheck', 'addfunction', 'addpage'];

// Simulated delay helper for async mock responses
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Mock AI code fix - returns fixed code snippet or error
 */
async function aiFixCode(code: string): Promise<string> {
  await delay(800);
  return `// Fixed Code (mocked)\n${code.replace(/bug/g, 'fix')}`;
}

/**
 * Mock syntax check - returns success or error message
 */
async function syntaxCheck(code: string): Promise<string> {
  await delay(600);
  if (code.includes('error')) {
    return 'Syntax Error: Unexpected token "error"';
  }
  return 'Syntax Check Passed: No errors found';
}

/**
 * Process a terminal command string with userRole for security
 */
export const processCommand = async (
  cmd: string,
  userRole: 'admin' | 'developer' | 'user' = 'user'
): Promise<CommandResponse> => {
  const input = cmd.trim();
  const lowerCmd = input.toLowerCase();

  // Check for empty command
  if (!input) {
    return { type: 'error', content: 'No command entered' };
  }

  // Parse base command and arguments
  const parts = input.split(' ');
  const baseCmd = parts[0].toLowerCase();

  // Role validation helper
  const checkRole = (command: string): boolean => {
    if (adminOnlyCommands.includes(command) && userRole !== 'admin') {
      return false;
    }
    if (devCommands.includes(command) && !['admin', 'developer'].includes(userRole)) {
      return false;
    }
    return true;
  };

  // Basic commands
  if (baseCmd === 'help') {
    return {
      type: 'info',
      content: [
        'Available commands:',
        '- help: Show this help message',
        '- clear: Clear the terminal',
        '- status: Check system status',
        '- account: View account information',
        '- position: View open positions',
        '- order: View recent orders',
        '- market [symbol]: Get market data for symbol',
        '- buy [symbol] [quantity] [price]: Place buy order',
        '- sell [symbol] [quantity] [price]: Place sell order',
        '- cancel [orderid]: Cancel an order',
        '- version: Show system version',
        '- fixcode [code]: AI-assisted code fixing (dev/admin only)',
        '- syntaxcheck [code]: AI syntax checking (dev/admin only)',
        '- addfunction [name]: Add new terminal function (admin only)',
        '- addpage [name]: Add new UI page (admin only)',
        '- trigger [functionName]: Trigger UI function',
        '- rebuild: Rebuild app (admin only)',
        '- install [package]: Install new library (admin only)',
      ].join('\n'),
    };
  }

  if (baseCmd === 'clear') {
    return { type: 'system', content: 'Terminal cleared' };
  }

  if (baseCmd === 'status') {
    return {
      type: 'success',
      content: 'System status: Online | Connected to Exchange | Market is Open',
    };
  }

  if (baseCmd === 'account') {
    return {
      type: 'info',
      content: 'Account: Interactive Brokers | Balance: $25,432.87 | Margin Used: 15%',
    };
  }

  if (baseCmd === 'position') {
    return {
      type: 'info',
      content:
        'Open Positions:\n- AAPL: 10 shares @ $165.23 ($1,652.30)\n- MSFT: 15 shares @ $325.75 ($4,886.25)\n- TSLA: 5 shares @ $183.45 ($917.25)',
    };
  }

  if (baseCmd === 'order') {
    return {
      type: 'info',
      content: 'Recent Orders:\n- BUY AAPL 10 @ $165.23 (Filled)\n- SELL MSFT 5 @ $325.75 (Filled)',
    };
  }

  if (baseCmd === 'version') {
    return {
      type: 'info',
      content: 'Metrix Trading System v1.2.3 | Core v0.9.8 | API v2.1.0',
    };
  }

  // Market data
  if (baseCmd === 'market') {
    const symbol = parts[1]?.toUpperCase();
    if (!symbol) {
      return { type: 'error', content: 'Error: Please specify a symbol (e.g., market AAPL)' };
    }
    // Mock market data response
    return {
      type: 'info',
      content: `Market Data for ${symbol}:\nPrice: $${(100 + Math.random() * 200).toFixed(
        2
      )}\nChange: ${(Math.random() * 5 - 2.5).toFixed(2)}%\nVolume: ${Math.floor(
        Math.random() * 1000000
      ).toLocaleString()}\nBid: $${(100 + Math.random() * 200).toFixed(
        2
      )}\nAsk: $${(100 + Math.random() * 200).toFixed(2)}`,
    };
  }

  // Trading commands
  if (baseCmd === 'buy' || baseCmd === 'sell') {
    const action = baseCmd.toUpperCase();
    const symbol = parts[1]?.toUpperCase();
    const quantity = parts[2];
    const price = parts[3];

    if (!symbol || !quantity || !price) {
      return {
        type: 'error',
        content: `Error: Invalid ${action} command format. Use: ${action.toLowerCase()} [symbol] [quantity] [price]`,
      };
    }
    // Mock order placement
    const orderId = Math.floor(Math.random() * 1000000);
    return {
      type: 'success',
      content: `${action} Order Placed:\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: $${price}\nOrder ID: ${orderId}`,
    };
  }

  if (baseCmd === 'cancel') {
    const orderId = parts[1];
    if (!orderId) {
      return { type: 'error', content: 'Error: Please specify an order ID (e.g., cancel 123456)' };
    }
    // Mock cancel response
    return {
      type: 'success',
      content: `Order ${orderId} canceled successfully`,
    };
  }

  // AI-assisted commands
  if (baseCmd === 'fixcode') {
    if (!checkRole('fixcode')) {
      return { type: 'error', content: 'Permission denied: fixcode command requires developer/admin role' };
    }
    const codeToFix = input.slice(baseCmd.length).trim();
    if (!codeToFix) {
      return { type: 'error', content: 'Error: Please provide code to fix after fixcode command' };
    }
    const fixedCode = await aiFixCode(codeToFix);
    return { type: 'success', content: `AI Fixed Code:\n${fixedCode}` };
  }

  if (baseCmd === 'syntaxcheck') {
    if (!checkRole('syntaxcheck')) {
      return { type: 'error', content: 'Permission denied: syntaxcheck command requires developer/admin role' };
    }
    const codeToCheck = input.slice(baseCmd.length).trim();
    if (!codeToCheck) {
      return { type: 'error', content: 'Error: Please provide code to check after syntaxcheck command' };
    }
    const result = await syntaxCheck(codeToCheck);
    return { type: result.startsWith('Syntax Error') ? 'error' : 'success', content: result };
  }

  if (baseCmd === 'addfunction') {
    if (!checkRole('addfunction')) {
      return { type: 'error', content: 'Permission denied: addfunction command requires admin role' };
    }
    const funcName = parts[1];
    if (!funcName) {
      return { type: 'error', content: 'Error: Please specify a function name to add' };
    }
    // Mock adding function
    return { type: 'success', content: `New terminal function '${funcName}' added successfully (mock)` };
  }

  if (baseCmd === 'addpage') {
    if (!checkRole('addpage')) {
      return { type: 'error', content: 'Permission denied: addpage command requires admin role' };
    }
    const pageName = parts[1];
    if (!pageName) {
      return { type: 'error', content: 'Error: Please specify a page name to add' };
    }
    // Mock adding page
    return { type: 'success', content: `New UI page '${pageName}' added successfully (mock)` };
  }

  if (baseCmd === 'trigger') {
    const funcName = parts[1];
    if (!funcName) {
      return { type: 'error', content: 'Error: Please specify a UI function to trigger' };
    }
    // Mock triggering UI function
    return { type: 'success', content: `UI function '${funcName}' triggered successfully (mock)` };
  }

  if (baseCmd === 'rebuild') {
    if (!checkRole('rebuild')) {
      return { type: 'error', content: 'Permission denied: rebuild command requires admin role' };
    }
    // Mock rebuild delay
    await delay(1500);
    return { type: 'success', content: 'Application rebuilt successfully (mock)' };
  }

  if (baseCmd === 'install') {
    if (!checkRole('install')) {
      return { type: 'error', content: 'Permission denied: install command requires admin role' };
    }
    const pkg = parts[1];
    if (!pkg) {
      return { type: 'error', content: 'Error: Please specify a package/library to install' };
    }
    // Mock install delay
    await delay(1000);
    return { type: 'success', content: `Package '${pkg}' installed successfully (mock)` };
  }

  // Unknown command fallback
  return {
    type: 'error',
    content: `Unknown command: ${input}. Type 'help' for available commands.`,
  };
};
