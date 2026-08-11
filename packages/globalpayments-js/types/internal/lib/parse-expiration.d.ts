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
declare const _default: (value: string) => IParsedExpiration | undefined;
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
export default _default;
