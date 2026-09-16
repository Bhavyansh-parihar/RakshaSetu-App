import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import i18n, { LANG_KEY } from './i18n';

type Language = 'en' | 'hi';

interface LanguageContextType {
  currentLang: Language;
  isHindi: boolean;
  isEnglish: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'en',
  isHindi: false,
  isEnglish: true,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>(
    (localStorage.getItem(LANG_KEY) as Language) || 'en'
  );

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem(LANG_KEY, lang);
    i18n.changeLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(currentLang === 'en' ? 'hi' : 'en');
  }, [currentLang, setLanguage]);

  return (
    <LanguageContext.Provider value={{
      currentLang,
      isHindi: currentLang === 'hi',
      isEnglish: currentLang === 'en',
      setLanguage,
      toggleLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageContext;
