import type { WeatherEvidence } from '../types';
import { MOCK_WEATHER_DATA } from '../mocks/weather';
import { fetchApi } from './api';

export async function getCurrentWeather(locationId: string, useDemo: boolean = true): Promise<WeatherEvidence> {
  if (!useDemo) {
    try {
      const apiRes = await fetchApi<WeatherEvidence>(`/weather/current?location=${locationId}`);
      if (apiRes.success && apiRes.data) {
        return apiRes.data;
      }
    } catch {
      // Graceful fallback to mock data
    }
  }

  const key = locationId.toLowerCase();
  return MOCK_WEATHER_DATA[key] || MOCK_WEATHER_DATA['mumbai'];
}
