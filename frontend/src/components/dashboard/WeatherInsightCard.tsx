import React from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import { SourceBadge } from '../common/SourceBadge';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const WeatherInsightCard: React.FC = () => {
  const { currentWeather } = useWeatherStore();

  const evidenceQuality = currentWeather?.evidenceQuality || 'HIGH';
  const observedAt = currentWeather?.observedAt || '10:42 AM IST';

  return (
    <div className="bg-[#E8F5EE] border border-[#6BAF92]/40 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2E7D5B] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#17352A]">WeatherGPT Synthesis Insight</h3>
            <span className="text-[11px] text-[#6B7D74]">Validated Weather Explanation</span>
          </div>
        </div>

        <SourceBadge source="IMD" size="sm" />
      </div>

      <p className="text-sm text-[#17352A] leading-relaxed font-medium bg-white/80 p-3.5 rounded-xl border border-[#DCEAE2]">
        "Rainfall activity is likely to increase during the afternoon high tide period. Official IMD weather warnings take absolute priority over general model forecasts."
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-[#DCEAE2]/60">
        <div className="flex items-center gap-2">
          <span className="text-[#6B7D74] font-medium">Evidence Quality:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#2E7D5B] font-bold border border-emerald-300">
            {evidenceQuality}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[#6B7D74]">
          <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
          <span>Observed via IMD Stations at {observedAt}</span>
        </div>
      </div>
    </div>
  );
};
