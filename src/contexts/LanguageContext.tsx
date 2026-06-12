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
    let currentLang: Language = 'pt';
    const savedLang = localStorage.getItem('app_language') as Language;
    
    if (savedLang === 'en' || savedLang === 'es' || savedLang === 'pt') {
      currentLang = savedLang;
    } else {
      const browserLang = navigator.language.slice(0, 2);
      currentLang = (browserLang === 'en' || browserLang === 'es') ? (browserLang as Language) : 'pt';
      localStorage.setItem('app_language', currentLang);
    }

    setLanguageState(currentLang);

    // Synchronize the googtrans cookie if it doesn't match the current language state
    // We check the document.cookie to see if googtrans is present and matches
    const expectedCookie = currentLang === 'pt' ? '' : `/pt/${currentLang}`;
    const match = document.cookie.match(/googtrans=([^;]+)/);
    const currentCookie = match ? match[1] : '';

    if (currentLang === 'pt' && currentCookie !== '') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
      window.location.reload();
    } else if (currentLang !== 'pt' && currentCookie !== expectedCookie) {
      document.cookie = `googtrans=${expectedCookie}; path=/;`;
      document.cookie = `googtrans=${expectedCookie}; domain=${window.location.hostname}; path=/;`;
      window.location.reload();
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
    
    // Integrates with Google Translate Widget to translate the database/dynamic content
    if (lang === 'pt') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
    } else {
      document.cookie = `googtrans=/pt/${lang}; path=/;`;
      document.cookie = `googtrans=/pt/${lang}; domain=${window.location.hostname}; path=/;`;
    }
    window.location.reload(); // Reload needed for Google Translate to apply on fresh DOM
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
