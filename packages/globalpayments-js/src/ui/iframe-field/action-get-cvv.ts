import { options, postMessage } from "../../internal";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Gets the value of the `card-cvv` hosted field
 *
 * @param id ID of the hosted field
 * @param type Field type of the hosted field
 * @returns
 */
export default (id: string, type: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) {
    return;
  }

  // While we only expose a function for the `card-cvv`
  // hosted field, we validate the type once again for
  // safe measure.
  if (type !== "card-cvv") {
    return;
  }

  if (!(el as HTMLInputElement).value) {
    return;
  }

  // We also validate that the configured gateway is only
  // TransIT or Heartland Bill Pay.
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
