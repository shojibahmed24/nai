import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownCardProps {
  timings?: Record<string, string>;
  tomorrowFajr?: string;
  loading: boolean;
}

export default function CountdownCard({ timings, tomorrowFajr, loading }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [label, setLabel] = useState('Loading...');

  const format12h = (time24: string) => {
    if (!time24) return '--:--';
    const [time] = time24.split(' ');
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  useEffect(() => {
    if (!timings || !tomorrowFajr) return;

    const timer = setInterval(() => {
      const now = new Date();
      
      const parseTime = (timeStr: string, addDays = 0) => {
        const [time] = timeStr.split(' ');
        const [h, m] = time.split(':').map(Number);
        const d = new Date();
        d.setDate(d.getDate() + addDays);
        d.setHours(h, m, 0, 0);
        return d;
      };

      const fajr = parseTime(timings.Fajr);
      const maghrib = parseTime(timings.Maghrib);
      const nextFajr = parseTime(tomorrowFajr, 1);

      let target;
      let newLabel;

      if (now < fajr) {
        target = fajr;
        newLabel = "Sehri Ends In";
      } else if (now < maghrib) {
        target = maghrib;
        newLabel = "Iftar In";
      } else {
        target = nextFajr;
        newLabel = "Next Sehri In";
      }

      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0 });
      } else {
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({ h, m, s });
        setLabel(newLabel);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timings, tomorrowFajr]);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-noor-green-dark border border-noor-gold/20 p-6 h-48 animate-pulse">
        <div className="w-full h-full bg-white/5 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-noor-green-dark border border-noor-gold/40 animate-glow p-6">
      {/* Background decorative elements */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-noor-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-noor-green-light/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-noor-gold mb-2">
          <Clock size={18} />
          <span className="font-medium uppercase tracking-widest text-xs">{label}</span>
        </div>
        
        <div className="text-5xl font-bold text-white mb-4 tracking-tight font-sans">
          {formatTime(timeLeft.h)}<span className="text-noor-gold/50 mx-1">:</span>
          {formatTime(timeLeft.m)}<span className="text-noor-gold/50 mx-1">:</span>
          {formatTime(timeLeft.s)}
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-noor-gold/30 to-transparent my-3"></div>
        
        <div className="flex justify-between w-full px-4 text-sm">
          <div className="flex flex-col items-start">
            <span className="text-gray-400">Sehri End</span>
            <span className="text-white font-medium">{timings ? format12h(timings.Fajr) : '--:--'}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400">Iftar At</span>
            <span className="text-noor-gold font-medium">{timings ? format12h(timings.Maghrib) : '--:--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
