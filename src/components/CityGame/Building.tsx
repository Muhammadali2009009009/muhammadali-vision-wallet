import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
}

const Building: React.FC<BuildingProps> = ({ position, height, width, depth, color }) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
      
      {/* Windows */}
      {Array.from({ length: Math.floor(height / 3) }, (_, floor) => (
        <group key={floor}>
          {Array.from({ length: 4 }, (_, windowIndex) => (
            <mesh
              key={windowIndex}
              position={[
                windowIndex < 2 ? (width / 2 + 0.01) * (windowIndex === 0 ? -1 : 1) : 0,
                -height / 2 + (floor + 0.5) * 3,
                windowIndex >= 2 ? (depth / 2 + 0.01) * (windowIndex === 2 ? -1 : 1) : 0
              ]}
            >
              <planeGeometry args={[1, 1.5]} />
              <meshStandardMaterial 
                color="#87CEEB" 
                transparent 
                opacity={0.8} 
                emissive="#4169E1"
                emissiveIntensity={Math.random() > 0.7 ? 0.3 : 0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </mesh>
  );
};

export default Building;