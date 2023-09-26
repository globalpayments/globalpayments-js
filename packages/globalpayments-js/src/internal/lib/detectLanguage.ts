import translations from "./translations/translations";
import {options} from "./options";

let currentLanguage = 'en'; // Default language


export function setCurrentLanguage(lang?: string): string {
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