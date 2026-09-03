import React, { useState } from 'react';
import { RainfallTrendChart } from '../components/climate/RainfallTrendChart';
import { TemperatureTrendChart } from '../components/climate/TemperatureTrendChart';
import { MOCK_CLIMATE_ANNUAL } from '../mocks/climate';
import { LineChart, BarChart3 } from 'lucide-react';

export const ClimatePage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'rainfall' | 'temp'>('rainfall');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17352A] flex items-center gap-2">
            <LineChart className="w-6 h-6 text-[#2E7D5B]" />
            Long-term Climate Analytics & Trends
          </h1>
          <p className="text-xs text-[#6B7D74]">
            Multi-year precipitation anomalies, temperature warming curves and extreme event frequencies
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
          Demo / Historical Sample Data
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCEAE2] pb-3">
        <button
          onClick={() => setSelectedMetric('rainfall')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            selectedMetric === 'rainfall'
              ? 'bg-[#2E7D5B] text-white shadow-xs'
              : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-[#E8F5EE]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Rainfall Dynamics
        </button>

        <button
          onClick={() => setSelectedMetric('temp')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            selectedMetric === 'temp'
              ? 'bg-[#2E7D5B] text-white shadow-xs'
              : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-[#E8F5EE]'
          }`}
        >
          <LineChart className="w-4 h-4" /> Temperature Warming
        </button>
      </div>

      {/* Main Charts */}
      {selectedMetric === 'rainfall' ? (
        <RainfallTrendChart data={MOCK_CLIMATE_ANNUAL} />
      ) : (
        <TemperatureTrendChart data={MOCK_CLIMATE_ANNUAL} />
      )}

      {/* Extreme Weather Events Frequency Matrix */}
      <div className="bg-white border border-[#DCEAE2] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-[#DCEAE2] pb-3">
          <h3 className="font-bold text-base text-[#17352A]">Extreme Weather Events (2019 - 2025)</h3>
          <p className="text-xs text-[#6B7D74]">Annual frequency of heavy rain spells (&gt;115.5mm/day), flash floods and heatwave days</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {MOCK_CLIMATE_ANNUAL.map((pt) => (
            <div key={pt.year} className="bg-[#F7FBF8] border border-[#DCEAE2] p-3 rounded-xl text-center space-y-1">
              <span className="text-xs font-bold text-[#6B7D74]">{pt.year}</span>
              <div className="text-xl font-extrabold text-[#2E7D5B]">{pt.extremeEventsCount}</div>
              <span className="text-[10px] text-[#6B7D74]">Extreme Spells</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
