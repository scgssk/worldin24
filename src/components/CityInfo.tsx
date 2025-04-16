
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { City } from '../data/cities';
import { useWeather } from '../utils/weatherUtils';
import { 
  getCurrentTimeInTimezone, 
  formatTime, 
  getTimeOfDay,
  getTimeGradient
} from '../utils/timeUtils';
import { Clock, MapPin, Cloud, Wind, Droplets } from 'lucide-react';

interface CityInfoProps {
  city: City;
}

const CityInfo = ({ city }: CityInfoProps) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInTimezone(city.timezone));
  const [currentGradient, setCurrentGradient] = useState(getTimeGradient(currentTime));
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay(currentTime));
  
  // Get weather data for this city
  const { weather, isLoading } = useWeather(city.coordinates[1], city.coordinates[0]);
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = getCurrentTimeInTimezone(city.timezone);
      setCurrentTime(updatedTime);
      setTimeOfDay(getTimeOfDay(updatedTime));
      setCurrentGradient(getTimeGradient(updatedTime));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [city.timezone]);
  
  return (
    <div className="w-full animate-fade-in">
      <div 
        className="rounded-lg p-6 text-white shadow-lg transition-all duration-500"
        style={{ background: currentGradient }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h2 className="text-2xl font-bold">{city.name}, {city.country}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-xl">{formatTime(currentTime, 'h:mm:ss a')}</span>
            <span className="text-sm opacity-80">{timeOfDay}</span>
          </div>
          
          {weather && !isLoading ? (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                <span>{weather.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{weather.temperature}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                <span>{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                <span>{weather.humidity}%</span>
              </div>
            </div>
          ) : (
            <div className="mt-4 h-24 animate-pulse rounded bg-white/20"></div>
          )}
        </div>
      </div>
      
      <Card className="mt-4">
        <CardContent className="pt-6">
          <p className="mb-4">{city.description}</p>
          
          <h3 className="mb-2 font-semibold">Did you know?</h3>
          <ul className="space-y-2">
            {city.trivia.map((fact, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CityInfo;
