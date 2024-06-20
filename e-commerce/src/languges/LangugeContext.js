
import { createContext, useMemo, useState } from 'react';
import en from './english/translation.json';
import fr from './france/translation.json';

const LanguageContext = createContext();

const translations = { en, fr };

const interpolate = (template, values) => {
  return template.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => values[key.trim()] || '');
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translate = (key, values = {}) => {
    const keys = key.split('.');
    let translation = translations[language];
    for (let k of keys) {
      if (!translation[k]) return key;
      translation = translation[k];
    }
    return interpolate(translation, values);
  };

  const value = useMemo(() => ({ language, setLanguage, translate }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };
