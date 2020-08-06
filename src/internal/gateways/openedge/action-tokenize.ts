import getGateway from "../../lib/get-gateway";
import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";

export default async (url: string, data: IDictionary) => {
  const request: any = {};

  if (data["card-number"]) {
    request.card = request.card || {};
    request.card.card_number = data["card-number"].replace(/\s+/g, "");
  }

  if (data["card-cvv"]) {
    request.card = request.card || {};
    request.card.card_security_code = data["card-cvv"];
  }

  if (
    data["card-expiration"] &&
    data["card-expiration"].indexOf(" / ") !== -1
  ) {
    const exp = data["card-expiration"].split(" / ");
    request.card = request.card || {};
    request.card.expiry_month = exp[0] || "";
    request.card.expiry_year = exp[1].slice(-2) || "";
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
    // @ts-ignore
    let environment = getGateway().getEnv(options);
    environment = environment !== "local" ? environment : "dev";
    const headers = {
      "Content-Type": "application/json",
      "X-GP-Api-Key": options["X-GP-Api-Key"],
      "X-GP-Environment": `${environment}`,
      /* tslint:disable:no-bitwise */
      "X-GP-Request-Id": "PFC-" + "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (character) => {
        const random = Math.floor(Math.random() * 16);
        const value = character === "x" ? random : (random & 0x3 | 0x8);
        return value.toString(16);
      }),
      /* tslint:enable:no-bitwise */
      "X-GP-Version": "2019-08-22",
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
