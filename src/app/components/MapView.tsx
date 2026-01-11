import { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Clock, Route, IndianRupee, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapViewProps {
  pickup: string;
  drop: string;
  distance: number;
  estimatedTime: string;
  costPreview: number;
}

export function MapView({ pickup, drop, distance, estimatedTime, costPreview }: MapViewProps) {
  const [routeDrawProgress, setRouteDrawProgress] = useState(0);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate route drawing
  useEffect(() => {
    setRouteDrawProgress(0);
    setShowRouteInfo(false);
    
    // Animate from 0 to 100
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRouteDrawProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Show route info after animation completes
        setTimeout(() => setShowRouteInfo(true), 200);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Fixed coordinates for Andheri East and Linking Road, Bandra
  const pickupPoint = { x: 240, y: 180 }; // Andheri East
  const dropPoint = { x: 220, y: 320 }; // Bandra

  // Generate smooth curved path between two points
  const getRoutePath = () => {
    const midX = (pickupPoint.x + dropPoint.x) / 2;
    const midY = (pickupPoint.y + dropPoint.y) / 2;
    
    // Add curve control points
    const controlOffset = 50;
    
    return `M ${pickupPoint.x} ${pickupPoint.y} Q ${midX + controlOffset} ${midY - controlOffset} ${dropPoint.x} ${dropPoint.y}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Map Container */}
      <div className="relative bg-slate-50">
        <svg
          ref={svgRef}
          viewBox="0 0 600 600"
          className="w-full h-auto"
          style={{ minHeight: '500px' }}
        >
          {/* Background grid pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="600" height="600" fill="url(#grid)" />
          
          {/* Map landmarks - Mumbai areas */}
          <g opacity="0.6">
            {/* Andheri */}
            <circle cx="240" cy="180" r="60" fill="#dbeafe" />
            <text x="240" y="185" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="500">
              Andheri
            </text>
            
            {/* Bandra */}
            <circle cx="220" cy="320" r="50" fill="#fef3c7" />
            <text x="220" y="325" textAnchor="middle" fontSize="12" fill="#f59e0b" fontWeight="500">
              Bandra
            </text>
            
            {/* Dadar */}
            <circle cx="280" cy="400" r="45" fill="#e0e7ff" />
            <text x="280" y="405" textAnchor="middle" fontSize="12" fill="#6366f1" fontWeight="500">
              Dadar
            </text>
            
            {/* Powai */}
            <circle cx="400" cy="160" r="45" fill="#d1fae5" />
            <text x="400" y="165" textAnchor="middle" fontSize="12" fill="#10b981" fontWeight="500">
              Powai
            </text>
          </g>

          {/* Route line with animation */}
          {pickupPoint && dropPoint && (
            <g>
              <motion.path
                d={getRoutePath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 * (1 - routeDrawProgress)}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))',
                }}
              />
            </g>
          )}

          {/* Pickup marker */}
          {pickupPoint && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <circle
                cx={pickupPoint.x}
                cy={pickupPoint.y}
                r="20"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="3"
              />
              <g transform={`translate(${pickupPoint.x - 8}, ${pickupPoint.y - 8})`}>
                <path
                  d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"
                  fill="white"
                  transform="scale(0.65)"
                />
              </g>
            </motion.g>
          )}

          {/* Drop marker */}
          {dropPoint && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <circle
                cx={dropPoint.x}
                cy={dropPoint.y}
                r="20"
                fill="#f97316"
                stroke="white"
                strokeWidth="3"
              />
              <g transform={`translate(${dropPoint.x - 8}, ${dropPoint.y - 8})`}>
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="white"
                  transform="scale(0.65)"
                />
              </g>
            </motion.g>
          )}
        </svg>

        {/* Route Info Card */}
        <AnimatePresence>
          {showRouteInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute top-4 left-4 right-4 bg-white rounded-xl shadow-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-900">Estimated Delivery</h3>
                <div className="relative group">
                  <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Fastest route selected to avoid traffic congestion
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Time</p>
                    <p className="text-sm font-semibold text-slate-900">{estimatedTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Route className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Distance</p>
                    <p className="text-sm font-semibold text-slate-900">~{distance.toFixed(1)} km</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Cost</p>
                    <p className="text-sm font-semibold text-slate-900">₹{costPreview}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-md">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs font-medium text-green-700">Express Available</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Legend */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
            <Navigation className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-slate-600">Pickup Point</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
            <MapPin className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-slate-600">Drop-off Point</span>
        </div>
        {pickupPoint && dropPoint && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-600 rounded" />
            <span className="text-slate-600">Delivery Route</span>
          </div>
        )}
      </div>
    </div>
  );
}