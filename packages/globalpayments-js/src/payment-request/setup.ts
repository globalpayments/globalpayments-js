import { EventEmitter, IEventListener } from "globalpayments-lib";

import { bus } from "../internal";
import assetBaseUrl from "../internal/lib/asset-base-url";
import Events from "../internal/lib/events";
import { postMessage } from "../internal/lib/post-message";
import { IframeField } from "../ui/iframe-field";
import {
  defaultDetails as defaultPaymentRequestDetails,
  defaultInstruments as defaultPaymentRequestInstruments,
  defaultOptions as defaultPaymentRequestOptions,
} from "./defaults";

const iframeHolderId = "global-pay-payment-request";

export class PaymentRequestEmitter extends EventEmitter {
  private iframe: IframeField;

  constructor(iframe: IframeField) {
    super();
    this.iframe = iframe;
  }

  public on(event: string, listener: IEventListener) {
    this.iframe.on(event, listener);
  }
}

export default function(
  selector: string,
  details?: PaymentDetailsInit,
  instruments?: PaymentMethodData[],
  options?: PaymentOptions,
  startOnLoad = false,
) {
  const target = document.querySelector(selector);

  if (!target) {
    return bus.emit("error", {
      error: true,
      reasons: [
        { code: "INVALID_CONFIGURATION", message: "Invalid target element" },
      ],
    });
  }

  if (typeof PaymentRequest === "undefined") {
    return bus.emit("error", {
      error: true,
      reasons: [{ code: "ERROR", message: "PaymentRequest API not available" }],
    });
  }

  const holder = document.createElement("div");
  holder.id = iframeHolderId;
  holder.style.display = "none";
  const parent = target.parentElement;

  if (!parent) {
    return bus.emit("error", {
      error: true,
      reasons: [
        {
          code: "INVALID_CONFIGURATION",
          message: "Target element has no parent",
        },
      ],
    });
  }

  parent.appendChild(holder);

  // remove the inline display style to reveal
  delete (target as HTMLElement).style.display;

  const iframe = new IframeField(
    "payment-request",
    {target: "#" + holder.id},
    assetBaseUrl() + "field.html",
  );

  instruments = instruments || defaultPaymentRequestInstruments();
  details = details || defaultPaymentRequestDetails();
  options = options || defaultPaymentRequestOptions();

  const result = new PaymentRequestEmitter(iframe);

  const start = () =>
    postMessage.post(
      {
        data: {
          details,
          instruments,
          options,
        },
        id: iframe.id,
        type: "ui:iframe-field:payment-request-start",
      },
      iframe.id,
    );

  if (startOnLoad) {
    result.on("register", () => {
      start();
    });
  } else {
    Events.addHandler(target, "click", (e: Event) => {
      e.preventDefault();
      start();
      return false;
    });
  }

  iframe.on("token-success", (data?: object) => {
    if (startOnLoad) {
      reset(holder);
    }
    result.emit("token-success", data);
  });
  iframe.on("token-error", (data?: object) => {
    if (startOnLoad) {
      reset(holder);
    }
    result.emit("token-error", data);
  });
  iframe.on("payment-request-closed", () => {
    if (startOnLoad) {
      reset(holder);
    }
    result.emit("error", {
      error: true,
      reasons: [{ code: "PAYMENT_UI_CLOSED", message: "Payment UI closed" }],
    });
  });
  iframe.on("error", (e?: object) => {
    if (startOnLoad) {
      reset(holder);
    }
    result.emit("error", {
      error: true,
      reasons: [e],
    });
  });

  return result;
}

const reset = (el: HTMLDivElement) => {
  if (el.remove) {
    el.remove();
  } else if (el.parentNode && el.parentNode.removeChild) {
    el.parentNode.removeChild(el);
  }
};
