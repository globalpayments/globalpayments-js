import { generateGuid } from "globalpayments-lib";
import { INSTALLMENTS_CONFIG_DEFAULT_CHANNEL, INSTALLMENTS_CONFIG_DEFAULT_ENTRY_MODE } from "../../lib/installments/contracts/constants";

import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";

export default async (url: string, _env: string, data: IDictionary) => {
  const headers = createHeaders();
  const requestBody = createRequestBody(data);

  try {
    const resp = await fetch(url, {
      body: JSON.stringify(requestBody),
      credentials: "omit",
      headers,
      method: "POST",
    });

    return resp.json();
  } catch (e: any) {
    return {
      error: true,
      reasons: [{ code: e.name, message: e.message }],
    };
  }
};

function createHeaders() {
  const headers = {
    "Accept": "application/json",
    "Authorization": `Bearer ${options.accessToken || ""}`,
    "Content-Type": "application/json",
    "X-GP-Version": options.apiVersion || "2020-10-22",
  };
  return typeof Headers !== "undefined" ? new Headers(headers) : headers;
}

function createRequestBody(data: IDictionary) {
  const { number: cardNumber, amount, brand, expiryMonth, expiryYear } = data;

  const { channel, country, mcc, currency } = options.installments || {};
  let request: any = {
    reference: options.reference || generateGuid(),
    "account_id": options.account,
    channel: channel ? channel : INSTALLMENTS_CONFIG_DEFAULT_CHANNEL,
    amount,
    currency,
    country,
  };

  if (mcc) {
    request = {
      mcc,
      ...request,
    };
  }

  if (cardNumber) {
    request[`payment_method`] = request[`payment_method`] || {};
    const paymentMethod = request[`payment_method`];

    paymentMethod[`entry_mode`] = INSTALLMENTS_CONFIG_DEFAULT_ENTRY_MODE;
    paymentMethod.card = paymentMethod.card || {};
    paymentMethod.card.number = cardNumber.replace(/\s/g, "");
    paymentMethod.card.brand = brand;
    paymentMethod.card[`expiry_month`] = expiryMonth;
    paymentMethod.card[`expiry_year`] = expiryYear;
  }

  return request;
}