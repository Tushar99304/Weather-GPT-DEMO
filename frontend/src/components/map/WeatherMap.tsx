import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { POPULAR_LOCATIONS } from '../../constants/locations';
import { MOCK_WEATHER_DATA } from '../../mocks/weather';
import { SourceBadge } from '../common/SourceBadge';
import { Layers, CloudRain, Wind, Thermometer, ShieldAlert } from 'lucide-react';
import L from 'leaflet';

// Leaflet icon fix for Vite/React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const WeatherMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'rain' | 'temp' | 'wind' | 'alerts'>('rain');

  return (
    <div className="relative w-full h-[calc(100vh-9.5rem)] rounded-2xl overflow-hidden border border-[#DCEAE2] shadow-xs">
      {/* Map Control Bar Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md border border-[#DCEAE2] p-2 rounded-xl shadow-md flex flex-wrap gap-2">
        <div className="text-xs font-bold text-[#17352A] flex items-center gap-1.5 px-2">
          <Layers className="w-4 h-4 text-[#2E7D5B]" />
          <span>Layers:</span>
        </div>

        <button
          onClick={() => setActiveLayer('rain')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
            activeLayer === 'rain'
              ? 'bg-[#2E7D5B] text-white shadow-xs'
              : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-[#E8F5EE]'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5" /> Rainfall Radar
        </button>

        <button
          onClick={() => setActiveLayer('temp')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
            activeLayer === 'temp'
              ? 'bg-[#2E7D5B] text-white shadow-xs'
              : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-[#E8F5EE]'
          }`}
        >
          <Thermometer className="w-3.5 h-3.5" /> Temperature
        </button>

        <button
          onClick={() => setActiveLayer('wind')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
            activeLayer === 'wind'
              ? 'bg-[#2E7D5B] text-white shadow-xs'
              : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-[#E8F5EE]'
          }`}
        >
          <Wind className="w-3.5 h-3.5" /> Wind Vector
        </button>

        <button
          onClick={() => setActiveLayer('alerts')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
            activeLayer === 'alerts'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-[#17352A] border border-[#DCEAE2] hover:bg-red-50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" /> IMD Warnings
        </button>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-md border border-[#DCEAE2] p-3 rounded-xl shadow-md text-xs space-y-1.5">
        <div className="font-bold text-[#17352A] text-[11px] uppercase tracking-wider">
          {activeLayer === 'rain' && 'Rainfall Radar (mm/hr)'}
          {activeLayer === 'temp' && 'Surface Temperature (°C)'}
          {activeLayer === 'wind' && 'Wind Speed (km/h)'}
          {activeLayer === 'alerts' && 'IMD Warning Zones'}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#6B7D74]">
          <span className="w-3 h-3 rounded bg-blue-200"></span> Light
          <span className="w-3 h-3 rounded bg-blue-500 ml-1"></span> Moderate
          <span className="w-3 h-3 rounded bg-blue-800 ml-1"></span> Heavy
          <span className="w-3 h-3 rounded bg-red-600 ml-1"></span> Extreme Warning
        </div>
      </div>

      {/* Main Leaflet Map */}
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {POPULAR_LOCATIONS.map((loc) => {
          const weather = MOCK_WEATHER_DATA[loc.id] || MOCK_WEATHER_DATA['mumbai'];

          return (
            <React.Fragment key={loc.id}>
              <Marker position={[loc.lat, loc.lng]} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="p-1 space-y-2 min-w-48 text-xs text-[#17352A]">
                    <div className="flex items-center justify-between border-b border-[#DCEAE2] pb-1.5">
                      <strong className="font-bold text-sm text-[#17352A]">{loc.name}</strong>
                      <SourceBadge source={weather.source} size="sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>Temp: <strong>{weather.temperature}°C</strong></div>
                      <div>Rain: <strong>{weather.rainfall} mm</strong></div>
                      <div>Wind: <strong>{weather.windSpeed} km/h</strong></div>
                      <div>Humidity: <strong>{weather.humidity}%</strong></div>
                    </div>

                    {weather.warningsCount > 0 && (
                      <div className="bg-red-50 text-red-800 border border-red-200 p-1.5 rounded font-semibold text-[11px]">
                        ⚠ Official IMD Warning Active
                      </div>
                    )}

                    <div className="text-[10px] text-[#6B7D74] pt-1">
                      Observed: {weather.observedAt}
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* Dynamic Overlay Circle for weather layer visualization */}
              <Circle
                center={[loc.lat, loc.lng]}
                radius={activeLayer === 'alerts' && weather.warningsCount > 0 ? 120000 : 70000}
                pathOptions={{
                  color:
                    activeLayer === 'alerts' && weather.warningsCount > 0
                      ? '#D9534F'
                      : activeLayer === 'rain'
                      ? '#4F8FC0'
                      : '#2E7D5B',
                  fillColor:
                    activeLayer === 'alerts' && weather.warningsCount > 0
                      ? '#D9534F'
                      : activeLayer === 'rain'
                      ? '#4F8FC0'
                      : '#2E7D5B',
                  fillOpacity: 0.25,
                }}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
