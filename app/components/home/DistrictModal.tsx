import React, { useState, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';

const BD_DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

interface DistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: string;
  onSelect: (district: string) => void;
}

export default function DistrictModal({ isOpen, onClose, currentDistrict, onSelect }: DistrictModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [districts, setDistricts] = useState<string[]>(BD_DISTRICTS);

  useEffect(() => {
    // Optional: Fetch from API to ensure it's up to date, fallback to hardcoded
    fetch('https://raw.githubusercontent.com/taimoorhasan/bangladesh-api/master/dist/districts.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const names = data.map((d: any) => d.name).sort();
          setDistricts(names);
        }
      })
      .catch(() => console.log('Using fallback districts list'));
  }, []);

  if (!isOpen) return null;

  const filteredDistricts = districts.filter(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-0">
      <div className="w-full max-w-md bg-noor-green-dark border border-noor-gold/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
        
        <div className="p-5 border-b border-noor-gold/20 flex justify-between items-center bg-noor-green/40">
          <div className="flex items-center gap-2">
            <MapPin className="text-noor-gold" size={20} />
            <h2 className="text-lg font-bold text-white">Select District</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-noor-gold/30 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-noor-gold focus:ring-1 focus:ring-noor-gold transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredDistricts.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No district found</p>
          ) : (
            filteredDistricts.map((district) => (
              <button
                key={district}
                onClick={() => {
                  onSelect(district);
                  onClose();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex justify-between items-center ${
                  currentDistrict === district 
                    ? 'bg-noor-gold/20 border border-noor-gold/50 text-noor-gold font-semibold'
                    : 'hover:bg-white/5 text-gray-200'
                }`}
              >
                <span>{district}</span>
                {currentDistrict === district && (
                  <div className="w-2 h-2 rounded-full bg-noor-gold animate-pulse"></div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
