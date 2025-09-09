import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  Settings, 
  Shield, 
  HelpCircle,
  Menu,
  X,
  Gamepad2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { id: 'wallet', icon: Wallet, key: 'wallet' },
  { id: 'transactions', icon: Receipt, key: 'transactions' },
  { id: 'city-game', icon: Gamepad2, key: 'cityGame', isExternal: true },
  { id: 'admin', icon: Shield, key: 'adminPanel' },
  { id: 'settings', icon: Settings, key: 'settings' },
  { id: 'help', icon: HelpCircle, key: 'helpSupport' },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  isOpen, 
  setIsOpen 
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-gradient-card card-glass border-r border-border-glow
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Header */}
        <div className="p-6 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-orbitron font-bold neon-text">
                  Muhammadali
                </h2>
                <p className="text-xs text-muted-foreground">Wallet</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isExternal) {
                    window.open('/city-game', '_blank');
                  } else {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }
                }}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-xl
                  sidebar-item
                  ${isActive ? 'active' : ''}
                `}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                <span className={`font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {t(item.key)}
                </span>
                {item.isExternal && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full ml-auto">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('createdWith')}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden card-glass"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
};

export default Sidebar;