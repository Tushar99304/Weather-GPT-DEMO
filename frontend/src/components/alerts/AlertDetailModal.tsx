import React from 'react';
import type { WeatherAlert } from '../../types';
import { SourceBadge } from '../common/SourceBadge';
import { X, ShieldAlert, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlertDetailModalProps {
  alert: WeatherAlert;
  onClose: () => void;
}

export const AlertDetailModal: React.FC<AlertDetailModalProps> = ({ alert, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#DCEAE2] space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#DCEAE2] pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-600" />
            <div>
              <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase block">Official Warning Protocol</span>
              <h3 className="font-bold text-base text-[#17352A]">{alert.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6B7D74] hover:bg-[#E8F5EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between bg-[#F7FBF8] p-3 rounded-xl border border-[#DCEAE2] text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#2E7D5B]" />
            <span>Affected: <strong>{alert.affectedArea}</strong></span>
          </div>
          <SourceBadge source={alert.source} size="sm" />
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#17352A] uppercase tracking-wider">Official Meteorological Directive</h4>
          <div className="bg-red-50/70 border border-red-200 text-red-950 p-4 rounded-xl text-xs leading-relaxed font-medium">
            "{alert.officialMessage}"
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#17352A] uppercase tracking-wider">Observed Weather Evidence Summary</h4>
          <div className="bg-[#E8F5EE] border border-[#6BAF92]/40 p-3 rounded-xl text-xs text-[#17352A]">
            {alert.weatherEvidenceSummary}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#17352A] uppercase tracking-wider">Official Recommended Actions</h4>
          <div className="space-y-2">
            {alert.recommendedActions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#17352A] bg-[#F7FBF8] p-2.5 rounded-lg border border-[#DCEAE2]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F7FBF8] p-3 rounded-xl border border-[#DCEAE2] text-xs text-[#6B7D74] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#2E7D5B]" />
            <span>Issued: {alert.issueTime} | Expires: {alert.expiryTime}</span>
          </div>
          <Link
            to="/map"
            onClick={onClose}
            className="text-[#2E7D5B] font-bold hover:underline"
          >
            View on Map →
          </Link>
        </div>

        <div className="text-[11px] text-[#6B7D74] text-center pt-2">
          Official source: Follow the latest official guidance from IMD & State Disaster Authorities.
        </div>
      </div>
    </div>
  );
};
