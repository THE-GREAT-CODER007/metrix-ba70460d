
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Users, 
  Newspaper, 
  Folder, 
  LineChart, 
  Cog, 
  Activity, 
  UserPlus, 
  Terminal, 
  Bell, 
  Moon, 
  Sparkles 
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  status: 'live' | 'beta' | 'coming soon';
}

const features: Feature[] = [
  {
    title: "Real-time Trading Dashboard",
    description: "Interactive dashboard with real-time market data, personalized stats, and key metrics for traders.",
    icon: <BarChart3 className="h-6 w-6" />,
    category: "Analytics",
    status: "live"
  },
  {
    title: "Market News Integration",
    description: "Stay updated with financial market news and economic calendar events from various sources.",
    icon: <Newspaper className="h-6 w-6" />,
    category: "Data",
    status: "live"
  },
  {
    title: "Advanced Charting Tools",
    description: "Comprehensive technical analysis with multiple chart types, indicators, and drawing tools.",
    icon: <LineChart className="h-6 w-6" />,
    category: "Analytics",
    status: "live"
  },
  {
    title: "Multi-Account Management",
    description: "Connect and manage multiple trading accounts from different brokers in one place.",
    icon: <Users className="h-6 w-6" />,
    category: "Trading",
    status: "live"
  },
  {
    title: "Trade Journal",
    description: "Log and analyze your trades with detailed statistics and performance metrics.",
    icon: <Folder className="h-6 w-6" />,
    category: "Trading",
    status: "live"
  },
  {
    title: "Economic Calendar",
    description: "Track important economic events and releases that impact financial markets.",
    icon: <Calendar className="h-6 w-6" />,
    category: "Data",
    status: "live"
  },
  {
    title: "Market Sessions Tracker",
    description: "Monitor global market sessions and trading hours across different time zones.",
    icon: <Clock className="h-6 w-6" />,
    category: "Tools",
    status: "live"
  },
  {
    title: "Customizable Profile",
    description: "Personalize your trading profile with animated avatars and preferences.",
    icon: <UserPlus className="h-6 w-6" />,
    category: "Account",
    status: "live"
  },
  {
    title: "API Integrations",
    description: "Connect to external trading platforms and data providers via API keys.",
    icon: <Terminal className="h-6 w-6" />,
    category: "Connectivity",
    status: "live"
  },
  {
    title: "Smart Notifications",
    description: "Receive alerts for market events, price movements, and trade signals.",
    icon: <Bell className="h-6 w-6" />,
    category: "Tools",
    status: "live"
  },
  {
    title: "Performance Analytics",
    description: "Comprehensive analytics to track and improve your trading performance.",
    icon: <Activity className="h-6 w-6" />,
    category: "Analytics",
    status: "live"
  },
  {
    title: "Customizable Themes",
    description: "Switch between different themes and appearance options for the app interface.",
    icon: <Moon className="h-6 w-6" />,
    category: "Settings",
    status: "live"
  },
  {
    title: "Strategy Builder",
    description: "Create and backtest custom trading strategies with visual tools.",
    icon: <Sparkles className="h-6 w-6" />,
    category: "Trading",
    status: "beta"
  },
  {
    title: "User Preferences",
    description: "Customize your application settings for an optimal trading experience.",
    icon: <Cog className="h-6 w-6" />,
    category: "Settings",
    status: "live"
  }
];

export const AppFeatures = () => {
  // Group features by category
  const categorizedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  // Get categories
  const categories = Object.keys(categorizedFeatures).sort();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-all hover:border-primary/30">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 p-2 rounded-md">
                  {feature.icon}
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    feature.status === 'live' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 
                    feature.status === 'beta' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' : 
                    'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
                  }
                >
                  {feature.status}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-lg">{feature.title}</CardTitle>
              <CardDescription className="text-sm text-gray-400">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="text-xs">
                {feature.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppFeatures;
