
import React, { createContext, useContext, useState, ReactNode } from 'react';
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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');

  const t = (key: string): string => {
    // @ts-ignore - We know the structure of our translations
    if (translations[language] && translations[language][key]) {
      // @ts-ignore
      return translations[language][key];
    }
    // @ts-ignore
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
