import React from 'react';
import type { WeatherEvidence } from '../../types';
import { SourceBadge } from './SourceBadge';
import { ShieldAlert, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface EvidencePanelProps {
  evidence: WeatherEvidence;
  compact?: boolean;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ evidence, compact = false }) => {
  let qualityColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (evidence.evidenceQuality === 'MEDIUM') {
    qualityColor = 'bg-amber-100 text-amber-800 border-amber-300';
  } else if (evidence.evidenceQuality === 'LOW') {
    qualityColor = 'bg-red-100 text-red-800 border-red-300';
  }

  if (compact) {
    return (
      <div className="bg-[#E8F5EE]/60 border border-[#DCEAE2] rounded-lg p-3 text-xs text-[#17352A]">
        <div className="flex items-center justify-between mb-2">
          <SourceBadge source={evidence.source} size="sm" />
          <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${qualityColor}`}>
            Evidence Quality: {evidence.evidenceQuality}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[#6B7D74]">
          <div>
            <span className="font-medium text-[#17352A]">Observed:</span> {evidence.observedAt}
          </div>
          <div>
            <span className="font-medium text-[#17352A]">Location:</span> {evidence.location}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DCEAE2] rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-[#DCEAE2] pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#2E7D5B]" />
          <h4 className="font-semibold text-sm text-[#17352A]">Weather Evidence Record</h4>
        </div>
        <SourceBadge source={evidence.source} size="md" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-[#F7FBF8] p-2.5 rounded-lg border border-[#DCEAE2]/60">
          <div className="text-[#6B7D74] mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Location
          </div>
          <div className="font-semibold text-[#17352A] truncate">{evidence.location}</div>
        </div>

        <div className="bg-[#F7FBF8] p-2.5 rounded-lg border border-[#DCEAE2]/60">
          <div className="text-[#6B7D74] mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Valid Period
          </div>
          <div className="font-semibold text-[#17352A]">{evidence.validFrom}</div>
        </div>

        <div className="bg-[#F7FBF8] p-2.5 rounded-lg border border-[#DCEAE2]/60">
          <div className="text-[#6B7D74] mb-1">Source Priority</div>
          <div className="font-semibold text-[#2E7D5B]">{evidence.sourcePriority}</div>
        </div>

        <div className="bg-[#F7FBF8] p-2.5 rounded-lg border border-[#DCEAE2]/60">
          <div className="text-[#6B7D74] mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Evidence Quality
          </div>
          <span className={`inline-block px-2 py-0.5 rounded border text-xs font-semibold ${qualityColor}`}>
            {evidence.evidenceQuality}
          </span>
        </div>
      </div>

      <div className="bg-[#E8F5EE] rounded-lg p-3 text-xs text-[#17352A] flex items-center justify-between">
        <span>Verified Ground Metrics: <strong>{evidence.rainfall} mm</strong> rain, <strong>{evidence.humidity}%</strong> humidity, <strong>{evidence.windSpeed} km/h</strong> wind</span>
        <span className="text-[#6B7D74] text-[11px]">Synced: {evidence.observedAt}</span>
      </div>
    </div>
  );
};
