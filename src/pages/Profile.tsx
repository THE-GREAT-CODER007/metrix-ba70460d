
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from '@/components/profile/ProfileHeader';
import UserInfoCard from '@/components/profile/UserInfoCard';
import ProfileInformationTab from '@/components/profile/ProfileInformationTab';
import TradingStatsTab from '@/components/profile/TradingStatsTab';
import { formatTime } from '@/utils/TimeUtils';

const Profile = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardLayout>
      <ProfileHeader title="My Profile" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - User card */}
        <UserInfoCard formatTime={formatTime} currentTime={currentTime} />

        {/* Right column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="trading">Trading Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileInformationTab />
            </TabsContent>
            
            <TabsContent value="trading">
              <TradingStatsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
