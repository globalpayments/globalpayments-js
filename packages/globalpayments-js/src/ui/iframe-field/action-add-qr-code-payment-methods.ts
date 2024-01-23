import { IframeField } from ".";
import handleRedirectAction from "../../apm/non-card-payments/components/redirect-action-handler";
import handleRedirectInFrameAction from "../../apm/qr-code-payments/components/redirect-in-frame-action-handler";
import { IPaymentMethodConfigurationNormalized } from "../../apm/qr-code-payments/contracts";
import { QRCodePaymentsActions, ApmInternalEvents } from "../../apm/enums";
import {
  changeCreditCardFormFieldsVisibility,
  createHtmlButtonElement,
  createHtmlDivElement
} from "../../common/html-element";
import { bus, options } from "../../internal";
import {
  ApmEvents,
  QRCodePaymentsProviderBrands
} from "../../internal/lib/enums";
import { removeScriptById } from "../../apm/qr-code-payments/components/generate-qr-code";
import { validateProviderBrand } from "../../apm/qr-code-payments/helpers";
import handlePresentQRCodeAction from "../../apm/qr-code-payments/components/present-qr-code-action-handler";
import { isUrlValid } from "../../apm/non-card-payments/components/common";
import {translateMessage} from "../../internal/lib/translate";
import {getCurrentLanguage} from "../../internal/lib/detectLanguage";
import translations from "../../internal/lib/translations/translations";

export default function addQRCodePaymentMethods(
    iframeField: IframeField | undefined,
    paymentMethodConfigurations: IPaymentMethodConfigurationNormalized[],
    amount: string | number
): void {
    if (!iframeField) return;
    if (!options.apms?.qrCodePayments || options.apms?.qrCodePayments && !options.apms?.qrCodePayments.enabled) return;
    if (!paymentMethodConfigurations) return;

    displayPaymentMethods(iframeField, paymentMethodConfigurations);

    // Merchant Interaction listeners
    addMerchantEventListeners(iframeField, amount);
}

function displayPaymentMethods(iframeField: IframeField, paymentMethodConfigurations: IPaymentMethodConfigurationNormalized[]) {
  const paymentMethodsWrapperDiv = createHtmlDivElement({
    id: 'qr-code-payment-methods-wrapper',
    className: 'qr-code-payment-methods-wrapper',
  });
  const lang = getCurrentLanguage();

  paymentMethodConfigurations.forEach((pmc: IPaymentMethodConfigurationNormalized) => {
    const { provider, image } = pmc;

    const validProvider: string = validateProviderBrand(provider);

    const brand: string = validProvider || 'UnkownMethod';
    const trimBrand = brand.toLocaleLowerCase().replaceAll(' ', '');

    if (!(validProvider in QRCodePaymentsProviderBrands)) {
      bus.emit("error", {
        error: true,
        reasons: [{ code: "ERROR", message: "Provider Error: Invalid provider brand." }],
      });

      return;
    }

    const paymentMethodButtonWrapperDiv = createHtmlDivElement({
      className: 'qr-code-payment-method-button-wrapper',
    });
    const paymentMethodButton = createHtmlButtonElement({
      id: `qr-code-payment-method-${trimBrand}`,
      className: `qr-code-payment-method-button ${getQRCodePaymentMethodCSSClass(brand)}`,
      attributes: [
        { style: `background-image: url('${image}'); background-position: 50% 50%; background-repeat: no-repeat` },
        { alt: brand },
        { title: brand },
        { "aria-label": `${translateMessage(lang, translations.en?.apms?.button['aria-label'])} ${brand}` }
      ],
    });

    paymentMethodButton?.addEventListener('click', () => {
      // Merchant Interaction: Emit an event to let the Merchant know the selected provider
      iframeField?.emit(ApmEvents.PaymentMethodSelection, {
        provider: brand,
      });
    });
    paymentMethodButtonWrapperDiv.append(paymentMethodButton);

    paymentMethodsWrapperDiv.append(paymentMethodButtonWrapperDiv);
  });
  iframeField?.container?.appendChild(paymentMethodsWrapperDiv);
}

function getQRCodePaymentMethodCSSClass (providerBrandName: string): string {
  switch (providerBrandName) {
    case QRCodePaymentsProviderBrands.AlipayHK: return 'qr-code-payment-method-alipayhk';
    case QRCodePaymentsProviderBrands.WeChat: return 'qr-code-payment-method-wechat';
    default:
    case QRCodePaymentsProviderBrands.Alipay: return 'qr-code-payment-method-alipay';
  }
}

function addMerchantEventListeners(iframeField: IframeField, amount: string | number) {
    // Listen to the Merchant event with the QR Code data details from the GP-API payment response
    window.addEventListener(ApmEvents.PaymentMethodActionDetail, (event: any) => {
      const {
        redirect_url: redirectUrl,
        next_action: nextAction,
        seconds_to_expire: secondsToExpire,
        qr_code: qrCode,
        provider,
      } = event.detail || {};

      const validProvider: string = validateProviderBrand(provider);
      if (!(validProvider in QRCodePaymentsProviderBrands)) {
        return;
      }

      if (redirectUrl && !isUrlValid(redirectUrl)) {
        bus.emit("error", {
          error: true,
          reasons: [{ code: "ERROR", message: "Url Error: Invalid url." }],
        });

        return;
      }

      const qrCodePaymentContentDiv = createHtmlDivElement({
        id: 'qr-code-payment-content',
        className: 'qr-code-payment-content',
      });
      iframeField?.container?.appendChild(qrCodePaymentContentDiv);

      const onClickSelectAnotherPaymentMethod = () => {
        qrCodePaymentContentDiv.setAttribute('style', 'display: none');
        changeCreditCardFormFieldsVisibility(true);
        removeScriptById('qr-code-script');

        if (
            nextAction === QRCodePaymentsActions.RedirectAction
            || nextAction === QRCodePaymentsActions.PresentQRCodeAction) {
          window.dispatchEvent(new CustomEvent(ApmInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, {}));
        }
      };

      switch (nextAction) {
        case QRCodePaymentsActions.RedirectAction:
          changeCreditCardFormFieldsVisibility(false);

          handleRedirectAction(qrCodePaymentContentDiv, { redirectUrl, onClickSelectAnotherPaymentMethod });
          break;
        case QRCodePaymentsActions.RedirectInFrameAction:
          changeCreditCardFormFieldsVisibility(false);

          handleRedirectInFrameAction(qrCodePaymentContentDiv, { redirectUrl, onClickSelectAnotherPaymentMethod });
          break;
        case QRCodePaymentsActions.PresentQRCodeAction:
          changeCreditCardFormFieldsVisibility(false);

          handlePresentQRCodeAction(qrCodePaymentContentDiv, { amount, qrCode, secondsToExpire, onClickSelectAnotherPaymentMethod });
          break;

      }
    }, false);
}
