import React from 'react';
import CityScene from '@/components/CityGame/CityScene';

const CityGame: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <CityScene />
      
      {/* Loading fallback */}
      <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-orbitron gradient-text">Loading GTA City...</p>
        </div>
      </div>
    </div>
  );
};

export default CityGame;