export type EvidenceQuality = 'HIGH' | 'MEDIUM' | 'LOW';

export type SourceType = 'IMD' | 'NDMA SACHET' | 'GFS' | 'Open-Meteo' | 'CACHED';

export type AlertSeverity = 'NONE' | 'WATCH' | 'ALERT' | 'WARNING';

export type ActivityCategory = 
  | 'Driving'
  | 'Travel'
  | 'Outdoor Event'
  | 'Trekking'
  | 'Agriculture'
  | 'Marine'
  | 'Daily Activity';

export type WeatherRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Location {
  id: string;
  name: string;
  state: string;
  district?: string;
  lat: number;
  lng: number;
  isPopular?: boolean;
}

export interface WeatherEvidence {
  source: SourceType;
  sourcePriority: 'OFFICIAL_IMD' | 'DISASTER_NDMA' | 'MODEL_SECONDARY' | 'CACHED_LOCAL';
  location: string;
  observedAt: string;
  validFrom: string;
  validUntil: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainfall: number; // in mm
  windSpeed: number; // in km/h
  pressure: number; // in hPa
  uvIndex: number;
  visibility: number; // in km
  rainProbability: number; // percentage
  warningsCount: number;
  evidenceQuality: EvidenceQuality;
  conditionText: string;
  conditionCode: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rainProb: number;
  rainfall: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  tempMin: number;
  tempMax: number;
  rainProb: number;
  expectedRainfallMm: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  summary: string;
}

export interface WeatherAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  affectedArea: string;
  locationId: string;
  issueTime: string;
  expiryTime: string;
  source: SourceType;
  officialMessage: string;
  weatherEvidenceSummary: string;
  recommendedActions: string[];
  isOfficial: boolean;
  coordinates?: [number, number];
}

export interface WeatherAdvisory {
  category: ActivityCategory;
  location: string;
  date: string;
  riskLevel: WeatherRiskLevel;
  primaryRiskReason: string;
  detailedReasons: string[];
  recommendation: string;
  officialWarningActive: boolean;
}

export interface QueryAnalysis {
  intent: 'Forecast' | 'Alert' | 'Current' | 'Travel' | 'Climate' | 'General';
  location: string;
  timeframe: string;
  language: 'English' | 'Hindi' | 'Marathi' | 'Hinglish';
  dataSourcesUsed: SourceType[];
  validationStatus: 'VALIDATED_IMD' | 'MODEL_FALLBACK' | 'CACHED';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  evidence?: WeatherEvidence;
  queryAnalysis?: QueryAnalysis;
  activeAlert?: WeatherAlert;
  isStale?: boolean;
  offlineFallback?: boolean;
  language?: string;
}

export interface ClimateDataPoint {
  year: number;
  month?: string;
  rainfallActual: number;
  rainfallNormal: number;
  tempAvg: number;
  tempAnomaly: number;
  extremeEventsCount: number;
}

export interface ConnectionState {
  isOnline: boolean;
  apiStatus: 'REAL' | 'DEMO' | 'OFFLINE' | 'DEGRADED';
  lastSyncedAt: string | null;
  syncInProgress: boolean;
  activeSource: SourceType;
}

export interface UserPreferences {
  tempUnit: '°C' | '°F';
  windUnit: 'km/h' | 'm/s';
  language: 'en' | 'hi' | 'mr';
  demoMode: boolean;
  smsAlertsEnabled: boolean;
  pushNotifications: boolean;
  autoDetectLocation: boolean;
}
