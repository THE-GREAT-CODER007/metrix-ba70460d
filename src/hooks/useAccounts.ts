
import { useAccountState } from './account/useAccountState';
import { useAccountActions } from './account/useAccountActions';
import { useIntegrations } from './useIntegrations';

export const useAccounts = () => {
  const state = useAccountState();
  const actions = useAccountActions();
  const { integrations } = useIntegrations();

  return {
    // State
    accountsList: state.accountsList,
    filteredAccounts: state.filteredAccounts,
    isAddDialogOpen: state.isAddDialogOpen,
    setIsAddDialogOpen: state.setIsAddDialogOpen,
    editingAccount: state.editingAccount,
    setEditingAccount: state.setEditingAccount,
    activeFilter: state.activeFilter,
    formData: state.formData,
    setFormData: state.setFormData,
    isOAuthDialogOpen: state.isOAuthDialogOpen,
    setIsOAuthDialogOpen: state.setIsOAuthDialogOpen,
    selectedIntegration: state.selectedIntegration,
    setSelectedIntegration: state.setSelectedIntegration,
    
    // Integrations
    integrations,
    
    // Actions
    syncProgress: actions.syncProgress,
    handleAddAccount: actions.handleAddAccount,
    handleEditAccount: actions.handleEditAccount,
    handleDeleteAccount: actions.handleDeleteAccount,
    handleEditClick: actions.handleEditClick,
    handleIntegrationConnect: actions.handleIntegrationConnect,
    handleOAuthConnect: actions.handleOAuthConnect,
    handleStatusToggle: actions.handleStatusToggle,
    handleSyncAccount: actions.handleSyncAccount,
    handleAutoSyncToggle: actions.handleAutoSyncToggle,
    handleFilterChange: state.handleFilterChange,
  };
};
