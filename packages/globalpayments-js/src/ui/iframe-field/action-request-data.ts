import { postMessage as pm } from "../../internal";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { IDictionary } from "../../internal/lib/util";

export default (id: string, type: string, data: IDictionary) => {
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

  pm.post(
    {
      data: {
        target: data.data.target,
        type,
        value,
      },
      id,
      type: "ui:iframe-field:pass-data",
    },
    "parent",
  );
};
