import paymentFieldId from "../../internal/lib/payment-field-id";

export default () => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  el.focus();
};
