import dotPlaceholders from "../../internal/lib/dot-placeholders";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Change values of maxlength and placeholder attributes of the cvv input
 * depending on card type
 *
 * @param maxlength The maximum number of characters desired
 * @param placeholder Placeholder for show
 * @param id cvv input id
 */
export default (maxlength: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  const currentPlaceholder = el.getAttribute("placeholder");

  // Just change the placeholder when it belongs to our own code
  if (currentPlaceholder && dotPlaceholders.indexOf(currentPlaceholder) > -1) {
    const charPlaceholder = currentPlaceholder[0];
    let placeholder = "";
    for (let index = 0; index < Number(maxlength); index++) {
      placeholder = placeholder + charPlaceholder;
    }
    el.setAttribute("placeholder", placeholder);
  }

  el.setAttribute("maxlength", maxlength);
};