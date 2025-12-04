import { generateGuid } from "globalpayments-lib";
import { INSTALLMENTS_CONFIG_DEFAULT_CHANNEL, INSTALLMENTS_CONFIG_DEFAULT_ENTRY_MODE , INSTALLMENTS_CONFIG_DEFAULT_CVV_INDICATOR } from "../../lib/installments/contracts/constants";

import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";
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

function createRequestBody(data: IDictionary): InstallmentRequest {
  const { number: cardNumber, amount, cvv, expiryMonth, expiryYear } = data;

  const { channel, country, currency } = options.installments || {};

  const request: InstallmentRequest = {
    reference: options.reference || generateGuid(),
    merchant_id: options.merchantId,
    account_id: options.installments?.accountID,
    account_name: options.installments?.accountName,
    channel: channel ? channel : INSTALLMENTS_CONFIG_DEFAULT_CHANNEL,
    amount,
    currency,
    country,
    payment_method: {
        entry_mode: INSTALLMENTS_CONFIG_DEFAULT_ENTRY_MODE,
        card: {
          number: cardNumber.replace(/\s/g, ""),
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          cvv_indicator: INSTALLMENTS_CONFIG_DEFAULT_CVV_INDICATOR,
          cvv,
        },
      },
  };

  return request;
}

type InstallmentRequest = {
  merchant_id?: string;
  account_id?: string;
  account_name?: string;
  channel: string;
  amount: number;
  currency?: string;
  country?: string;
  reference: string;
  payment_method: {
    entry_mode: string;
    card: {
      number: string;
      expiry_month: string;
      expiry_year: string;
      cvv: string;
      cvv_indicator: string;
    };
  };
}