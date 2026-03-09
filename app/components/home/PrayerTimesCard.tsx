import React, { useMemo } from 'react';

interface PrayerTimesCardProps {
  timings?: Record<string, string>;
  loading: boolean;
}

export default function PrayerTimesCard({ timings, loading }: PrayerTimesCardProps) {
  const format12h = (time24: string) => {
    if (!time24) return '--:--';
    const [time] = time24.split(' ');
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const activePrayer = useMemo(() => {
    if (!timings) return '';
    const now = new Date();
    
    const parseTime = (timeStr: string) => {
      const [time] = timeStr.split(' ');
      const [h, m] = time.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d;
    };

    const fajr = parseTime(timings.Fajr);
    const dhuhr = parseTime(timings.Dhuhr);
    const asr = parseTime(timings.Asr);
    const maghrib = parseTime(timings.Maghrib);
    const isha = parseTime(timings.Isha);

    // Logic for current prayer period
    if (now >= isha || now < fajr) return 'Isha';
    if (now >= maghrib) return 'Maghrib';
    if (now >= asr) return 'Asr';
    if (now >= dhuhr) return 'Dhuhr';
    if (now >= fajr) return 'Fajr';
    
    return 'Isha';
  }, [timings]);

  const prayers = [
    { name: 'Fajr', time: timings?.Fajr },
    { name: 'Dhuhr', time: timings?.Dhuhr },
    { name: 'Asr', time: timings?.Asr },
    { name: 'Maghrib', time: timings?.Maghrib },
    { name: 'Isha', time: timings?.Isha },
  ];

  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-5 animate-pulse">
        <div className="h-6 w-32 bg-white/10 rounded mb-4"></div>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 w-full bg-white/10 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl px-3 py-5 sm:px-5">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-lg font-semibold text-white">Prayer Times</h2>
        <span className="text-[10px] font-bold uppercase tracking-wider text-noor-gold bg-noor-gold/10 px-2 py-1 rounded-full">
          Today
        </span>
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        {prayers.map((prayer, index) => {
          const isActive = prayer.name === activePrayer;
          return (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center gap-1.5 py-3 px-1 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-noor-gold/20 border border-noor-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-105 z-10' 
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                isActive ? 'text-noor-gold' : 'text-gray-400'
              }`}>
                {prayer.name}
              </span>
              <span className={`text-xs font-bold font-sans ${
                isActive ? 'text-white' : 'text-gray-300'
              }`}>
                {prayer.time ? format12h(prayer.time).split(' ')[0] : '--:--'}
              </span>
              <span className={`text-[8px] font-medium ${
                isActive ? 'text-noor-gold/80' : 'text-gray-500'
              }`}>
                {prayer.time ? format12h(prayer.time).split(' ')[1] : ''}
              </span>
              
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-1 rounded-full bg-noor-gold animate-ping"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
