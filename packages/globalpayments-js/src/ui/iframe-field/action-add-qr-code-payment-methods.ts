import { IframeField } from ".";
import handleRedirectAction from "../../apm/qr-code-payments/components/redirect-action-handler";
import handleRedirectInFrameAction from "../../apm/qr-code-payments/components/redirect-in-frame-action-handler";
import { IPaymentMethodConfigurationNormalized } from "../../apm/qr-code-payments/contracts";
import { QRCodePaymentsActions, QRCodePaymentsInternalEvents } from "../../apm/qr-code-payments/enums";
import { createHtmlButtonElement, createHtmlDivElement } from "../../common/html-element";
import { options } from "../../internal";
import { QRCodePaymentsMerchantInteractionEvents, QRCodePaymentsProviderBrands } from "../../internal/lib/enums";

export default function addQRCodePaymentMethods(
    iframeField: IframeField | undefined,
    paymentMethodConfigurations: IPaymentMethodConfigurationNormalized[]
  ): void {
    if (!iframeField) return;
    if (!options.apms?.qrCodePayments || options.apms?.qrCodePayments && !options.apms?.qrCodePayments.enabled) return;
    if (!paymentMethodConfigurations) return;

    displayPaymentMethods(iframeField, paymentMethodConfigurations);

    // Merchant Interaction listeners
    addMerchantEventListeners(iframeField);
}

function displayPaymentMethods(iframeField: IframeField, paymentMethodConfigurations: IPaymentMethodConfigurationNormalized[]) {
  const paymentMethodsWrapperDiv = createHtmlDivElement({
    id: 'qr-code-payment-methods-wrapper',
    className: 'qr-code-payment-methods-wrapper',
  });

  paymentMethodConfigurations.forEach((pmc: IPaymentMethodConfigurationNormalized) => {
    const { provider, image } = pmc;
    const brand: string = provider || 'UnkownMethod';
    const trimBrand = brand.toLocaleLowerCase().replaceAll(' ', '');

    if (!(provider in QRCodePaymentsProviderBrands)) {
      return;
    }

    const paymentMethodButtonWrapperDiv = createHtmlDivElement({
      className: 'qr-code-payment-method-button-wrapper',
    });
    const paymentMethodButton = createHtmlButtonElement({
      id: `qr-code-payment-method-${trimBrand}`,
      className: `qr-code-payment-method-button ${getQRCodePaymentMethodCSSClass(brand)}`,
      attributes: [
        {style: `background-image: url('${image}'); background-position: 50% 50%; background-repeat: no-repeat`},
        {alt: brand},
        {title: brand},
      ],
    });

    paymentMethodButton?.addEventListener('click', () => {
      // Merchant Interaction: Emit an event to let the Merchant know the selected provider
      iframeField?.emit(QRCodePaymentsMerchantInteractionEvents.PaymentMethodSelection, {
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
    default:
    case QRCodePaymentsProviderBrands.Alipay: return 'qr-code-payment-method-alipay';
  }
}

function addMerchantEventListeners(iframeField: IframeField) {
    // Listen to the Merchant event with the QR Code data details from the GP-API payment response
    window.addEventListener(QRCodePaymentsMerchantInteractionEvents.ProvideQRCodeDetailsMerchantEvent, (event: any) => {
      const {
        redirect_url: redirectUrl,
        next_action: nextAction,
        seconds_to_expire: secondsToExpire,
        qr_code: qrCode,
        provider,
      } = event.detail || {};

      if (!(provider in QRCodePaymentsProviderBrands)) {
        // tslint:disable-next-line:no-console
        console.log('Provider Error: Invalid provider brand.');

        return;
      }

      const urlToValidate = (redirectUrl || qrCode);
      if (!isUrlValid(urlToValidate)) {
        // tslint:disable-next-line:no-console
        console.log('Url Error: Invalid url.');

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

        if (
          nextAction === QRCodePaymentsActions.RedirectAction) {
          window.dispatchEvent(new CustomEvent(QRCodePaymentsInternalEvents.NavigatesBackBySelectAnotherPaymentMethod, {}));
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
      }
    }, false);
}

function changeCreditCardFormFieldsVisibility(visible: boolean): void {
  const fields = [
      // Apm
      '.credit-card-click-to-pay',
      '.credit-card-google-pay',
      '.credit-card-apple-pay',
      '.other-cards-label',
      '.qr-code-payment-methods-wrapper',
      // Credit card common
      '.credit-card-card-number',
      '.credit-card-card-expiration',
      '.credit-card-card-cvv',
      '.credit-card-card-holder-name',
      '.credit-card-submit',
      // '.credit-card-shield',
      // '.credit-card-logo',
  ];

  fields.forEach((fieldSelector: any) => {
      const domElement = document.querySelector(`${fieldSelector}`);
      if (domElement) {
          domElement.setAttribute('style', `display: ${ visible ? 'block' : 'none' };`);
      }
  });
}

function isUrlValid(url: string): boolean {
  try {
    // tslint:disable-next-line:no-unused-expression
    new URL(url);
    return true; // Valid URL
  } catch (error) {
    return false; // Invalid URL
  }
}