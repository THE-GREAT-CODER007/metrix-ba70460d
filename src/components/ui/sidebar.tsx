// src/components/ui/Sidebar.tsx

import React, { useState, useEffect } from 'react';
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
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Accounts', icon: <Users size={20} />, path: '/accounts' },
    { name: 'Strategy', icon: <LineChart size={20} />, path: '/strategy' },
    { name: 'Backtesting', icon: <ArrowLeftRight size={20} />, path: '/backtesting' },
    { name: 'Journal', icon: <BookText size={20} />, path: '/journal' },
    { name: 'Performance', icon: <BarChart3 size={20} />, path: '/performance' },
    { name: 'Analytics', icon: <AreaChart size={20} />, path: '/analytics' },
    { name: 'News', icon: <Newspaper size={20} />, path: '/news' },
    { name: 'Terminal', icon: <Terminal size={20} />, path: '/terminal' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className={`min-h-screen border-r border-gray-800 bg-metrix-navy flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10">
            <img src="/logo.svg" alt="Metrix Logo" className="h-full w-full" />
          </div>
          {!isCollapsed && <span className="font-bold text-2xl tracking-wider text-white">METRIX</span>}
        </Link>
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col flex-1 py-6 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            title={isCollapsed ? item.name : ''}
            className={`flex items-center gap-3 px-4 py-3 rounded-md mb-1 transition-colors ${
              location.pathname === item.path
                ? 'bg-metrix-blue/10 text-metrix-blue'
                : 'text-gray-400 hover:bg-metrix-blue/5 hover:text-gray-300'
            }`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
