import encodeEntities from "../../internal/lib/encode-entities";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Sets the label of a hosted field
 *
 * @param text The desired input label
 */
export default (text: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  // Set the label on the input via aria-label
  el.setAttribute("aria-label", encodeEntities(text));
  // ... and on the main landmark via aria-label
  document
    .querySelectorAll("main")
    .forEach((e) => e.setAttribute("aria-label", encodeEntities(text)));
  // ... and also on the hidden label element via its text content
  document
    .querySelectorAll(`#${paymentFieldId}-label`)
    .forEach((e) => (e.textContent = encodeEntities(text)));
};
