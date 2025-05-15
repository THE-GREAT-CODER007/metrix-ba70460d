
import { OpenAI } from 'openai'; // Example AI integration
import { supabase } from '@/lib/supabaseClient';

export type CommandResponseType = 'info' | 'error' | 'success' | 'system' | 'output';

export interface CommandResponse {
  type: CommandResponseType;
  content: string;
}

const mockTriggerUIFunction = (fnName: string): boolean => {
  console.log(`Triggering UI function: ${fnName}`);
  return true;
};

const mockFileSystemCheck = (filePath: string): string => {
  return `✅ File ${filePath} created with default content.`;
};

export const processCommand = async (cmd: string, role: string = 'user'): Promise<CommandResponse> => {
  const command = cmd.trim().toLowerCase();

  // Permissions-based block
  const restrictedCommands = ['delete-user', 'rebuild', 'add-library'];
  if (restrictedCommands.includes(command.split(' ')[0]) && role !== 'admin') {
    return { type: 'error', content: `❌ You do not have permission to run "${command}"` };
  }

  // HELP
  if (command === 'help') {
    return {
      type: 'info',
      content: `
Available commands:
- help, clear, version, status, account, position, order
- market [symbol], buy [symbol] [qty] [price], sell [...], cancel [id]
- ai fix <code>: AI code review
- ai add <feature>: AI feature suggestion
- create-file [path]
- trigger [functionName]
- add-library [lib-name]
- rebuild
- save-script [name]
- load-script [name]`
    };
  }

  if (command === 'clear') {
    return { type: 'system', content: 'Terminal cleared' };
  }

  if (command === 'status') {
    return {
      type: 'success',
      content: '✅ System: Online\n🔗 Exchange: Connected\n📈 Market: Open'
    };
  }

  if (command === 'version') {
    return {
      type: 'info',
      content: 'Metrix Terminal v2.0 | AI+API Enabled | Build 2025.05.15'
    };
  }

  // Mock AI features
  if (command.startsWith('ai fix ')) {
    const code = cmd.slice(7);
    return {
      type: 'output',
      content: `🧠 AI Fix Applied:\n${code}\n✅ Syntax corrected and linted.`
    };
  }

  if (command.startsWith('ai add ')) {
    const feature = cmd.slice(7);
    return {
      type: 'output',
      content: `🧠 AI Feature Plan for "${feature}":\n1. Create new module\n2. Connect to UI\n3. Test integration`
    };
  }

  // Mock Trading commands
  if (command.startsWith('buy ') || command.startsWith('sell ')) {
    const [action, symbol, qty, price] = cmd.split(' ');
    if (!symbol || !qty || !price) {
      return { type: 'error', content: `❌ Invalid ${action} format.` };
    }
    return {
      type: 'success',
      content: `✅ ${action.toUpperCase()} Order Placed\nSymbol: ${symbol}\nQty: ${qty}\nPrice: ${price}`
    };
  }

  if (command.startsWith('market ')) {
    const symbol = command.split(' ')[1]?.toUpperCase();
    return {
      type: 'info',
      content: `📊 Market Data: ${symbol}\nPrice: $${(100 + Math.random() * 200).toFixed(2)}`
    };
  }

  if (command.startsWith('cancel ')) {
    return { type: 'success', content: `✅ Order ${command.split(' ')[1]} canceled.` };
  }

  // UI Trigger
  if (command.startsWith('trigger ')) {
    const fnName = cmd.split(' ')[1];
    if (mockTriggerUIFunction(fnName)) {
      return { type: 'success', content: `✅ UI function "${fnName}" triggered.` };
    }
    return { type: 'error', content: `❌ Function "${fnName}" failed.` };
  }

  // Create file
  if (command.startsWith('create-file ')) {
    const filePath = cmd.split(' ')[1];
    return { type: 'success', content: mockFileSystemCheck(filePath) };
  }

  // Add library
  if (command.startsWith('add-library ')) {
    const lib = cmd.split(' ')[1];
    return {
      type: 'success',
      content: `📦 Library "${lib}" added to project dependencies.`
    };
  }

  // Rebuild app
  if (command === 'rebuild') {
    return {
      type: 'system',
      content: '🛠️ Rebuilding app...\n✅ Build complete.\n♻️ Reloading...'
    };
  }

  // Supabase save/load script mock
  if (command.startsWith('save-script ')) {
    const name = cmd.split(' ')[1];
    // await supabase.from('scripts').insert({ name, content: '...' });
    return { type: 'success', content: `💾 Script "${name}" saved.` };
  }

  if (command.startsWith('load-script ')) {
    const name = cmd.split(' ')[1];
    // const { data } = await supabase.from('scripts').select('*').eq('name', name);
    return { type: 'info', content: `📂 Script "${name}" loaded:\n(status)\n(market AAPL)` };
  }

  return {
    type: 'error',
    content: `❌ Unknown command: "${cmd}"`
  };
};
