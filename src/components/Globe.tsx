
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { City } from '../data/cities';
import GlobeScene from './globe/GlobeScene';

interface GlobeProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

// Main Globe component with Canvas and error boundary
const Globe = ({ cities, onCitySelect, selectedCity }: GlobeProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Reset error state when props change
  useEffect(() => {
    setHasError(false);
  }, [cities, selectedCity]);
  
  // Fallback UI if the 3D rendering fails
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-2">3D Globe Unavailable</h3>
          <p className="text-muted-foreground">
            Please try refreshing the page or use a different browser.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        onError={() => setHasError(true)}
      >
        <GlobeScene 
          cities={cities} 
          onCitySelect={onCitySelect} 
          selectedCity={selectedCity} 
        />
      </Canvas>
    </div>
  );
};

export default Globe;
