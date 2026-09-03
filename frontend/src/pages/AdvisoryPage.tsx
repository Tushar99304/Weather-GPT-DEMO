import React from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { AdvisoryCard } from '../components/advisory/AdvisoryCard';
import type { ActivityCategory } from '../types';
import { MOCK_ADVISORIES } from '../mocks/advisory';
import { Compass } from 'lucide-react';

export const AdvisoryPage: React.FC = () => {
  const { selectedActivity, setSelectedActivity, currentLocation } = useWeatherStore();

  const categories: { id: ActivityCategory; label: string; icon: string }[] = [
    { id: 'Driving', label: 'Expressway Driving', icon: '🚗' },
    { id: 'Travel', label: 'Public Transit & Rail', icon: '🚆' },
    { id: 'Outdoor Event', label: 'Outdoor Events', icon: '🎪' },
    { id: 'Trekking', label: 'Hills & Trekking', icon: '🏔️' },
    { id: 'Agriculture', label: 'Agro Advisory', icon: '🌾' },
    { id: 'Marine', label: 'Marine & Fishing', icon: '⚓' },
    { id: 'Daily Activity', label: 'Daily Outings', icon: '🚶' },
  ];

  const currentAdvisory = MOCK_ADVISORIES[selectedActivity] || MOCK_ADVISORIES['Driving'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#17352A] flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#2E7D5B]" />
          Weather Decision Support & Sector Advisory
        </h1>
        <p className="text-xs text-[#6B7D74]">
          Domain-specific weather risk assessment for driving, travel, outdoor events, agriculture and marine safety
        </p>
      </div>

      {/* Activity Category Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedActivity(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-2 ${
              selectedActivity === cat.id
                ? 'bg-[#2E7D5B] text-white border-[#2E7D5B] shadow-xs'
                : 'bg-white text-[#17352A] border-[#DCEAE2] hover:bg-[#E8F5EE]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Active Sector Advisory Card */}
      <AdvisoryCard advisory={{ ...currentAdvisory, location: `${currentLocation.name} Sector` }} />
    </div>
  );
};
