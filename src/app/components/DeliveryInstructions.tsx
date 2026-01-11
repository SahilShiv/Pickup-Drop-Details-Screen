import { MessageSquare } from 'lucide-react';

interface DeliveryInstructionsProps {
  value: string;
  onChange: (value: string) => void;
}

export function DeliveryInstructions({ value, onChange }: DeliveryInstructionsProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
        <div className="w-6 h-6 bg-slate-50 rounded flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
        </div>
        Delivery Instructions <span className="text-slate-400 font-normal">(Optional)</span>
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Call on arrival, gate code, floor number, fragile item notes"
        rows={3}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm resize-none"
      />
    </div>
  );
}
