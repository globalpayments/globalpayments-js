import { postMessage } from "../../internal";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { IDictionary } from "../../internal/lib/util";
import tokenize from "../../internal/requests/tokenize";

/**
 * Once data is accumulated from the other hosted fields,
 * the `card-number` / `account-number` hosted field initiates
 * the tokenization request with the configured gateway.
 *
 */
export default (id: string, type: string, data: IDictionary) => {
  // only `card-number` and `account-number` should perform
  // these tokenization requests
  if (type !== "card-number" && type !== "account-number") {
    return;
  }

  const w = window as any;

  // maintain field data until all data is obtained
  w.dataContents = w.dataContents || {};
  w.dataContents[data.data.type] = data.data.value;

  if (!w.dataReceivedFields) {
    w.dataReceivedFields = ["submit"];
  }

  (w.dataReceivedFields as string[]).push(data.data.type);

  const installment = data.data.installment;

  // proceed with tokenization once we have all expected field data
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
      .then((response: any) => {
        w.dataContents = undefined;
        w.dataReceivedFields = undefined;

        postMessage.post({
            data: {
              ...response,
              details: {
                ...(response.details),
                ...(installment ? {installment} : {}),
              },
            },
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
