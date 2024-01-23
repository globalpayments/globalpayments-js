import { IframeField } from ".";
import handleRedirectAction from "../../apm/non-card-payments/components/redirect-action-handler";
import { ApmInternalEvents } from "../../apm/enums";
import {
  changeCreditCardFormFieldsVisibility,
  createHtmlButtonElement,
  createHtmlDivElement
} from "../../common/html-element";
import {bus, options} from "../../internal";
import {
  Apm,
  ApmEvents,
  ApmProviders,
  OpenBanking
} from "../../internal/lib/enums";
import { isApmProviderConfigured, isUrlValid } from "../../apm/non-card-payments/components/common";
import {translateMessage} from "../../internal/lib/translate";
import translations from "../../internal/lib/translations/translations";
import {getCurrentLanguage} from "../../internal/lib/detectLanguage";

export default function addOpenBankingPaymentMethod(iframeField: IframeField | undefined): void {
  if (!iframeField) return;

  const apmAllowedPaymentMethods = options.apms?.nonCardPayments?.allowedPaymentMethods;
  if (!apmAllowedPaymentMethods || !isApmProviderConfigured(apmAllowedPaymentMethods, ApmProviders.OpenBanking)) return;

  displayPaymentMethods(iframeField);

  // Merchant Interaction listeners
  addMerchantEventListeners(iframeField);
}

function displayPaymentMethods(iframeField: IframeField) {
  const formatProvider = function formatProviderName(provider: string): string {
    return provider.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  const paymentMethodsWrapperDiv = createHtmlDivElement({
    id: 'open-banking-wrapper',
    className: 'open-banking-wrapper',
  });

  const lang = getCurrentLanguage();

  const paymentMethodButtonWrapperDiv = createHtmlDivElement({
    className: 'open-banking-button-wrapper',
  });

  const paymentMethodButton = createHtmlButtonElement({
    id: `open-banking`,
    className: `open-banking-button ${Apm.OpenBankingPayment}`,
    attributes: [
      { alt: formatProvider(OpenBanking.title) },
      { title: formatProvider(OpenBanking.title) },
      { "aria-label": `${translateMessage(lang, translations.en?.apms?.button['aria-label'])} ${formatProvider(OpenBanking.title)}` }
    ],
  });

  paymentMethodButton?.addEventListener('click', () => {
    // Merchant Interaction: Emit an event to let the Merchant know the selected provider
    iframeField?.emit(ApmEvents.PaymentMethodSelection, {
      provider: ApmProviders.OpenBanking,
    });
  });

  paymentMethodButtonWrapperDiv.append(paymentMethodButton);
  paymentMethodsWrapperDiv.append(paymentMethodButtonWrapperDiv);
  iframeField?.container?.appendChild(paymentMethodsWrapperDiv);
}

function addMerchantEventListeners(iframeField: IframeField) {
  // Listen to the Merchant event with the Open Banking data details from the GP-API payment response
  window.addEventListener(ApmEvents.PaymentMethodActionDetail, (event: any) => {
    const {
      redirect_url: redirectUrl,
      provider
    } = event.detail || {};

    if (provider !== ApmProviders.OpenBanking) {
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

    const openBankingContentDiv = createHtmlDivElement({
      id: 'open-banking-content',
      className: 'open-banking-content',
    });
    iframeField?.container?.appendChild(openBankingContentDiv);

    const onClickSelectAnotherPaymentMethod = () => {
      openBankingContentDiv.setAttribute('style', 'display: none');
      changeCreditCardFormFieldsVisibility(true);

      window.dispatchEvent(new CustomEvent(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, {}));
    };

    changeCreditCardFormFieldsVisibility(false);
    handleRedirectAction(openBankingContentDiv, { redirectUrl, onClickSelectAnotherPaymentMethod });

  }, false);
}