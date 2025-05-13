
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
  Settings
} from 'lucide-react';

const Sidebar = () => {
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
    <div className="w-64 min-h-screen bg-metrix-navy border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10">
            <img src="/logo.svg" alt="Metrix Logo" className="h-full w-full" />
          </div>
          <span className="font-bold text-2xl tracking-wider text-white">METRIX</span>
        </Link>
      </div>
      
      <div className="flex flex-col flex-1 py-6 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-md mb-1 transition-colors ${
              location.pathname === item.path
                ? 'bg-metrix-blue/10 text-metrix-blue'
                : 'text-gray-400 hover:bg-metrix-blue/5 hover:text-gray-300'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
