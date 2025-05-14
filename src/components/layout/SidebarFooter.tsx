
import React from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    // In a real application, this would call auth logout function
    console.log('User logged out');
    // You would typically redirect to login page after logout
  };

  return (
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
  );
};

export default SidebarFooter;
