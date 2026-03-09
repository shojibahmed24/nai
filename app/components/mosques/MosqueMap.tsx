import React, { useEffect, useRef, useState } from 'react';
import { Mosque } from '../../types/mosque';

interface MosqueMapProps {
  userLocation: { lat: number; lng: number };
  onMosquesFound: (mosques: Mosque[]) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function MosqueMap({ userLocation, onMosquesFound }: MosqueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FIX: Robust access to environment variables to prevent "Cannot read properties of undefined"
    // We check if import.meta and import.meta.env exist before accessing the key
    const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
    const apiKey = env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError("Google Maps API Key is missing. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.");
      return;
    }

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => setError("Failed to load Google Maps. Please check your API key and internet connection.");
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google || !window.google.maps) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a2e1a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1a2e1a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#d4af37" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d4af37" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d4af37" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#122412" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#2c4a2c" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1a2e1a" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#0f1a0f" }],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });

      // User Location Marker
      new window.google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "white",
        },
        title: "You are here",
      });

      const service = new window.google.maps.places.PlacesService(mapInstance);
      const request = {
        location: userLocation,
        radius: '3000',
        type: ['mosque'],
        keyword: 'mosque masjid'
      };

      service.nearbySearch(request, (results: any[], status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const foundMosques: Mosque[] = results.map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            opening_hours: place.opening_hours,
          }));

          onMosquesFound(foundMosques);

          foundMosques.forEach(mosque => {
            new window.google.maps.Marker({
              position: mosque.location,
              map: mapInstance,
              title: mosque.name,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              }
            });
          });
        } else {
          onMosquesFound([]);
        }
      });
    };

    loadGoogleMaps();
  }, [userLocation, onMosquesFound]);

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-noor-green-dark/50">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl font-bold">!</span>
        </div>
        <h3 className="text-white font-semibold mb-2">Map Configuration Error</h3>
        <p className="text-gray-400 text-xs leading-relaxed">{error}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}