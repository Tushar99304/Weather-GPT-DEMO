import React from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import { Sparkles } from 'lucide-react';

export const DemoModeBadge: React.FC = () => {
  const { preferences, toggleDemoMode } = useWeatherStore();

  return (
    <button
      onClick={toggleDemoMode}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
        preferences.demoMode
          ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
          : 'bg-gray-100 text-gray-700 border-gray-300 opacity-80 hover:opacity-100'
      }`}
      title="Toggle SIH Demo Mode (Realistic Mock Data)"
    >
      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
      <span>{preferences.demoMode ? 'DEMO MODE' : 'LIVE API MODE'}</span>
    </button>
  );
};
