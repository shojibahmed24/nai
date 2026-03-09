import React, { useState, useEffect } from 'react';
import { Map as MapIcon, List, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import MosqueMap from '../components/mosques/MosqueMap';
import MosqueList from '../components/mosques/MosqueList';
import { Mosque } from '../types/mosque';

export default function MosqueFinderScreen({ onBack }: { onBack: () => void }) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError('Please enable location access to find nearby mosques');
        setLoading(false);
      }
    );
  }, []);

  const handleMosquesFound = (foundMosques: Mosque[]) => {
    setMosques(foundMosques);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-noor-green-dark">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between bg-noor-green-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-white/5 text-noor-gold hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Nearby Mosques</h1>
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-xl border border-noor-gold/20">
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-noor-gold text-noor-green-dark shadow-lg' : 'text-gray-400'}`}
          >
            <MapIcon size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-noor-gold text-noor-green-dark shadow-lg' : 'text-gray-400'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 z-40 bg-noor-green-dark/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <Loader2 className="text-noor-gold animate-spin" size={40} />
            <p className="text-noor-gold font-medium">Finding mosques near you...</p>
          </div>
        )}

        {error && (
          <div className="p-10 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertCircle size={32} />
            </div>
            <p className="text-gray-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-noor-gold text-noor-green-dark rounded-full font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {!error && userLocation && (
          <>
            <div className={viewMode === 'map' ? 'h-full' : 'hidden'}>
              <MosqueMap 
                userLocation={userLocation} 
                onMosquesFound={handleMosquesFound} 
              />
            </div>
            <div className={viewMode === 'list' ? 'h-full overflow-y-auto' : 'hidden'}>
              <MosqueList mosques={mosques} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}