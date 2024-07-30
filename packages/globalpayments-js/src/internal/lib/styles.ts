import { IDictionary } from "./util";

/**
 * addStylesheet
 *
 * Creates a `style` node in the DOM with the given `css`.
 *
 * @param css
 * @param id
 */
export function addStylesheet(css: string, id?: string) {
  const el = document.createElement("style");
  const elements = document.getElementsByTagName("head");
  if (id) {
    if (document.getElementById(id)) {
      return;
    }

    el.id = id;
  }
  el.type = "text/css";
  if ((el as any).styleSheet) {
    // for IE
    (el as any).styleSheet.cssText = css;
  } else {
    el.appendChild(document.createTextNode(css));
  }
  if (elements && elements[0]) {
    elements[0].appendChild(el);
  }
}

/**
 * json2css
 *
 * Converts a JSON node to text representing CSS.
 *
 * @param json
 */
export function json2css(json: IDictionary): string {
  let css = "";
  const attributes = jsonAttributes(json);
  const children = jsonChildren(json);
  let i: number;
  let j: number;
  let key: any;
  let value: any;

  if (attributes) {
    const attributesLength = attributes.length;
    for (i = 0; i < attributesLength; i++) {
      key = attributes[i];
      value = json[key];
      if (isArray(value)) {
        if (isObject(value[0])) {
          // Handle array of objects (e.g., multiple @font-face)
          const objLength = value.length;
          for (j = 0; j < objLength; j++) {
            css += key + "{" + json2css(value[j]) + "}";
          }
        } else {
          // Handle array of strings
          const arrLength = value.length;
          for (j = 0; j < arrLength; j++) {
            css += key + ":" + value[j] + ";";
          }
        }
      } else {
        css += key + ":" + value + ";";
      }
    }
  }

  if (children) {
    const childrenLength = children.length;
    for (i = 0; i < childrenLength; i++) {
      key = children[i];
      value = json[key];
      css += key + "{" + json2css(value) + "}";
    }
  }

  return css;
}

function isArray(obj: any): boolean {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object';
}

function jsonAttributes(json: IDictionary): string[] {
  const keys = [];
  for (const key in json) {
    if (
      json.hasOwnProperty(key) &&
      (typeof json[key] === "string" || isArray(json[key]))
    ) {
      keys.push(key);
    }
  }
  return keys;
}

function jsonChildren(json: IDictionary): string[] {
  const keys = [];
  for (const key in json) {
    if (
      json.hasOwnProperty(key) &&
      !(typeof json[key] === "string" || isArray(json[key]))
    ) {
      keys.push(key);
    }
  }
  return keys;
}
