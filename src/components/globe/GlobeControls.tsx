
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { City } from '../../data/cities';

interface GlobeControlsProps { 
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
}

const GlobeControls = ({ selectedCity }: GlobeControlsProps) => {
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

export default GlobeControls;
