import type { WeatherAlert } from '../types';
import { MOCK_ALERTS } from '../mocks/alerts';
import { fetchApi } from './api';

export async function getActiveAlerts(locationId?: string, useDemo: boolean = true): Promise<WeatherAlert[]> {
  if (!useDemo) {
    try {
      const apiRes = await fetchApi<WeatherAlert[]>(`/alerts/active${locationId ? `?location=${locationId}` : ''}`);
      if (apiRes.success && apiRes.data) {
        return apiRes.data;
      }
    } catch {
      // Graceful fallback
    }
  }

  if (locationId) {
    return MOCK_ALERTS.filter((a) => a.locationId.toLowerCase() === locationId.toLowerCase() || a.locationId === 'all');
  }
  return MOCK_ALERTS;
}
