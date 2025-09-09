import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface CarProps {
  initialPosition: [number, number, number];
  speed: number;
  direction: 'x' | 'z';
  color: string;
}

const Car: React.FC<CarProps> = ({ initialPosition, speed, direction, color }) => {
  const groupRef = useRef<Group>(null);
  const [position, setPosition] = useState(initialPosition);

  useFrame((state, delta) => {
    if (groupRef.current) {
      let newPos: [number, number, number] = [position[0], position[1], position[2]];
      
      if (direction === 'x') {
        newPos[0] += speed * delta * 10;
        if (newPos[0] > 100) newPos[0] = -100;
        if (newPos[0] < -100) newPos[0] = 100;
      } else {
        newPos[2] += speed * delta * 10;
        if (newPos[2] > 100) newPos[2] = -100;
        if (newPos[2] < -100) newPos[2] = 100;
      }
      
      setPosition(newPos);
      groupRef.current.position.set(newPos[0], newPos[1], newPos[2]);
      
      // Rotate car based on direction
      groupRef.current.rotation.y = direction === 'x' ? 0 : Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Car roof */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.5, 0.8, 1.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Wheels */}
      {[
        [-1.3, -0.3, -0.8] as [number, number, number],
        [1.3, -0.3, -0.8] as [number, number, number],
        [-1.3, -0.3, 0.8] as [number, number, number],
        [1.3, -0.3, 0.8] as [number, number, number]
      ].map((wheelPos, index) => (
        <mesh key={index} position={wheelPos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
      
      {/* Headlights */}
      <mesh position={[1.8, 0.3, -0.7]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFFFCC" emissive="#FFFF99" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.8, 0.3, 0.7]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFFFCC" emissive="#FFFF99" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default Car;