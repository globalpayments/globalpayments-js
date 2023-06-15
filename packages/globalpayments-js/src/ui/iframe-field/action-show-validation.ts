import { CardFormFieldNames } from "../../common/enums";
import encodeEntities from "../../internal/lib/encode-entities";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Show the validation message for a hosted field
 *
 * @param validationMessage The desired validation message
 */
export default (validationMessage: string, fieldType: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) return;

  const fieldSelector = `#secure-payment-field[type=${fieldType === CardFormFieldNames.CardHolderName ? 'text' : 'tel'}]`;
  const fieldInput = document.querySelector(fieldSelector);
  if (!fieldInput) return;

  fieldInput.classList.add('invalid');

  if (fieldType === CardFormFieldNames.CardNumber) {
    const cardNumberTypeLogo = document.querySelector(`#secure-payment-field-wrapper > img.card-number-icon`);
    cardNumberTypeLogo?.classList.add('invalid');
  }

  const validationMessageDiv = document.querySelector(`#field-validation-wrapper`);
  if (!validationMessageDiv) return;

  validationMessageDiv.setAttribute("style", encodeEntities(`display: block`));

  const validationMessageSpan = document.querySelector(`#field-validation-message`);
  if (!validationMessageSpan) return;

  validationMessageSpan.textContent = encodeEntities(validationMessage);
  validationMessageSpan.setAttribute("aria-label", encodeEntities(validationMessage));
};
