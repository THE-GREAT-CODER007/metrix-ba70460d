
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
