import { options, postMessage } from "../../internal";
import paymentFieldId from "../../internal/lib/payment-field-id";

export default (id: string, type: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  if (type !== "card-cvv") {
    return;
  }

  if (!(el as HTMLInputElement).value) {
    return;
  }

  const isTransit = options.deviceId && options.manifest;
  const isBillPay = options.merchantName;

  postMessage.post(
    {
      data: isTransit || isBillPay ? (el as HTMLInputElement).value : null,
      id,
      type: "ui:iframe-field:get-cvv",
    },
    "parent",
  );
};
