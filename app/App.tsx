import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import QuranScreen from './screens/QuranScreen';
import DuaScreen from './screens/DuaScreen';
import TasbihScreen from './screens/TasbihScreen';
import QiblaScreen from './screens/QiblaScreen';
import ProfileScreen from './screens/ProfileScreen';
import MosqueFinderScreen from './screens/MosqueFinderScreen';
import AIScreen from './screens/AIScreen';
import { notificationService } from './services/notificationService';
import { usePrayerData } from './hooks/usePrayerData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [navigationParams, setNavigationParams] = useState<any>(null);
  const { data } = usePrayerData();

  // Initialize notification check loop
  useEffect(() => {
    const interval = setInterval(() => {
      notificationService.checkAndTrigger(data);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [data]);

  const handleNavigate = (tab: string, params?: any) => {
    setActiveTab(tab);
    setNavigationParams(params);
  };

  return (
    <div className="fixed inset-0 bg-black flex justify-center overflow-hidden">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-noor-green-dark relative flex flex-col shadow-2xl h-full">
        
        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 islamic-pattern-bg">
          {activeTab === 'home' && <HomeScreen onNavigate={handleNavigate} />}
          {activeTab === 'quran' && <QuranScreen initialParams={navigationParams} />}
          {activeTab === 'duas' && <DuaScreen />}
          {activeTab === 'tasbih' && <TasbihScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
          {activeTab === 'qibla' && <QiblaScreen onBack={() => setActiveTab('home')} />}
          {activeTab === 'mosques' && <MosqueFinderScreen onBack={() => setActiveTab('home')} />}
          {activeTab === 'ai' && <AIScreen onBack={() => setActiveTab('home')} />}
          
          {/* Fallback for other tabs */}
          {activeTab !== 'home' && activeTab !== 'quran' && activeTab !== 'duas' && activeTab !== 'tasbih' && activeTab !== 'qibla' && activeTab !== 'profile' && activeTab !== 'mosques' && activeTab !== 'ai' && (
            <div className="flex items-center justify-center h-full">
              <p className="text-noor-gold/70 text-lg">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Screen Coming Soon</p>
            </div>
          )}
        </div>

        {/* Strict Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={(tab) => handleNavigate(tab, null)} />
      </div>
    </div>
  );
}