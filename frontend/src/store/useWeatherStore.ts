import { create } from 'zustand';
import type { 
  Location, 
  WeatherEvidence, 
  HourlyForecast, 
  DailyForecast, 
  WeatherAlert, 
  ChatMessage, 
  ConnectionState, 
  UserPreferences,
  ActivityCategory
} from '../types';
import { POPULAR_LOCATIONS, DEFAULT_LOCATION } from '../constants/locations';
import { MOCK_WEATHER_DATA } from '../mocks/weather';
import { MOCK_HOURLY_FORECASTS, MOCK_DAILY_FORECASTS } from '../mocks/forecast';
import { MOCK_ALERTS } from '../mocks/alerts';
import { INITIAL_CHAT_MESSAGES } from '../mocks/chat';

interface WeatherStoreState {
  // Location
  currentLocation: Location;
  popularLocations: Location[];
  setLocation: (location: Location) => void;

  // Weather & Forecast Data
  currentWeather: WeatherEvidence | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  alerts: WeatherAlert[];
  isLoading: boolean;
  error: string | null;

  // Connection & Offline
  connection: ConnectionState;
  setOnlineStatus: (isOnline: boolean) => void;
  syncData: () => Promise<void>;

  // Preferences
  preferences: UserPreferences;
  toggleDemoMode: () => void;
  setTempUnit: (unit: '°C' | '°F') => void;
  setWindUnit: (unit: 'km/h' | 'm/s') => void;
  setLanguage: (lang: 'en' | 'hi' | 'mr') => void;
  setSmsAlerts: (enabled: boolean) => void;

  // Chat
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;

  // Advisory Selection
  selectedActivity: ActivityCategory;
  setSelectedActivity: (activity: ActivityCategory) => void;

  // Drawer / UI Modals
  activeEvidenceDrawer: WeatherEvidence | null;
  setActiveEvidenceDrawer: (evidence: WeatherEvidence | null) => void;
  activeAlertModal: WeatherAlert | null;
  setActiveAlertModal: (alert: WeatherAlert | null) => void;
}

export const useWeatherStore = create<WeatherStoreState>((set) => ({
  currentLocation: DEFAULT_LOCATION,
  popularLocations: POPULAR_LOCATIONS,
  
  currentWeather: MOCK_WEATHER_DATA['mumbai'],
  hourlyForecast: MOCK_HOURLY_FORECASTS['mumbai'] || [],
  dailyForecast: MOCK_DAILY_FORECASTS['mumbai'] || [],
  alerts: MOCK_ALERTS,
  isLoading: false,
  error: null,

  connection: {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    apiStatus: 'DEMO',
    lastSyncedAt: '10:42 AM IST',
    syncInProgress: false,
    activeSource: 'IMD',
  },

  preferences: {
    tempUnit: '°C',
    windUnit: 'km/h',
    language: 'en',
    demoMode: true,
    smsAlertsEnabled: false,
    pushNotifications: true,
    autoDetectLocation: false,
  },

  messages: INITIAL_CHAT_MESSAGES,

  selectedActivity: 'Driving',
  activeEvidenceDrawer: null,
  activeAlertModal: null,

  setLocation: (location: Location) => {
    set({ isLoading: true, currentLocation: location });
    
    const locId = location.id.toLowerCase();
    const weather = MOCK_WEATHER_DATA[locId] || {
      ...MOCK_WEATHER_DATA['mumbai'],
      location: `${location.name}, ${location.state}`,
    };
    const hourly = MOCK_HOURLY_FORECASTS[locId] || MOCK_HOURLY_FORECASTS['mumbai'];
    const daily = MOCK_DAILY_FORECASTS[locId] || MOCK_DAILY_FORECASTS['mumbai'];

    setTimeout(() => {
      set({
        currentWeather: weather,
        hourlyForecast: hourly,
        dailyForecast: daily,
        isLoading: false,
      });
    }, 400);
  },

  setOnlineStatus: (isOnline: boolean) => {
    set((state) => ({
      connection: {
        ...state.connection,
        isOnline,
        apiStatus: isOnline ? (state.preferences.demoMode ? 'DEMO' : 'REAL') : 'OFFLINE',
        activeSource: isOnline ? 'IMD' : 'CACHED',
      },
    }));
  },

  syncData: async () => {
    set((state) => ({
      connection: { ...state.connection, syncInProgress: true },
    }));

    await new Promise((res) => setTimeout(res, 1200));

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';

    set((state) => ({
      connection: {
        ...state.connection,
        syncInProgress: false,
        lastSyncedAt: timeString,
        apiStatus: state.connection.isOnline ? (state.preferences.demoMode ? 'DEMO' : 'REAL') : 'OFFLINE',
      },
      currentWeather: state.currentWeather
        ? { ...state.currentWeather, observedAt: timeString }
        : null,
    }));
  },

  toggleDemoMode: () => {
    set((state) => {
      const nextDemo = !state.preferences.demoMode;
      return {
        preferences: { ...state.preferences, demoMode: nextDemo },
        connection: {
          ...state.connection,
          apiStatus: state.connection.isOnline ? (nextDemo ? 'DEMO' : 'REAL') : 'OFFLINE',
        },
      };
    });
  },

  setTempUnit: (tempUnit) => set((s) => ({ preferences: { ...s.preferences, tempUnit } })),
  setWindUnit: (windUnit) => set((s) => ({ preferences: { ...s.preferences, windUnit } })),
  setLanguage: (language) => set((s) => ({ preferences: { ...s.preferences, language } })),
  setSmsAlerts: (smsAlertsEnabled) => set((s) => ({ preferences: { ...s.preferences, smsAlertsEnabled } })),

  addMessage: (msg) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    set((state) => ({ messages: [...state.messages, newMsg] }));
  },

  clearChat: () => set({ messages: INITIAL_CHAT_MESSAGES }),

  setSelectedActivity: (selectedActivity) => set({ selectedActivity }),
  setActiveEvidenceDrawer: (activeEvidenceDrawer) => set({ activeEvidenceDrawer }),
  setActiveAlertModal: (activeAlertModal) => set({ activeAlertModal }),
}));
