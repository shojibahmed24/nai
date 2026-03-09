import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Smartphone, ChevronDown, Check, Hash, History, Trash2, X, Clock } from 'lucide-react';

interface Dhikr {
  id: string;
  arabic: string;
  english: string;
  meaning: string;
  target: number;
}

interface HistoryEntry {
  id: string;
  dhikrName: string;
  count: number;
  cycles: number;
  timestamp: number;
}

const DHIKR_LIST: Dhikr[] = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ ٱللَّٰهِ', english: 'SubhanAllah', meaning: 'Glory be to Allah', target: 33 },
  { id: 'alhamdulillah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', english: 'Alhamdulillah', meaning: 'Praise be to Allah', target: 33 },
  { id: 'allahuakbar', arabic: 'ٱللَّٰهُ أَكْبَرُ', english: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', english: 'Astaghfirullah', meaning: 'I seek forgiveness', target: 100 },
  { id: 'lailahaillallah', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', english: 'La ilaha illallah', meaning: 'No god but Allah', target: 100 },
  { id: 'salawat', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', english: 'Salawat', meaning: 'Peace be upon the Prophet', target: 100 },
];

export default function TasbihScreen() {
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState<Dhikr>(DHIKR_LIST[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('noor_tasbih_history');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audioRef.current.volume = 0.2;
  }, []);

  useEffect(() => {
    localStorage.setItem('noor_tasbih_history', JSON.stringify(history));
  }, [history]);

  const handleIncrement = useCallback(() => {
    if (isVibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setCount(prev => {
      const next = prev + 1;
      if (next >= selectedDhikr.target) {
        if (isVibrationEnabled && 'vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
        setCycles(c => c + 1);
        return 0;
      }
      return next;
    });
  }, [selectedDhikr.target, isVibrationEnabled, isSoundEnabled]);

  const handleReset = () => {
    if (count > 0 || cycles > 0) {
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        dhikrName: selectedDhikr.english,
        count,
        cycles,
        timestamp: Date.now(),
      };
      setHistory(prev => [newEntry, ...prev].slice(0, 50));
    }
    setCount(0);
    setCycles(0);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your dhikr history?')) {
      setHistory([]);
    }
  };

  const selectDhikr = (dhikr: Dhikr) => {
    if (count > 0 || cycles > 0) handleReset();
    setSelectedDhikr(dhikr);
    setIsDropdownOpen(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-full flex flex-col px-6 pt-12 pb-24 relative z-10">
      {/* Header with Dropdown */}
      <div className="relative mb-8 flex gap-3">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-1 glass-card rounded-2xl p-5 flex items-center justify-between border-noor-gold/30 active:scale-[0.98] transition-all"
        >
          <div className="flex flex-col items-start">
            <span className="text-noor-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Current Dhikr</span>
            <h2 className="text-xl font-bold text-white">{selectedDhikr.english}</h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-noor-gold/10 flex items-center justify-center">
            {isDropdownOpen ? <X size={20} className="text-noor-gold" /> : <ChevronDown size={20} className="text-noor-gold" />}
          </div>
        </button>

        <button 
          onClick={() => setShowHistory(true)}
          className="glass-card rounded-2xl w-16 flex items-center justify-center border-noor-gold/30 active:scale-[0.98] transition-all"
        >
          <History size={24} className="text-noor-gold" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-noor-green-dark border border-noor-gold/30 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {DHIKR_LIST.map((dhikr) => (
                <button
                  key={dhikr.id}
                  onClick={() => selectDhikr(dhikr)}
                  className={`w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors ${
                    selectedDhikr.id === dhikr.id ? 'bg-noor-gold/10' : ''
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-white font-medium">{dhikr.english}</span>
                    <span className="text-noor-gold/60 text-xs font-arabic">{dhikr.arabic}</span>
                  </div>
                  {selectedDhikr.id === dhikr.id && <Check size={18} className="text-noor-gold" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Counter Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="relative">
          {/* Progress Ring Background */}
          <svg className="w-72 h-72 -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="120"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-white/5"
            />
            <circle
              cx="144"
              cy="144"
              r="120"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - count / selectedDhikr.target)}
              strokeLinecap="round"
              className="text-noor-gold transition-all duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            />
          </svg>
          
          {/* Counter Button */}
          <button
            onClick={handleIncrement}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-full active:scale-95 transition-transform group"
          >
            <div className="absolute inset-10 rounded-full bg-noor-gold/5 group-active:bg-noor-gold/10 transition-colors"></div>
            <span className="text-7xl font-bold text-white tabular-nums relative z-10">{count}</span>
            <span className="text-noor-gold/60 text-sm mt-2 font-medium relative z-10">Target: {selectedDhikr.target}</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2 bg-noor-gold/10 rounded-full border border-noor-gold/20">
            <Hash size={16} className="text-noor-gold" />
            <span className="text-noor-gold font-bold">{cycles} Cycles Completed</span>
          </div>
          <div className="text-center px-8">
            <p className="text-noor-gold/80 text-lg font-arabic mb-1">{selectedDhikr.arabic}</p>
            <p className="text-gray-400 text-sm italic">{selectedDhikr.meaning}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <button 
          onClick={handleReset}
          className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors active:scale-95"
        >
          <RotateCcw size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Reset</span>
        </button>
        
        <button 
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className={`glass-card rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors active:scale-95 ${
            isSoundEnabled ? 'text-noor-gold' : 'text-gray-500'
          }`}
        >
          {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="text-[10px] font-bold uppercase tracking-wider">Sound</span>
        </button>

        <button 
          onClick={() => setIsVibrationEnabled(!isVibrationEnabled)}
          className={`glass-card rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors active:scale-95 ${
            isVibrationEnabled ? 'text-noor-gold' : 'text-gray-500'
          }`}
        >
          <Smartphone size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Haptic</span>
        </button>
      </div>

      {/* History Modal Overlay */}
      {showHistory && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowHistory(false)}
          ></div>
          <div className="relative w-full max-w-md bg-noor-green-dark border-t border-noor-gold/30 rounded-t-[2.5rem] shadow-2xl flex flex-col max-h-[80vh] animate-in slide-in-from-bottom duration-300">
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-noor-gold/10 flex items-center justify-center">
                  <History size={20} className="text-noor-gold" />
                </div>
                <h3 className="text-xl font-bold text-white">Dhikr History</h3>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="p-2 text-red-400/70 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {history.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {history.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="glass-card rounded-2xl p-4 flex items-center justify-between border-white/5"
                    >
                      <div className="flex flex-col gap-1">
                        <h4 className="text-white font-semibold">{entry.dhikrName}</h4>
                        <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                          <Clock size={10} />
                          <span>{formatDate(entry.timestamp)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-noor-gold font-bold">{entry.cycles} Cycles</div>
                        <div className="text-gray-500 text-[10px]">+{entry.count} counts</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <History size={32} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400">No history yet.</p>
                  <p className="text-gray-600 text-sm">Your completed sessions will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
