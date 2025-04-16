
import { format, toZonedTime } from 'date-fns-tz';

/**
 * Gets the current time in a specific timezone
 */
export const getCurrentTimeInTimezone = (timezone: string): Date => {
  const now = new Date();
  return toZonedTime(now, timezone);
};

/**
 * Formats a date based on the provided format string
 */
export const formatTime = (date: Date, formatString: string = 'HH:mm:ss'): string => {
  return format(date, formatString);
};

/**
 * Formats a date with the timezone information
 */
export const formatTimeWithTimezone = (
  date: Date, 
  timezone: string, 
  formatString: string = 'HH:mm:ss'
): string => {
  return format(date, formatString, { timeZone: timezone });
};

/**
 * Determines if it's daytime at the given location
 * Returns a value between 0 and 1 representing time of day
 * 0 = midnight, 0.5 = noon, 1 = midnight
 */
export const getDaytimeProgress = (date: Date): number => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Convert to a value between 0 and 1 (full day)
  return (hours * 60 + minutes) / (24 * 60);
};

/**
 * Determines if the location is in daylight hours (between 6am and 6pm)
 */
export const isDaytime = (date: Date): boolean => {
  const hours = date.getHours();
  return hours >= 6 && hours < 18;
};

/**
 * Get time of day description
 */
export const getTimeOfDay = (date: Date): 'night' | 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'evening' => {
  const hours = date.getHours();
  
  if (hours >= 5 && hours < 7) return 'dawn';
  if (hours >= 7 && hours < 12) return 'morning';
  if (hours >= 12 && hours < 17) return 'afternoon';
  if (hours >= 17 && hours < 19) return 'dusk';
  if (hours >= 19 && hours < 23) return 'evening';
  return 'night';
};

/**
 * Get the color gradient for the current time of day
 */
export const getTimeGradient = (date: Date): string => {
  const timeOfDay = getTimeOfDay(date);
  
  switch (timeOfDay) {
    case 'dawn':
      return 'linear-gradient(to bottom, #ff7e5f, #feb47b)';
    case 'morning':
      return 'linear-gradient(to bottom, #4da0b0, #d39d38)';
    case 'afternoon':
      return 'linear-gradient(to bottom, #2193b0, #6dd5ed)';
    case 'dusk':
      return 'linear-gradient(to bottom, #355c7d, #6c5b7b, #c06c84)';
    case 'evening':
      return 'linear-gradient(to bottom, #2c3e50, #4ca1af)';
    case 'night':
      return 'linear-gradient(to bottom, #232526, #414345)';
    default:
      return 'linear-gradient(to bottom, #2193b0, #6dd5ed)';
  }
};

/**
 * Get enhanced gradients that are more visually appealing
 */
export const getEnhancedTimeGradient = (date: Date): string => {
  const timeOfDay = getTimeOfDay(date);
  
  switch (timeOfDay) {
    case 'dawn':
      return 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)';
    case 'morning':
      return 'linear-gradient(to right, #00b4db 0%, #FEF9D7 100%)';
    case 'afternoon':
      return 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)';
    case 'dusk':
      return 'linear-gradient(to right, #f83600 0%, #f9d423 100%)';
    case 'evening':
      return 'linear-gradient(to right, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    case 'night':
      return 'linear-gradient(to right, #0f0c29 0%, #302b63 50%, #24243e 100%)';
    default:
      return 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)';
  }
};

/**
 * Get a text color that will be readable against the background gradient
 */
export const getTextColorForTimeOfDay = (date: Date): string => {
  const timeOfDay = getTimeOfDay(date);
  
  switch (timeOfDay) {
    case 'dawn':
    case 'morning':
    case 'afternoon':
      return 'text-gray-800';
    case 'dusk':
    case 'evening':
    case 'night':
      return 'text-white';
    default:
      return 'text-gray-800';
  }
};

/**
 * Get appropriate icon for weather condition
 */
export const getWeatherIcon = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) return '☀️';
  if (lowerCondition.includes('cloud')) return '☁️';
  if (lowerCondition.includes('rain')) return '🌧️';
  if (lowerCondition.includes('snow')) return '❄️';
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) return '⛈️';
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️';
  
  return '🌡️'; // Default thermometer
};
