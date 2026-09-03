import React from 'react';
import type { SourceType } from '../../types';
import { ShieldCheck, Database, Radio, HardDrive } from 'lucide-react';

interface SourceBadgeProps {
  source: SourceType;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, showIcon = true, size = 'sm' }) => {
  let badgeStyle = 'bg-emerald-100 text-[#2E7D5B] border-[#DCEAE2]';
  let label: string = source;
  let Icon = ShieldCheck;

  switch (source) {
    case 'IMD':
      badgeStyle = 'bg-[#E8F5EE] text-[#2E7D5B] border-[#6BAF92]/40 font-semibold';
      label = 'IMD Official';
      Icon = ShieldCheck;
      break;
    case 'NDMA SACHET':
      badgeStyle = 'bg-red-50 text-red-700 border-red-200 font-semibold';
      label = 'NDMA Disaster Alert';
      Icon = Radio;
      break;
    case 'GFS':
    case 'Open-Meteo':
      badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
      label = `${source} Model`;
      Icon = Database;
      break;
    case 'CACHED':
      badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
      label = 'Cached Local';
      Icon = HardDrive;
      break;
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${padding} ${badgeStyle}`}>
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
      <span>{label}</span>
    </span>
  );
};
