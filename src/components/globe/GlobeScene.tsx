
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { City } from '../../data/cities';
import GlobeMaterial from './GlobeMaterial';
import CityMarker from './CityMarker';
import GlobeControls from './GlobeControls';
import { getCityPosition } from './utils';

interface GlobeSceneProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

const GlobeScene = ({ cities, onCitySelect, selectedCity }: GlobeSceneProps) => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Move camera to selected city
  useEffect(() => {
    if (selectedCity && globeRef.current) {
      const position = getCityPosition(
        selectedCity.coordinates[0], 
        selectedCity.coordinates[1]
      );
      
      // Rotate the globe to show the selected city
      const targetRotation = new THREE.Euler(
        -position.y * 0.5,
        position.x * 2,
        0,
        'XYZ'
      );
      
      // Animate to the new rotation
      const currentRotation = globeRef.current.rotation.clone();
      const duration = 1000; // ms
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (globeRef.current) {
          // Interpolate rotation
          globeRef.current.rotation.x = currentRotation.x + (targetRotation.x - currentRotation.x) * progress;
          globeRef.current.rotation.y = currentRotation.y + (targetRotation.y - currentRotation.y) * progress;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }
      };
      
      animate();
    }
  }, [selectedCity]);
  
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light for sun effect */}
      <directionalLight
        position={[5, 3, 5]}
        intensity={1}
        castShadow
      />
      
      {/* Earth sphere */}
      <mesh ref={globeRef} receiveShadow castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <GlobeMaterial />
      </mesh>
      
      {/* City markers - now as pins */}
      {cities.map((city) => {
        const position = getCityPosition(city.coordinates[0], city.coordinates[1]);
        return (
          <CityMarker
            key={city.id}
            position={position}
            isSelected={selectedCity?.id === city.id}
            onClick={() => onCitySelect(city)}
          />
        );
      })}
      
      {/* Controls */}
      <GlobeControls selectedCity={selectedCity} onCitySelect={onCitySelect} />
    </>
  );
};

export default GlobeScene;
