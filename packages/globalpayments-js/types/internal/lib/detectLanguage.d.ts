import { Language } from "./enums";
export declare function setCurrentLanguage(lang?: Language): string;
export declare function getCurrentLanguage(): string;
export declare function getTranslationSet(language: string, featureSet: string): any;
export declare function getTranslationLanguageSet(language: string): any;
