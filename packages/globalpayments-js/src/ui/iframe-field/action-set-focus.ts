import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Sets input focus on the hosted field
 */
export default () => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  el.focus();
};
