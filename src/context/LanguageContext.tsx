import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, languages } from '@/lib/currency-data';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

// Get the saved language from localStorage or default to 'en'
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferredLanguage') || 'en';
  }
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>(getSavedLanguage());

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    // Save the language preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLanguage);
    }
    
    // Only update document direction for RTL languages
    if (newLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = newLanguage;
    }
  };

  useEffect(() => {
    // Reset document direction based on language
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    // @ts-ignore - We know the structure of our translations
    if (translations[language] && translations[language][key]) {
      // @ts-ignore
      return translations[language][key];
    }
    // Fallback to English or the key itself
    // @ts-ignore
    return (translations.en && translations.en[key]) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
