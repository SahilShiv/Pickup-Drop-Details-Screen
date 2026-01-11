import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function ServiceTypeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.6,
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        >
          <Zap className="w-5 h-5 text-green-600 fill-green-600" />
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-green-700">Express Delivery Available</p>
          <p className="text-xs text-green-600">Fastest delivery for this route</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
