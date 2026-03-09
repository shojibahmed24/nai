import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Navigation, AlertCircle, ChevronLeft, RefreshCw } from 'lucide-react';

interface QiblaScreenProps {
  onBack?: () => void;
}

export default function QiblaScreen({ onBack }: QiblaScreenProps) {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const MAKKAH_COORDS = { lat: 21.4225, lng: 39.8262 };

  const calculateQibla = (lat: number, lng: number) => {
    const φ1 = lat * (Math.PI / 180);
    const φ2 = MAKKAH_COORDS.lat * (Math.PI / 180);
    const Δλ = (MAKKAH_COORDS.lng - lng) * (Math.PI / 180);

    const y = Math.sin(Δλ);
    const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    return (qibla + 360) % 360;
  };

  const initCompass = async () => {
    // Handle iOS permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setIsPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setError('Permission to access orientation was denied.');
        }
      } catch (err) {
        setError('Orientation permission request failed.');
      }
    } else {
      // Non-iOS or older browsers
      setIsPermissionGranted(true);
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      // Fallback to standard event if absolute is not supported
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    let compassHeading = 0;
    if ((event as any).webkitCompassHeading) {
      // iOS
      compassHeading = (event as any).webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Android
      compassHeading = 360 - event.alpha;
    }
    setHeading(compassHeading);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setQiblaDirection(calculateQibla(latitude, longitude));
      },
      (err) => {
        setError('Please enable location access to calculate Qibla direction.');
      }
    );

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
    };
  }, []);

  const isAligned = qiblaDirection !== null && Math.abs(heading - qiblaDirection) < 5;

  return (
    <div className="min-h-full flex flex-col items-center px-6 pt-12 pb-24 relative z-10">
      <div className="w-full flex items-center gap-4 mb-12">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-noor-gold hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Qibla Finder</h1>
          <p className="text-gray-400 text-xs">Find the direction of Kaaba</p>
        </div>
      </div>

      {!isPermissionGranted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
          <div className="w-24 h-24 rounded-full bg-noor-gold/10 flex items-center justify-center text-noor-gold">
            <Compass size={48} className="animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Compass Access Required</h2>
            <p className="text-gray-400 text-sm max-w-[250px]">
              We need access to your device's orientation sensors to show the Qibla direction.
            </p>
          </div>
          <button 
            onClick={initCompass}
            className="px-8 py-4 bg-noor-gold text-noor-green-dark rounded-2xl font-bold shadow-lg shadow-noor-gold/20 active:scale-95 transition-all"
          >
            Enable Compass
          </button>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertCircle size={32} />
          </div>
          <p className="text-gray-300 max-w-[250px]">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-noor-gold font-bold"
          >
            <RefreshCw size={18} /> Retry
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-12">
          {/* Compass UI */}
          <div className="relative w-72 h-72">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-noor-gold/20"></div>
            
            {/* Compass Body */}
            <div 
              className="absolute inset-0 transition-transform duration-100 ease-out"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              {/* Cardinal Points */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500">S</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">W</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">E</span>

              {/* Qibla Indicator */}
              {qiblaDirection !== null && (
                <div 
                  className="absolute inset-0 flex flex-col items-center pt-4"
                  style={{ transform: `rotate(${qiblaDirection}deg)` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-1 h-12 bg-noor-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <div className="w-8 h-8 bg-noor-gold rounded-lg flex items-center justify-center shadow-lg">
                      <Navigation size={16} className="text-noor-green-dark fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-noor-gold uppercase tracking-widest mt-1">Qibla</span>
                  </div>
                </div>
              )}
            </div>

            {/* Center Point */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-4 h-4 rounded-full border-2 border-noor-green-dark transition-colors duration-500 ${isAligned ? 'bg-green-500' : 'bg-noor-gold'}`}></div>
            </div>
          </div>

          {/* Status Card */}
          <div className={`glass-card p-6 rounded-3xl w-full flex flex-col items-center gap-4 border-2 transition-all duration-500 ${isAligned ? 'border-green-500/50 bg-green-500/5' : 'border-noor-gold/20'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAligned ? 'bg-green-500/20 text-green-500' : 'bg-noor-gold/20 text-noor-gold'}`}>
                <MapPin size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Your Location</span>
                <span className="text-white font-medium text-sm">
                  {userLocation ? `${userLocation.lat.toFixed(4)}°, ${userLocation.lng.toFixed(4)}°` : 'Locating...'}
                </span>
              </div>
            </div>
            
            <div className="w-full h-px bg-white/5"></div>

            <div className="text-center">
              <p className={`text-lg font-bold ${isAligned ? 'text-green-500' : 'text-white'}`}>
                {isAligned ? 'You are facing the Qibla' : `Rotate ${Math.round((qiblaDirection || 0) - heading)}° to align`}
              </p>
              <p className="text-gray-500 text-xs mt-1">Keep your phone flat for better accuracy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}