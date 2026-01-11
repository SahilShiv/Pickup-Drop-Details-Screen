import { Package } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  title: string;
  subtitle: string;
}

export function Header({ currentStep, title, subtitle }: HeaderProps) {
  const steps = [
    { num: 1, label: 'Delivery Details' },
    { num: 2, label: 'Vehicle Selection' },
    { num: 3, label: 'Fare Review' },
    { num: 4, label: 'Contact Details' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Package className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-600 text-sm mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step.num === currentStep
                    ? 'bg-blue-600 text-white'
                    : step.num < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step.num < currentStep ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  step.num === currentStep
                    ? 'text-blue-600'
                    : step.num < currentStep
                    ? 'text-green-600'
                    : 'text-slate-600'
                } ${step.num > currentStep ? 'opacity-40' : ''}`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 transition-all ${
                  step.num < currentStep ? 'bg-green-500' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}