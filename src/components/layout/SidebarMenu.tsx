
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LineChart, 
  BookText, 
  BarChart3, 
  Terminal, 
  AreaChart, 
  Newspaper,
  Settings,
} from 'lucide-react';

interface SidebarMenuProps {
  collapsed: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Accounts', icon: <Users size={20} />, path: '/accounts' },
    { name: 'Strategy', icon: <LineChart size={20} />, path: '/strategy' },
    { name: 'Journal', icon: <BookText size={20} />, path: '/journal' },
    { name: 'Performance', icon: <BarChart3 size={20} />, path: '/performance' },
    { name: 'Terminal', icon: <Terminal size={20} />, path: '/terminal' },
    { name: 'Analytics', icon: <AreaChart size={20} />, path: '/analytics' },
    { name: 'News', icon: <Newspaper size={20} />, path: '/news' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="flex flex-col flex-1 py-6 px-4">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-md mb-1 transition-colors ${
            location.pathname === item.path
              ? 'bg-metrix-blue/10 text-metrix-blue'
              : 'text-gray-400 hover:bg-metrix-blue/5 hover:text-gray-300'
          }`}
          title={collapsed ? item.name : ""}
        >
          {item.icon}
          {!collapsed && <span>{item.name}</span>}
        </Link>
      ))}
    </div>
  );
};

export default SidebarMenu;
