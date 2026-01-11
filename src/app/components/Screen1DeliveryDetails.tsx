import { useState, useEffect } from 'react';
import { Header } from './Header';
import { MapViewEditable } from './MapViewEditable';
import { MapPin, Navigation, MessageSquare, Zap, ArrowRight, Check, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { BookingData } from '../App';

interface Screen1Props {
  bookingData: BookingData;
  onNext: () => void;
}

// Mock location suggestions for Mumbai
const getMockSuggestions = (query: string): Array<{ address: string; isServiceable: boolean }> => {
  if (!query || query.length < 2) return [];

  const allLocations = [
    { address: 'Andheri East, Mumbai', isServiceable: true },
    { address: 'Andheri West, Mumbai', isServiceable: true },
    { address: 'Linking Road, Bandra West, Mumbai', isServiceable: true },
    { address: 'Bandra Kurla Complex, Mumbai', isServiceable: true },
    { address: 'Dadar East, Mumbai', isServiceable: true },
    { address: 'Powai Lake, Mumbai', isServiceable: false },
    { address: 'Marine Drive, Mumbai', isServiceable: false },
    { address: 'Worli Sea Face, Mumbai', isServiceable: true },
    { address: 'Colaba Causeway, Mumbai', isServiceable: true },
    { address: 'Goregaon East, Mumbai', isServiceable: true },
  ];

  return allLocations
    .filter(loc => loc.address.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
};

export function Screen1DeliveryDetails({ bookingData, onNext }: Screen1Props) {
  const [pickupValue, setPickupValue] = useState('');
  const [dropValue, setDropValue] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  
  const [pickupValid, setPickupValid] = useState(false);
  const [dropValid, setDropValid] = useState(false);
  const [dropServiceable, setDropServiceable] = useState(true);
  
  const [pickupSuggestions, setPickupSuggestions] = useState<Array<{ address: string; isServiceable: boolean }>>([]);
  const [dropSuggestions, setDropSuggestions] = useState<Array<{ address: string; isServiceable: boolean }>>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);

  // Update suggestions based on input
  useEffect(() => {
    if (pickupValue.length >= 2) {
      const suggestions = getMockSuggestions(pickupValue);
      setPickupSuggestions(suggestions);
      setShowPickupSuggestions(true);
    } else {
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
    }
  }, [pickupValue]);

  useEffect(() => {
    if (dropValue.length >= 2) {
      const suggestions = getMockSuggestions(dropValue);
      setDropSuggestions(suggestions);
      setShowDropSuggestions(true);
    } else {
      setDropSuggestions([]);
      setShowDropSuggestions(false);
    }
  }, [dropValue]);

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupValue(e.target.value);
    setPickupValid(false);
  };

  const handleDropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropValue(e.target.value);
    setDropValid(false);
    setDropServiceable(true);
  };

  const selectPickupSuggestion = (suggestion: typeof pickupSuggestions[0]) => {
    setPickupValue(suggestion.address);
    setPickupValid(true);
    setShowPickupSuggestions(false);
  };

  const selectDropSuggestion = (suggestion: typeof dropSuggestions[0]) => {
    setDropValue(suggestion.address);
    setDropValid(true);
    setDropServiceable(suggestion.isServiceable);
    setShowDropSuggestions(false);
  };

  const canProceed = pickupValid && dropValid && dropServiceable;
  const showEmptyHelper = !pickupValue && !dropValue;

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      <Header currentStep={1} title="Book a Shipment" subtitle="Get your package delivered hyperlocally in minutes" />

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* LEFT COLUMN - Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="space-y-6">
              {/* Pickup Location - Editable */}
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center">
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  Pickup Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupValue}
                    onChange={handlePickupChange}
                    onFocus={() => {
                      if (pickupSuggestions.length > 0) setShowPickupSuggestions(true);
                    }}
                    placeholder="Enter pickup address"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  />
                  <AnimatePresence>
                    {pickupValid && (
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

                  {/* Pickup Suggestions Dropdown */}
                  <AnimatePresence>
                    {showPickupSuggestions && pickupSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50"
                      >
                        {pickupSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => selectPickupSuggestion(suggestion)}
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
              </div>

              {/* Drop Location - Editable */}
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-50 rounded flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  </div>
                  Drop-off Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropValue}
                    onChange={handleDropChange}
                    onFocus={() => {
                      if (dropSuggestions.length > 0) setShowDropSuggestions(true);
                    }}
                    placeholder="Enter drop address"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  />
                  <AnimatePresence>
                    {dropValid && dropServiceable && (
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

                  {/* Drop Suggestions Dropdown */}
                  <AnimatePresence>
                    {showDropSuggestions && dropSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50"
                      >
                        {dropSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => selectDropSuggestion(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0 flex items-center gap-3"
                          >
                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{suggestion.address}</span>
                            {!suggestion.isServiceable && (
                              <span className="ml-auto text-xs text-orange-600 font-medium">Not serviceable</span>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Validation Messages */}
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

                  {dropValid && !dropServiceable && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-900 mb-0.5">
                          Service is not currently available at this location.
                        </p>
                        <p className="text-xs text-orange-700">
                          Please choose a nearby main road or landmark.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Delivery Instructions */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-50 rounded flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                  Delivery Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Call on arrival, gate code, floor number, fragile item notes"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm resize-none"
                />
              </div>

              {/* Express Available Badge */}
              <AnimatePresence>
                {canProceed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
                    >
                      <Zap className="w-5 h-5 text-green-600 fill-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-green-700">Express Delivery Available</p>
                        <p className="text-xs text-green-600">Fastest delivery for this route</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <div className="space-y-2">
                <motion.button
                  whileHover={canProceed ? { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' } : {}}
                  whileTap={canProceed ? { scale: 0.98 } : {}}
                  onClick={onNext}
                  disabled={!canProceed}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    canProceed
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue to Vehicle Selection
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {!canProceed && (pickupValue || dropValue) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-slate-500 text-center"
                    >
                      Enter valid serviceable locations to continue
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Map & Summary */}
        <div className="space-y-6">
          <MapViewEditable
            pickup={pickupValid ? pickupValue : ''}
            drop={dropValid && dropServiceable ? dropValue : ''}
            showRoute={pickupValid && dropValid && dropServiceable}
          />

          {/* Square Estimated Delivery Card */}
          <AnimatePresence>
            {pickupValid && dropValid && dropServiceable && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Estimated Delivery</h3>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Time</p>
                    <p className="text-lg font-bold text-slate-900">20–28 mins</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Distance</p>
                    <p className="text-lg font-bold text-slate-900">~3.8 km</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Cost Preview</p>
                    <p className="text-lg font-bold text-blue-600">₹120</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <Zap className="w-4 h-4 text-green-600 fill-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-700">Express Available</p>
                      <p className="text-xs text-green-600">Fastest delivery for this route</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
