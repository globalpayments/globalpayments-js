import {ApmProviders} from "../../../internal/lib/enums";
import { PaymentMethod } from "../contracts";
import {getCurrentLanguage} from "../../../internal/lib/detectLanguage";
import {createHtmlButtonElement, createHtmlDivElement} from "../../../common/html-element";
import {translateMessage} from "../../../internal/lib/translate";
import translations from "../../../internal/lib/translations/translations";

export function isApmProviderConfigured(
  configuration: PaymentMethod[],
  desiredProvider: ApmProviders
): boolean {
  return (
    Array.isArray(configuration) &&
    configuration.some(
      method => method.provider === desiredProvider
    )
  );
}

export const getSelectAnotherPaymentMethodButton = (id: string, onClickCallback: any): HTMLDivElement => {
  const lang = getCurrentLanguage();

  const selectAnotherPaymentMethodDiv = createHtmlDivElement();
  const selectAnotherPaymentMethodButton = createHtmlButtonElement({
    id,
    className: 'link-button',
    textContent: translateMessage(lang, translations.en.QR?.button.text),
    attributes: [
      { 'aria-label': translateMessage(lang, translations.en.QR?.button['aria-label']) },
      { 'role': 'button' },
    ],
  });
  selectAnotherPaymentMethodButton?.addEventListener('click', onClickCallback);
  selectAnotherPaymentMethodDiv.append(selectAnotherPaymentMethodButton);

  return selectAnotherPaymentMethodDiv;
}

export function isUrlValid(url: string): boolean {
  try {
    // tslint:disable-next-line:no-unused-expression
    new URL(url);
    return true; // Valid URL
  } catch (error) {
    return false; // Invalid URL
  }
}