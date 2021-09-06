import { postMessage } from "../../internal";
import { typeByNumber } from "../../internal/lib/card-types";
import { IDictionary } from "../../internal/lib/util";
import tokenize from "../../internal/requests/tokenize";

/**
 * Initiates a payment card via the PaymentRequest API
 * to leverage card data stored in a cardholder's
 * browser, tokenizing it via the configured gateway
 * implementation. This is triggered in the parent
 * window, but the PaymentRequest functionality and
 * data only exists within the hosted field.
 *
 * @param id ID of the hosted field
 * @param data PaymentRequest details
 */
export default async (id: string, data: IDictionary) => {
  let response;
  try {
    const request = new PaymentRequest(
      data.data.instruments,
      data.data.details,
      data.data.options,
    );

    response = await request.show();
    // Store the original response on the hosted field's
    // window for later completion
    (window as any).globalPaymentResponse = response;
  } catch (e) {
    // Catch errors thrown when attempting to show the payment card
    // e.g. when PaymentRequest API isn't supported
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

  // Once PaymentRequest has been confirmed by the card holder,
  // we receive the card data and other requested information and
  // perform the tokenization
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

    // PaymentRequest API responses aren't direcrlt compatible with
    // `JSON.stringify`, so we use the `toJSON` method it exposes.
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
