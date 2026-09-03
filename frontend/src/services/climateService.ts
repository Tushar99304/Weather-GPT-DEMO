import type { ClimateDataPoint } from '../types';
import { MOCK_CLIMATE_ANNUAL, MOCK_CLIMATE_MONTHLY } from '../mocks/climate';
import { fetchApi } from './api';

export async function getClimateAnnualData(useDemo: boolean = true): Promise<ClimateDataPoint[]> {
  if (!useDemo) {
    try {
      const res = await fetchApi<ClimateDataPoint[]>('/climate/annual');
      if (res.success && res.data) return res.data;
    } catch {
      // Fallback
    }
  }
  return MOCK_CLIMATE_ANNUAL;
}

export async function getClimateMonthlyData(year: number = 2026, useDemo: boolean = true): Promise<ClimateDataPoint[]> {
  if (!useDemo) {
    try {
      const res = await fetchApi<ClimateDataPoint[]>(`/climate/monthly?year=${year}`);
      if (res.success && res.data) return res.data;
    } catch {
      // Fallback
    }
  }
  return MOCK_CLIMATE_MONTHLY;
}
