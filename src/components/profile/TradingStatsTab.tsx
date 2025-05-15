
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const TradingStatsTab = () => {
  return (
    <Card className="bg-metrix-card border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Trading Statistics
        </CardTitle>
        <CardDescription>Overview of your trading performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PerformanceSummaryCard />
          <RecentActivityCard />
        </div>
        
        <div className="mt-4">
          <TradingCalendarCard />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Detailed Trading Analytics</Button>
      </CardFooter>
    </Card>
  );
};

const PerformanceSummaryCard = () => {
  return (
    <Card className="bg-metrix-navy border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Performance Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Win Rate</span>
            <span className="font-medium text-green-400">67%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Profit Factor</span>
            <span className="font-medium text-green-400">2.3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Expected Value</span>
            <span className="font-medium text-green-400">1.8%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Max Drawdown</span>
            <span className="font-medium text-red-400">12.4%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Trades</span>
            <span>1,542</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentActivityCard = () => {
  return (
    <Card className="bg-metrix-navy border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Today</span>
            <span className="font-medium text-green-400">+$345.20</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">This Week</span>
            <span className="font-medium text-green-400">+$1,267.50</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">This Month</span>
            <span className="font-medium text-green-400">+$5,682.30</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Active Trades</span>
            <span>3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pending Orders</span>
            <span>5</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TradingCalendarCard = () => {
  return (
    <Card className="bg-metrix-navy border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Trading Calendar</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">May 2025</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">←</Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">→</Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
            <div key={i} className="text-xs text-gray-400 py-1">{day}</div>
          ))}
          <div className="text-xs text-gray-600 py-1">28</div>
          <div className="text-xs text-gray-600 py-1">29</div>
          <div className="text-xs text-gray-600 py-1">30</div>
          <div className="text-xs py-1">1</div>
          <div className="text-xs py-1 rounded-full bg-green-500/20">2</div>
          <div className="text-xs py-1 rounded-full bg-red-500/20">3</div>
          <div className="text-xs py-1">4</div>
          <div className="text-xs py-1 rounded-full bg-green-500/20">5</div>
          <div className="text-xs py-1">6</div>
          <div className="text-xs py-1 rounded-full bg-green-500/20">7</div>
          <div className="text-xs py-1 rounded-full bg-green-500/20">8</div>
          <div className="text-xs py-1 rounded-full bg-red-500/20">9</div>
          <div className="text-xs py-1">10</div>
          <div className="text-xs py-1">11</div>
          <div className="text-xs py-1 rounded-full bg-blue-500/30">12</div>
          <div className="text-xs py-1 rounded-full bg-green-500/20">13</div>
          <div className="text-xs py-1 font-bold bg-primary/20 ring-1 ring-primary rounded-full">14</div>
          <div className="text-xs py-1">15</div>
          <div className="text-xs py-1">16</div>
          <div className="text-xs py-1">17</div>
          <div className="text-xs py-1">18</div>
        </div>
        <div className="flex mt-2 text-xs gap-4 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
            <span>Profit</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
            <span>Loss</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500/80"></div>
            <span>Event</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingStatsTab;
