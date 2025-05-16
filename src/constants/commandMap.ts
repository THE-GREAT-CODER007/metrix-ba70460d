
export interface Command {
  name: string;
  description: string;
  usage: string;
  category: 'system' | 'development' | 'database' | 'ui' | 'ai';
  role: 'admin' | 'developer' | 'user';
  handler: string;
}

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    usage: 'help [command]',
    category: 'system',
    role: 'user',
    handler: 'showHelp'
  },
  clear: {
    name: 'clear',
    description: 'Clear terminal screen',
    usage: 'clear',
    category: 'system',
    role: 'user',
    handler: 'clearTerminal'
  },
  create: {
    name: 'create',
    description: 'Create new file or component',
    usage: 'create [type] [name]',
    category: 'development',
    role: 'developer',
    handler: 'createFile'
  },
  install: {
    name: 'install',
    description: 'Install package',
    usage: 'install [package]',
    category: 'development',
    role: 'developer',
    handler: 'installPackage'
  },
  build: {
    name: 'build',
    description: 'Build the application',
    usage: 'build [mode]',
    category: 'development',
    role: 'admin',
    handler: 'buildApp'
  },
  ai: {
    name: 'ai',
    description: 'Get AI assistance',
    usage: 'ai [prompt]',
    category: 'ai',
    role: 'developer',
    handler: 'getAIHelp'
  },
  trigger: {
    name: 'trigger',
    description: 'Trigger UI action',
    usage: 'trigger [action]',
    category: 'ui',
    role: 'developer',
    handler: 'triggerAction'
  },
  status: {
    name: 'status',
    description: 'Check system status',
    usage: 'status',
    category: 'system',
    role: 'user',
    handler: 'checkSystemStatus'
  },
  dbcheck: {
    name: 'dbcheck',
    description: 'Check database connection',
    usage: 'dbcheck',
    category: 'database',
    role: 'developer',
    handler: 'checkDatabase'
  }
};

export const getCommand = (name: string): Command | undefined => {
  return commands[name];
};

export const getCommandsByCategory = (category: string): Command[] => {
  return Object.values(commands).filter(cmd => cmd.category === category);
};

export const getCommandsByRole = (role: string): Command[] => {
  return Object.values(commands).filter(cmd => cmd.role === role);
};
