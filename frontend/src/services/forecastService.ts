import type { HourlyForecast, DailyForecast } from '../types';
import { MOCK_HOURLY_FORECASTS, MOCK_DAILY_FORECASTS } from '../mocks/forecast';
import { fetchApi } from './api';

export async function getHourlyForecast(locationId: string, useDemo: boolean = true): Promise<HourlyForecast[]> {
  if (!useDemo) {
    try {
      const apiRes = await fetchApi<HourlyForecast[]>(`/forecast/hourly?location=${locationId}`);
      if (apiRes.success && apiRes.data) {
        return apiRes.data;
      }
    } catch {
      // Graceful fallback
    }
  }

  const key = locationId.toLowerCase();
  return MOCK_HOURLY_FORECASTS[key] || MOCK_HOURLY_FORECASTS['mumbai'];
}

export async function getDailyForecast(locationId: string, useDemo: boolean = true): Promise<DailyForecast[]> {
  if (!useDemo) {
    try {
      const apiRes = await fetchApi<DailyForecast[]>(`/forecast/daily?location=${locationId}`);
      if (apiRes.success && apiRes.data) {
        return apiRes.data;
      }
    } catch {
      // Graceful fallback
    }
  }

  const key = locationId.toLowerCase();
  return MOCK_DAILY_FORECASTS[key] || MOCK_DAILY_FORECASTS['mumbai'];
}
