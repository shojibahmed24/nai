import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bookmark, Trash2, BookOpen } from 'lucide-react';

interface BookmarkItem {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
}

interface BookmarkScreenProps {
  onBack: () => void;
  onSelectBookmark: (surahId: number, surahName: string, ayahNumber: number) => void;
}

export default function BookmarkScreen({ onBack, onSelectBookmark }: BookmarkScreenProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('noor_quran_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('noor_quran_bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col h-full bg-noor-green-dark">
      <div className="px-5 pt-12 pb-4 flex items-center gap-4 bg-noor-green-dark/80 backdrop-blur-md sticky top-0 z-50">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-noor-gold hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Saved Bookmarks</h1>
      </div>

      <div className="flex-1 px-5 py-4 flex flex-col gap-4">
        {bookmarks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-20">
            <Bookmark size={64} className="text-noor-gold mb-4" />
            <p className="text-white text-lg font-medium">No bookmarks yet</p>
            <p className="text-gray-400 text-sm mt-1">Save ayahs you want to revisit later</p>
          </div>
        ) : (
          bookmarks.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectBookmark(item.surahId, item.surahName, item.ayahNumber)}
              className="glass-card rounded-2xl p-5 text-left border-l-4 border-l-noor-gold group active:scale-[0.98] transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <span className="text-noor-gold font-bold text-lg">{item.surahName}</span>
                  <span className="text-gray-400 text-xs uppercase tracking-widest">Ayah {item.ayahNumber}</span>
                </div>
                <button 
                  onClick={(e) => removeBookmark(e, item.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="text-gray-200 text-sm line-clamp-2 italic leading-relaxed">
                "{item.text}"
              </p>

              <div className="mt-4 flex items-center gap-2 text-noor-gold/60 text-xs font-medium">
                <BookOpen size={14} />
                <span>Tap to read full Surah</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}