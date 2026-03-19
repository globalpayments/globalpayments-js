/**
 * Resets the currency conversion by removing all children from the container,
 * clearing the value of the payment field inside the iframe, and hiding validation messages.
 * @param dccField The iframe field associated with the currency conversion.
 */
import { IframeField } from "../../../../ui";
export declare const resetCurrencyConversion: (dccField: IframeField | undefined) => void;
