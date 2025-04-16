
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { City } from '../data/cities';
import { useWeather } from '../utils/weatherUtils';
import { 
  getCurrentTimeInTimezone, 
  formatTime, 
  getTimeOfDay,
  getEnhancedTimeGradient,
  getWeatherIcon
} from '../utils/timeUtils';
import { Clock, MapPin, Cloud, Wind, Droplets, Calendar, Sunrise, Sunset } from 'lucide-react';

interface CityInfoProps {
  city: City;
}

const CityInfo = ({ city }: CityInfoProps) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInTimezone(city.timezone));
  const [currentGradient, setCurrentGradient] = useState(getEnhancedTimeGradient(currentTime));
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay(currentTime));
  
  // Get weather data for this city
  const { weather, isLoading } = useWeather(city.coordinates[1], city.coordinates[0]);
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = getCurrentTimeInTimezone(city.timezone);
      setCurrentTime(updatedTime);
      setTimeOfDay(getTimeOfDay(updatedTime));
      setCurrentGradient(getEnhancedTimeGradient(updatedTime));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [city.timezone]);
  
  // Calculate local date
  const getLocalDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };
  
  // Simulated sunrise/sunset times based on location
  const getSunriseSunsetTimes = () => {
    // These would ideally come from a weather API
    // For demonstration, we're calculating simple approximations
    const sunriseHour = 5 + Math.floor(Math.random() * 2); // 5 or 6 AM
    const sunsetHour = 17 + Math.floor(Math.random() * 2); // 5 or 6 PM
    
    const sunrise = new Date(currentTime);
    sunrise.setHours(sunriseHour, 30, 0);
    
    const sunset = new Date(currentTime);
    sunset.setHours(sunsetHour, 30, 0);
    
    return { sunrise, sunset };
  };
  
  const { sunrise, sunset } = getSunriseSunsetTimes();
  
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
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-xl">{formatTime(currentTime, 'h:mm:ss a')}</span>
              <span className="text-sm opacity-80 capitalize">{timeOfDay}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{getLocalDate(currentTime)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sunrise className="h-5 w-5" />
                <span>{formatTime(sunrise, 'h:mm a')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5" />
                <span>{formatTime(sunset, 'h:mm a')}</span>
              </div>
            </div>
          </div>
          
          {weather && !isLoading ? (
            <div className="mt-4 border-t border-white/20 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getWeatherIcon(weather.condition)}</span>
                  <span>{weather.condition}</span>
                </div>
                <span className="text-2xl font-bold">{weather.temperature}°C</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  <div>
                    <span className="text-sm opacity-80">Wind</span>
                    <p>{weather.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  <div>
                    <span className="text-sm opacity-80">Humidity</span>
                    <p>{weather.humidity}%</p>
                  </div>
                </div>
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
          
          <div className="mt-6 pt-4 border-t">
            <h3 className="mb-2 font-semibold">Local Time Zone</h3>
            <p className="text-sm text-muted-foreground">
              {city.timezone} ({city.timezone.split('/')[0].replace('_', ' ')})
            </p>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Time difference from UTC: {getUTCOffset(city.timezone)}</p>
              <p>Time difference from your local time: {getLocalOffset(city.timezone)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get UTC offset
const getUTCOffset = (timezone: string): string => {
  const now = new Date();
  const tzDate = getCurrentTimeInTimezone(timezone);
  
  const diffMinutes = (tzDate.getTime() - now.getTimezoneOffset() * 60000 - now.getTime()) / 60000;
  const hours = Math.floor(Math.abs(diffMinutes) / 60);
  const minutes = Math.abs(diffMinutes) % 60;
  
  const sign = diffMinutes >= 0 ? '+' : '-';
  return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Helper function to get offset from user's local time
const getLocalOffset = (timezone: string): string => {
  const now = new Date();
  const tzDate = getCurrentTimeInTimezone(timezone);
  
  const diffMinutes = (tzDate.getTime() - now.getTime()) / 60000;
  const hours = Math.floor(Math.abs(diffMinutes) / 60);
  const minutes = Math.abs(diffMinutes) % 60;
  
  if (diffMinutes === 0) return 'Same as your local time';
  
  const sign = diffMinutes > 0 ? '+' : '-';
  return `${sign}${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
};

export default CityInfo;
