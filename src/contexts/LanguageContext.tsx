import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'uz';

interface Translations {
  en: Record<string, string>;
  uz: Record<string, string>;
}

const translations: Translations = {
  en: {
    // Loading
    loading: 'Loading...',
    madeBy: 'Made by Muhammadali',
    
    // Navigation
    dashboard: 'Dashboard',
    wallet: 'Wallet',
    transactions: 'Transactions',
    settings: 'Settings',
    adminPanel: 'Admin Panel',
    helpSupport: 'Help & Support',
    cityGame: 'GTA City',
    
    // Dashboard
    totalBalance: 'Total Balance',
    recentTransactions: 'Recent Transactions',
    quickActions: 'Quick Actions',
    sendMoney: 'Send Money',
    receiveMoney: 'Receive Money',
    payBills: 'Pay Bills',
    analytics: 'Analytics',
    
    // Admin Panel
    adminProfile: 'Admin Profile',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    telegram: 'Telegram',
    instagram: 'Instagram',
    
    // Settings  
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    emailNotifications: 'Email Notifications',
    language: 'Language',
    account: 'Account Management',
    
    // Footer
    createdWith: 'Created with ❤️ by Muhammadali',
  },
  uz: {
    // Loading
    loading: 'Yuklanmoqda...',
    madeBy: 'Muhammadali tomonidan yaratilgan',
    
    // Navigation
    dashboard: 'Bosh sahifa',
    wallet: 'Hamyon',
    transactions: 'Tranzaksiyalar',
    settings: 'Sozlamalar',
    adminPanel: 'Admin Panel',
    helpSupport: 'Yordam va Qo\'llab-quvvatlash',
    cityGame: 'GTA Shahar',
    
    // Dashboard
    totalBalance: 'Umumiy Balans',
    recentTransactions: 'So\'nggi Tranzaksiyalar',
    quickActions: 'Tezkor Harakatlar',
    sendMoney: 'Pul Jo\'natish',
    receiveMoney: 'Pul Qabul Qilish',
    payBills: 'To\'lovlar',
    analytics: 'Analitika',
    
    // Admin Panel
    adminProfile: 'Admin Profili',
    contactInfo: 'Aloqa Ma\'lumotlari',
    phone: 'Telefon',
    telegram: 'Telegram',
    instagram: 'Instagram',
    
    // Settings
    appearance: 'Ko\'rinish',
    darkMode: 'Qorong\'u Rejim',
    lightMode: 'Yorug\' Rejim',
    notifications: 'Bildirishnomalar',
    pushNotifications: 'Push Bildirishnomalar',
    emailNotifications: 'Email Bildirishnomalar',
    language: 'Til',
    account: 'Hisob Boshqaruvi',
    
    // Footer
    createdWith: 'Muhammadali tomonidan ❤️ bilan yaratilgan',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};