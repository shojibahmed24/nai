import React from 'react';
import { BookOpen } from 'lucide-react';

export default function AyahCard() {
  return (
    <div className="glass-card rounded-3xl p-6 border-l-4 border-l-noor-gold relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-5">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={16} className="text-noor-gold" />
        <h2 className="text-sm font-medium text-noor-gold uppercase tracking-wider">Ayah of the Day</h2>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-arabic text-2xl text-right leading-loose text-white">
          إِنَّ مَعَ الْعُسْرِ يُسْرًا
        </p>
        
        <div className="w-12 h-px bg-noor-gold/30"></div>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          "নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি।"
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400 font-medium">Surah Ash-Sharh — Ayah 6</span>
        </div>
      </div>
    </div>
  );
}