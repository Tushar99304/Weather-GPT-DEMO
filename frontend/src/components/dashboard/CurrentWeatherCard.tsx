import React from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import { SourceBadge } from '../common/SourceBadge';
import { formatTemp, formatWind } from '../../utils/formatters';
import { CloudRain, Wind, Droplets, Gauge, Clock } from 'lucide-react';

export const CurrentWeatherCard: React.FC = () => {
  const { currentWeather, preferences } = useWeatherStore();

  if (!currentWeather) {
    return (
      <div className="bg-white border border-[#DCEAE2] rounded-2xl p-6 shadow-xs animate-pulse space-y-4">
        <div className="h-6 w-32 bg-[#E8F5EE] rounded"></div>
        <div className="h-12 w-24 bg-[#E8F5EE] rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-[#F7FBF8] to-[#E8F5EE]/40 border border-[#DCEAE2] rounded-2xl p-6 shadow-xs relative overflow-hidden">
      {/* Background Subtle Wave Decoration */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-[#6BAF92]/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17352A]">{currentWeather.location}</h2>
            <SourceBadge source={currentWeather.source} size="sm" />
          </div>
          <p className="text-xs text-[#6B7D74] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Updated: {currentWeather.observedAt}
          </p>
        </div>

        {currentWeather.warningsCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>1 Active IMD Warning</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Big Temperature Display */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#2E7D5B]/10 flex items-center justify-center text-[#2E7D5B]">
            <CloudRain className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#17352A] tracking-tight">
              {formatTemp(currentWeather.temperature, preferences.tempUnit)}
            </div>
            <div className="text-xs text-[#6B7D74] font-medium mt-0.5">
              Feels like {formatTemp(currentWeather.feelsLike, preferences.tempUnit)} • {currentWeather.conditionText}
            </div>
          </div>
        </div>

        {/* Quick Weather Metrics Grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/80 backdrop-blur-xs border border-[#DCEAE2] p-3 rounded-xl">
            <div className="text-xs text-[#6B7D74] flex items-center gap-1 mb-1">
              <Droplets className="w-3.5 h-3.5 text-[#2E7D5B]" /> Humidity
            </div>
            <div className="text-base font-bold text-[#17352A]">{currentWeather.humidity}%</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-[#DCEAE2] p-3 rounded-xl">
            <div className="text-xs text-[#6B7D74] flex items-center gap-1 mb-1">
              <Wind className="w-3.5 h-3.5 text-[#2E7D5B]" /> Wind
            </div>
            <div className="text-base font-bold text-[#17352A]">
              {formatWind(currentWeather.windSpeed, preferences.windUnit)}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-[#DCEAE2] p-3 rounded-xl">
            <div className="text-xs text-[#6B7D74] flex items-center gap-1 mb-1">
              <CloudRain className="w-3.5 h-3.5 text-[#2E7D5B]" /> Rainfall
            </div>
            <div className="text-base font-bold text-[#17352A]">{currentWeather.rainfall} mm</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs border border-[#DCEAE2] p-3 rounded-xl">
            <div className="text-xs text-[#6B7D74] flex items-center gap-1 mb-1">
              <Gauge className="w-3.5 h-3.5 text-[#2E7D5B]" /> Pressure
            </div>
            <div className="text-base font-bold text-[#17352A]">{currentWeather.pressure} hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};
