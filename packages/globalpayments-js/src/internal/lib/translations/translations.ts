import zh from "./zh";
import en from "./en";
import {IDictionary} from "../util";

type Translations = {
  [key: string]: IDictionary;
};

const translations: Translations = {
  en,
  zh
};

export default translations;
