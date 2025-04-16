
import * as THREE from 'three';

// Convert lat/long to 3D positions with improved accuracy
export const getCityPosition = (longitude: number, latitude: number): THREE.Vector3 => {
  // Convert from degrees to radians
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);
  
  // Calculate 3D position using spherical coordinates
  const x = -Math.sin(phi) * Math.cos(theta);
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);
  
  return new THREE.Vector3(x, y, z).multiplyScalar(1.05); // Position slightly above globe surface for pins
};
