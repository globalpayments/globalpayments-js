import { generateGuid } from "globalpayments-lib";

import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";
import { setGpApiHeaders } from "../../lib/set-headers";

export default async (url: string, env: string, data: IDictionary) => {
  const request: any = {
    reference: options.reference || generateGuid(),
    usage_mode: options.useNetworkToken ? "USE_NETWORK_TOKEN" : "SINGLE",
  };

  if (options.accountName) {
    request.account_name = options.accountName;
  }

  if (data["card-number"]) {
    request.card = request.card || {};
    request.card.number = data["card-number"].replace(/\s/g, "");
  }

  if (data["card-cvv"]) {
    request.card = request.card || {};
    request.card.cvv = data["card-cvv"];
  }

  if (
    data["card-expiration"] &&
    data["card-expiration"].indexOf(" / ") !== -1
  ) {
    const exp = data["card-expiration"].split(" / ");
    request.card = request.card || {};
    request.card.expiry_month = exp[0] || "";
    request.card.expiry_year = (exp[1] || "").length === 2 ? (exp[1] || "") : (exp[1] || "").substr(2, 2);
  }

  if (data["card-holder-name"]) {
    request.name = data["card-holder-name"];
  }

  if(data["country-code"]) {
    request.countryCode = data["country-code"]
  }

  if (data["email-id"]) {
    request.email = data["email-id"];
  }

  if (data["phone-number"]) {
    request.phoneNumber = data["phone-number"];
  }

  if (data["billing-address"]) {
    request.billingAddress = request.billingAddress || {};
    request.billingAddress.country = data.country;
  }

  if (data["shipping-address"]) {
    request.shippingAddress = request.shippingAddress || {};
    request.shippingAddress.country = data.country;
  }

  if (options.enableCardFingerPrinting) {
    request.fingerprint_mode = "ALWAYS"
  }

  try {
    const headers = setGpApiHeaders();
    const resp = await fetch(url, {
      body: JSON.stringify(request),
      credentials: "omit",
      headers,
      method: "POST",
    });
    return resp.json();
  } catch (e) {
    return {
      error: true,
      reasons: [{ code: e.name, message: e.message }],
    };
  }
};
