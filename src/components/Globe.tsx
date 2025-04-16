
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { City } from '../data/cities';

interface GlobeProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

// Earth material with proper texture loading
const GlobeMaterial = () => {
  // Use the useTexture hook from drei instead of directly using TextureLoader
  const texture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  
  return (
    <meshPhongMaterial
      map={texture}
      emissive="#000000"
      emissiveIntensity={0.2}
      shininess={5}
    />
  );
};

// City marker component
const CityMarker = ({ 
  position, 
  isSelected, 
  onClick
}: { 
  position: THREE.Vector3;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={isSelected ? '#ff3e00' : '#fff'} />
      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.05, 0.06, 32]} />
          <meshBasicMaterial color="#ff3e00" transparent opacity={0.8} />
        </mesh>
      )}
    </mesh>
  );
};

// Controls and camera setup
const GlobeControls = ({ 
  selectedCity,
  onCitySelect
}: { 
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
}) => {
  const controls = useRef<any>();
  const { camera } = useThree();
  
  // Auto-rotate when no city is selected
  useFrame(() => {
    if (!selectedCity && controls.current) {
      controls.current.autoRotate = true;
      controls.current.autoRotateSpeed = 0.5;
    } else if (controls.current) {
      controls.current.autoRotate = false;
    }
  });
  
  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.5}
      minDistance={1.5}
      maxDistance={4}
      enablePan={false}
    />
  );
};

// Main Globe scene with error handling
const GlobeScene = ({ 
  cities, 
  onCitySelect,
  selectedCity
}: GlobeProps) => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/long to 3D positions
  const getCityPosition = (longitude: number, latitude: number): THREE.Vector3 => {
    // Convert from degrees to radians
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);
    
    // Calculate 3D position
    const x = -Math.sin(phi) * Math.cos(theta);
    const z = Math.sin(phi) * Math.sin(theta);
    const y = Math.cos(phi);
    
    return new THREE.Vector3(x, y, z).multiplyScalar(1.02); // Slightly above globe surface
  };
  
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
      
      {/* City markers */}
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
