import translations from "./translations/translations";
import {options} from "./options";
import {Language} from "./enums";

let currentLanguage: Language | string = Language.en; // Default language
const DEFAULT_LANGUAGE = 'en';

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
  const translationSet = translations[language][featureSet] || translations[DEFAULT_LANGUAGE][featureSet];
  return translationSet || {};
}

export function getTranslationLanguageSet(language: string): any {
  const translationLanguageSet = translations[language] || translations[DEFAULT_LANGUAGE];
  return translationLanguageSet || {};
}