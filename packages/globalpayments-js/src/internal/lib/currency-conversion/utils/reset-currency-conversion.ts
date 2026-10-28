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

  // Remove all companion DCC text/UI blocks rendered by template.ts.
  document.querySelectorAll(
    '.dcc-submit-label-text, .dcc-payer-tooltip-text, .submit-disclaimer-text, .submit-section-separator, #installment-dcc-warning'
  ).forEach((el) => el.remove());

  const dccSubmitIframe = document.querySelector("iframe[name='submit-dcc']") as HTMLIFrameElement | null;
  dccSubmitIframe?.classList.add("hidden");

  // Clear the value of the payment field inside the iframe
  dccField?.setValue('');

  // Hide validation messages associated with the dccField
  dccField?.hideValidation();
}