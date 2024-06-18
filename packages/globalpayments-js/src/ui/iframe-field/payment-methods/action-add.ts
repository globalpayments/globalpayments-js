import { IframeField } from "../index";
import handleRedirectAction from "../../../apm/non-card-payments/components/redirect-action-handler";
import { ApmInternalEvents } from "../../../apm/enums";
import {
  changeCreditCardFormFieldsVisibility,
  createHtmlButtonElement,
  createHtmlDivElement
} from "../../../common/html-element";
import { bus, options } from "../../../internal";
import {
  Apm,
  ApmEvents,
  ApmProviders,
} from "../../../internal/lib/enums";
import { isApmProviderConfigured, isUrlValid } from "../../../apm/non-card-payments/components/common";
import {getCurrentLanguage, getTranslationLanguageSet} from "../../../internal/lib/detectLanguage";

export default function addPaymentMethod(iframeField: IframeField | undefined, apmProvider: ApmProviders, apm: Apm): void {
  if (!iframeField) return;

  const apmAllowedPaymentMethods = options.apms?.nonCardPayments?.allowedPaymentMethods;
  if (!apmAllowedPaymentMethods || !isApmProviderConfigured(apmAllowedPaymentMethods, apmProvider)) return;

  displayPaymentMethods(iframeField, apmProvider, apm);

  // Merchant Interaction listeners
  addMerchantEventListeners(iframeField, apmProvider, apm);
}

function displayPaymentMethods(iframeField: IframeField, apmProvider: ApmProviders, apm: Apm) {
  const lang = getCurrentLanguage();
  const translationSet = getTranslationLanguageSet(lang);

  const formatProvider = function formatProviderName(provider: string): string {
    return provider.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  const paymentMethodsWrapperDiv = createHtmlDivElement({
    id: `${apm.toLowerCase()}-wrapper`,
    className: `${apm.toLowerCase()}-wrapper`,
  });

  const paymentMethodButtonWrapperDiv = createHtmlDivElement({
    className: `${apm.toLowerCase()}-button-wrapper`,
  });

  const paymentMethodButtonAriaLabel = translationSet.apms?.button?.getAriaLabel(formatProvider(apmProvider));
  const paymentMethodButton = createHtmlButtonElement({
    id: `${apm.toLowerCase()}`,
    className: `${apm.toLowerCase()}-button`,
    attributes: [
      { alt: formatProvider(apmProvider) },
      { title: formatProvider(apmProvider) },
      { "aria-label": paymentMethodButtonAriaLabel }
    ],
  });

  paymentMethodButton?.addEventListener('click', () => {
    // Merchant Interaction: Emit an event to let the Merchant know the selected provider
    iframeField?.emit(ApmEvents.PaymentMethodSelection, {
      provider: apmProvider,
    });
  });

  paymentMethodButtonWrapperDiv.append(paymentMethodButton);
  paymentMethodsWrapperDiv.append(paymentMethodButtonWrapperDiv);
  iframeField?.container?.appendChild(paymentMethodsWrapperDiv);
}

function addMerchantEventListeners(iframeField: IframeField, apmProvider: ApmProviders, apm: Apm) {
  // Listen to the Merchant event with the APM data details from the GP-API payment response
  window.addEventListener(ApmEvents.PaymentMethodActionDetail, (event: any) => {
    const {
      redirect_url: redirectUrl,
      provider
    } = event.detail || {};

    if (provider !== apmProvider) {
      return;
    }

    const urlToValidate = (redirectUrl);
    if (!isUrlValid(urlToValidate)) {
      bus.emit("error", {
        error: true,
        reasons: [{ code: "ERROR", message: "Url Error: Invalid url." }],
      });

      return;
    }

    const contentDiv = createHtmlDivElement({
      id: `${apm.toLowerCase()}-content`,
      className: `${apm.toLowerCase()}-content`,
    });
    iframeField?.container?.appendChild(contentDiv);

    const onClickSelectAnotherPaymentMethod = () => {
      contentDiv.setAttribute('style', 'display: none');
      changeCreditCardFormFieldsVisibility(true);

      window.dispatchEvent(new CustomEvent(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, {}));
    };

    changeCreditCardFormFieldsVisibility(false);
    handleRedirectAction(contentDiv, { redirectUrl, onClickSelectAnotherPaymentMethod });

  }, false);
}
