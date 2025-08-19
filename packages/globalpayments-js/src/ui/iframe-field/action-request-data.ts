import { postMessage as pm } from "../../internal";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { IDictionary } from "../../internal/lib/util";

/**
 * Causes the hosted field to send its data to the `card-number`
 * field for tokenization when triggered by the
 * `ui:iframe-field:request-data` event.
 *
 * @param id ID of the hosted field
 * @param type Field type of the hosted field
 * @param data Information about the recipient hosted field
 */
export default (id: string, type: string, data: IDictionary) => {
  // track list of fields for which we have received data
  if (!(window as any).dataReceivedFields) {
    (window as any).dataReceivedFields = ["submit"];
  }

  const field = document.getElementById(paymentFieldId) as HTMLInputElement;
  let value = field && field.value ? field.value : "";

  if (type === "card-number" || type === "account-number") {
    // ignore to prevent these fields from leaking their data
    // but store expected list of fields
    (window as any).dataFields = data.data.fields;
    value = "";
  }

  const installment = data.data.installment;
  const currencyConversion = data.data.currencyConversion;

    pm.post(
      {
        data: {
          target: data.data.target,
          type,
          value,
          ...(installment ? { installment } : {}),
          ...(currencyConversion ? { currencyConversion } : {})
        },
        id,
        type: "ui:iframe-field:pass-data",
      },
      "parent",
    );
};
