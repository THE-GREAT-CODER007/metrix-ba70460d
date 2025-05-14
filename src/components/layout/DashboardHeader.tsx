
import React from 'react';
import { useTheme } from "@/context/ThemeContext";
import { NotificationsPopover } from './NotificationsPopover';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MarketSession = {
  name: string;
  time: string;
  isActive: boolean;
};

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());
  
  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format current time with leading zeros
  const formatTime = (time: Date): string => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
  // Get market sessions with their status
  const getMarketSessions = (): MarketSession[] => {
    // This is simplified; in a real app you would use proper time zones and market hours
    const now = new Date();
    const hour = now.getUTCHours();
    
    return [
      {
        name: 'New York',
        time: formatTimeForZone(now, 'America/New_York'),
        isActive: isTimeWithinRange(hour, 14, 21) // 9am-4pm ET (UTC-5)
      },
      {
        name: 'London',
        time: formatTimeForZone(now, 'Europe/London'),
        isActive: isTimeWithinRange(hour, 8, 16) // 8am-4pm GMT (UTC)
      },
      {
        name: 'Tokyo',
        time: formatTimeForZone(now, 'Asia/Tokyo'),
        isActive: isTimeWithinRange(hour, 0, 6) // 9am-3pm JST (UTC+9)
      },
      {
        name: 'Sydney',
        time: formatTimeForZone(now, 'Australia/Sydney'),
        isActive: isTimeWithinRange(hour, 22, 6, true) // 9am-4pm AEST (UTC+10)
      }
    ];
  };

  const formatTimeForZone = (date: Date, timezone: string): string => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
        hour12: false
      }).format(date);
    } catch (error) {
      return '--:--';
    }
  };

  // Check if time is within range (handles overnight sessions)
  const isTimeWithinRange = (hour: number, start: number, end: number, overnight = false): boolean => {
    if (overnight) {
      return hour >= start || hour < end;
    }
    return hour >= start && hour < end;
  };
  
  const marketSessions = getMarketSessions();

  return (
    <div className={`flex justify-between items-center p-4 border-b bg-metrix-card border-gray-800 ${theme === 'light' ? 'shadow-sm' : ''}`}>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <div className="text-2xl font-semibold tracking-wider">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400">
            {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-2">
        {marketSessions.map((session) => (
          <div key={session.name} className="flex items-center px-3 py-1 rounded-md bg-metrix-navy">
            <div className={`w-2 h-2 rounded-full mr-2 ${session.isActive ? 'bg-green-500' : 'bg-gray-600'}`}></div>
            <div className="text-xs">
              <span className="font-bold">{session.name}</span>
              <span className="mx-1">•</span>
              <span className={session.isActive ? 'text-green-400' : 'text-gray-400'}>{session.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationsPopover />
        <Avatar 
          className="h-9 w-9 cursor-pointer transition-transform hover:scale-110 border-2 border-primary/30"
          onClick={() => navigate('/profile')}
        >
          <AvatarImage src="https://assets-global.website-files.com/5c4004b5b11b6939a133b415/62ebc617eafeec75b502e68c_Animation%201.gif" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default DashboardHeader;
