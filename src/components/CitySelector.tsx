
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { City } from '../data/cities';
import { getTimeOfDay, getCurrentTimeInTimezone, getEnhancedTimeGradient, getTextColorForTimeOfDay } from '../utils/timeUtils';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CitySelectorProps {
  cities: City[];
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
}

const getTimeIcon = (timeOfDay: string) => {
  switch (timeOfDay) {
    case 'dawn':
      return '🌅';
    case 'morning':
      return '☀️';
    case 'afternoon':
      return '🌤️';
    case 'dusk':
      return '🌇';
    case 'evening':
      return '🌃';
    case 'night':
      return '🌙';
    default:
      return '⏱️';
  }
};

const CitySelector = ({ cities, selectedCity, onCitySelect }: CitySelectorProps) => {
  if (!cities || cities.length === 0) {
    return <Skeleton className="h-12 w-full" />;
  }

  return (
    <div className="w-full overflow-auto rounded-lg shadow-md">
      <Tabs defaultValue={selectedCity?.id || cities[0].id}>
        <ScrollArea className="w-full">
          <TabsList className="h-auto flex w-full overflow-x-auto bg-background/50 backdrop-blur-sm border border-border/50">
            {cities.map(city => {
              const localTime = getCurrentTimeInTimezone(city.timezone);
              const timeOfDay = getTimeOfDay(localTime);
              const timeIcon = getTimeIcon(timeOfDay);
              const textColorClass = getTextColorForTimeOfDay(localTime);
              
              return (
                <TabsTrigger 
                  key={city.id} 
                  value={city.id}
                  onClick={() => onCitySelect(city)}
                  className={`relative flex-1 min-w-[120px] py-3 overflow-hidden group ${selectedCity?.id === city.id ? 'font-bold' : ''}`}
                  style={{
                    background: selectedCity?.id === city.id ? getEnhancedTimeGradient(localTime) : 'transparent'
                  }}
                >
                  <div className={`flex flex-col items-center space-y-1 z-10 transition-all ${selectedCity?.id === city.id ? textColorClass : ''}`}>
                    <span className="text-xl">{timeIcon}</span>
                    <span>{city.name}</span>
                    <span className="text-xs opacity-75">{formatTime(localTime, 'h:mm a')}</span>
                  </div>
                  {/* Gradient hover effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                    style={{ background: getEnhancedTimeGradient(localTime) }}
                  />
                </TabsTrigger>
              );
            })}
          </TabsList>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

// Helper function to format time for display in the tabs
const formatTime = (date: Date, format: string): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  
  return `${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export default CitySelector;
