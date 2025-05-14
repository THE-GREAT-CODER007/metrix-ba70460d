
import React, { useState, createContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';

export const SidebarContext = createContext({
  collapsed: false,
  toggleSidebar: () => {},
});

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      <div className={`${collapsed ? 'w-20' : 'w-64'} min-h-screen bg-metrix-navy border-r border-gray-800 flex flex-col relative transition-all duration-300`}>
        {/* Toggle button */}
        <button 
          className="absolute -right-3 top-20 bg-metrix-blue text-white rounded-full p-1 shadow-lg z-10"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <SidebarHeader collapsed={collapsed} />
        <SidebarMenu collapsed={collapsed} />
        <SidebarFooter collapsed={collapsed} />
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
