import React from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

export const ConnectionStatus: React.FC = () => {
  const { connection, syncData } = useWeatherStore();

  if (connection.syncInProgress) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-[#2E7D5B] text-xs font-medium border border-[#DCEAE2]">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2E7D5B]" />
        <span>Syncing IMD data...</span>
      </div>
    );
  }

  if (!connection.isOnline) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <WifiOff className="w-3.5 h-3.5 text-amber-600" />
        <span>Offline Mode ({connection.lastSyncedAt ? `Sync: ${connection.lastSyncedAt}` : 'Cached'})</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => syncData()}
      title="Click to resync with IMD servers"
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#E8F5EE] text-[#2E7D5B] text-xs font-medium border border-[#6BAF92]/40 hover:bg-[#2E7D5B] hover:text-white transition-colors"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <Wifi className="w-3.5 h-3.5" />
      <span>● Live IMD Data ({connection.lastSyncedAt})</span>
    </button>
  );
};
