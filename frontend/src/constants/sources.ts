export interface DataSourceDetail {
  id: string;
  name: string;
  fullName: string;
  role: string;
  authorityLevel: 'PRIMARY' | 'DISASTER' | 'SECONDARY_MODEL' | 'OFFLINE_CACHE';
  status: 'CONNECTED' | 'SYNCED' | 'STANDBY';
  lastUpdated: string;
  description: string;
  dataProvided: string[];
}

export const DATA_SOURCES: DataSourceDetail[] = [
  {
    id: 'imd',
    name: 'IMD',
    fullName: 'India Meteorological Department',
    role: 'Primary Operational Weather Provider for India',
    authorityLevel: 'PRIMARY',
    status: 'CONNECTED',
    lastUpdated: '2 mins ago',
    description: 'Government agency under Ministry of Earth Sciences responsible for meteorological observations, weather forecasting and seismology.',
    dataProvided: ['Current Weather', 'District Nowcasts', 'Radar Images', 'Heavy Rainfall Warnings', '7-Day Forecasts'],
  },
  {
    id: 'ndma',
    name: 'NDMA SACHET',
    fullName: 'National Disaster Management Authority - SACHET',
    role: 'Official Early Warning & Disaster Alert Service',
    authorityLevel: 'DISASTER',
    status: 'CONNECTED',
    lastUpdated: '5 mins ago',
    description: 'National Disaster Alert Portal providing real-time geo-targeted warnings for extreme rain, floods, cyclones, and heatwaves.',
    dataProvided: ['Emergency Disaster Alerts', 'Evacuation Advisories', 'CAP Format Protocol Warnings', 'Severe Weather Directives'],
  },
  {
    id: 'gfs',
    name: 'GFS / NCEP',
    fullName: 'Global Forecast System (NOAA/NCEP)',
    role: 'Secondary Numerical Weather Prediction Model',
    authorityLevel: 'SECONDARY_MODEL',
    status: 'SYNCED',
    lastUpdated: '1 hour ago',
    description: 'Global NWP computer model produced by the US National Weather Service for medium-range atmospheric physics validation.',
    dataProvided: ['Wind Vector Fields', 'Atmospheric Pressure Gradients', 'Cloud Cover Layers'],
  },
  {
    id: 'openmeteo',
    name: 'Open-Meteo',
    fullName: 'Open-Meteo High-Resolution Ensemble API',
    role: 'Ensemble Model Cross-Validation',
    authorityLevel: 'SECONDARY_MODEL',
    status: 'SYNCED',
    lastUpdated: '15 mins ago',
    description: 'Open-source weather API aggregating DWD ICON, ECMWF, and NOAA GFS for secondary model comparison.',
    dataProvided: ['Hourly Precip Probabilities', 'Solar Irradiance', 'Relative Humidity Curves'],
  },
];
