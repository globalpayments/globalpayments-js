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