import translations from "./translations/translations";
import {IDictionary} from "./util";

function findKeyByValue(obj: IDictionary, valueToFind: string) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (value === valueToFind) {
        return key;
      } else if (typeof value === 'object') {
        const result: any = findKeyByValue(value, valueToFind);
        if (result) {
          return key + '.' + result;
        }
      }
    }
  }
  return null;
}

function getValueByKey(obj: IDictionary, key: string, defaultValue?: any) {
  const keys = key.split('.');
  let result = obj;
  for (const k of keys) {
    if (result && result.hasOwnProperty(k)) {
      result = result[k];
    } else {
      return defaultValue;
    }
  }
  return result;
}


function translateMessage(lang: string, message: string) : any {
  lang = lang && translations.hasOwnProperty(lang) ? lang : 'en';
  const key = findKeyByValue(translations.en, message);
  if (key !== null) {
    const translatedMessage = getValueByKey(translations[lang], key, message);
    return translatedMessage ? translatedMessage : message;
  }
}

function translateObj(lang: string, object: any) {
  lang = lang && translations.hasOwnProperty(lang) ? lang : 'en';
  const translatedObj: { [key: string]: string } = {};
  const keys = Object.keys(object);

  for (const key of keys) {
    if (translations[lang].labels[key]) {
      translatedObj[key] = translations[lang].labels[key];
    }
  }
  return translatedObj;
}

export {translateMessage, translateObj};
