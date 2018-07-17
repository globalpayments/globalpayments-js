import encodeEntities from "../../internal/lib/encode-entities";
import paymentFieldId from "../../internal/lib/payment-field-id";

export default (placeholder: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  if (
    placeholder === "•••• •••• •••• ••••" ||
    placeholder === "•••••••••" ||
    placeholder === "••••" ||
    placeholder === "•••" ||
    placeholder === "···· ···· ···· ····"
  ) {
    el.setAttribute("placeholder", placeholder);
  } else {
    el.setAttribute("placeholder", encodeEntities(placeholder));
  }
};
