import React from 'react';
import { DATA_SOURCES } from '../constants/sources';
import { SourceBadge } from '../components/common/SourceBadge';
import { Database, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#17352A] flex items-center gap-2">
          <Database className="w-6 h-6 text-[#2E7D5B]" />
          Trusted Meteorological & Disaster Data Sources
        </h1>
        <p className="text-xs text-[#6B7D74]">
          WeatherGPT grounds all conversational answers in authoritative government observation networks and validated NWP models.
        </p>
      </div>

      {/* Grounding Mission Statement */}
      <div className="bg-[#E8F5EE] border border-[#6BAF92]/40 rounded-2xl p-5 shadow-xs space-y-2 text-xs text-[#17352A]">
        <div className="font-bold text-sm flex items-center gap-2 text-[#2E7D5B]">
          <ShieldCheck className="w-5 h-5" /> Mission & AI Safety Principles
        </div>
        <p className="leading-relaxed font-medium">
          "We do not replace official meteorological forecasting. WeatherGPT makes trusted meteorological evidence conversational, traceable, multilingual and easier to act on."
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DATA_SOURCES.map((source) => (
          <div key={source.id} className="bg-white border border-[#DCEAE2] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#DCEAE2] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#17352A]">{source.name}</h3>
                <span className="text-[11px] text-[#6B7D74]">{source.fullName}</span>
              </div>
              <SourceBadge source={source.name as any} size="sm" />
            </div>

            <p className="text-xs text-[#17352A] leading-relaxed">
              {source.description}
            </p>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#6B7D74] uppercase tracking-wider">Data Types Retrieved:</span>
              <div className="flex flex-wrap gap-1.5">
                {source.dataProvided.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#F7FBF8] border border-[#DCEAE2] text-[11px] text-[#17352A]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B7D74] border-t border-[#DCEAE2] pt-2">
              <span className="flex items-center gap-1 text-[#2E7D5B] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Authority: {source.authorityLevel}
              </span>
              <span>Updated: {source.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Security & API Architecture note */}
      <div className="bg-white border border-[#DCEAE2] rounded-2xl p-5 shadow-xs text-xs text-[#6B7D74] space-y-2">
        <div className="font-bold text-[#17352A] flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-[#2E7D5B]" /> Security & Backend Integration Contract
        </div>
        <p className="leading-relaxed">
          No private IMD endpoints or LLM API secrets reside in the frontend source code. Environment variable <code>VITE_API_BASE_URL</code> configures the gateway endpoint for production deployment.
        </p>
      </div>
    </div>
  );
};
