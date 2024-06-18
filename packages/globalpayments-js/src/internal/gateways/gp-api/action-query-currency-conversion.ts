import { generateGuid } from "globalpayments-lib";
import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";
import {
  DCC_CONFIG_DEFAULT_CHANNEL,
  DCC_CONFIG_DEFAULT_ENTRY_MODE,
  DCC_CONFIG_DEFAULT_TRANSACTION_TYPE
} from "../../lib/currency-conversion/contracts/constants";
import { setGpApiHeaders } from "../../lib/set-headers";

export default async (url: string, _env: string, data: IDictionary) => {
  const headers = setGpApiHeaders();
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

function createRequestBody(data: IDictionary) {
  const { number: cardNumber, amount, expiryMonth, expiryYear } = data;

  const { accountName, channel, country, currency, transactionType } = options.currencyConversion || {};
  const request: any = {
    reference: options.reference || generateGuid(),
    "account_name": accountName,
    channel: channel ? channel : DCC_CONFIG_DEFAULT_CHANNEL,
    "transaction_type": transactionType? transactionType : DCC_CONFIG_DEFAULT_TRANSACTION_TYPE,
    amount,
    currency,
    country,
  };


  if (cardNumber) {
    request[`payment_method`] = request[`payment_method`] || {};
    const paymentMethod = request[`payment_method`];

    paymentMethod[`entry_mode`] = DCC_CONFIG_DEFAULT_ENTRY_MODE;
    paymentMethod.card = paymentMethod.card || {};
    paymentMethod.card.number = cardNumber.replace(/\s/g, "");
    paymentMethod.card[`expiry_month`] = expiryMonth;
    paymentMethod.card[`expiry_year`] = expiryYear;
  }

  return request;
}