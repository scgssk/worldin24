
import { useTexture } from '@react-three/drei';

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

export default GlobeMaterial;
