import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Sets the class list of a hosted field to include
 * the card type inferred from the `card-number` field
 * emitting the `ui:iframe-field:card-type` through
 * the parent window.
 *
 * @param cardType The inferred card type
 * @returns
 */
export default (cardType?: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  // Work with the element's className for backwards
  // compatibility
  const classList = el.className.split(" ");
  const length = classList.length;
  let i = 0;
  let c = "";

  for (i; i < length; i++) {
    c = classList[i];
    if (c && c.indexOf("card-type-") !== -1) {
      delete classList[i];
    }
  }

  if (cardType) {
    classList.push("card-type-" + cardType);
  }

  el.className = classList.join(" ");
};
