
export type CommandResponseType = 'info' | 'error' | 'success' | 'system' | 'output';

export interface CommandResponse {
  type: CommandResponseType;
  content: string;
}

// AI & backend mock
const mockAIResponse = async (prompt: string) => {
  return `AI Assistant: I reviewed your request "${prompt}" and suggest adding "useCustomHook.ts" to manage strategy logic.`;
};

const mockCreateFile = async (path: string) => {
  return `📄 File created at ${path}`;
};

export const processCommand = async (cmd: string, role: 'admin' | 'developer' | 'user'): Promise<CommandResponse> => {
  const command = cmd.trim();

  if (command === 'help') {
    return {
      type: 'info',
      content: `Available Commands:
- help, clear, status, version, market, account
- buy [sym] [qty] [price], sell [sym] [qty] [price]
- create file [path]
- rebuild app
- fix code [file]
- trigger [button]
- run script
- ai suggest [feature]
(Roles: admin, developer, user)`
    };
  }

  if (command === 'clear') {
    return { type: 'system', content: 'Terminal cleared' };
  }

  if (command === 'status') {
    return {
      type: 'success',
      content: 'System: ✅ Online | API: 🔗 Connected | Database: 📦 Synced'
    };
  }

  if (command === 'version') {
    return { type: 'info', content: 'Metrix v2.0.0 | AI Core v1.0 | Supabase v1.5' };
  }

  if (command.startsWith('create file')) {
    if (role === 'user') return { type: 'error', content: 'Permission denied: Developers/Admins only.' };
    const path = command.replace('create file ', '').trim();
    const result = await mockCreateFile(path);
    return { type: 'success', content: result };
  }

  if (command === 'rebuild app') {
    if (role !== 'admin') return { type: 'error', content: 'Permission denied: Admin only.' };
    return { type: 'success', content: '🛠️ Rebuilding app... Please wait.' };
  }

  if (command.startsWith('fix code')) {
    const file = command.replace('fix code', '').trim();
    return { type: 'success', content: `AI Assistant fixing code in ${file}... ✅ Done.` };
  }

  if (command.startsWith('trigger ')) {
    const target = command.replace('trigger ', '').trim();
    return { type: 'success', content: `Triggered UI action: ${target}` };
  }

  if (command.startsWith('ai suggest')) {
    const prompt = command.replace('ai suggest', '').trim();
    const suggestion = await mockAIResponse(prompt);
    return { type: 'output', content: suggestion };
  }

  return { type: 'error', content: `Unknown command: "${cmd}". Type 'help' for options.` };
};
