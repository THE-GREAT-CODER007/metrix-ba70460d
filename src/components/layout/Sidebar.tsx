// src/components/layout/SidebarLayout.tsx

import React from 'react';
import Sidebar from '@/components/ui/Sidebar';

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-metrix-dark p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
