import { postMessage as pm } from "../../lib/post-message";
import { IDictionary } from "../../lib/util";

import actionOnload from "./action-onload";

export default async (url: string, data: IDictionary) => {
  let orderId: string;
  try {
    orderId = await actionOnload(url);
  } catch (e) {
    return Promise.reject(e);
  }

  const iframe = document.getElementById(
    `global-payments-rxp-${orderId}`,
  ) as HTMLIFrameElement;

  if (!iframe) {
    return Promise.reject("Source iframe missing");
  }

  const win = iframe.contentWindow;

  if (!win) {
    return Promise.reject("Source iframe loaded incorrectly");
  }

  let month = "";
  let year = "";
  if (
    data["card-expiration"] &&
    data["card-expiration"].indexOf(" / ") !== -1
  ) {
    const exp = data["card-expiration"].split(" / ");
    month = exp[0] || "";
    year = (exp[1] || "").substr(2, 2);
  }

  const request = {
    action: "populate-form-fields", // string
    payload: {
      pas_cccvc: data["card-cvv"],
      pas_ccmonth: month,
      pas_ccname: data["card-holder-name"],
      pas_ccnum: data["card-number"].replace(" ", ""),
      pas_ccyear: year,
    },
  };

  // todo: fix postMessage origin
  win.postMessage(JSON.stringify(request), "*");

  // keep `pm.receive` call in callback version to ensure we receive the
  // hash request
  return new Promise((resolve) => {
    pm.receive((payload: any) => {
      if (
        typeof payload.action !== "undefined" ||
        (typeof payload.SHA1HASH !== "undefined" &&
          payload.ORDER_ID === btoa(orderId))
      ) {
        resolve(payload);
      }
    });
  });
};
