import React, { useState, useEffect } from 'react';
import SurahList from '../components/quran/SurahList';
import SurahReader from '../components/quran/SurahReader';
import BookmarkScreen from '../components/quran/BookmarkScreen';

type QuranView = 'list' | 'reader' | 'bookmarks';

interface QuranScreenProps {
  initialParams?: {
    surahId: number;
    surahName: string;
    ayahNumber?: number;
  };
}

export default function QuranScreen({ initialParams }: QuranScreenProps) {
  const [view, setView] = useState<QuranView>('list');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahName, setSurahName] = useState<string>('');
  const [initialAyah, setInitialAyah] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (initialParams) {
      handleSelectSurah(initialParams.surahId, initialParams.surahName, initialParams.ayahNumber);
    }
  }, [initialParams]);

  const handleSelectSurah = (id: number, name: string, ayah?: number) => {
    setSelectedSurah(id);
    setSurahName(name);
    setInitialAyah(ayah);
    setView('reader');
  };

  const handleBack = () => {
    if (view === 'reader') {
      setView('list');
      setSelectedSurah(null);
      setSurahName('');
      setInitialAyah(undefined);
    } else {
      setView('list');
    }
  };

  const openBookmarks = () => setView('bookmarks');

  return (
    <div className="min-h-full">
      {view === 'list' && (
        <SurahList 
          onSelectSurah={handleSelectSurah} 
          onOpenBookmarks={openBookmarks} 
        />
      )}
      
      {view === 'reader' && selectedSurah !== null && (
        <SurahReader 
          surahId={selectedSurah} 
          surahName={surahName} 
          initialAyah={initialAyah}
          onBack={handleBack} 
        />
      )}

      {view === 'bookmarks' && (
        <BookmarkScreen 
          onBack={handleBack} 
          onSelectBookmark={(id, name, ayah) => handleSelectSurah(id, name, ayah)} 
        />
      )}
    </div>
  );
}
