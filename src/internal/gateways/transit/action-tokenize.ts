import { options } from "../../lib/options";
import { IDictionary } from "../../lib/util";

export default (url: string, data: IDictionary) => {
  const getRequest = () => {
    const request: any = {
      cvv2: data["card-cvv"],
      deviceID: (window as any).getDeviceId(),
      manifest: (window as any).getManifest(),
      uniqueKeyIdentifier: (window as any).getKeyId(),
    };

    if (data["card-number"]) {
      request.encCardNumber = (window as any).encryptTsepCard(data["card-number"].replace(/\s/g, ""));
    }

    if (
      data["card-expiration"] &&
      data["card-expiration"].indexOf(" / ") !== -1
    ) {
      request.expirationDate = data["card-expiration"].replace(" / ", "/");
    }

    return request;
  };

  return new Promise((resolve, reject) => {
    const scriptId = "tsep-entry-script";
    const cardId = "tsep-cardNumDiv";

    const timeout = setTimeout(() => {
      reject({
        error: true,
        reasons: [{ code: "TIMEOUT", message: "TransIT setup timeout" }],
      });
    }, 30000);

    const cleanup = () => {
      clearTimeout(timeout);

      [cardId, scriptId].forEach((id) => {
        const el = document.getElementById(id);
        if (!el || !el.parentNode) {
          return;
        }
        el.parentNode.removeChild(el);
      });
    };

    try {
      // handle tsep response
      (window as any).tsepHandler = (eventType: string, eventData: any) => {
        // tsep's input fields aren't being used, so this should
        // be the only event to capture in order to handle load errors
        if (eventType === "ErrorEvent") {
          cleanup();
          reject({ error: true, reasons: [{
            code: "ERROR",
            message: `${eventData.responseCode}: ${eventData.message}`,
          }]});
        }
      };

      // add holder for tsep card number input
      const card = document.createElement("div");
      card.hidden = true;
      card.style.display = "none";
      card.id = cardId;
      document.body.appendChild(card);

      // add new script on page
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = url;
      script.defer = true;
      script.onload = (e) => {
        if (!window.onload) {
          return;
        }
        window.onload(e);
      };
      document.body.appendChild(script);

      // tsep doesn't expose a way to hook into the library's load event,
      // so we create an interval to check manually
      const interval = setInterval(() => {
        const cardEl = document.getElementById(cardId.substr(0, cardId.length - 3)) as HTMLInputElement;

        // presence of the card element ensures tsep.js is loaded
        // presence of `cryptTsep` ensures jsencrypt.js is loaded
        if (!cardEl || !(window as any).cryptTsep) {
          return;
        }

        // tsep has loaded, so continue on after stopping the interval
        clearInterval(interval);

        const headers = {
          "Content-Type": "application/json",
        };
        fetch(`${options.tsepHost}/transit-tsep-web/generateTsepToken`, {
          body: JSON.stringify(getRequest()),
          credentials: "omit",
          headers: typeof Headers !== "undefined" ? new Headers(headers) : headers,
          method: "POST",
        })
          .then((resp) => {
            cleanup();
            resolve(resp.json());
          })
          .catch((e) => {
            cleanup();
            reject(e);
          });
      }, 100);
    } catch (e) {
      return reject({
        error: true,
        reasons: [{ code: e.name, message: e.message }],
      });
    }
  });
};
