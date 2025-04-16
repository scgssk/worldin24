
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
