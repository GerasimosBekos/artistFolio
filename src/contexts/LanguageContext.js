// contexts/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import { el } from '../translations/el';
import { en } from '../translations/en';
import { fr } from '../translations/fr';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('el'); // default Greek

  const translations = {
    el: el,
    en: en,
    fr: fr
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'el') return 'en';
      if (prev === 'en') return 'fr';
      return 'el'; // fr -> el
    });
  };

  const setSpecificLanguage = (lang) => {
    if (['el', 'en', 'fr'].includes(lang)) {
      setLanguage(lang);
    }
  };
   

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, setSpecificLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};