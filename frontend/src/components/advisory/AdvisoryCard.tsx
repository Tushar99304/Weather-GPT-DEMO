import React from 'react';
import type { WeatherAdvisory } from '../../types';
import { AlertTriangle, CheckCircle2, Car, Compass, Anchor, Tent, Sprout, Calendar } from 'lucide-react';

interface AdvisoryCardProps {
  advisory: WeatherAdvisory;
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ advisory }) => {
  let riskColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  let riskLabel = 'LOW RISK';

  if (advisory.riskLevel === 'MEDIUM') {
    riskColor = 'bg-amber-100 text-amber-900 border-amber-300';
    riskLabel = 'MODERATE RISK';
  } else if (advisory.riskLevel === 'HIGH') {
    riskColor = 'bg-red-100 text-red-950 border-red-300';
    riskLabel = 'HIGH RISK';
  }

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'Driving':
        return <Car className="w-5 h-5 text-[#2E7D5B]" />;
      case 'Trekking':
        return <Tent className="w-5 h-5 text-[#2E7D5B]" />;
      case 'Agriculture':
        return <Sprout className="w-5 h-5 text-[#2E7D5B]" />;
      case 'Marine':
        return <Anchor className="w-5 h-5 text-[#2E7D5B]" />;
      case 'Outdoor Event':
        return <Calendar className="w-5 h-5 text-[#2E7D5B]" />;
      default:
        return <Compass className="w-5 h-5 text-[#2E7D5B]" />;
    }
  };

  return (
    <div className="bg-white border border-[#DCEAE2] rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCEAE2] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#E8F5EE] border border-[#6BAF92]/40">
            {renderCategoryIcon(advisory.category)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#17352A]">{advisory.category} Advisory</h3>
            <p className="text-xs text-[#6B7D74]">{advisory.location} • {advisory.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-lg text-xs font-extrabold border ${riskColor}`}>
            Weather-Related Risk: {riskLabel}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-[#17352A] uppercase tracking-wider">Primary Risk Factors</h4>
        <div className="bg-[#F7FBF8] border border-[#DCEAE2] p-4 rounded-xl space-y-2">
          <p className="text-sm font-semibold text-[#17352A] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{advisory.primaryRiskReason}</span>
          </p>
          <ul className="space-y-1.5 pt-2 border-t border-[#DCEAE2]/60 text-xs text-[#6B7D74]">
            {advisory.detailedReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] mt-1.5 shrink-0"></span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-[#17352A] uppercase tracking-wider">Operational Action Recommendation</h4>
        <div className="bg-[#E8F5EE] border border-[#6BAF92]/40 p-4 rounded-xl text-xs text-[#17352A] leading-relaxed font-medium flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#2E7D5B] shrink-0 mt-0.5" />
          <div>
            <p>"{advisory.recommendation}"</p>
            <p className="text-[11px] text-[#6B7D74] mt-2 font-normal">
              Disclaimer: WeatherGPT provides probabilistic decision support. Final safety clearances rest with local authorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
