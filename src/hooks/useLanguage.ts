import { useState } from 'react';

export interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);

  const changeLanguage = (languageCode: string) => {
    const language = LANGUAGES.find(lang => lang.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
    }
  };

  const t = (key: string) => {
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

  return {
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES,
    t
  };
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};