import encodeEntities from "../../internal/lib/encode-entities";
import paymentFieldId from "../../internal/lib/payment-field-id";
import dotPlaceholders from "../../internal/lib/dot-placeholders";

/**
 * Sets the placeholder text of a hosted field
 *
 * @param placeholder The desired palceholder text
 */
export default (placeholder: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  // Determine if the placeholder text should be encoded
  if (dotPlaceholders.indexOf(placeholder) !== -1) {
    // Allow various dot placeholders
    el.setAttribute("placeholder", placeholder);
  } else {
    // Encode the placeholder text
    el.setAttribute("placeholder", encodeEntities(placeholder));
  }
};