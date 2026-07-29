/**
 * Parsed representation of a combined `card-expiration` value.
 */
export interface IParsedExpiration {
  /** Zero padded two digit month. */
  month: string;
  /** Two digit year. */
  year: string;
  /** Four digit year. */
  yearFull: string;
}

/**
 * Parses the value of the combined `card-expiration` hosted field.
 *
 * The field formats its own value as `MM / YYYY` from its `keyup` and `blur`
 * handlers, so the tokenization paths used to look for that exact separator to
 * decide whether an expiration was present. A value written by the browser's
 * AutoFill never passes through those handlers and arrives as `MM/YYYY`, which
 * left the expiration silently missing from the tokenization request.
 *
 * Parsing the raw value keeps tokenization independent of how the value
 * reached the field, and of which separator the browser used.
 *
 * @param value Raw hosted field value
 * @returns The parsed expiration, or `undefined` when `value` does not hold a
 *          usable month and year
 */
export default (value: string): IParsedExpiration | undefined => {
  const groups = (value || "").match(
    /^\D*(0[1-9]|1[0-2]|[1-9])\D*(\d{4}|\d{2})\s*$/,
  );

  if (!groups) {
    return undefined;
  }

  const month = groups[1].length === 1 ? "0" + groups[1] : groups[1];
  const yearFull =
    groups[2].length === 4
      ? groups[2]
      : new Date()
          .getFullYear()
          .toString()
          .slice(0, 2) + groups[2];

  return { month, year: yearFull.substr(2, 2), yearFull };
};
