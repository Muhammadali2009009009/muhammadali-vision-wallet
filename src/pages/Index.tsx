import React, { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import AdminPanel from '@/components/AdminPanel';
import Settings from '@/components/Settings';
import LanguageSelector from '@/components/LanguageSelector';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'wallet':
        return <Dashboard />; // For now, using dashboard
      case 'transactions':
        return <Dashboard />; // For now, using dashboard
      case 'admin':
        return <AdminPanel />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <div className="p-6 text-center"><h2 className="text-2xl neon-text">Help & Support</h2><p className="text-muted-foreground mt-2">Contact us for assistance</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <div className="min-h-screen bg-gradient-hero">
            <LanguageSelector />
            
            <div className="flex">
              <Sidebar 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
              />
              
              <main className="flex-1 lg:ml-0 min-h-screen">
                <div className="max-w-7xl mx-auto">
                  {renderActiveSection()}
                </div>
              </main>
            </div>
          </div>
        )}
      </TooltipProvider>
    </LanguageProvider>
  );
};

export default Index;
