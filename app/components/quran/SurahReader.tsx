import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, BookOpen, Settings2, Play } from 'lucide-react';
import QuranAudioPlayer from './QuranAudioPlayer';

interface Ayah {
  number: number;
  text: string;
  translation: string;
  numberInSurah: number;
}

interface SurahReaderProps {
  surahId: number;
  surahName: string;
  initialAyah?: number;
  onBack: () => void;
}

export default function SurahReader({ surahId, surahName, initialAyah, onBack }: SurahReaderProps) {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(initialAyah ? initialAyah - 1 : 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchSurahData = async () => {
      setLoading(true);
      try {
        // Fetching both Arabic (Uthmani) and Bengali translation
        const [arRes, bnRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/surah/${surahId}/bn.bengali`)
        ]);

        const arData = await arRes.json();
        const bnData = await bnRes.json();

        const combinedAyahs = arData.data.ayahs.map((ayah: any, index: number) => ({
          number: ayah.number,
          text: ayah.text,
          translation: bnData.data.ayahs[index].text,
          numberInSurah: ayah.numberInSurah
        }));

        setAyahs(combinedAyahs);
      } catch (error) {
        console.error('Error fetching surah:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahId]);

  // Save progress to localStorage for 'Continue Reading'
  useEffect(() => {
    if (ayahs.length > 0 && ayahs[activeAyahIndex]) {
      const progress = {
        surahId,
        surahName,
        ayahNumber: ayahs[activeAyahIndex].numberInSurah,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('noor_last_read', JSON.stringify(progress));
    }
  }, [activeAyahIndex, ayahs, surahId, surahName]);

  useEffect(() => {
    if (initialAyah && ayahs.length > 0) {
      scrollToAyah(initialAyah - 1);
    }
  }, [initialAyah, ayahs]);

  const scrollToAyah = (index: number) => {
    setTimeout(() => {
      const element = ayahRefs.current[index];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleAyahSelect = (index: number) => {
    setActiveAyahIndex(index);
    setIsPlaying(true);
    scrollToAyah(index);
  };

  return (
    <div className="flex flex-col h-full bg-noor-green-dark relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-noor-green-dark/90 backdrop-blur-md border-b border-noor-gold/10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-noor-gold">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">{surahName}</h2>
            <p className="text-[10px] text-noor-gold/70 uppercase tracking-widest">Surah {surahId}</p>
          </div>
        </div>
        <button className="p-2 text-noor-gold/60">
          <Settings2 size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-40" ref={scrollRef}>
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="h-8 bg-white/5 rounded-lg w-3/4 ml-auto"></div>
                <div className="h-4 bg-white/5 rounded-lg w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Bismillah */}
            {surahId !== 1 && surahId !== 9 && (
              <div className="text-center py-4">
                <p className="text-2xl font-arabic text-noor-gold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              </div>
            )}

            {ayahs.map((ayah, index) => (
              <div 
                key={ayah.number} 
                ref={el => ayahRefs.current[index] = el}
                onClick={() => handleAyahSelect(index)}
                className={`group transition-all duration-500 rounded-2xl p-4 -mx-2 cursor-pointer ${
                  activeAyahIndex === index 
                    ? 'bg-noor-gold/10 border border-noor-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                    activeAyahIndex === index ? 'bg-noor-gold text-noor-green-dark border-noor-gold' : 'text-noor-gold/40 border-noor-gold/20'
                  }`}>
                    {ayah.numberInSurah}
                  </div>
                  <p className={`text-2xl font-arabic text-right leading-[2.5] flex-1 transition-colors ${
                    activeAyahIndex === index ? 'text-white' : 'text-gray-300'
                  }`}>
                    {ayah.text}
                  </p>
                </div>
                <p className={`text-sm leading-relaxed transition-colors ${
                  activeAyahIndex === index ? 'text-noor-gold-light' : 'text-gray-400'
                }`}>
                  {ayah.translation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slim Audio Player */}
      {!loading && ayahs.length > 0 && (
        <QuranAudioPlayer 
          surahId={surahId}
          surahName={surahName}
          ayahs={ayahs}
          currentIndex={activeAyahIndex}
          onIndexChange={(idx) => {
            setActiveAyahIndex(idx);
            scrollToAyah(idx);
          }}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}
