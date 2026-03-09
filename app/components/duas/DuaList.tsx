import React from 'react';
import { Search, Heart } from 'lucide-react';
import { dailyDuas, Dua } from '../../data/duas';

interface DuaListProps {
  onSelectDua: (dua: Dua) => void;
}

export default function DuaList({ onSelectDua }: DuaListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const categories = ['All', 'Daily', 'Protection', 'Prayer', 'Travel', 'Success', 'Health', 'Family', 'Gratitude'];

  const filteredDuas = dailyDuas.filter(dua => {
    const matchesSearch = dua.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dua.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dua.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || dua.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-5 pt-12 pb-32 flex flex-col gap-6 relative z-10">
      <div className="flex flex-col gap-4 sticky top-0 bg-noor-green-dark/95 backdrop-blur-md pt-2 pb-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-noor-gold/20 flex items-center justify-center border border-noor-gold/30">
            <Heart size={20} className="text-noor-gold" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hisnul Muslim</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Duas or Categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-noor-gold/20 text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-noor-gold/60 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-noor-gold text-noor-green-dark shadow-lg shadow-noor-gold/20' 
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filteredDuas.length > 0 ? (
          filteredDuas.map((dua) => (
            <button
              key={dua.id}
              onClick={() => onSelectDua(dua)}
              className="glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-noor-gold/5 transition-all active:scale-[0.98] text-left"
            >
              <div className="flex flex-col gap-1">
                <span className="text-noor-gold text-[10px] font-bold uppercase tracking-widest">{dua.category}</span>
                <h3 className="text-white font-semibold">{dua.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-1">{dua.preview}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-noor-gold">
                <Heart size={14} />
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No Duas found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
