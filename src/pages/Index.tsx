
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
  getEnhancedTimeGradient,
  isDaytime
} from '../utils/timeUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Calendar, Camera } from 'lucide-react';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(cities[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [backgroundGradient, setBackgroundGradient] = useState<string>('');
  const isMobile = useIsMobile();
  
  // Update theme and background based on selected city's local time
  useEffect(() => {
    if (selectedCity) {
      const localTime = getCurrentTimeInTimezone(selectedCity.timezone);
      const dayTime = isDaytime(localTime);
      setTheme(dayTime ? 'light' : 'dark');
      
      // Set gradient background based on time of day
      setBackgroundGradient(getEnhancedTimeGradient(localTime));
      
      // Set the theme class on the document element
      document.documentElement.classList.toggle('dark', !dayTime);
    }
  }, [selectedCity]);
  
  // Function to handle city selection
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };
  
  return (
    <div 
      className="min-h-screen transition-colors duration-1000"
      style={{ background: backgroundGradient }}
    >
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center backdrop-blur-sm bg-background/10 p-6 rounded-lg">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white drop-shadow-md">
            One Day Around the World
          </h1>
          <p className="text-lg text-white/80">
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
          <div className="relative col-span-1 backdrop-blur-sm bg-background/10 p-4 rounded-lg h-[500px] lg:col-span-2 lg:h-[700px] shadow-xl">
            <Globe 
              cities={cities} 
              selectedCity={selectedCity} 
              onCitySelect={handleCitySelect} 
            />
            
            {/* Desktop City Selector below the globe */}
            {!isMobile && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <CitySelector 
                  cities={cities} 
                  selectedCity={selectedCity} 
                  onCitySelect={handleCitySelect} 
                />
              </div>
            )}
          </div>
          
          {/* Info Section */}
          <div className="col-span-1 backdrop-blur-sm bg-background/10 p-4 rounded-lg shadow-xl">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="info">City Info</TabsTrigger>
                <TabsTrigger value="timecapsule">Time Capsule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-0 animate-fade-in">
                {selectedCity && <CityInfo city={selectedCity} />}
              </TabsContent>
              
              <TabsContent value="timecapsule" className="mt-0 animate-fade-in">
                <TimeCapsule city={selectedCity} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* New Feature Sections */}
        <h2 className="text-3xl font-bold text-center text-white mt-16 mb-8">
          24 Hours. One World. Infinite Stories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Local Cuisine Section */}
          <Card className="backdrop-blur-sm bg-background/20 border-0 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="bg-amber-500/20 border-b border-amber-200/30">
              <CardTitle className="flex items-center gap-2 text-white">
                <Utensils className="h-5 w-5" /> Local Cuisine
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-white/90">
              <p>Discover what people are eating right now in different time zones. From breakfast in Tokyo to dinner in New York, explore the flavors of the world in real time.</p>
            </CardContent>
          </Card>
          
          {/* Daily Rituals Section */}
          <Card className="backdrop-blur-sm bg-background/20 border-0 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="bg-violet-500/20 border-b border-violet-200/30">
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5" /> Daily Rituals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-white/90">
              <p>Experience daily life and customs across different cultures. From morning prayers in Cairo to evening commutes in London, witness the rhythm of global traditions.</p>
            </CardContent>
          </Card>
          
          {/* Live Moments Section */}
          <Card className="backdrop-blur-sm bg-background/20 border-0 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="bg-rose-500/20 border-b border-rose-200/30">
              <CardTitle className="flex items-center gap-2 text-white">
                <Camera className="h-5 w-5" /> Live Moments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-white/90">
              <p>See real-time photos and stories from around the globe. Curated snapshots of current moments happening right now across different cities and time zones.</p>
            </CardContent>
          </Card>
        </div>
        
        <footer className="mt-12 text-center text-white/70 text-sm">
          <p>© {new Date().getFullYear()} One Day Around the World. Explore the world in real-time.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
