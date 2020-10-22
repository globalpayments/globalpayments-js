import { IDictionary } from "../../lib/util";

export default async (url: string, env: string, data: IDictionary) => {
  const request: any = {
    merchantApiKey: data.webApiKey,
  };

  if (data["card-number"]) {
    request.cardnumber = data["card-number"].replace(/\s/g, "");
  }

  if (data["card-cvv"]) {
    request.cvv = data["card-cvv"];
  }

  if (
    data["card-expiration"] &&
    data["card-expiration"].indexOf(" / ") !== -1
  ) {
    const exp = data["card-expiration"].split(" / ");
    request.expirationmonth = exp[0] || "";
    request.expirationyear = (exp[1] || "").substr(2, 2);
  }

  if (data["card-holder-name"]) {
    request.cardholder = data["card-holder-name"];
  }

  try {
    const headers = {
      "Content-Type": "application/json",
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
