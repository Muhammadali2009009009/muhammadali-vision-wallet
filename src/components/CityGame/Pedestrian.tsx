import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface PedestrianProps {
  initialPosition: [number, number, number];
  speed: number;
  color: string;
}

const Pedestrian: React.FC<PedestrianProps> = ({ initialPosition, speed, color }) => {
  const groupRef = useRef<Group>(null);
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState(Math.random() * Math.PI * 2);
  const [walkCycle, setWalkCycle] = useState(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      let newPos: [number, number, number] = [position[0], position[1], position[2]];
      
      // Random direction changes
      if (Math.random() < 0.01) {
        setDirection(Math.random() * Math.PI * 2);
      }
      
      // Move pedestrian
      newPos[0] += Math.cos(direction) * speed * delta * 2;
      newPos[2] += Math.sin(direction) * speed * delta * 2;
      
      // Keep pedestrians in bounds and on sidewalks
      newPos[0] = Math.max(-90, Math.min(90, newPos[0]));
      newPos[2] = Math.max(-90, Math.min(90, newPos[2]));
      
      // Avoid roads (simple collision)
      const roadWidth = 4;
      const gridSize = 20;
      const isOnRoad = (
        Math.abs(newPos[0] % gridSize) < roadWidth/2 || 
        Math.abs(newPos[2] % gridSize) < roadWidth/2
      );
      
      if (isOnRoad) {
        setDirection(direction + Math.PI);
      } else {
        setPosition(newPos);
        groupRef.current.position.set(newPos[0], newPos[1], newPos[2]);
      }
      
      // Walking animation
      setWalkCycle(walkCycle + delta * 8);
      groupRef.current.rotation.y = direction;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, Math.sin(walkCycle) * 0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 6]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, -Math.sin(walkCycle) * 0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 6]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, 0.3, 0]} rotation={[Math.sin(walkCycle) * 0.5, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 6]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      <mesh position={[0.2, 0.3, 0]} rotation={[-Math.sin(walkCycle) * 0.5, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 6]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
    </group>
  );
};

export default Pedestrian;
