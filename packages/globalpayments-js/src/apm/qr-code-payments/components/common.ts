import { createHtmlButtonElement, createHtmlDivElement, createHtmlImageElement, createHtmlSpanElement } from "../../../common/html-element";
import { getCurrentLanguage } from "../../../internal/lib/detectLanguage";
import translations from "../../../internal/lib/translations/translations";
import { translateMessage } from "../../../internal/lib/translate";


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
