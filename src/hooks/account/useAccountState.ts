
import { useState } from 'react';
import { AccountType } from '@/types/account';
import { useAccountData } from '../useAccountData';

interface FormDataType {
  id?: string;
  name: string;
  type: string;
  balance: string;
  currency: string;
  classification: string;
  broker: string;
  accountNumber: string;
  leverage: string;
  autoSync: boolean;
  syncInterval: string;
}

export const useAccountState = () => {
  const { accountsList, setAccountsList } = useAccountData();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<null | AccountType>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isOAuthDialogOpen, setIsOAuthDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const defaultFormData: FormDataType = {
    name: '',
    type: 'Cash',
    balance: '',
    currency: 'USD',
    classification: 'real',
    broker: '',
    accountNumber: '',
    leverage: '1:100',
    autoSync: true,
    syncInterval: '60',
  };

  const [formData, setFormData] = useState<FormDataType>(defaultFormData);

  const filteredAccounts = activeFilter 
    ? accountsList.filter(account => account.classification === activeFilter)
    : accountsList;

  const handleFilterChange = (classification: string | null) => {
    setActiveFilter(classification);
  };

  return {
    accountsList,
    setAccountsList,
    filteredAccounts,
    isAddDialogOpen, 
    setIsAddDialogOpen,
    editingAccount,
    setEditingAccount,
    activeFilter,
    formData,
    setFormData,
    defaultFormData,
    isOAuthDialogOpen,
    setIsOAuthDialogOpen,
    selectedIntegration,
    setSelectedIntegration,
    handleFilterChange
  };
};

export type { FormDataType };
