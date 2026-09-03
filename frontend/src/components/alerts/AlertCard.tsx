import React from 'react';
import type { WeatherAlert } from '../../types';
import { SourceBadge } from '../common/SourceBadge';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { useWeatherStore } from '../../store/useWeatherStore';

interface AlertCardProps {
  alert: WeatherAlert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const { setActiveAlertModal } = useWeatherStore();

  let severityBadgeClass = 'bg-red-100 text-red-800 border-red-300';
  let severityLabel = '🔴 HIGH SEVERE';

  if (alert.severity === 'ALERT') {
    severityBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
    severityLabel = '🟠 DISASTER WATCH';
  } else if (alert.severity === 'WATCH') {
    severityBadgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300';
    severityLabel = '🟡 ADVISORY WATCH';
  }

  return (
    <div className="bg-white border border-[#DCEAE2] rounded-2xl p-5 shadow-xs space-y-3.5 hover:border-[#6BAF92] transition-colors relative overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${severityBadgeClass}`}>
          {severityLabel}
        </span>
        <SourceBadge source={alert.source} size="sm" />
      </div>

      <div>
        <h3 className="font-bold text-base text-[#17352A] leading-snug">{alert.title}</h3>
        <p className="text-xs text-[#6B7D74] flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5 text-[#2E7D5B]" /> {alert.affectedArea}
        </p>
      </div>

      <p className="text-xs text-[#17352A] bg-[#F7FBF8] p-3 rounded-xl border border-[#DCEAE2] leading-relaxed">
        "{alert.officialMessage}"
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B7D74] border-t border-[#DCEAE2] pt-3">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Valid: {alert.issueTime} – {alert.expiryTime}
        </span>

        <button
          onClick={() => setActiveAlertModal(alert)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D5B] hover:underline"
        >
          <span>View Details & Actions</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
