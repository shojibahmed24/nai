import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, Check, AlertCircle, Clock, Moon, Sun, BookOpen } from 'lucide-react';
import { notificationService, NotificationSettings as SettingsType } from '../../services/notificationService';

interface NotificationSettingsProps {
  onBack: () => void;
}

export default function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<SettingsType>(notificationService.getSettings());
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleToggle = async (key: keyof SettingsType) => {
    const newValue = !settings[key];
    const updated = { ...settings, [key]: newValue };
    
    if (key === 'enabled' && newValue) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setPermissionStatus(permission);
        if (permission !== 'granted') return;
      }
    }

    await notificationService.updateSettings(updated);
    setSettings({ ...notificationService.getSettings() });
  };

  const reminderTypes = [
    {
      id: 'prayerReminders',
      label: 'Prayer Times',
      description: '10 minutes before each prayer',
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      id: 'sehriReminders',
      label: 'Sehri Reminder',
      description: '30 minutes before Fajr ends',
      icon: Moon,
      color: 'text-purple-400'
    },
    {
      id: 'iftarReminders',
      label: 'Iftar Reminder',
      description: 'Exactly at Maghrib time',
      icon: Sun,
      color: 'text-orange-400'
    },
    {
      id: 'dailyAyah',
      label: 'Daily Ayah',
      description: 'Morning spiritual inspiration',
      icon: BookOpen,
      color: 'text-green-400'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-noor-gold hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-white">Notifications</h2>
      </div>

      {permissionStatus === 'denied' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3 items-start">
          <AlertCircle className="text-red-400 shrink-0" size={20} />
          <div className="flex flex-col gap-1">
            <p className="text-red-200 text-sm font-medium">Notifications Blocked</p>
            <p className="text-red-200/60 text-xs">Please enable notifications in your browser settings to receive reminders.</p>
          </div>
        </div>
      )}

      <div className="glass-card rounded-3xl p-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-noor-gold/10 flex items-center justify-center text-noor-gold">
              <Bell size={20} />
            </div>
            <div>
              <p className="text-white font-semibold">Master Switch</p>
              <p className="text-gray-400 text-xs">Enable all notifications</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('enabled')}
            className={`w-12 h-6 rounded-full transition-all relative ${settings.enabled ? 'bg-noor-gold' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.enabled ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="h-px bg-white/5 w-full"></div>

        <div className="flex flex-col gap-5">
          <h3 className="text-noor-gold text-[10px] font-bold uppercase tracking-widest">Reminder Types</h3>
          
          {reminderTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between opacity-90">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center ${type.color}`}>
                  <type.icon size={20} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{type.label}</p>
                  <p className="text-gray-500 text-[11px]">{type.description}</p>
                </div>
              </div>
              <button
                disabled={!settings.enabled}
                onClick={() => handleToggle(type.id as keyof SettingsType)}
                className={`w-10 h-5 rounded-full transition-all relative ${!settings.enabled ? 'opacity-30 cursor-not-allowed' : ''} ${settings[type.id as keyof SettingsType] ? 'bg-noor-gold/60' : 'bg-gray-800'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${settings[type.id as keyof SettingsType] ? 'left-5.5 bg-noor-gold' : 'left-0.5 bg-gray-500'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-noor-gold/5 border border-noor-gold/10 rounded-2xl p-4">
        <p className="text-xs text-noor-gold/60 text-center leading-relaxed">
          Reminders are triggered based on your selected district's prayer times. Ensure your device time is accurate.
        </p>
      </div>
    </div>
  );
}
