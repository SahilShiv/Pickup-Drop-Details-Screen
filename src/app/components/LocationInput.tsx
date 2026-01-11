import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Location {
  address: string;
  lat: number;
  lng: number;
  isValid: boolean;
  isServiceable: boolean;
}

interface LocationInputProps {
  type: 'pickup' | 'drop';
  label: string;
  placeholder: string;
  value: Location;
  onChange: (location: Location) => void;
  showEmptyHelper?: boolean;
}

// Mock location suggestions for Mumbai
const getMockSuggestions = (query: string, type: 'pickup' | 'drop'): Array<{ address: string; lat: number; lng: number; isServiceable: boolean }> => {
  if (!query || query.length < 2) return [];

  const allLocations = [
    { address: 'Andheri East, Mumbai', lat: 19.1197, lng: 72.8464, isServiceable: true },
    { address: 'Andheri West, Mumbai', lat: 19.1356, lng: 72.8266, isServiceable: true },
    { address: 'Linking Road, Bandra West, Mumbai', lat: 19.0550, lng: 72.8289, isServiceable: true },
    { address: 'Bandra Kurla Complex, Mumbai', lat: 19.0610, lng: 72.8688, isServiceable: true },
    { address: 'Dadar East, Mumbai', lat: 19.0178, lng: 72.8478, isServiceable: true },
    { address: 'Powai, Mumbai', lat: 19.1176, lng: 72.9060, isServiceable: true },
    { address: 'Worli Sea Face, Mumbai', lat: 19.0137, lng: 72.8158, isServiceable: true },
    { address: 'Colaba Causeway, Mumbai', lat: 18.9200, lng: 72.8263, isServiceable: true },
    { address: 'Goregaon East, Mumbai', lat: 19.1653, lng: 72.8504, isServiceable: true },
    { address: 'Navi Mumbai, Vashi', lat: 19.0770, lng: 73.0169, isServiceable: false },
  ];

  return allLocations
    .filter(loc => loc.address.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
};

export function LocationInput({
  type,
  label,
  placeholder,
  value,
  onChange,
  showEmptyHelper = false,
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ address: string; lat: number; lng: number; isServiceable: boolean }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length >= 2) {
      const mockSuggestions = getMockSuggestions(inputValue, type);
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, type]);

  const handleSelectSuggestion = (suggestion: typeof suggestions[0]) => {
    setInputValue(suggestion.address);
    setShowSuggestions(false);
    onChange({
      address: suggestion.address,
      lat: suggestion.lat,
      lng: suggestion.lng,
      isValid: true,
      isServiceable: suggestion.isServiceable,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Reset validation when user types
    if (value.isValid) {
      onChange({
        address: newValue,
        lat: 0,
        lng: 0,
        isValid: false,
        isServiceable: true,
      });
    }
  };

  const Icon = type === 'pickup' ? Navigation : MapPin;
  const iconColor = type === 'pickup' ? 'text-blue-600' : 'text-orange-600';
  const iconBg = type === 'pickup' ? 'bg-blue-50' : 'bg-orange-50';

  return (
    <div className="space-y-2 relative">
      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
        <div className={`w-6 h-6 ${iconBg} rounded flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </div>
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
        />

        <AnimatePresence>
          {value.isValid && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0 flex items-center gap-3"
                >
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{suggestion.address}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper and Error Messages */}
      <AnimatePresence mode="wait">
        {showEmptyHelper && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-slate-500 flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            Enter both pickup and drop locations to continue
          </motion.p>
        )}

        {type === 'drop' && value.isValid && !value.isServiceable && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2"
          >
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              This location is outside our express service zone. Try selecting a nearby main road or landmark for faster delivery.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
