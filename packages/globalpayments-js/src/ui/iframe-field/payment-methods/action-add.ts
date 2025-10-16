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
  ApmProviders
} from "../../../internal/lib/enums";
import { isApmProviderConfigured, isUrlValid } from "../../../apm/non-card-payments/components/common";
import {getCurrentLanguage, getTranslationLanguageSet} from "../../../internal/lib/detectLanguage";
import { isBankSelectionAvailable, getImageUrl } from "../../../internal/lib/bank-selection/helpers";
import addBankSelection from "../../components/bank-selection/action-add-bank-selection";
import getAssetBaseUrl from "../../../internal/gateways/gp-api/get-asset-base-url";
export default function addPaymentMethod(iframeField: IframeField | undefined, apmProvider: ApmProviders, apm: Apm): void {
  if (!iframeField) return;
  const apmAllowedPaymentMethods = options.apms?.nonCardPayments?.allowedPaymentMethods;
  if ((!apmAllowedPaymentMethods || !isApmProviderConfigured(apmAllowedPaymentMethods, apmProvider)) && !options.expressPay?.enabled) return;

  displayPaymentMethods(iframeField, apmProvider, apm,options.apms?.countryCode);

  // Merchant Interaction listeners
  addMerchantEventListeners(iframeField, apmProvider, apm);
}

function displayPaymentMethods(iframeField: IframeField, apmProvider: ApmProviders, apm: Apm,countryCode:string | undefined) {
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
  const backgroundImage = getImageUrl(getAssetBaseUrl(''),apmProvider,countryCode);
  const paymentMethodButton = createHtmlButtonElement({
    id: `${apm.toLowerCase()}`,
    className: `${apm.toLowerCase()}-button`,
    attributes: [
      { alt: formatProvider(apmProvider) },
      { title: formatProvider(apmProvider) },
      { "aria-label": paymentMethodButtonAriaLabel },
      { type: 'button' }
    ],
  });
  paymentMethodButton.style.background = backgroundImage;
  // paymentMethodButton.setAttribute('style', 'background: backgroundImage')
  if(apmProvider !== ApmProviders.ExpressPay) {
    paymentMethodButton?.addEventListener('click', () => {
    // Merchant Interaction: Emit an event to let the Merchant know the selected provider
        iframeField?.emit(ApmEvents.PaymentMethodSelection, {
        provider: apmProvider,
        countryCode: options.apms?.countryCode,
        currencyCode: options.apms?.currencyCode,
      });
  });
  }

  paymentMethodButtonWrapperDiv.append(paymentMethodButton);
  paymentMethodsWrapperDiv.append(paymentMethodButtonWrapperDiv);
  iframeField?.container?.appendChild(paymentMethodsWrapperDiv);
}

function addMerchantEventListeners(iframeField: IframeField, apmProvider: ApmProviders, apm: Apm) {
  // Listen to the Merchant event with the APM data details from the GP-API payment response
  window.addEventListener(ApmEvents.PaymentMethodActionDetail, (event: any) => {
    const {
      redirect_url: redirectUrl,
      provider,
      // TODO (Bank Selection): Get the country and currency to evaluate the feature
      countryCode,
      currencyCode,
      bankName
    } = event.detail || {};

    const BANK_SELECTION_KEY = "bank-selection";

    // if (provider !== apmProvider) {
    //   return;
    // }

    const existing = document.getElementById(`${BANK_SELECTION_KEY}-wrapper`);
    if(existing) existing.remove();

    // TODO (Bank Selection): Bank Selection evaluation
    if (isBankSelectionAvailable(countryCode, currencyCode)
      && provider === ApmProviders.OpenBanking
      && iframeField?.container
      && !bankName) {
      addBankSelection((iframeField), {
        countryCode,
        currencyCode
      });
      changeCreditCardFormFieldsVisibility(false);
    } else {
      const urlToValidate = (redirectUrl);
      if (!isUrlValid(urlToValidate)) {
        bus.emit("error", {
          error: true,
          reasons: [{ code: "ERROR", message: "Url Error: Invalid url." }],
        });

        return;
      }

      const existingRedirectContent = document.getElementById(`redirect-content`);
      if(existingRedirectContent) existingRedirectContent.remove();

      const contentDiv = createHtmlDivElement({
        id: `redirect-content`,
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
    }
  }, false);
}
