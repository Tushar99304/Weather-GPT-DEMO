/**
 * WeatherGPT API Abstraction Layer
 * Provides seamless bridge between Demo Mock Mode and Real FastAPI backend
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  source: 'IMD' | 'NDMA SACHET' | 'GFS' | 'Open-Meteo' | 'DEMO' | 'CACHED';
  timestamp: string;
  error?: string;
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API response error status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
      source: 'IMD',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.warn(`FastAPI backend unreachable at ${API_BASE_URL}${endpoint}. Falling back gracefully to grounded mock/cached service.`);
    throw err;
  }
}
