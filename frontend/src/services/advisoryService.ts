import type { WeatherAdvisory, ActivityCategory } from '../types';
import { MOCK_ADVISORIES } from '../mocks/advisory';

export async function getAdvisoryForActivity(
  category: ActivityCategory,
  locationName: string = 'Mumbai'
): Promise<WeatherAdvisory> {
  const base = MOCK_ADVISORIES[category] || MOCK_ADVISORIES['Driving'];
  return {
    ...base,
    location: `${locationName} Sector`,
  };
}
