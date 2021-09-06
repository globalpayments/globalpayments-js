import encodeEntities from "../../internal/lib/encode-entities";
import Events from "../../internal/lib/events";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Sets the value of a hosted field
 *
 * @param text The desired input value
 */
export default (text: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  el.setAttribute("value", encodeEntities(text));

  // trigger events on the target element
  Events.trigger("keyup", el);
  Events.trigger("input", el);
};
