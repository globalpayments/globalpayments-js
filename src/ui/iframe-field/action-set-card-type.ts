import paymentFieldId from "../../internal/lib/payment-field-id";

export default (cardType?: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

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
