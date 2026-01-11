import { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapViewEditableProps {
  pickup: string;
  drop: string;
  showRoute: boolean;
}

export function MapViewEditable({ pickup, drop, showRoute }: MapViewEditableProps) {
  const [routeDrawProgress, setRouteDrawProgress] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate route drawing when showRoute changes
  useEffect(() => {
    if (showRoute) {
      setRouteDrawProgress(0);
      
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setRouteDrawProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setRouteDrawProgress(0);
    }
  }, [showRoute]);

  // Fixed coordinates for Andheri East and Linking Road, Bandra
  const pickupPoint = { x: 240, y: 180 }; // Andheri East
  const dropPoint = { x: 220, y: 320 }; // Bandra

  // Generate smooth curved path between two points
  const getRoutePath = () => {
    const midX = (pickupPoint.x + dropPoint.x) / 2;
    const midY = (pickupPoint.y + dropPoint.y) / 2;
    const controlOffset = 50;
    
    return `M ${pickupPoint.x} ${pickupPoint.y} Q ${midX + controlOffset} ${midY - controlOffset} ${dropPoint.x} ${dropPoint.y}`;
  };

  const hasPickup = pickup.length > 0;
  const hasDrop = drop.length > 0;

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

          {/* Route line with animation - Only show when showRoute is true */}
          <AnimatePresence>
            {showRoute && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.g>
            )}
          </AnimatePresence>

          {/* Pickup marker */}
          <AnimatePresence>
            {hasPickup && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
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
          </AnimatePresence>

          {/* Drop marker */}
          <AnimatePresence>
            {hasDrop && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
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
          </AnimatePresence>

          {/* Empty State Text */}
          {!hasPickup && !hasDrop && (
            <g>
              <text x="300" y="280" textAnchor="middle" fontSize="14" fill="#94a3b8" fontWeight="500">
                Enter pickup and drop locations
              </text>
              <text x="300" y="305" textAnchor="middle" fontSize="12" fill="#cbd5e1">
                to view delivery route on map
              </text>
            </g>
          )}
        </svg>
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
        {showRoute && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-600 rounded" />
            <span className="text-slate-600">Delivery Route</span>
          </div>
        )}
      </div>
    </div>
  );
}
