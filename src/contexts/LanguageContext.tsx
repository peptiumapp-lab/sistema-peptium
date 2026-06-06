import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey } from '../lib/translations';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: 'BRL' | 'USD';
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Simple auto-detect based on browser language, defaulting to pt if not en or es
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'en' || browserLang === 'es') {
        setLanguageState(browserLang as Language);
      } else {
        setLanguageState('pt');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  // If language is Portuguese, use BRL, otherwise USD (for English and Spanish as fallback)
  const currency = language === 'pt' ? 'BRL' : 'USD';

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      if (result === undefined) break;
      result = result[k];
    }
    // Fallback to pt if key is missing in selected language
    if (!result) {
      result = translations['pt'];
      for (const k of keys) {
        if (result === undefined) break;
        result = result[k];
      }
    }
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
