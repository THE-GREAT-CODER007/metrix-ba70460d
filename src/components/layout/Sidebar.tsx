
import React, { useState, useContext, createContext } from 'react';
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
  LogOut,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext';

export const SidebarContext = createContext({
  collapsed: false,
  toggleSidebar: () => {},
});

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  
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

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // In a real application, this would call auth logout function
    console.log('User logged out');
    // You would typically redirect to login page after logout
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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

        <div className={`p-6 border-b border-gray-800 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse-slow">
              <img src="/logo.svg" alt="Metrix Logo" className="h-full w-full" />
            </div>
            {!collapsed && <span className="font-bold text-2xl tracking-wider text-white">METRIX</span>}
          </Link>
        </div>
        
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

        {/* Theme toggle and logout buttons at the bottom */}
        <div className="p-4 border-t border-gray-800 flex flex-col gap-2">
          <button 
            onClick={toggleTheme}
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full px-4 py-3 rounded-md text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors`}
            title={collapsed ? 'Toggle Theme' : ""}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {!collapsed && <span>Toggle Theme</span>}
          </button>
          
          <button 
            onClick={handleLogout}
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full px-4 py-3 rounded-md text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors`}
            title={collapsed ? 'Logout' : ""}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
