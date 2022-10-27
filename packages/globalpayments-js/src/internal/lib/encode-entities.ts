/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 *
 * @param value
 * @returns escaped text
 */
export default function encodeEntities(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (v) => {
      const hi = v.charCodeAt(0);
      const low = v.charCodeAt(1);
      return "&#" + ((hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000) + ";";
    })
    .replace(/([^\#-~é| |!])/g, (v) => {
      return "&#" + v.charCodeAt(0) + ";";
    })
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
