import React, { useState, useEffect } from 'react';
import { Search, Bookmark, BookOpen, ChevronRight } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahListProps {
  onSelectSurah: (id: number, name: string) => void;
  onOpenBookmarks: () => void;
}

export default function SurahList({ onSelectSurah, onOpenBookmarks }: SurahListProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(json => {
        setSurahs(json.data);
        setLoading(false);
      });
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString().includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-12 pb-6 flex flex-col gap-6 sticky top-0 bg-noor-green-dark/90 backdrop-blur-md z-40">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Al-Quran</h1>
          <button 
            onClick={onOpenBookmarks}
            className="flex items-center gap-2 bg-noor-gold/10 text-noor-gold px-4 py-2 rounded-full text-sm font-bold border border-noor-gold/20"
          >
            <Bookmark size={16} />
            Bookmarks
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text"
            placeholder="Search Surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-noor-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-noor-gold/50 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 px-5 pb-24 flex flex-col gap-3">
        {loading ? (
          Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>
          ))
        ) : (
          filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => onSelectSurah(surah.number, surah.englishName)}
              className="glass-card rounded-2xl p-4 flex items-center justify-between group hover:bg-noor-gold/5 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-noor-gold/10 border border-noor-gold/20 flex items-center justify-center relative">
                  <span className="text-noor-gold font-bold">{surah.number}</span>
                  <div className="absolute -inset-1 border border-noor-gold/10 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-white font-bold">{surah.englishName}</h3>
                  <span className="text-gray-500 text-xs uppercase tracking-widest">
                    {surah.revelationType} • {surah.numberOfAyahs} Ayahs
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-arabic text-xl text-noor-gold">{surah.name}</span>
                <ChevronRight size={18} className="text-gray-600 group-hover:text-noor-gold transition-colors" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}