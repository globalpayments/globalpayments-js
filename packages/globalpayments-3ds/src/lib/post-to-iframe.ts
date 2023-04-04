import { dimensionsFromChallengeWindowSize } from "../enums";
import {
  IChallengeWindowOptions,
  IIframeData,
  IMessageEventData,
} from "../interfaces";
import { createLightbox, randomId } from "./lightbox";

export function postToIframe(
  endpoint: string,
  fields: any,
  options: IChallengeWindowOptions,
): Promise<IMessageEventData> {
  return new Promise((resolve, reject) => {
    let timeout: any;
    if (options.timeout) {
      timeout = setTimeout(() => {
        ensureIframeClosed(timeout);
        reject(new Error("timeout reached"));
      }, options.timeout);
    }

    const iframe = document.createElement("iframe");
    iframe.id = iframe.name = `GlobalPayments-3DSecure-${randomId}`;
    iframe.style.display = options.hide ? "none" : "inherit";

    const form = createForm(endpoint, iframe.id, fields);

    switch (options.displayMode) {
      case "redirect":
        // TODO: Add redirect support once sandbox environment respects configured
        // challengeNotificationUrl instead of hardcoded value
        ensureIframeClosed(timeout);
        reject(new Error("Not implemented"));
        return;
      case "lightbox":
        createLightbox(iframe, options);
        break;
      case "embedded":
      default:
        if (!handleEmbeddedIframe(reject, { iframe, timeout }, options)) {
          // rejected
          return;
        }
        break;
    }

    window.addEventListener(
      "message",
      getWindowMessageEventHandler(resolve, {
        origin: options.origin,
        timeout,
      }),
    );

    document.body.appendChild(form);
    form.submit();
  });
}

function createForm(action: string, target: string, fields: any) {
  const form = document.createElement("form");

  form.setAttribute("method", "POST");
  form.setAttribute("action", action);
  form.setAttribute("target", target);

  for (const field of fields) {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", field.name);
    input.setAttribute("value", field.value);
    form.appendChild(input);
  }

  return form;
}

function ensureIframeClosed(timeout: number) {
  if (timeout) {
    clearTimeout(timeout);
  }

  try {
    Array.prototype.slice
      .call(
        document.querySelectorAll(
          `[target$="-${randomId}"],[id$="-${randomId}"]`,
        ),
      )
      .forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
  } catch (e) {
    /** */
  }
}

function getWindowMessageEventHandler(
  resolve: (data: IMessageEventData | PromiseLike<IMessageEventData>) => void,
  data: IIframeData,
) {
  return (e: MessageEvent) => {
    const origin = data.origin || window.location.origin;
    let notificationEvent: boolean = false;

    if (e.data && e.data.event) {
      notificationEvent = (e.data.event === "methodNotification" || e.data.event === "challengeNotification");
    }

    if (origin !== e.origin || !notificationEvent) {
      return;
    }

    ensureIframeClosed(data.timeout || 0);
    resolve(e.data);
  };
}

function handleEmbeddedIframe(
  reject: (reason: any) => void,
  data: IIframeData,
  options: IChallengeWindowOptions,
) {
  let targetElement: Element | null | undefined;

  if (options.hide) {
    targetElement = document.body;
  } else if (typeof options.target === "string") {
    targetElement = document.querySelector(options.target);
  } else {
    targetElement = options.target;
  }

  if (!targetElement) {
    ensureIframeClosed(data.timeout || 0);
    reject(new Error("Embed target not found"));
    return false;
  }

  const { height, width } = dimensionsFromChallengeWindowSize(options);

  if (data.iframe) {
    data.iframe.setAttribute("height", height ? `${height}px` : "100%");
    data.iframe.setAttribute("width", width ? `${width}px` : "100%");
    targetElement.appendChild(data.iframe);
  }

  return true;
}
