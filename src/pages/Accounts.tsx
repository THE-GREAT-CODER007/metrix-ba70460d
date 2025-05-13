
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useAccounts } from '@/hooks/useAccounts';
import AccountForm from '@/components/accounts/AccountForm';
import AccountTabs from '@/components/accounts/AccountTabs';
import OAuthConnectionDialog from '@/components/accounts/OAuthConnectionDialog';

const Accounts = () => {
  const {
    filteredAccounts,
    integrations,
    isAddDialogOpen,
    setIsAddDialogOpen,
    editingAccount,
    setEditingAccount,
    activeFilter,
    formData,
    setFormData,
    isOAuthDialogOpen,
    setIsOAuthDialogOpen,
    selectedIntegration,
    syncProgress,
    handleAddAccount,
    handleEditAccount,
    handleDeleteAccount,
    handleEditClick,
    handleIntegrationConnect,
    handleOAuthConnect,
    handleStatusToggle,
    handleSyncAccount,
    handleAutoSyncToggle,
    handleFilterChange,
  } = useAccounts();

  // Find the selected integration name for the OAuth dialog
  const selectedIntegrationName = integrations.find(i => i.id === selectedIntegration)?.name || 'Broker';

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trading Accounts</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-metrix-blue hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] bg-metrix-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl">Add Trading Account</DialogTitle>
            </DialogHeader>
            <AccountForm 
              formData={formData}
              setFormData={setFormData}
              isEditing={false}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleAddAccount}>Add Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingAccount} onOpenChange={(open) => !open && setEditingAccount(null)}>
          <DialogContent className="sm:max-w-[550px] bg-metrix-card border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl">Edit Account</DialogTitle>
            </DialogHeader>
            <AccountForm 
              formData={formData}
              setFormData={setFormData}
              isEditing={true}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingAccount(null)}>Cancel</Button>
              <Button className="bg-metrix-blue hover:bg-blue-700" onClick={handleEditAccount}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* OAuth Connection Dialog */}
        <OAuthConnectionDialog 
          isOpen={isOAuthDialogOpen}
          onClose={() => setIsOAuthDialogOpen(false)}
          onConnect={handleOAuthConnect}
          integrationName={selectedIntegrationName}
        />
      </div>

      <AccountTabs
        accounts={filteredAccounts}
        integrations={integrations}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onEdit={handleEditClick}
        onDelete={handleDeleteAccount}
        onStatusToggle={handleStatusToggle}
        onSync={handleSyncAccount}
        onAutoSyncToggle={handleAutoSyncToggle}
        onIntegrationConnect={handleIntegrationConnect}
        syncProgress={syncProgress}
      />
    </DashboardLayout>
  );
};

export default Accounts;
