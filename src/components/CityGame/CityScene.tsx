import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Environment } from '@react-three/drei';
import Building from './Building';
import Car from './Car';
import Pedestrian from './Pedestrian';

const CityScene: React.FC = () => {
  // Generate city grid
  const generateCity = () => {
    const buildings = [];
    const cars = [];
    const pedestrians = [];
    const gridSize = 20;
    const citySize = 5; // 5x5 grid
    
    // Generate buildings
    for (let x = -citySize; x <= citySize; x++) {
      for (let z = -citySize; z <= citySize; z++) {
        // Skip some positions for roads
        if (x % 2 !== 0 && z % 2 !== 0) {
          const buildingHeight = Math.random() * 40 + 10;
          const buildingWidth = 8 + Math.random() * 4;
          const buildingDepth = 8 + Math.random() * 4;
          const colors = ['#666666', '#888888', '#555555', '#777777', '#999999'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          buildings.push(
            <Building
              key={`building-${x}-${z}`}
              position={[x * gridSize, 0, z * gridSize]}
              height={buildingHeight}
              width={buildingWidth}
              depth={buildingDepth}
              color={color}
            />
          );
        }
      }
    }
    
    // Generate cars on roads
    const carColors = ['#FF0000', '#0000FF', '#FFFF00', '#00FF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];
    for (let i = 0; i < 20; i++) {
      const isXDirection = Math.random() > 0.5;
      const color = carColors[Math.floor(Math.random() * carColors.length)];
      
      if (isXDirection) {
        // Cars moving along X axis (horizontal roads)
        const zPos = (Math.floor(Math.random() * citySize * 2) - citySize) * gridSize;
        cars.push(
          <Car
            key={`car-x-${i}`}
            initialPosition={[Math.random() * 200 - 100, 0.1, zPos]}
            speed={Math.random() * 2 + 1}
            direction="x"
            color={color}
          />
        );
      } else {
        // Cars moving along Z axis (vertical roads)
        const xPos = (Math.floor(Math.random() * citySize * 2) - citySize) * gridSize;
        cars.push(
          <Car
            key={`car-z-${i}`}
            initialPosition={[xPos, 0.1, Math.random() * 200 - 100]}
            speed={Math.random() * 2 + 1}
            direction="z"
            color={color}
          />
        );
      }
    }
    
    // Generate pedestrians on sidewalks
    const pedestrianColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    for (let i = 0; i < 50; i++) {
      const color = pedestrianColors[Math.floor(Math.random() * pedestrianColors.length)];
      pedestrians.push(
        <Pedestrian
          key={`pedestrian-${i}`}
          initialPosition={[
            Math.random() * 160 - 80,
            0,
            Math.random() * 160 - 80
          ]}
          speed={Math.random() * 1 + 0.5}
          color={color}
        />
      );
    }
    
    return { buildings, cars, pedestrians };
  };

  const { buildings, cars, pedestrians } = generateCity();

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [50, 30, 50], fov: 60 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Environment and Lighting */}
          <Sky 
            distance={450000}
            sunPosition={[0.5, 0.2, 0.8]}
            inclination={0.52}
            azimuth={0.25}
          />
          <Environment preset="city" />
          
          {/* Lights */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[100, 100, 50]} 
            intensity={1} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={300}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[400, 400]} />
            <meshStandardMaterial color="#2C2C2C" />
          </mesh>
          
          {/* Roads */}
          {Array.from({ length: 11}, (_, i) => {
            const pos = (i - 5) * 20;
            return (
              <group key={`roads-${i}`}>
                {/* Horizontal road */}
                <mesh position={[0, 0.01, pos]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[220, 4]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
                {/* Vertical road */}
                <mesh position={[pos, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[4, 220]} />
                  <meshStandardMaterial color="#444444" />
                </mesh>
                
                {/* Road markings */}
                <mesh position={[0, 0.02, pos]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[220, 0.2]} />
                  <meshStandardMaterial color="#FFFF00" />
                </mesh>
                <mesh position={[pos, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[0.2, 220]} />
                  <meshStandardMaterial color="#FFFF00" />
                </mesh>
              </group>
            );
          })}
          
          {/* City elements */}
          {buildings}
          {cars}
          {pedestrians}
          
          {/* Street lights */}
          {Array.from({ length: 20 }, (_, i) => {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            return (
              <group key={`streetlight-${i}`} position={[x, 0, z]}>
                <mesh position={[0, 6, 0]}>
                  <cylinderGeometry args={[0.1, 0.1, 12, 8]} />
                  <meshStandardMaterial color="#666666" />
                </mesh>
                <mesh position={[0, 11, 0]}>
                  <sphereGeometry args={[0.5]} />
                  <meshStandardMaterial 
                    color="#FFF8DC" 
                    emissive="#FFF8DC" 
                    emissiveIntensity={0.8}
                  />
                </mesh>
                <pointLight 
                  position={[0, 11, 0]} 
                  intensity={2} 
                  distance={30} 
                  color="#FFF8DC"
                />
              </group>
            );
          })}
          
          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={5}
            maxDistance={200}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white font-orbitron z-10">
        <div className="card-glass p-4 rounded-lg">
          <h2 className="text-lg font-bold gradient-text mb-2">GTA City</h2>
          <p className="text-sm text-muted-foreground mb-1">🖱️ Drag to rotate view</p>
          <p className="text-sm text-muted-foreground mb-1">🔍 Scroll to zoom</p>
          <p className="text-sm text-muted-foreground">🏙️ Live city simulation</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute top-4 right-4 text-white font-orbitron z-10">
        <div className="card-glass p-4 rounded-lg">
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>🏢 Buildings:</span>
              <span className="text-primary">{buildings.length}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>🚗 Cars:</span>
              <span className="text-accent">{cars.length}</span>
            </div>
            <div className="flex justify-between">
              <span>🚶 People:</span>
              <span className="text-secondary">{pedestrians.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityScene;