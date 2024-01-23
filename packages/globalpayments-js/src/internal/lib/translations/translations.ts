import en from "./en";
import fr from "./fr";
import zh from "./zh";
import {IDictionary} from "../util";

type Translations = {
  [key: string]: IDictionary;
};

const translations: Translations = {
  en,
  fr,
  zh
};

export default translations;
