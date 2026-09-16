import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './resources/en.json';
import hi from './resources/hi.json';

const LANG_KEY = 'rakshasetu_language';

// Detect saved or device language
const saved = localStorage.getItem(LANG_KEY);
const deviceLang = navigator.language || 'en';
const defaultLang = saved || (deviceLang.startsWith('hi') ? 'hi' : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
export { LANG_KEY };
