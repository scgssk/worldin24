
import { useState, useEffect } from 'react';
import { cities, City } from '../data/cities';
import Globe from '../components/Globe';
import CityInfo from '../components/CityInfo';
import TimeCapsule from '../components/TimeCapsule';
import CitySelector from '../components/CitySelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  getCurrentTimeInTimezone, 
  getTimeGradient,
  isDaytime
} from '../utils/timeUtils';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(cities[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isMobile = useIsMobile();
  
  // Update theme based on selected city's local time
  useEffect(() => {
    if (selectedCity) {
      const localTime = getCurrentTimeInTimezone(selectedCity.timezone);
      const dayTime = isDaytime(localTime);
      setTheme(dayTime ? 'light' : 'dark');
      
      // Set the theme class on the document element
      document.documentElement.classList.toggle('dark', !dayTime);
    }
  }, [selectedCity]);
  
  // Function to handle city selection
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };
  
  return (
    <div className={`min-h-screen bg-background transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">One Day Around the World</h1>
          <p className="text-lg text-muted-foreground">
            Explore cities across time zones and see what's happening right now
          </p>
        </header>
        
        {/* Mobile City Selector */}
        {isMobile && (
          <div className="mb-6">
            <CitySelector 
              cities={cities} 
              selectedCity={selectedCity} 
              onCitySelect={handleCitySelect} 
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Globe Section */}
          <div className="relative col-span-1 h-[500px] lg:col-span-2 lg:h-[700px]">
            <Globe 
              cities={cities} 
              selectedCity={selectedCity} 
              onCitySelect={handleCitySelect} 
            />
          </div>
          
          {/* Info Section */}
          <div className="col-span-1">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">City Info</TabsTrigger>
                <TabsTrigger value="timecapsule">Time Capsule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-4">
                {selectedCity && <CityInfo city={selectedCity} />}
              </TabsContent>
              
              <TabsContent value="timecapsule" className="mt-4">
                <TimeCapsule city={selectedCity} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
