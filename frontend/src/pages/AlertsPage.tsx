import React, { useState } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertTriangle, Radio, CheckCircle2 } from 'lucide-react';
import type { AlertSeverity } from '../types';

export const AlertsPage: React.FC = () => {
  const { alerts } = useWeatherStore();
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'ALL'>('ALL');

  const highSeverityCount = alerts.filter((a) => a.severity === 'WARNING').length;

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Top Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17352A] flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Official Meteorological Weather Warnings
          </h1>
          <p className="text-xs text-[#6B7D74]">
            Synchronized with IMD Bulletins and NDMA SACHET Disaster Early Warning System
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-lg border border-red-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-600" />
            <span>Cap-Protocol Active</span>
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#DCEAE2] p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-[#E8F5EE] text-[#2E7D5B] rounded-xl font-bold text-xl">
            {alerts.length}
          </div>
          <div>
            <span className="text-xs font-semibold text-[#6B7D74]">Active Warnings</span>
            <p className="text-xs text-[#17352A] font-bold">IMD & NDMA Directives</p>
          </div>
        </div>

        <div className="bg-white border border-[#DCEAE2] p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-xl font-bold text-xl">
            {highSeverityCount}
          </div>
          <div>
            <span className="text-xs font-semibold text-[#6B7D74]">High Severity</span>
            <p className="text-xs text-red-700 font-bold">Red / Yellow Alerts</p>
          </div>
        </div>

        <div className="bg-white border border-[#DCEAE2] p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl font-bold text-xl">
            8
          </div>
          <div>
            <span className="text-xs font-semibold text-[#6B7D74]">Districts Affected</span>
            <p className="text-xs text-amber-800 font-bold">Coastal & Hilly Belts</p>
          </div>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCEAE2] pb-3">
        {(['ALL', 'WARNING', 'ALERT', 'WATCH'] as const).map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterSeverity === sev
                ? 'bg-[#2E7D5B] text-white shadow-xs'
                : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-[#E8F5EE]'
            }`}
          >
            {sev === 'ALL' ? 'All Severity Levels' : sev}
          </button>
        ))}
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}

        {filteredAlerts.length === 0 && (
          <div className="col-span-full bg-white border border-[#DCEAE2] rounded-2xl p-8 text-center text-xs text-[#6B7D74] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#2E7D5B] mx-auto" />
            <p className="font-bold text-sm text-[#17352A]">No active warnings found for selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
