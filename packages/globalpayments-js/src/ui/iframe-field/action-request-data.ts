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
  const w = window as any;

  // track list of fields for which we have received data
  if (!w.dataReceivedFields) {
    w.dataReceivedFields = [];
  }

  const field = document.getElementById(paymentFieldId) as HTMLInputElement;
  let value = field && field.value ? field.value : "";

  if (type === "card-number" || type === "account-number") {
    // ignore to prevent these fields from leaking their data
    // but store expected list of fields
    w.dataFields = data.data.fields;

    // submit buttons do not send pass-data events, so pre-seed expected
    // virtual fields that are present in the dataFields list.
    const virtualSubmitFields = ["submit", "submit-dcc"].filter((fieldType) =>
      (w.dataFields as string[]).includes(fieldType),
    );
    w.dataReceivedFields = [...virtualSubmitFields];
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
