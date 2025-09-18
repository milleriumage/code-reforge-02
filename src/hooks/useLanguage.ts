import React, { createContext, useContext, useState } from 'react';

export interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (languageCode: string) => void;
  languages: Language[];
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);

  const changeLanguage = (languageCode: string) => {
    const language = LANGUAGES.find(lang => lang.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
    }
  };

  // Simple translation function
  const t = (key: string) => {
    // Basic translations for common keys
    const translations: { [key: string]: string } = {
      'followers': 'Seguidores',
      'following': 'Seguindo',
      'likes': 'Curtidas',
      'message': 'Mensagem',
      'share': 'Compartilhar',
      'settings': 'Configurações'
    };
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        languages: LANGUAGES,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};