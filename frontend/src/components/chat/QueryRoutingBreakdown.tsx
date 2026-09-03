import React, { useState } from 'react';
import type { QueryAnalysis } from '../../types';
import { ChevronDown, ChevronUp, Cpu, MapPin, Calendar, Languages } from 'lucide-react';

interface QueryRoutingBreakdownProps {
  analysis: QueryAnalysis;
}

export const QueryRoutingBreakdown: React.FC<QueryRoutingBreakdownProps> = ({ analysis }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#DCEAE2] rounded-xl overflow-hidden bg-[#F7FBF8] text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between text-[#6B7D74] hover:bg-[#E8F5EE] transition-colors"
      >
        <span className="flex items-center gap-1.5 font-medium text-[#17352A]">
          <Cpu className="w-3.5 h-3.5 text-[#2E7D5B]" />
          How WeatherGPT understood your question
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-[#DCEAE2] bg-white space-y-2 text-[#17352A] animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 bg-[#F7FBF8] p-2 rounded-lg border border-[#DCEAE2]">
              <Cpu className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>Intent: <strong>{analysis.intent}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F7FBF8] p-2 rounded-lg border border-[#DCEAE2]">
              <MapPin className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>Location: <strong>{analysis.location}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F7FBF8] p-2 rounded-lg border border-[#DCEAE2]">
              <Calendar className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>Timeframe: <strong>{analysis.timeframe}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F7FBF8] p-2 rounded-lg border border-[#DCEAE2]">
              <Languages className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>Language: <strong>{analysis.language}</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B7D74] pt-1">
            <span>Sources Queried: <strong>{analysis.dataSourcesUsed.join(' + ')}</strong></span>
            <span className="text-[#2E7D5B] font-semibold">Validation: {analysis.validationStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};
