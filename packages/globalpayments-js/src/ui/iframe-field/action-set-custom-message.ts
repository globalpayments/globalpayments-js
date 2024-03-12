import { ValidationMessages } from "../../internal/built-in-validations/messages";

type ValidationField = keyof typeof ValidationMessages;

/**
 * Updates the messages for a specific validation field based on custom messages
 *
 * @param type - the type of the validation field (e.g., 'card-number', 'card-expiration')
 * @param customMessages - an object containing custom messages to override the default ones
 */
export default (type: any, customMessages: object) => {
  const fieldType: string = formatFieldType(type);
  Object.keys(customMessages).forEach(key => {
    if (ValidationMessages[fieldType as ValidationField].hasOwnProperty(key)) {
      overwriteObjectValues(ValidationMessages[fieldType as ValidationField], customMessages);
    }
  });
}

/**
 * A generic function that overwrites values in the target object with values from the source object
 *
 * @param target - the target object to be updated
 * @param source - the source object containing values to overwrite in the target
 * @returns the target object after values have been overwritten
 */
function overwriteObjectValues<T>(target: T, source: Partial<T>): T {
  Object.keys(source as T).forEach((key) => {
    const k = key as keyof T;
    if (k in target) {
      target[k] = source[k] as T[keyof T];
    }
  });
  return target;
}

/**
 * A function that formats a field type string to a specific format (e.g., 'card-number' to 'CardNumber')
 *
 * @param type - the field type string to be formatted
 * @returns the formatted field type string
 */
function formatFieldType(type: string) {
  return type
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join('');
}