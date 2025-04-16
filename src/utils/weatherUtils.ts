
import useSWR from 'swr';

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const API_KEY = 'placeholder'; // In a real app, use environment variables

/**
 * Fetcher function for SWR
 */
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

/**
 * Hook to fetch weather data for a location
 */
export const useWeather = (lat: number, lon: number): {
  weather: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
} => {
  // In a real app, use your preferred weather API
  // For demo purposes, mocking the data
  
  // Simulate API loading
  const { data, error, isLoading } = useSWR(
    `mock-weather-${lat}-${lon}`,
    () => new Promise<WeatherData>((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // Generate mock weather based on coordinates
        const mockWeather: WeatherData = {
          temperature: Math.floor(15 + Math.random() * 20),
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
          icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(40 + Math.random() * 40),
          windSpeed: Math.floor(5 + Math.random() * 20)
        };
        resolve(mockWeather);
      }, 500);
    }),
    { refreshInterval: 300000 } // Refresh every 5 minutes
  );

  return {
    weather: data || null,
    isLoading,
    error: error as Error | null
  };
};

/**
 * Function to get a weather icon URL from condition
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
