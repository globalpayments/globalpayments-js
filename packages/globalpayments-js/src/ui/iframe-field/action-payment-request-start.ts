import { postMessage } from "../../internal";
import { typeByNumber } from "../../internal/lib/card-types";
import { IDictionary } from "../../internal/lib/util";
import tokenize from "../../internal/requests/tokenize";

export default async (id: string, data: IDictionary) => {
  let response;
  try {
    const request = new PaymentRequest(
      data.data.instruments,
      data.data.details,
      data.data.options,
    );

    response = await request.show();
    (window as any).globalPaymentResponse = response;
  } catch (e) {
    let code = "ERROR";
    if (e.name !== "Error") {
      code = e.name.replace("Error", "_Error").toUpperCase();
    }
    postMessage.post(
      {
        data: {
          code,
          message: e.message,
        },
        id,
        type: "ui:iframe-field:token-error",
      },
      "parent",
    );
    return;
  }

  try {
    const token = await tokenize({
      "card-cvv": response.details.cardSecurityCode || "",
      "card-expiration":
        (response.details.expiryMonth || "") +
        " / " +
        (response.details.expiryYear || ""),
      "card-holder-name": response.details.cardholderName || "",
      "card-number": response.details.cardNumber || "",
    });

    const d = response.toJSON();

    const cardNumber = response.details.cardNumber.replace(/\D/g, "");
    const bin = cardNumber.substr(0, 6);
    const last4 = cardNumber.substr(-4);
    const type = typeByNumber(cardNumber);

    d.details = d.details || {};
    d.details.cardNumber = bin + "*".repeat(cardNumber.length - 10) + last4;
    d.details.cardBin = bin;
    d.details.cardLast4 = last4;
    d.details.cardType = type ? type.code : "unknown";
    d.details.cardSecurityCode = !!response.details.cardSecurityCode;

    (token as any).details = d.details;
    (token as any).methodName = d.methodName;
    (token as any).payerEmail = d.payerEmail;
    (token as any).payerName = d.payerName;
    (token as any).payerPhone = d.payerPhone;
    (token as any).requestId = d.requestId;
    (token as any).shippingAddress = d.shippingAddress;
    (token as any).shippingOption = d.shippingOption;

    postMessage.post(
      {
        data: token,
        id,
        type: "ui:iframe-field:token-success",
      },
      "parent",
    );
  } catch (e) {
    response.complete("fail");
    postMessage.post(
      {
        data: e,
        id,
        type: "ui:iframe-field:token-error",
      },
      "parent",
    );
  }
};
