'use client'; // <--- ADD THIS LINE AT THE VERY TOP

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import itTranslations from '../translations/it.json';
import enTranslations from '../translations/en.json';

export type Language = 'it' | 'en';
export type TranslationKey = keyof typeof itTranslations; // Use one as the base type

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string; // Translation function
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations: Record<Language, typeof itTranslations> = {
  it: itTranslations,
  en: enTranslations,
};

// Helper to get initial language from browser or storage
const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('adunata_map_lang') as Language;
        if (storedLang && ['it', 'en'].includes(storedLang)) {
            return storedLang;
        }
        // Fallback to browser language if Italian or English
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en') return 'en';
    }
    return 'it'; // Default to Italian
}


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adunata_map_lang', lang);
      // Optional: update html lang attribute
       document.documentElement.lang = lang;
    }
  };

  // Set initial lang attribute on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || key; // Fallback to key if translation missing
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};