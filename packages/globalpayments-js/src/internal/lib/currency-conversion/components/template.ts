import {IframeField} from "../../../../ui";
import {getCurrentLanguage, getTranslationSet} from "../../detectLanguage";
import {
  createHtmlDivElement,
  createHtmlElement,
  createHtmlRadioButtonElement,
  createToolTip
} from "../../../../common/html-element";
import paymentFieldId from "../../payment-field-id";
import {DCC_KEY} from "../contracts/constants";
import {translateMessage} from "../../translate";
import translations from "../../translations/translations";
import {CurrencyConversionStyles} from "./enums";
import {setRadioGroupEvents} from "./events";
import {convertAmount} from "../../../../common/currency";

/**
 * Creates a radio group HTML element containing merchant and card currency radio buttons.
 * @param iframeField The iframe field associated with the radio group.
 * @param data The data used to populate the radio buttons.
 */
export const createRadioGroupHtmlElement = (iframeField: IframeField, data: any) : void => {
  const lang = getCurrentLanguage();

  const dccTranslations = getTranslationSet(lang, 'dcc');

  iframeField.setValue('');
  iframeField.frame.classList.remove('hidden');
  const fieldset = createHtmlElement('fieldset',{
    id: paymentFieldId + '-fieldset',
    className: 'dynamic-currency-conversion',
    attributes: [{ role: 'radiogroup' }]
  });

  const legend = createHtmlElement('legend');
  legend.textContent = translateMessage(lang, translations.en?.dcc?.label);

  const merchantCurrencyValueText = `${convertAmount(data.amount, false)} ${data.currency}`;
  const merchantCurrencyRadio = createHtmlRadioButtonElement({
    id: CurrencyConversionStyles.MERCHANT_CURRENCY_ID,
    className: "merchant-currency",
    checked: false,
    name: DCC_KEY,
    labelText: merchantCurrencyValueText,
    value: merchantCurrencyValueText,
    target: `${CurrencyConversionStyles.MERCHANT_CURRENCY_ID}-content`,
  });
  const merchantCurrencyTooltip = createToolTip( {
    id: `${CurrencyConversionStyles.MERCHANT_CURRENCY_ID}`,
    htmlContent: dccTranslations.merchantCurrency.tooltip(data.exchange_rate_source, data.exchange_rate_time_created),
    attributes: [{
      'aria-label': dccTranslations.merchantCurrency['aria-label']
    }]
  });
  const cardCurrencyValueText = `${convertAmount(data.payer_amount, false)} ${data.payer_currency}`;
  const cardCurrencyRadio = createHtmlRadioButtonElement({
    id: CurrencyConversionStyles.CARD_CURRENCY_ID,
    className: "card-currency",
    checked: false,
    name: DCC_KEY,
    value: cardCurrencyValueText,
    labelText: cardCurrencyValueText,
    target: `${CurrencyConversionStyles.CARD_CURRENCY_ID}-content`,
  });

  const cardCurrencyTooltip = createToolTip( {
    id: `${CurrencyConversionStyles.CARD_CURRENCY_ID}`,
    htmlContent: dccTranslations.cardCurrency.tooltip(data.payer_currency, data.exchange_rate_source, data.exchange_rate_time_created),
    attributes: [{
      'aria-label': dccTranslations.cardCurrency['aria-label']
    }]
  });

  const currencyConversionInfo = createHtmlDivElement({className: "additional-info"})
  currencyConversionInfo.innerHTML = dccTranslations.additionalInfo(data.currency, data.exchange_rate, data.payer_currency, data.margin_rate_percentage);

  const merchantCurrencyContent = createHtmlDivElement({className: `${CurrencyConversionStyles.MERCHANT_CURRENCY_ID}-content`})
  merchantCurrencyContent.appendChild(currencyConversionInfo);
  merchantCurrencyContent.appendChild(merchantCurrencyTooltip);

  const cardCurrencyContent = createHtmlDivElement({className: `${CurrencyConversionStyles.CARD_CURRENCY_ID}-content`})
  cardCurrencyContent.appendChild(currencyConversionInfo.cloneNode(true));
  cardCurrencyContent.appendChild(cardCurrencyTooltip);

  fieldset.appendChild(legend);
  fieldset.appendChild(merchantCurrencyRadio);
  fieldset.appendChild(cardCurrencyRadio);

  const dccContainer = createHtmlDivElement({className: CurrencyConversionStyles.CONTAINER});
  dccContainer.appendChild(fieldset);
  dccContainer.appendChild(merchantCurrencyContent);
  dccContainer.appendChild(cardCurrencyContent);
  setRadioGroupEvents(iframeField, fieldset);

  iframeField?.container?.prepend(dccContainer);
}
