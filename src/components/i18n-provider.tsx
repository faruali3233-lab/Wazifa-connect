
"use client";
import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import type { Language } from '@/hooks/use-auth';

import en from '@/lib/locales/en.json';
import ar from '@/lib/locales/ar.json';
import hi from '@/lib/locales/hi.json';

const translations = { en, ar, hi };

type TranslationKeys = keyof typeof en;

type I18nContextType = {
  t: (key: TranslationKeys, fallback?: string) => string;
  language: Language;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children, language }: { children: ReactNode, language: Language }) => {
  const t = (key: TranslationKeys, fallback?: string) => {
    return translations[language][key] || (fallback || (translations['en'][key] || key));
  };

  const value = useMemo(() => ({ t, language }), [language]);

  return (
    <I18nContext.Provider value={value}>
        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : 'font-body'}>
            {children}
        </div>
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
