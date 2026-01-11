import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface NextButtonProps {
  enabled: boolean;
}

export function NextButton({ enabled }: NextButtonProps) {
  return (
    <motion.button
      whileHover={enabled ? { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' } : {}}
      whileTap={enabled ? { scale: 0.98 } : {}}
      disabled={!enabled}
      className={`
        w-full py-4 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200
        ${
          enabled
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 cursor-pointer'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }
      `}
    >
      Continue to Vehicle Selection
      <ArrowRight className={`w-5 h-5 transition-transform ${enabled ? 'group-hover:translate-x-1' : ''}`} />
    </motion.button>
  );
}
