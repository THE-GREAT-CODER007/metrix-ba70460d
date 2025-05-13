
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-metrix-dark">
      <Sidebar />
      
      <div className="flex-1">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8 h-9 bg-metrix-navy border-gray-800" />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="relative text-gray-400 hover:text-white">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link to="/profile">
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-metrix-blue transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
