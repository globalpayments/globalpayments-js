import paymentFieldId from "../../../internal/lib/payment-field-id";
import generateGuid from "../../../lib/generate-guid";
import buildUrl from "../../lib/build-tokenization-url";
import { options } from "../../lib/options";
import { postMessage as pm } from "../../lib/post-message";
import { IDictionary } from "../../lib/util";

export default () => {
  // build request
  const orderId = btoa(generateGuid()).substring(0, 22);
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const mins = date.getUTCMinutes();
  const secs = date.getUTCSeconds();
  const timestamp =
    date.getUTCFullYear().toString() +
    (month < 10 ? "0" + month.toString() : month.toString()).toString() +
    (day < 10 ? "0" + day.toString() : day.toString()) +
    (hours < 10 ? "0" + hours.toString() : hours.toString()) +
    (mins < 10 ? "0" + mins.toString() : mins.toString()) +
    (secs < 10 ? "0" + secs.toString() : secs.toString());
  const href = window.location.protocol + "//" + window.location.host;

  const data = {
    ACCOUNT: options.account || "", // config
    AUTO_SETTLE_FLAG: "0",
    CARD_STORAGE_ENABLE: "1",
    CURRENCY: "EUR",
    HPP_LISTENER_URL: href, // auto
    HPP_POST_DIMENSIONS: href, // auto
    HPP_POST_RESPONSE: href, // auto
    HPP_VERSION: "2",
    MERCHANT_ID: options.merchantId || "", // config
    MERCHANT_RESPONSE_URL: href, // auto?
    ORDER_ID: orderId, // auto
    PAYER_EXIST: (options.customerExists === true && "1") || "0", // opt config
    TIMESTAMP: timestamp, // auto
    VALIDATE_CARD_ONLY: (options.validateOnly === false && "0") || "1", // opt config
  };

  if (options.customerExists) {
    (data as any).PAYER_REF = options.customerReference; // opt config
  }

  return getHashResult(data)
    .then((request: any) => {
      submitHppRequest(request);
      return getHppReadyState(orderId);
    })
    .then(() => orderId);
};

const createIframe = (orderId: string) => {
  const frame = document.createElement("iframe");
  frame.setAttribute("name", `global-payments-rxp-${orderId}`);
  frame.setAttribute("id", `global-payments-rxp-${orderId}`);
  frame.setAttribute("height", "0");
  frame.setAttribute("width", "0");
  frame.style.display = "none";
  frame.style.opacity = "0";
  return frame;
};

const getHashResult = (data: IDictionary) => {
  const field = document.getElementById(paymentFieldId);

  if (!field) {
    return Promise.reject({
      error: true,
      reasons: [{ code: "ERROR", message: "Missing field" }],
    });
  }

  pm.post(
    {
      data,
      id: field.getAttribute("data-id"),
      type: "gateway:globalpayments:hash",
    },
    "parent",
  );

  // keep `pm.receive` call in callback version to ensure we receive the
  // hash request
  return new Promise((resolve) => {
    pm.receive((d: any) => {
      if (d.type === "gateway:globalpayments:hash-result") {
        resolve(d.data);
      }
    });
  });
};

const submitHppRequest = (request: any) => {
  const iframe = createIframe(request.ORDER_ID);

  const form = document.createElement("form");

  form.method = "POST";
  form.action = buildUrl();

  for (const prop in request) {
    if (Object.prototype.hasOwnProperty.call(request, prop)) {
      const el = document.createElement("input");
      el.type = "hidden";
      el.name = prop;
      el.value = request[prop];
      form.appendChild(el);
    }
  }

  // add to dom + submit
  document.body.appendChild(iframe);

  if (!iframe.contentWindow) {
    throw new Error("Source iframe loaded incorrectly");
  }

  if (typeof iframe.contentWindow.document.body !== "undefined") {
    iframe.contentWindow.document.body.appendChild(form);
  } else {
    iframe.contentWindow.document.appendChild(form);
  }

  form.submit();
};

const getHppReadyState = (orderId: string) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject({
        error: true,
        reasons: [{ code: "TIMEOUT", message: "HPP setup timeout" }],
      });
    }, 30000);

    pm.receive((message) => {
      clearTimeout(timeout);
      const action = message.action || "";

      if (action === "hpp-listener-loaded") {
        if (message.payload) {
          resolve(orderId);
        } else {
          reject({
            error: true,
            reasons: [{ code: "ERROR", message: "HPP setup failure" }],
          });
        }
      }
    });
  });
};
