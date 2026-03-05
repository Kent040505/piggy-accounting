import React, { createContext, useContext, useState, useCallback } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('piggy-language') || 'en'
  );

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('piggy-language', lang);
    i18n.changeLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
