import React from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import { formatTemp, formatWind } from '../../utils/formatters';
import { 
  Thermometer, 
  CloudRain, 
  Droplets, 
  Wind, 
  Eye, 
  Sun, 
  Gauge,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const WeatherSummary: React.FC = () => {
  const { currentWeather, preferences } = useWeatherStore();

  if (!currentWeather) return null;

  const metrics = [
    {
      title: 'Temperature',
      value: formatTemp(currentWeather.temperature, preferences.tempUnit),
      subtitle: `Feels like ${formatTemp(currentWeather.feelsLike, preferences.tempUnit)}`,
      icon: Thermometer,
      trend: '+1.5° vs yesterday',
      isUp: true,
    },
    {
      title: 'Rain Probability',
      value: `${currentWeather.rainProbability}%`,
      subtitle: 'Peak at 2:00 PM IST',
      icon: CloudRain,
      trend: '+12% during high tide',
      isUp: true,
    },
    {
      title: 'Observed Rainfall',
      value: `${currentWeather.rainfall} mm`,
      subtitle: 'IMD Coastal Station',
      icon: CloudRain,
      trend: 'Moderate precipitation',
      isUp: true,
    },
    {
      title: 'Relative Humidity',
      value: `${currentWeather.humidity}%`,
      subtitle: 'High coastal vapor',
      icon: Droplets,
      trend: '-3% since morning',
      isUp: false,
    },
    {
      title: 'Wind Vector',
      value: formatWind(currentWeather.windSpeed, preferences.windUnit),
      subtitle: 'WSW Coastal Gusts',
      icon: Wind,
      trend: 'Gusts up to 28 km/h',
      isUp: true,
    },
    {
      title: 'Visibility',
      value: `${currentWeather.visibility} km`,
      subtitle: 'Reduced by monsoon fog',
      icon: Eye,
      trend: 'Normal highway clearance',
      isUp: false,
    },
    {
      title: 'UV Index',
      value: `${currentWeather.uvIndex} / 11`,
      subtitle: 'Moderate Solar Risk',
      icon: Sun,
      trend: 'Peak 12 PM - 3 PM',
      isUp: false,
    },
    {
      title: 'Barometric Pressure',
      value: `${currentWeather.pressure} hPa`,
      subtitle: 'Sea Level Standard',
      icon: Gauge,
      trend: '-2 hPa trough system',
      isUp: false,
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#17352A] text-lg">Today's Detailed Metrics</h3>
        <span className="text-xs text-[#6B7D74]">IMD Station Verified</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#DCEAE2] rounded-xl p-4 shadow-xs hover:border-[#6BAF92] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#6B7D74]">{m.title}</span>
                <div className="p-1.5 rounded-lg bg-[#E8F5EE] text-[#2E7D5B]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-xl font-bold text-[#17352A] mb-1">{m.value}</div>

              <div className="flex items-center justify-between text-[11px] text-[#6B7D74]">
                <span className="truncate">{m.subtitle}</span>
                <span className="inline-flex items-center gap-0.5 text-[#2E7D5B] font-medium shrink-0">
                  {m.isUp ? <TrendingUp className="w-3 h-3 text-[#2E7D5B]" /> : <TrendingDown className="w-3 h-3 text-[#6B7D74]" />}
                  <span>{m.trend}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
