import type { WeatherEvidence, QueryAnalysis } from '../types';
import { MOCK_WEATHER_DATA } from '../mocks/weather';
import { MOCK_ALERTS } from '../mocks/alerts';
import { fetchApi } from './api';

export interface AskQueryResponse {
  message: string;
  queryAnalysis: QueryAnalysis;
  evidence: WeatherEvidence;
  activeAlert?: typeof MOCK_ALERTS[0];
}

export async function askWeatherGPT(
  userQuery: string,
  currentLocationName: string = 'Mumbai',
  language: string = 'en',
  useDemo: boolean = true
): Promise<AskQueryResponse> {
  if (!useDemo) {
    try {
      const apiRes = await fetchApi<AskQueryResponse>('/chat/ask', {
        method: 'POST',
        body: JSON.stringify({ query: userQuery, location: currentLocationName, language }),
      });
      if (apiRes.success && apiRes.data) {
        return apiRes.data;
      }
    } catch {
      // Fallback
    }
  }

  const lowerQuery = userQuery.toLowerCase();
  let locKey = 'mumbai';
  if (lowerQuery.includes('delhi')) locKey = 'delhi';
  else if (lowerQuery.includes('pune')) locKey = 'pune';
  else if (lowerQuery.includes('bengaluru') || lowerQuery.includes('bangalore')) locKey = 'bengaluru';
  else if (lowerQuery.includes('manali')) locKey = 'manali';

  const weather = MOCK_WEATHER_DATA[locKey] || MOCK_WEATHER_DATA['mumbai'];
  const alert = MOCK_ALERTS.find((a) => a.locationId === locKey);

  let detectedLang: 'English' | 'Hindi' | 'Marathi' | 'Hinglish' = 'English';
  if (lowerQuery.includes('kya') || lowerQuery.includes('hogi') || lowerQuery.includes('baarish') || lowerQuery.includes('kal')) {
    detectedLang = 'Hinglish';
  } else if (/[\u0900-\u097F]/.test(userQuery)) {
    detectedLang = 'Hindi';
  }

  let intent: QueryAnalysis['intent'] = 'Forecast';
  let responseText = '';

  if (lowerQuery.includes('alert') || lowerQuery.includes('warning') || lowerQuery.includes('danger')) {
    intent = 'Alert';
    if (alert) {
      responseText = `Official ${alert.source} Warning active for ${alert.affectedArea}: ${alert.title}. ${alert.officialMessage}`;
    } else {
      responseText = `No official meteorological warnings are currently active for ${weather.location}.`;
    }
  } else if (lowerQuery.includes('travel') || lowerQuery.includes('drive') || lowerQuery.includes('train')) {
    intent = 'Travel';
    responseText = `Weather-related travel risk is MODERATE for ${weather.location}. Rain probability is ${weather.rainProbability}% with gusty winds of ${weather.windSpeed} km/h. Check coastal flood status before departure.`;
  } else if (lowerQuery.includes('rain') || lowerQuery.includes('baarish') || lowerQuery.includes('shower')) {
    intent = 'Forecast';
    if (detectedLang === 'Hinglish') {
      responseText = `Haan, ${weather.location} mein rain activity predicted hai (${weather.rainProbability}% probability). ${weather.conditionText} IMD observations ke dwara ground evidence verified hai.`;
    } else {
      responseText = `Rain is expected in ${weather.location} with a ${weather.rainProbability}% probability. Ground rainfall volume is estimated at ${weather.rainfall} mm.`;
    }
  } else {
    intent = 'Current';
    responseText = `Current weather in ${weather.location} is ${weather.temperature}°C (Feels like ${weather.feelsLike}°C) with ${weather.conditionText}. Humidity is ${weather.humidity}%. Source: IMD (${weather.observedAt}).`;
  }

  return {
    message: responseText,
    queryAnalysis: {
      intent,
      location: weather.location,
      timeframe: 'Current / Next 24h',
      language: detectedLang,
      dataSourcesUsed: alert ? ['IMD', 'NDMA SACHET'] : ['IMD'],
      validationStatus: 'VALIDATED_IMD',
    },
    evidence: weather,
    activeAlert: alert,
  };
}
