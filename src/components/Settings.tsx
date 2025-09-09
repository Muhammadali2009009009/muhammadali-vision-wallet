import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Bell, 
  Mail, 
  Globe, 
  User, 
  Shield, 
  Smartphone,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const settingSections = [
    {
      title: t('appearance'),
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: darkMode ? t('darkMode') : t('lightMode'),
          description: 'Switch between dark and light themes',
          value: darkMode,
          onChange: setDarkMode,
          type: 'switch'
        }
      ]
    },
    {
      title: t('notifications'),
      items: [
        {
          icon: Bell,
          label: t('pushNotifications'),
          description: 'Receive push notifications on your device',
          value: pushNotifications,
          onChange: setPushNotifications,
          type: 'switch'
        },
        {
          icon: Mail,
          label: t('emailNotifications'),
          description: 'Receive notifications via email',
          value: emailNotifications,
          onChange: setEmailNotifications,
          type: 'switch'
        },
        {
          icon: soundEnabled ? Volume2 : VolumeX,
          label: 'Sound Effects',
          description: 'Enable sound effects for interactions',
          value: soundEnabled,
          onChange: setSoundEnabled,
          type: 'switch'
        }
      ]
    },
    {
      title: t('language'),
      items: [
        {
          icon: Globe,
          label: t('language'),
          description: 'Select your preferred language',
          type: 'language'
        }
      ]
    },
    {
      title: t('account'),
      items: [
        {
          icon: User,
          label: 'Profile Settings',
          description: 'Manage your account information',
          type: 'button'
        },
        {
          icon: Shield,
          label: 'Security',
          description: 'Manage security settings and 2FA',
          type: 'button'
        },
        {
          icon: Smartphone,
          label: 'Connected Devices',
          description: 'Manage your connected devices',
          type: 'button'
        }
      ]
    }
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'uz', label: 'O\'zbek tili', flag: '🇺🇿' }
  ];

  return (
    <div className="p-6 space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold gradient-text mb-2">
          {t('settings')}
        </h1>
        <p className="text-muted-foreground">
          Customize your experience
        </p>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => (
        <div 
          key={sectionIndex} 
          className="animate-slide-up" 
          style={{ animationDelay: `${sectionIndex * 0.1}s` }}
        >
          <h2 className="text-xl font-semibold mb-4 neon-text">{section.title}</h2>
          <Card className="card-glass">
            <CardContent className="p-0">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                
                if (item.type === 'language') {
                  return (
                    <div 
                      key={itemIndex}
                      className={`p-4 ${
                        itemIndex !== section.items.length - 1 ? 'border-b border-border/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {languages.map((lang) => (
                          <Button
                            key={lang.code}
                            variant={language === lang.code ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setLanguage(lang.code as 'en' | 'uz')}
                            className={`lang-selector ${
                              language === lang.code ? 'neon-glow' : ''
                            }`}
                          >
                            <span className="mr-2">{lang.flag}</span>
                            {lang.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={itemIndex}
                    className={`flex items-center justify-between p-4 ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-border/10' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    {item.type === 'switch' && (
                      <Switch
                        checked={item.value as boolean}
                        onCheckedChange={item.onChange as (value: boolean) => void}
                      />
                    )}
                    
                    {item.type === 'button' && (
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      ))}

      {/* App Information */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Card className="card-glass">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 neon-text">
              Muhammadali Wallet
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Version 2.1.0 • Build 2024.01
            </p>
            <p className="text-xs text-muted-foreground">
              {t('createdWith')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;