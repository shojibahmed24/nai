import React from 'react';
import { MapPin, Moon, ChevronDown } from 'lucide-react';
import { PrayerData } from '../../hooks/usePrayerData';

interface HeaderProps {
  district: string;
  data: PrayerData | null;
  loading: boolean;
  onOpenDistrict: () => void;
}

export default function Header({ district, data, loading, onOpenDistrict }: HeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <button 
          onClick={onOpenDistrict}
          className="flex items-center gap-1.5 text-noor-gold hover:opacity-80 transition-opacity group"
        >
          <MapPin size={16} className="animate-bounce" />
          <span className="font-medium text-sm tracking-wide">{district}</span>
          <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
        
        {loading || !data ? (
          <div className="space-y-2 mt-1">
            <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse"></div>
            <div className="h-4 w-32 bg-white/10 rounded-lg animate-pulse"></div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {data.hijri.day} {data.hijri.month.en} <span className="text-noor-gold font-normal">{data.hijri.year} {data.hijri.designation.abbreviated}</span>
            </h1>
            <p className="text-gray-300 text-sm">
              {data.gregorian.weekday.en}, {data.gregorian.month.en} {data.gregorian.day}, {data.gregorian.year}
            </p>
          </>
        )}
      </div>
      <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border-noor-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
        <Moon size={24} className="text-noor-gold" />
      </div>
    </div>
  );
}
