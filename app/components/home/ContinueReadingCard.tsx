import React, { useState, useEffect } from 'react';
import { PlayCircle, Bookmark } from 'lucide-react';

interface LastRead {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

interface ContinueReadingCardProps {
  onNavigate?: (tab: string, params?: any) => void;
}

export default function ContinueReadingCard({ onNavigate }: ContinueReadingCardProps) {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('noor_last_read');
    if (saved) {
      try {
        setLastRead(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse last read progress");
      }
    }
  }, []);

  if (!lastRead) return null;

  return (
    <div className="bg-gradient-to-r from-noor-green to-noor-green-dark rounded-3xl p-5 border border-noor-green-light/50 shadow-lg relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute right-0 top-0 w-32 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-noor-gold">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-noor-gold/80 mb-1">
            <Bookmark size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">Continue Reading</span>
          </div>
          <h3 className="text-lg font-bold text-white">{lastRead.surahName}</h3>
          <p className="text-sm text-gray-300">Ayah {lastRead.ayahNumber}</p>
        </div>
        
        <button 
          onClick={() => onNavigate?.('quran', { surahId: lastRead.surahId, surahName: lastRead.surahName, ayahNumber: lastRead.ayahNumber })}
          className="flex items-center gap-2 bg-noor-gold text-noor-green-dark px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-noor-gold-light transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        >
          <PlayCircle size={18} />
          Resume
        </button>
      </div>
    </div>
  );
}
