
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountIntegrationCard from "@/components/accounts/AccountIntegrationCard";
import AccountCard from '@/components/accounts/AccountCard';
import EmptyAccountsState from '@/components/accounts/EmptyAccountsState';
import AccountClassificationFilter from "@/components/accounts/AccountClassificationFilter";
import { AccountType, IntegrationType } from '@/types/account';

interface AccountTabsProps {
  accounts: AccountType[];
  integrations: IntegrationType[];
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  onEdit: (account: AccountType) => void;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string) => void;
  onSync: (id: string) => void;
  onAutoSyncToggle: (id: string) => void;
  onIntegrationConnect: (id: string) => void;
}

const AccountTabs: React.FC<AccountTabsProps> = ({
  accounts,
  integrations,
  activeFilter,
  onFilterChange,
  onEdit,
  onDelete,
  onStatusToggle,
  onSync,
  onAutoSyncToggle,
  onIntegrationConnect
}) => {
  return (
    <Tabs defaultValue="accounts" className="mb-6">
      <TabsList className="bg-metrix-navy border-gray-800">
        <TabsTrigger value="accounts">My Accounts</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="accounts" className="mt-4">
        <AccountClassificationFilter 
          onFilterChange={onFilterChange} 
          activeFilter={activeFilter} 
        />
        
        <div className="grid grid-cols-1 gap-6 mb-6 mt-4">
          {accounts.length > 0 ? (
            accounts.map(account => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
                onSync={onSync}
                onAutoSyncToggle={onAutoSyncToggle}
              />
            ))
          ) : (
            <EmptyAccountsState clearFilter={() => onFilterChange(null)} />
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="integrations" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map(integration => (
            <AccountIntegrationCard 
              key={integration.id}
              name={integration.name}
              description={integration.description}
              logo={integration.logo}
              onConnect={() => onIntegrationConnect(integration.id)}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AccountTabs;
