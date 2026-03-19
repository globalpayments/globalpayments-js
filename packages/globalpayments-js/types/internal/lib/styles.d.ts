import { IDictionary } from "./util";
/**
 * addStylesheet
 *
 * Creates a `style` node in the DOM with the given `css`.
 *
 * @param css
 * @param id
 */
export declare function addStylesheet(css: string, id?: string): void;
/**
 * json2css
 *
 * Converts a JSON node to text representing CSS.
 *
 * @param json
 */
export declare function json2css(json: IDictionary): string;
