import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  
  return (
    <div className="flex min-h-screen bg-metrix-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
