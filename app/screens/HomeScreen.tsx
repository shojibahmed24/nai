import React, { useState } from 'react';
import Header from '../components/home/Header';
import CountdownCard from '../components/home/CountdownCard';
import PrayerTimesCard from '../components/home/PrayerTimesCard';
import AyahCard from '../components/home/AyahCard';
import ContinueReadingCard from '../components/home/ContinueReadingCard';
import DistrictModal from '../components/home/DistrictModal';
import { usePrayerData } from '../hooks/usePrayerData';

interface HomeScreenProps {
  onNavigate?: (tab: string, params?: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { data, loading, error, district, setDistrict } = usePrayerData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative z-10 px-5 pt-12 pb-8 flex flex-col gap-6">
      <Header 
        district={district} 
        data={data} 
        loading={loading} 
        onOpenDistrict={() => setIsModalOpen(true)} 
      />
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <CountdownCard 
        timings={data?.timings} 
        tomorrowFajr={data?.tomorrowFajr} 
        loading={loading} 
      />
      
      <PrayerTimesCard 
        timings={data?.timings} 
        loading={loading} 
      />
      
      {/* FeatureGrid removed as requested - items moved to BottomNav */}
      
      <ContinueReadingCard onNavigate={onNavigate} />
      <AyahCard />

      <DistrictModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentDistrict={district}
        onSelect={setDistrict}
      />
    </div>
  );
}