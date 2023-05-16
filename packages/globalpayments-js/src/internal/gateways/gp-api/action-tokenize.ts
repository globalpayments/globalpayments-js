import { generateGuid } from "globalpayments-lib";

import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";

export default async (url: string, env: string, data: IDictionary) => {
  const request: any = {
    reference: options.reference || generateGuid(),
    usage_mode: "SINGLE",
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

  if (options.enableCardFingerPrinting) {
    request.fingerprint_mode = "ALWAYS"
  }

  try {
    const headers = {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.accessToken || ""}`,
      "Content-Type": "application/json",
      "X-GP-Version": options.apiVersion || "2020-10-22",
      // "X-GP-Library": "javascript;version=1.9.13",
    };
    const resp = await fetch(url, {
      body: JSON.stringify(request),
      credentials: "omit",
      headers: typeof Headers !== "undefined" ? new Headers(headers) : headers,
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
