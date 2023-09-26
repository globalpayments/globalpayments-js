import { postMessage } from "../../internal";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { createHtmlDivElement, createHtmlSpanElement } from "../../common/html-element";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Show the validation message for a hosted field
 *
 * @param id The hosted field id
 * @param validationMessage The desired validation message
 * @param fieldType The hosted field type
 */
export default (id: string, validationMessage: string, fieldType: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) return;

  el.setAttribute('style', 'width: auto;');

  const fieldWrapperDiv = el.parentElement;
  if (!fieldWrapperDiv) return;

  fieldWrapperDiv.setAttribute('style', 'flex-direction: column;');

  const fieldSelector = `#secure-payment-field[type=${fieldType === CardFormFieldNames.CardHolderName ? 'text' : 'tel'}]`;
  const fieldInput = document.querySelector(fieldSelector);
  fieldInput?.classList.add('hf-invalid');

  if (fieldType === CardFormFieldNames.CardNumber) {
    const cardNumberTypeLogo = document.querySelector(`#secure-payment-field-wrapper > img.card-number-icon`);
    cardNumberTypeLogo?.classList.add('hf-invalid');
  } else if (fieldType === CardFormFieldNames.CardCvv) {
    postMessage.post(
      {
        data: { },
        id,
        type: `ui:iframe-field:${HostedFieldValidationEvents.ValidationCvvTooltipShow}`,
      },
      "parent",
    );
  }

  const existingValidationMessageDiv = document.querySelector(`#field-validation-wrapper`);
  existingValidationMessageDiv?.remove();

  const newValidationMessageDiv = createValidationMessageDiv(validationMessage);
  fieldWrapperDiv.append(newValidationMessageDiv);
};

function createValidationMessageDiv(validationMessage: string): HTMLDivElement {
  const validationMessageDiv = createHtmlDivElement({
    id: `field-validation-wrapper`,
    attributes: [
      {
        style: [
          `display: block;`,
          `margin-top: 5px;`,
          `font-family: GPCommerce;`,
          `font-style: normal;`,
          `font-size: 0.79em;`,
          `font-weight: 400;`,
          `line-height: 19px;`,
          `color: #E12619;`,
        ].join(''),
      },
    ],
  });

  const validationMessageSpan = createHtmlSpanElement({
    id: `field-validation-message`,
    textContent: validationMessage,
    attributes: [
      { 'aria-label': validationMessage },
    ],
  });
  validationMessageDiv.append(validationMessageSpan);

  return validationMessageDiv;
}