import {IframeField} from "../../../../ui";
import {getCurrentLanguage, getTranslationSet} from "../../detectLanguage";
import {
  createHtmlDivElement,
  createHtmlElement,
  createHtmlRadioButtonElement,
  createHtmlSpanElement,
  createHtmlImageElement
} from "../../../../common/html-element";
import paymentFieldId from "../../payment-field-id";
import {DCC_KEY} from "../contracts/constants";
import {translateMessage} from "../../translate";
import translations from "../../translations/translations";
import {CurrencyConversionStyles} from "./enums";
import {setRadioGroupEvents} from "./events";
import {convertAmount, formatAmount} from "../../../../common/currency";
import getAssetBaseUrl from "../../../gateways/gp-api/get-asset-base-url";

/**
 * Creates a radio group HTML element containing merchant and card currency radio buttons.
 * @param iframeField The iframe field associated with the radio group.
 * @param data The data used to populate the radio buttons.
 */
export const createRadioGroupHtmlElement = (iframeField: IframeField, data: any) : void => {
  const lang = getCurrentLanguage();

  const dccTranslations = getTranslationSet(lang, 'dcc');

  const formatMarginRatePercentage = (value: any): string => {
    if (value === null || value === undefined) {
      return "";
    }

    const numericValue = typeof value === "number"
      ? value
      : parseFloat(String(value).replace("%", "").trim());

    if (Number.isNaN(numericValue)) {
      return `${value}`;
    }

    const normalized = Number(numericValue.toFixed(4)).toString();
    return `${normalized}%`;
  };

  iframeField.setValue('');
  iframeField.frame.classList.remove('hidden');
  const dccSubmitIframe = document.querySelector("iframe[name='submit-dcc']") as HTMLIFrameElement | null;
  dccSubmitIframe?.classList.remove("hidden");

  if (dccSubmitIframe?.parentElement) {
    const existingPayerText = document.querySelector('.dcc-payer-tooltip-text');
    existingPayerText?.remove();
    const existingInstallmentDccWarningDiv = document.getElementById('installment-dcc-warning');
    existingInstallmentDccWarningDiv?.remove();
    const existingDccSubmitLabel = document.querySelector('.dcc-submit-label-text');
    existingDccSubmitLabel?.remove();

    const payerText = createHtmlDivElement({
      id: `${CurrencyConversionStyles.CARD_CURRENCY_ID}-text`,
      className: 'dcc-payer-tooltip-text',
      attributes: [{ 'aria-label': dccTranslations.cardCurrency['aria-label'] }],
    });
    payerText.innerHTML = dccTranslations.cardCurrency.tooltip(
        data.payer_currency,
        data.exchange_rate_source,
        data.exchange_rate_time_created,
      );

    const currencyConversionInfo = createHtmlDivElement({className: "additional-info"});
    const payerRegion = data.payer_region === "EU" ? true : false;
    const marginRatePercentage = formatMarginRatePercentage(data.margin_rate_percentage);
    currencyConversionInfo.innerHTML = dccTranslations.additionalInfo(data.currency, data.exchange_rate, data.payer_currency, marginRatePercentage, payerRegion);

    const dccWarningInfo = createHtmlDivElement({className: "warning-info"});
    dccWarningInfo.innerHTML = dccTranslations.dccWarning;

    payerText.appendChild(currencyConversionInfo);
    payerText.appendChild(dccWarningInfo);

    let submitDccContainer: HTMLElement | null = dccSubmitIframe.parentElement;
    while (submitDccContainer && !submitDccContainer.classList.contains('credit-card-submit-dcc')) {
      submitDccContainer = submitDccContainer.parentElement;
    }

    if (submitDccContainer?.parentElement) {
      const dccSubmitLabel = createHtmlDivElement({
        className: 'dcc-submit-label-text'
      });
      dccSubmitLabel.textContent =
        translateMessage(lang, translations.en?.dcc?.label)
        || translations.en?.dcc?.label
        || '';

      const installmentDccWarningDiv = createHtmlDivElement({
        className: 'installment-dcc-warning',
        id: 'installment-dcc-warning'
      });

      const installmentAvailabilityWarningImg = createHtmlImageElement({
        className: 'installment-warning-image',
        id: 'installment-warning-image',
        src: `${getAssetBaseUrl('')}images/warning-red.svg`,
        alt: 'Warning'
      });
      installmentAvailabilityWarningImg.style.verticalAlign = "middle";

      const installmentAvailableWithDccSpan = createHtmlSpanElement({
        className: 'installment-availability-text',
        id: 'installment-availability-text',
        textContent: dccTranslations.installmentWithDcc
      });

      installmentDccWarningDiv.append(installmentAvailabilityWarningImg);
      installmentDccWarningDiv.append(installmentAvailableWithDccSpan);

      // Keep DCC text and warning in DCC flow area: label -> submit-dcc -> warning -> payer text.
      submitDccContainer.insertAdjacentElement('beforebegin', dccSubmitLabel);
      submitDccContainer.insertAdjacentElement('afterend', installmentDccWarningDiv);
      installmentDccWarningDiv.insertAdjacentElement('afterend', payerText);
    }
  }

  const submitIframe = document.querySelector("iframe[name='submit']") as HTMLIFrameElement | null;
  if (submitIframe?.parentElement) {
    const existingSubmitDisclaimer = document.querySelector('.submit-disclaimer-text');
    existingSubmitDisclaimer?.remove();

    const submitDisclaimer = createHtmlDivElement({
      className: 'submit-disclaimer-text',
    });
    submitDisclaimer.textContent = translateMessage(lang, translations.en?.dcc?.disclaimer)
        || translations.en?.dcc?.disclaimer
        || '';

    let submitContainer: HTMLElement | null = submitIframe.parentElement;
    while (submitContainer && !submitContainer.classList.contains('credit-card-submit')) {
      submitContainer = submitContainer.parentElement;
    }

    if (submitContainer?.parentElement) {
      submitContainer.insertAdjacentElement('afterend', submitDisclaimer);
    }
  }

  const existingSubmitSeparator = document.querySelector('.submit-section-separator');
  existingSubmitSeparator?.remove();

  const submitContainerRoot = submitIframe?.closest('.credit-card-submit') as HTMLElement | null;
  const submitDccContainerRoot = dccSubmitIframe?.closest('.credit-card-submit-dcc') as HTMLElement | null;
  if (submitContainerRoot?.parentElement && submitDccContainerRoot?.parentElement) {
    const separator = createHtmlDivElement({
      className: 'submit-section-separator',
    });

    const separatorLabel = createHtmlSpanElement({
      className: 'submit-section-separator-label',
      textContent: translations[lang]['other-cards-label']
    });
    separator.appendChild(separatorLabel);

    const relativePosition = submitContainerRoot.compareDocumentPosition(submitDccContainerRoot);
    const isSubmitBeforeDcc = relativePosition === Node.DOCUMENT_POSITION_FOLLOWING;

    if (isSubmitBeforeDcc) {
      submitDccContainerRoot.insertAdjacentElement('beforebegin', separator);
    } else {
      submitContainerRoot.insertAdjacentElement('beforebegin', separator);
    }
  }
}
