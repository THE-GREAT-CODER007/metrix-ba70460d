
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className={`p-6 border-b border-gray-800 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse-slow">
          <img src="/logo.svg" alt="Metrix Logo" className="h-full w-full" />
        </div>
        {!collapsed && <span className="font-bold text-2xl tracking-wider text-white">METRIX</span>}
      </Link>
    </div>
  );
};

export default SidebarHeader;
