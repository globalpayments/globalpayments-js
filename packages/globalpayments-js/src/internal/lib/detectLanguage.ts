import translations from "./translations/translations";
import {options} from "./options";
import {Language} from "./enums";

let currentLanguage: Language | string = Language.en; // Default language


export function setCurrentLanguage(lang?: Language): string {
  if (lang && translations.hasOwnProperty(lang)){
    currentLanguage = lang;
  }
  return currentLanguage;
}

export function getCurrentLanguage(): string {
  const lang = options.language;
  if (lang && translations.hasOwnProperty(lang)){
    currentLanguage = lang;
  }
  return currentLanguage;
}

export function getTranslationSet(language: string, featureSet: string): any {
  const DEFAULT_LANGUAGE = 'en';
  const translationSet = translations[language][featureSet] || translations[DEFAULT_LANGUAGE][featureSet];
  return translationSet || {};
}