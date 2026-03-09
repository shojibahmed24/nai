import React from 'react';
import { MapPin, Star, Navigation } from 'lucide-react';
import { Mosque } from '../../types/mosque';

interface MosqueListProps {
  mosques: Mosque[];
}

export default function MosqueList({ mosques }: MosqueListProps) {
  if (mosques.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <MapPin className="text-gray-500" size={32} />
        </div>
        <h3 className="text-white font-semibold mb-1">No mosques found</h3>
        <p className="text-gray-400 text-sm">Try increasing the search radius or moving to a different area.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      {mosques.map((mosque) => (
        <div key={mosque.id} className="glass-card rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-white font-bold text-lg">{mosque.name}</h3>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <MapPin size={12} />
                <span className="line-clamp-1">{mosque.address}</span>
              </div>
            </div>
            {mosque.rating && (
              <div className="flex items-center gap-1 bg-noor-gold/10 px-2 py-1 rounded-lg">
                <Star size={12} className="text-noor-gold fill-noor-gold" />
                <span className="text-noor-gold text-xs font-bold">{mosque.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {mosque.opening_hours?.open_now !== undefined && (
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  mosque.opening_hours.open_now ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {mosque.opening_hours.open_now ? 'Open Now' : 'Closed'}
                </span>
              )}
            </div>
            
            <button 
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${mosque.location.lat},${mosque.location.lng}`, '_blank')}
              className="flex items-center gap-2 bg-noor-gold/10 hover:bg-noor-gold/20 text-noor-gold px-4 py-2 rounded-xl text-sm font-bold transition-all"
            >
              <Navigation size={14} />
              Directions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}