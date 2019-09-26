import { IDictionary } from "../../lib/util";

export default async (url: string, data: IDictionary) => {
  const request: any = {
    object: "token",
    token_type: "supt",
  };

  if (data["card-number"]) {
    request.card = request.card || {};
    request.card.number = data["card-number"].replace(/\s/g, "");
  }

  if (data["card-cvv"]) {
    request.card = request.card || {};
    request.card.cvc = data["card-cvv"];
  }

  if (
    data["card-expiration"] &&
    data["card-expiration"].indexOf(" / ") !== -1
  ) {
    const exp = data["card-expiration"].split(" / ");
    request.card = request.card || {};
    request.card.exp_month = exp[0] || "";
    request.card.exp_year = exp[1] || "";
  }

  // TODO: Properly accept encrypted track data
  if (data["card-track"]) {
    request.card = request.card || {};
    request.card.track_method = "swipe";
    request.card.track = data["card-track"];
  }

  if (data["account-number"]) {
    request.ach = request.ach || {};
    request.ach.account_number = data["account-number"];
  }

  if (data["routing-number"]) {
    request.ach = request.ach || {};
    request.ach.routing_number = data["routing-number"];
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
