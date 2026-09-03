import React from 'react';
import type { ClimateDataPoint } from '../../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface RainfallTrendChartProps {
  data: ClimateDataPoint[];
}

export const RainfallTrendChart: React.FC<RainfallTrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white border border-[#DCEAE2] rounded-2xl p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-[#17352A]">Annual Rainfall vs Normal (mm)</h3>
          <p className="text-xs text-[#6B7D74]">Historical comparison of actual precipitation vs 30-year IMD baseline</p>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#E8F5EE] text-[#2E7D5B] text-xs font-semibold">
          Mumbai Sub-basin
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6B7D74' }} stroke="#DCEAE2" />
            <YAxis tick={{ fontSize: 11, fill: '#6B7D74' }} stroke="#DCEAE2" />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#DCEAE2', borderRadius: '8px', fontSize: '12px' }}
              formatter={(val: any) => [`${val} mm`, 'Rainfall']}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="rainfallActual" name="Actual Rainfall" fill="#2E7D5B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rainfallNormal" name="30-Yr IMD Baseline" fill="#6BAF92" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-[#6B7D74] text-center italic">
        * Displaying historical sample dataset until live FastAPI climate repository is synchronized.
      </div>
    </div>
  );
};
