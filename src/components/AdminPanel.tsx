import React from 'react';
import { Phone, MessageCircle, Instagram, Mail, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import adminAvatar from '@/assets/admin-avatar.png';

const AdminPanel: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      label: t('phone'),
      value: '+998905464635',
      color: 'text-accent',
      bg: 'bg-accent/10',
      href: 'tel:+998905464635'
    },
    {
      icon: MessageCircle,
      label: t('telegram'),
      value: '@TechNest_admin',
      color: 'text-primary',
      bg: 'bg-primary/10',
      href: 'https://t.me/TechNest_admin'
    },
    {
      icon: Instagram,
      label: t('instagram'),
      value: 'dark_editz.xx',
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      href: 'https://instagram.com/dark_editz.xx'
    }
  ];

  const adminStats = [
    { label: 'Total Users', value: '12,453', change: '+5.2%', positive: true },
    { label: 'Active Sessions', value: '3,891', change: '+12.1%', positive: true },
    { label: 'System Health', value: '99.8%', change: '+0.1%', positive: true },
    { label: 'Revenue', value: '$847K', change: '+8.9%', positive: true },
  ];

  const handleContactClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold gradient-text mb-2">
          {t('adminPanel')}
        </h1>
        <p className="text-muted-foreground">
          System administration and management
        </p>
      </div>

      {/* Admin Profile Card */}
      <Card className="card-glass neon-glow animate-scale-in">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <img 
                src={adminAvatar} 
                alt="Admin Muhammadali" 
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary/20"
              />
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-background flex items-center justify-center">
                <div className="w-3 h-3 bg-accent-glow rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-orbitron font-bold gradient-text mb-2">
              Admin: Muhammadali
            </h2>
            <p className="text-muted-foreground mb-6">
              System Administrator & Developer
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Uzbekistan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Since 2020</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xl font-semibold mb-4 neon-text">{t('contactInfo')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <Card key={index} className="card-glass hover:neon-glow transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-0 flex flex-col items-center space-y-3"
                    onClick={() => handleContactClick(contact.href)}
                  >
                    <div className={`contact-icon ${contact.bg}`}>
                      <IconComponent className={`w-6 h-6 ${contact.color}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {contact.label}
                      </p>
                      <p className={`font-semibold ${contact.color}`}>
                        {contact.value}
                      </p>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Admin Statistics */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-semibold mb-4 neon-text">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat, index) => (
            <Card key={index} className="card-glass">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <div className="text-2xl font-orbitron font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <p className={`text-xs flex items-center justify-center ${
                    stat.positive ? 'text-accent' : 'text-danger'
                  }`}>
                    <span>{stat.change}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Admin Actions */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-xl font-semibold mb-4 neon-text">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['User Management', 'System Logs', 'Security', 'Backups'].map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-16 card-glass hover:neon-glow transition-all duration-300"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;