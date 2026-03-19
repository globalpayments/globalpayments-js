import { IframeField } from "../index";
import { CurrencyConversionPaymentData } from "../../../internal/lib/currency-conversion/contracts/interfaces";
/**
 * Adds currency conversion functionality to the specified iframe field.
 * @param iframeField The iframe field to which currency conversion is added.
 * @param data The data used to populate the currency conversion.
 * @param callback The callback function to handle the response data.
 */
export default function addCurrencyConversion(iframeField: IframeField | undefined, data: any, callback: (response: CurrencyConversionPaymentData, value: string) => void): void;
