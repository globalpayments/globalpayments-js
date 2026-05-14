
import { Environments } from "../../../common/enums";
import { createHtmlDivElement } from "../../../common/html-element";
import { bus, options } from "../../../internal";
import { IError } from "../../../internal/gateways";
import getGateway from "../../../internal/lib/get-gateway";
import { IframeField, IUIFormField } from "../index";

export default function addKonek(iframeField: IframeField | undefined, field: IUIFormField): void {
  if (!iframeField) return;

  const gateway = getGateway();
  if (!gateway) {
    createInvalidConfigurationError("no gateway available");
    return;
  }

  const supportsKonek = gateway?.supports?.apm?.konek;
  if (!options.apms?.konek || supportsKonek === false) return;

  function emitError(errorDetails: { code: string; message: string }, konekClient: any): void {
    konekClient?.removeOverlay?.call(konekClient);
    konekClient?.closeKonekWindow?.call(konekClient);
    const error: IError = {
      error: true,
      reasons: [{
        code: errorDetails.code,
        message: errorDetails.message,
      }],
    };

    bus.emit("error", error);
  }

  const isProduction = options.env === Environments.Production;
  addKonekScript();

  function addKonekScript() {
    const sdkUrl = isProduction
      ? "https://sdk.konek.ca/konek-sdk/konek-sdk.esm.js"
      : "https://sdk.fit1.konek.dev/konek-sdk/konek-sdk.esm.js";
    const script = document.createElement("script");
    script.type = "module";
    script.onload = onKonekLoaded;
    script.src = sdkUrl;
    script.onerror = onKonekError;
    document.head.appendChild(script);
  }

  function onKonekLoaded() {
    addKonekButton();
  }

  function onKonekError() {
    const error = {code: "konekLoadError", message: "KONEK failed to load."};
    emitError(error, null);
  }

  function addKonekButton() {
    const konekWrapperDiv = createHtmlDivElement({
      id: "konek-wrapper",
      className: "konek-wrapper"
  })
  const konekButtonWrapperDiv = createHtmlDivElement({
    id: "konek-button-wrapper",
    className: "konek-button-wrapper"
  });
    konekButtonWrapperDiv.style.width = "100%";
    const konekElement = document.createElement("konek-button-v1") as HTMLElement & { client?: any };
    konekElement.style.display = "block";
    konekElement.style.width = "100%";
    konekElement.setAttribute("border-radius", "2");
    konekElement.setAttribute("button-border", "true");
    konekElement.setAttribute("show-cart", "true");
    konekElement.setAttribute("button-type", options.apms?.konek?.buttonColor || "black-yellow");
    konekElement.setAttribute("locales", options.apms?.konek?.buttonLocale || "en-CA");
    konekElement.addEventListener("click", () => {
      onKonekButtonClicked(konekElement);
    });
    konekElement.addEventListener("konekError", (event: any) => {
      const error = {
        code: event.detail,
        message: "KONEK encountered an error."
      };
      if(konekElement?.client){
         konekElement.client.setConsentError({
        error: event.detail?.error || 'konekErrorEvent',
        details: event.detail,
    });
      }
      emitError(error, konekElement.client);
    });
    konekElement.addEventListener("konekSuccess", async (event: any) => {
        // tslint:disable-next-line no-console
        console.log(event.detail);
    });
    konekElement.addEventListener("konekCancelled", (event:any) => {
      const error = {code:event.detail,
        message:"User cancelled KONEK session by actively clicking on 'Close and return to merchant' button."
      }

      emitError(error, konekElement.client);
    });
    konekElement.addEventListener("konekClosed", (event: any) => {
      const error = {
        code: event.detail,
        message: "KONEK window closed by user."
      };
      emitError(error, konekElement.client);
    });
    konekElement.addEventListener("popupBlocked", (event: any) => {
      const error = {
        code: event.detail,
        message: "KONEK popup blocked by browser."
      };
      emitError(error, konekElement.client);
    });
    konekButtonWrapperDiv.appendChild(konekElement);
    konekWrapperDiv.appendChild(konekButtonWrapperDiv);
    iframeField?.container?.appendChild(konekWrapperDiv);
  }

  async function onKonekButtonClicked(konekElement: HTMLElement & { client?: any }) {
    const konekClient: any = konekElement?.client;
    if (!konekClient || typeof konekClient.setConsentData !== "function") {
      const error = { code: "konekClientError", message: "Konek client is not initialized." };
      emitError(error, konekClient);
      return;
    }

    if (gateway?.actions.getInteracKonek) {
      try {
        const CONSENTS_URL = gateway?.urls?.getInteracKonekUrl ? gateway.urls.getInteracKonekUrl() : "";
        const response = await gateway.actions.getInteracKonek(CONSENTS_URL, options.env || "");
        if (!response?.payment_method?.digital_wallet || !response?.device || !response?.order) {
          emitError({ code: response.error_code || 'INVALID_REQUEST_DATA', message: response.detailed_error_description || "Invalid response from consents API." }, konekClient);
          konekClient.setConsentError("Invalid response from consents API.");
          return;
        }
        const consentId = response.payment_method.digital_wallet.reference;
        const correlationId = response.payment_method.digital_wallet.provider_reference;
        const deviceProfileSessionId = response.device.session_reference;
        const totalAmount = response.order.amount;
        const merchantName = response.dba;

        konekClient.setConsentData({
          consentId, correlationId, deviceProfileSessionId,
          totalAmount, merchantName
        });

      } catch (e: any) {
        const error = { code: e.code || "konekConsentError", message: e.message || "Error occurred while fetching Konek consents." };
        emitError(error, konekClient);
      }
    }
  }
  function createInvalidConfigurationError(message: string) {
    return {
      error: true,
      reasons: [
        { code: "INVALID_CONFIGURATION", message },
      ],
    };
  }
}