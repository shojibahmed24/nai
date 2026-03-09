import React, { useState } from 'react';
import { User, Bell, Globe, Shield, Info, ChevronRight, LogOut, Moon } from 'lucide-react';
import NotificationSettings from '../components/profile/NotificationSettings';

export default function ProfileScreen() {
  const [view, setView] = useState<'main' | 'notifications'>('main');

  const menuItems = [
    {
      id: 'notifications',
      icon: Bell, 
      label: 'Prayer Notifications', 
      value: 'Settings', 
      color: 'text-blue-400', 
      onClick: () => setView('notifications') 
    },
    { id: 'darkmode', icon: Moon, label: 'Dark Mode', value: 'System', color: 'text-purple-400' },
    { id: 'language', icon: Globe, label: 'App Language', value: 'English', color: 'text-green-400' },
    { id: 'privacy', icon: Shield, label: 'Privacy Policy', color: 'text-orange-400' },
    { id: 'about', icon: Info, label: 'About Noor Quran', color: 'text-noor-gold' },
  ];

  if (view === 'notifications') {
    return (
      <div className="min-h-full flex flex-col px-6 pt-12 pb-24 relative z-10">
        <NotificationSettings onBack={() => setView('main')} />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col px-6 pt-12 pb-24 relative z-10">
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-24 h-24 rounded-full bg-noor-gold/10 border-2 border-noor-gold/30 flex items-center justify-center relative">
          <User size={48} className="text-noor-gold" />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-noor-gold rounded-full border-4 border-noor-green-dark flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-noor-green-dark rounded-full"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Assalamu Alaikum</h2>
          <p className="text-gray-400 text-sm">Welcome to your spiritual companion</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-noor-gold text-xs font-bold uppercase tracking-widest ml-2 mb-1">Settings</h3>
        
        {menuItems.map((item, idx) => (
          <button 
            key={idx} 
            onClick={item.onClick}
            className="glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className="text-white font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && <span className="text-gray-500 text-sm">{item.value}</span>}
              <ChevronRight size={18} className="text-gray-600" />
            </div>
          </button>
        ))}

        <button className="mt-4 glass-card rounded-2xl p-4 flex items-center gap-4 text-red-400 hover:bg-red-500/10 transition-all">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <LogOut size={20} />
          </div>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      <div className="mt-auto pt-10 text-center">
        <p className="text-gray-500 text-xs">Noor Quran v1.0.0</p>
        <p className="text-gray-600 text-[10px] mt-1">Made with ❤️ for the Ummah</p>
      </div>
    </div>
  );
}
