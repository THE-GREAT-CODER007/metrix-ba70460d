
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Check, Clock, ArrowRight, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'trade' | 'system' | 'news' | 'alert';
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Trade Executed',
    message: 'Buy AAPL at $189.25 executed successfully',
    time: '2 minutes ago',
    read: false,
    type: 'trade'
  },
  {
    id: '2',
    title: 'Price Alert',
    message: 'BTC/USD has reached your target price of $64,500',
    time: '15 minutes ago',
    read: false,
    type: 'alert'
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Platform will undergo maintenance in 3 hours',
    time: '1 hour ago',
    read: true,
    type: 'system'
  },
  {
    id: '4',
    title: 'Market News',
    message: 'Federal Reserve announces interest rate decision',
    time: '3 hours ago',
    read: true,
    type: 'news'
  }
];

export const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case 'trade':
        return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case 'alert':
        return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
      case 'system':
        return <div className="w-2 h-2 rounded-full bg-blue-500" />;
      case 'news':
        return <div className="w-2 h-2 rounded-full bg-purple-500" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative w-8 h-8 p-0 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-metrix-card border-gray-800">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </h3>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleMarkAllAsRead}>
            <Check className="w-3 h-3 mr-1" />
            Mark all read
          </Button>
        </div>
        
        <Separator className="bg-gray-800" />
        
        <div className="max-h-[320px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 border-b border-gray-800 hover:bg-metrix-navy/50 cursor-pointer ${notification.read ? 'opacity-70' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="mt-1">
                    {getIconForType(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-2 flex justify-between items-center bg-metrix-navy/30">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8" 
            onClick={() => {
              setIsOpen(false);
              navigate('/settings');
            }}
          >
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8"
            onClick={() => console.log('View all notifications')}
          >
            View all
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
