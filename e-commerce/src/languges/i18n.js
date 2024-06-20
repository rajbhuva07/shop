import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './english/translation.json'; // English translations
import translationFR from './france/translation.json'; // French translations

// Configuration
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
