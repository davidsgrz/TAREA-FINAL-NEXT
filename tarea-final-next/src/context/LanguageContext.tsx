"use client";
import { createContext, useContext, useState } from 'react';
import es from '../messages/es.json';
import en from '../messages/en.json';
import fr from '../messages/fr.json';

const translations: any = { es, en, fr };
const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ t, setLang, lang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);