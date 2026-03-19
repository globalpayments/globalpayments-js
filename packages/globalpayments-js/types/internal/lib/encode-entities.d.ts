/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 *
 * @param value
 * @returns escaped text
 */
export default function encodeEntities(value: string): string;
