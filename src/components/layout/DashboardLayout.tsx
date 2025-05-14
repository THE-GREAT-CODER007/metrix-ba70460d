
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface MarketSession {
  name: string;
  isOpen: boolean;
  hours: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessions, setSessions] = useState<MarketSession[]>([
    { name: 'New York', isOpen: false, hours: '14:30 - 21:00' },
    { name: 'London', isOpen: false, hours: '8:00 - 16:30' },
    { name: 'Tokyo', isOpen: false, hours: '0:00 - 6:00' },
    { name: 'Sydney', isOpen: false, hours: '22:00 - 4:00' },
  ]);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Check which sessions are open
      const hour = now.getUTCHours();
      const updatedSessions = [...sessions];
      
      // New York (UTC 13:30 - 20:00)
      updatedSessions[0].isOpen = hour >= 13 && hour < 20;
      
      // London (UTC 8:00 - 16:30)
      updatedSessions[1].isOpen = hour >= 8 && hour < 16.5;
      
      // Tokyo (UTC 0:00 - 6:00)
      updatedSessions[2].isOpen = hour >= 0 && hour < 6;
      
      // Sydney (UTC 22:00 - 4:00)
      updatedSessions[3].isOpen = hour >= 22 || hour < 4;
      
      setSessions(updatedSessions);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatCairoTime = () => {
    // Cairo is UTC+2
    const cairoTime = new Date(currentTime);
    cairoTime.setHours(currentTime.getUTCHours() + 2);
    
    return cairoTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="flex min-h-screen bg-metrix-dark">
      <Sidebar />
      
      <div className="flex-1">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-8 h-9 bg-metrix-navy border-gray-800" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Clock size={16} className="text-metrix-blue" />
                <span className="font-mono text-sm">{formatCairoTime()} Cairo</span>
              </div>
              
              <div className="flex gap-1">
                {sessions.map((session) => (
                  <Badge 
                    key={session.name}
                    variant={session.isOpen ? "default" : "outline"}
                    className={`text-xs ${session.isOpen ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-gray-800/50 text-gray-500'}`}
                  >
                    {session.name}
                  </Badge>
                ))}
              </div>
            </div>
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
