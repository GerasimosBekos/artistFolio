// contexts/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import { el } from '../translations/el';
import { en } from '../translations/en';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('el'); // default Greek

  const translations = {
    el: el,
    en: en
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'el' ? 'en' : 'el');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};