import React from 'react';
import { Home, BookOpen, Heart, Activity, Compass, Sparkles, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'quran', icon: BookOpen, label: 'Quran' },
    { id: 'duas', icon: Heart, label: 'Duas' },
    { id: 'tasbih', icon: Activity, label: 'Tasbih' },
    { id: 'qibla', icon: Compass, label: 'Qibla' },
    { id: 'ai', icon: Sparkles, label: 'AI' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-noor-green-dark/95 backdrop-blur-xl border-t border-noor-gold/20 px-2 py-3 rounded-t-[2.5rem] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center gap-1 relative group transition-all duration-300"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-noor-gold/15 scale-110' : 'hover:bg-white/5'}`}>
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className={`transition-colors duration-300 ${isActive ? 'text-noor-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-gray-400 group-hover:text-noor-gold/70'}`}
                />
              </div>
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-noor-gold animate-pulse"></span>
              )}
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-noor-gold' : 'text-gray-500'} hidden xs:block`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}