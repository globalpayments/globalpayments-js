import en from "./en";
import fr from "./fr";
import zh from "./zh";
import cs from "./cs";
import de from "./de";
import el from "./el";
import es from "./es";
import pl from "./pl";
import it from "./it";
import pt from "./pt";
import ro from "./ro";
import sk from "./sk";
import sl from "./sl";
import tr from "./tr";
import sv from "./sv";
import ru from "./ru";
import ja from "./ja";
import hu from "./hu";
import hr from "./hr";
import nl from "./nl";
import uk from "./uk";
import vi from "./vi";
import mt from "./mt";

import {IDictionary} from "../util";

type Translations = {
  [key: string]: IDictionary;
};

const translations: Translations = {
  en, // en - English
  fr, // fr - French
  zh, // zh - Chinese
  cs, // cs - Czech
  de, // de - German
  el, // el - Greek
  es, // es - Spanish
  pl, // pl - Polish
  it, // it - Italian
  pt, // pt - Portuguese
  ro, // ro - Romanian
  sk, // sk - Slovak
  sl, // sl - Slovenian
  tr, // tr - Turkish
  sv, // sv - Swedish
  ru, // ru - Russian
  ja, // ja - Japanese
  hu, // hu - Hungarian
  hr, // hr - Croatian
  nl, // nl - Dutch
  uk, // uk - Ukrainian
  vi, // vi - Vietnamese
  mt, // MT - Maltese
};

export default translations;
