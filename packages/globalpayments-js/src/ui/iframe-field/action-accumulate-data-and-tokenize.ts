import { options, postMessage } from "../../internal";
import getExpressPayBaseUrl from "../../internal/gateways/gp-api/get-express-pay-base-url";
import { addIfValue, getExpressPayQueryParams } from "../../internal/lib/bank-selection/helpers";
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
  const currencyConversion = data.data.currencyConversion;

  // proceed with tokenization once we have all expected field data
  if (
    JSON.stringify(w.dataFields.sort()) ===
    JSON.stringify(w.dataReceivedFields.sort())
  ) {
    const field = document.getElementById(paymentFieldId) as HTMLInputElement;
    const value = field && field.value ? field.value : "";

    const shippingSameAsBilling: any = data.data.isShippingSameAsBilling;

    const expressPayOptions: any = data.data.expressPayOptions;

    const hasShippingFieldsFilled =
      w.dataContents["shipping-address"] ||
      w.dataContents["shipping-apt"] ||
      w.dataContents["shipping-city"] ||
      w.dataContents["shipping-state"] ||
      w.dataContents["shipping-postal-code"] ||
      w.dataContents["shipping-name"] ||
      w.dataContents["shipping-address-country"];

    const details: any = {
      phoneCountryCode: w.dataContents["country-code"],
      billingCountry: w.dataContents.country
    }

    addIfValue(details, "email", w.dataContents["email-id"]);
    addIfValue(details, "phoneNumber", w.dataContents["phone-number"]);
    addIfValue(details, "billingAddress", `${w.dataContents["billing-address"] ? w.dataContents["billing-address"] + ', ' : ''}${w.dataContents["billing-apt"] ? w.dataContents["billing-apt"] + ', ' : ''}${w.dataContents["billing-city"] ? w.dataContents["billing-city"] + ', ' : ''}${w.dataContents["billing-state"] ? w.dataContents["billing-state"] : ''}${w.dataContents["billing-postal-code"] ? ("," +w.dataContents["billing-postal-code"]) : ''}`);

    if (
      expressPayOptions.isShippingRequired !== false ||
      (expressPayOptions.isShippingRequired === false && hasShippingFieldsFilled)
    ) {
      // Only check shippingSameAsBilling if shipping is required
      if (expressPayOptions.isShippingRequired !== false) {
        addIfValue(details, "shippingAddress",
          !shippingSameAsBilling ? `${w.dataContents["shipping-address"] ? w.dataContents["shipping-address"] + ', ' : ''}${w.dataContents["shipping-apt"] ? w.dataContents["shipping-apt"] + ', ' : ''}${w.dataContents["shipping-city"] ? w.dataContents["shipping-city"] + ', ' : ''}${w.dataContents["shipping-state"] ? w.dataContents["shipping-state"] : ''}${w.dataContents["shipping-postal-code"] ? ("," +w.dataContents["shipping-postal-code"]) : ''}`
          : details.billingAddress
        );
        addIfValue(details, "shippingAddressName",
          !shippingSameAsBilling
            ? w.dataContents["shipping-name"]
            : w.dataContents["card-holder-name"]
        );
        addIfValue(details, "shippingCountry",
          !shippingSameAsBilling
            ? w.dataContents["shipping-address-country"]
            : details.billingCountry
        );
      } else {
        // shippingRequired === false but user filled shipping fields
        addIfValue(details, "shippingAddress",
          `${w.dataContents["shipping-address"] ? w.dataContents["shipping-address"] + ', ' : ''}${w.dataContents["shipping-apt"] ? w.dataContents["shipping-apt"] + ', ' : ''}${w.dataContents["shipping-city"] ? w.dataContents["shipping-city"] + ', ' : ''}${w.dataContents["shipping-state"] ? w.dataContents["shipping-state"]: ''}${w.dataContents["shipping-postal-code"] ? ("," +w.dataContents["shipping-postal-code"]) : ''}`
        );
        addIfValue(details, "shippingAddressName", w.dataContents["shipping-name"]);
        addIfValue(details, "shippingCountry", w.dataContents["shipping-address-country"]);
      }
    }

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
        w.dataContents["routing-number"]
    })
      .then((response: any) => {
        w.dataContents = undefined;
        w.dataReceivedFields = undefined;

        details.nameOnCard = response.details.cardholderName;
        details.paymentToken = response.paymentReference;
        details.maskedCardNumber = response.details.masked_number_last4;
        details.expiryMonth = response.details.expiryMonth;
        details.expiryYear = response.details.expiryYear;
        details.cardBrand = response.details.cardType;

        details.paramName = "details";

        details.merchantId = response.details.merchantId;

        const query = getExpressPayQueryParams(expressPayOptions,details);

        const redirectUrl = getExpressPayBaseUrl('') + query;

        postMessage.post({
          data: {
            redirectUrl,
            expressPayEnabled: options.expressPay?.enabled,
            details: {
              ...(response.details),
              ...(installment ? { installment } : {}),
              ...(currencyConversion ? { currencyConversion } : {}),
            },
            ...response
          },
          id,
          type: "ui:iframe-field:token-success",
        },
          "parent",
        );

        // Clean up the localStorage once the Tokenization done successfully
        localStorage.clear();
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
