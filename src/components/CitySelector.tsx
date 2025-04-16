
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { City } from '../data/cities';
import { getTimeOfDay, getCurrentTimeInTimezone } from '../utils/timeUtils';

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
  return (
    <div className="w-full overflow-auto">
      <Tabs defaultValue={selectedCity?.id || cities[0].id}>
        <TabsList className="h-auto flex w-full overflow-x-auto">
          {cities.map(city => {
            const localTime = getCurrentTimeInTimezone(city.timezone);
            const timeOfDay = getTimeOfDay(localTime);
            const timeIcon = getTimeIcon(timeOfDay);
            
            return (
              <TabsTrigger 
                key={city.id} 
                value={city.id}
                onClick={() => onCitySelect(city)}
                className={`flex-1 min-w-[120px] py-3 ${selectedCity?.id === city.id ? 'font-bold' : ''}`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span>{timeIcon}</span>
                  <span>{city.name}</span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CitySelector;
