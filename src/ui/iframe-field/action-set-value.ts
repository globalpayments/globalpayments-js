import encodeEntities from "../../internal/lib/encode-entities";
import Events from '../../internal/lib/events';
import paymentFieldId from "../../internal/lib/payment-field-id";

export default (text: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  el.setAttribute("value", encodeEntities(text));

  Events.trigger("keyup", el);
  Events.trigger("input", el);
};
