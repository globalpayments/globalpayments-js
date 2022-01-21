import encodeEntities from "../../internal/lib/encode-entities";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Sets the text content of a hosted field
 *
 * @param text The desired text value
 */
export default (text: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  el.textContent = encodeEntities(text);
};
