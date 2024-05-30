/**
 * Resets the currency conversion by removing all children from the container,
 * clearing the value of the payment field inside the iframe, and hiding validation messages.
 * @param dccField The iframe field associated with the currency conversion.
 */
import { IframeField } from "../../../../ui";
import { CurrencyConversionStyles } from "../components/enums";

export const resetCurrencyConversion = (dccField: IframeField | undefined): void => {
  // Remove all children from the container except the iframe
  dccField?.container?.querySelector(`.${CurrencyConversionStyles.CONTAINER}`)?.remove();

  // Clear the value of the payment field inside the iframe
  dccField?.setValue('');

  // Hide validation messages associated with the dccField
  dccField?.hideValidation();
}