import { postMessage } from "../../internal";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { IDictionary } from "../../internal/lib/util";
import tokenize from "../../internal/requests/tokenize";

export default (id: string, type: string, data: IDictionary) => {
  if (type !== "card-number" && type !== "account-number") {
    return;
  }

  const w = window as any;

  w.dataContents = w.dataContents || {};
  w.dataContents[data.data.type] = data.data.value;

  if (!w.dataReceivedFields) {
    w.dataReceivedFields = ["submit"];
  }

  (w.dataReceivedFields as string[]).push(data.data.type);

  if (
    JSON.stringify(w.dataFields.sort()) ===
    JSON.stringify(w.dataReceivedFields.sort())
  ) {
    const field = document.getElementById(paymentFieldId) as HTMLInputElement;
    const value = field && field.value ? field.value : "";

    tokenize({
      "account-number": window.name === "account-number" && value,
      "card-cvv":
        w.dataContents["card-cvv"] !== undefined && w.dataContents["card-cvv"],
      "card-expiration":
        w.dataContents["card-expiration"] !== undefined &&
        w.dataContents["card-expiration"],
      "card-holder-name":
        w.dataContents["card-holder-name"] !== undefined &&
        w.dataContents["card-holder-name"],
      "card-number": window.name === "card-number" && value,
      "routing-number":
        w.dataContents["routing-number"] !== undefined &&
        w.dataContents["routing-number"],
    })
      .then((response) => {
        w.dataContents = undefined;
        w.dataReceivedFields = undefined;

        postMessage.post(
          {
            data: response,
            id,
            type: "ui:iframe-field:token-success",
          },
          "parent",
        );
      })
      .catch((response) => {
        w.dataContents = undefined;
        w.dataReceivedFields = undefined;

        postMessage.post(
          {
            data: response,
            id,
            type: "ui:iframe-field:token-error",
          },
          "parent",
        );
      });
  }
};
