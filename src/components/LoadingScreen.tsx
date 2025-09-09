import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-neon opacity-10 animate-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-8">
        {/* Logo */}
        <div className="mb-12 animate-scale-in">
          <div className="relative">
            <img 
              src={logo} 
              alt="Muhammadali Wallet" 
              className="w-32 h-32 mx-auto animate-spin-slow"
            />
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* App Title */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-orbitron font-bold gradient-text mb-2">
            Muhammadali Wallet
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('loading')}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className="h-full loading-bar transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground font-orbitron">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Made by text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground">
            {t('madeBy')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;