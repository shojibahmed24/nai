import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Minimize2, Maximize2, X, Volume2 } from 'lucide-react';

interface Ayah {
  number: number;
  numberInSurah: number;
}

interface QuranAudioPlayerProps {
  surahId: number;
  surahName: string;
  ayahs: Ayah[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function QuranAudioPlayer({
  surahId,
  surahName,
  ayahs,
  currentIndex,
  onIndexChange,
  isPlaying,
  setIsPlaying
}: QuranAudioPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Audio source: Alafasy
  const getAudioUrl = (ayahNumber: number) => 
    `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`;

  useEffect(() => {
    if (audioRef.current && ayahs[currentIndex]) {
      audioRef.current.src = getAudioUrl(ayahs[currentIndex].number);
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentIndex, ayahs]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    if (currentIndex < ayahs.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const nextAyah = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < ayahs.length - 1) onIndexChange(currentIndex + 1);
  };

  const prevAyah = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) onIndexChange(currentIndex - 1);
  };

  const currentAyah = ayahs[currentIndex];
  if (!currentAyah) return null;

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out ${
        isMinimized 
          ? 'bottom-24 w-auto' 
          : 'bottom-24 w-[92%] max-w-md'
      }`}
    >
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded}
        hidden
      />

      {isMinimized ? (
        /* Minimized Floating Pill */
        <button 
          onClick={() => setIsMinimized(false)}
          className="bg-noor-gold shadow-lg shadow-noor-gold/20 rounded-full p-3 flex items-center gap-3 animate-bounce-slow"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="transparent"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="2"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="transparent"
                stroke="#082b1a"
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 14}
                strokeDashoffset={2 * Math.PI * 14 * (1 - progress / 100)}
                className="transition-all duration-300"
              />
            </svg>
            {isPlaying ? <Pause size={14} className="text-noor-green-dark" /> : <Play size={14} className="text-noor-green-dark ml-0.5" />}
          </div>
          <span className="text-noor-green-dark text-xs font-bold pr-2">{surahName} {currentAyah.numberInSurah}</span>
        </button>
      ) : (
        /* Slim Player Bar */
        <div className="bg-noor-green-dark/95 backdrop-blur-xl border border-noor-gold/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/5">
            <div 
              className="h-full bg-noor-gold transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-noor-gold/10 flex items-center justify-center text-noor-gold">
                <Volume2 size={18} />
              </div>
              <div className="truncate">
                <h4 className="text-white text-sm font-bold truncate">{surahName}</h4>
                <p className="text-noor-gold/70 text-[10px] uppercase tracking-tighter">Ayah {currentAyah.numberInSurah}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4">
              <button onClick={prevAyah} className="text-gray-400 hover:text-white transition-colors">
                <SkipBack size={18} />
              </button>
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-noor-gold flex items-center justify-center text-noor-green-dark shadow-lg shadow-noor-gold/20 active:scale-90 transition-transform"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
              </button>
              <button onClick={nextAyah} className="text-gray-400 hover:text-white transition-colors">
                <SkipForward size={18} />
              </button>
            </div>

            <button 
              onClick={() => setIsMinimized(true)}
              className="p-2 text-gray-500 hover:text-noor-gold transition-colors"
            >
              <Minimize2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
