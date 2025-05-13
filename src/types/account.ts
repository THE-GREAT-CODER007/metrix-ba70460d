
export type AccountType = {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive';
  classification: string;
  logo: string;
};

export type IntegrationType = {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'connected' | 'maintenance';
  logo: string;
};

export type SyncStatus = {
  lastSync: string;
  nextSync: string;
  isAutoSync: boolean;
  interval: number;
};

export type BrokerOAuthConfig = {
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
};
