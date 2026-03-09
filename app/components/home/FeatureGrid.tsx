import React from 'react';
import { BookOpen, Heart, Activity, Compass, MapPin, Sparkles } from 'lucide-react';

interface FeatureGridProps {
  onNavigate?: (tab: string) => void;
}

export default function FeatureGrid({ onNavigate }: FeatureGridProps) {
  const features = [
    { name: 'Quran', icon: BookOpen, id: 'quran' },
    { name: 'Duas', icon: Heart, id: 'duas' },
    { name: 'Tasbih', icon: Activity, id: 'tasbih' },
    { name: 'Qibla', icon: Compass, id: 'qibla' },
    { name: 'Mosques', icon: MapPin, id: 'mosques' },
    { name: 'Islamic AI', icon: Sparkles, id: 'ai' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <button 
            key={index} 
            onClick={() => onNavigate?.(feature.id)}
            className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-noor-green/60 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-full bg-noor-green-dark border border-noor-gold/20 flex items-center justify-center group-hover:border-noor-gold/60 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
              <Icon size={22} className="text-noor-gold" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium text-gray-200 group-hover:text-white">
              {feature.name}
            </span>
          </button>
        );
      })} 
    </div>
  );
}