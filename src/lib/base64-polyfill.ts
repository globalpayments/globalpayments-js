import { fromByteArray, toByteArray } from "base64-js";

export function base64encode(text: string): string {
  let i: number;
  const len = text.length;
  const Arr: any = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  const u8array = new Arr(len);

  for (i = 0; i < len; i++) {
    u8array[i] = text.charCodeAt(i);
  }

  return fromByteArray(u8array);
}

export function base64decode(text: string): string {
  const u8Array = toByteArray(text);
  let i: number;
  const len = u8Array.length;
  let bStr = "";

  for (i = 0; i < len; i++) {
    bStr += String.fromCharCode(u8Array[i]);
  }

  return bStr;
}

window.btoa = window.btoa || base64encode;
window.atob = window.atob || base64decode;
