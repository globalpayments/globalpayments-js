/**
 * Validate a string to accept only english characters
 *
 * @param value
 * @returns escaped text
 */
export default function containsOnlyEnglishCharacters(value: string) {
  // Define a regular expression pattern that matches only English letters
  const pattern = /^[a-zA-Z~'` -]+$/;

  // Test the input string against the pattern
  return pattern.test(value);
}