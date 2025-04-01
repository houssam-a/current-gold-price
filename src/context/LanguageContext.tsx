
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

// Get the saved language from localStorage or default to browser language or 'en'
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    // First check if there's a saved preference
    const saved = localStorage.getItem('preferredLanguage');
    if (saved) return saved;
    
    // Then check browser language
    const browserLang = navigator.language.split('-')[0];
    // Check if we support this language
    if (['en', 'fr', 'es', 'ar', 'zh'].includes(browserLang)) {
      return browserLang;
    }
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
    
    // Update document direction for RTL languages
    if (newLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = newLanguage;
      document.body.classList.remove('rtl');
    }

    // Force re-render of components that depend on language
    window.dispatchEvent(new Event('languagechange'));
  };

  useEffect(() => {
    // Set initial direction based on language
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
      document.body.classList.remove('rtl');
    }
  }, []);

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
