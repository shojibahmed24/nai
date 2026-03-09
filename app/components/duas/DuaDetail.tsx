import React from 'react';
import { ChevronLeft, Share2, Copy, Bookmark } from 'lucide-react';
import { Dua } from '../../data/duas';

interface DuaDetailProps {
  dua: Dua;
  onBack: () => void;
}

export default function DuaDetail({ dua, onBack }: DuaDetailProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.pronunciation}\n\n${dua.translation}`);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 flex flex-col z-50 bg-noor-green-dark">
      {/* Header - Fixed at top */}
      <div className="bg-noor-green-dark/95 backdrop-blur-md px-5 py-6 flex items-center justify-between border-b border-noor-gold/10 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-noor-gold">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-white truncate flex-1 px-4 text-center">{dua.title}</h2>
        <div className="flex gap-1">
          <button onClick={copyToClipboard} className="p-2 text-gray-400 hover:text-noor-gold">
            <Copy size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-noor-gold">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Content - Scrollable and contained */}
      <div className="flex-1 overflow-y-auto pb-10">
        <div className="p-5 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-8 border-noor-gold/20">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-noor-gold/10 flex items-center justify-center border border-noor-gold/30">
                <Bookmark size={20} className="text-noor-gold" />
              </div>
            </div>

            {/* Arabic Text - break-words ensures it doesn't go off screen */}
            <p className="font-arabic text-3xl text-center leading-[1.8] text-white break-words whitespace-pre-wrap">
              {dua.arabic}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-noor-gold/30 to-transparent"></div>

            {/* Pronunciation */}
            <div className="space-y-4">
              <h4 className="text-noor-gold text-[10px] font-bold uppercase tracking-widest text-center">Pronunciation (উচ্চারণ)</h4>
              <p className="text-noor-gold/90 text-center leading-relaxed font-medium text-lg break-words">
                {dua.pronunciation}
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-noor-gold/30 to-transparent"></div>

            {/* Meaning */}
            <div className="space-y-4">
              <h4 className="text-noor-gold text-[10px] font-bold uppercase tracking-widest text-center">Meaning (অর্থ)</h4>
              <p className="text-gray-300 text-center leading-relaxed italic break-words">
                "{dua.translation}"
              </p>
            </div>
          </div>

          <div className="bg-noor-gold/10 border border-noor-gold/20 rounded-2xl p-4">
            <p className="text-xs text-noor-gold/80 text-center leading-relaxed">
              Reciting this supplication brings peace and protection by the will of Allah (SWT).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
