import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'uz', label: 'UZ', flag: '🇺🇿' }
  ];

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center space-x-2">
      <div className="flex items-center space-x-1 card-glass lang-selector p-2 rounded-lg">
        <Globe className="w-4 h-4 text-primary mr-2" />
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLanguage(lang.code as 'en' | 'uz')}
            className={`h-8 px-3 text-xs font-medium ${
              language === lang.code 
                ? 'bg-gradient-primary text-primary-foreground shadow-glow-primary' 
                : 'hover:bg-primary/10'
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;