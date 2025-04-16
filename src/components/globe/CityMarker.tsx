
import * as THREE from 'three';

interface CityMarkerProps { 
  position: THREE.Vector3;
  isSelected: boolean;
  onClick: () => void;
}

const CityMarker = ({ position, isSelected, onClick }: CityMarkerProps) => {
  return (
    <group 
      position={position} 
      onClick={onClick}
      // Fix the error by making lookAt a function call instead of passing Vector3 directly
      lookAt={() => new THREE.Vector3(0, 0, 0)}
    >
      {/* Pin head */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color={isSelected ? '#ff3e00' : '#ff5722'} />
      </mesh>
      
      {/* Pin body - cone shape pointing toward the globe */}
      <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.01, 0]}>
        <coneGeometry args={[0.015, 0.08, 16]} />
        <meshBasicMaterial color={isSelected ? '#ff3e00' : '#ff5722'} />
      </mesh>
      
      {/* Selection indicator ring */}
      {isSelected && (
        <group position={[0, 0.04, 0]}>
          <mesh>
            <ringGeometry args={[0.025, 0.035, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.001, 0]}>
            <ringGeometry args={[0.025, 0.035, 32]} />
            <meshBasicMaterial color="#ff3e00" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default CityMarker;
