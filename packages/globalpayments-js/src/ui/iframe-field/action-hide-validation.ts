import { CardFormFieldNames } from "../../common/enums";
import encodeEntities from "../../internal/lib/encode-entities";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Hide the validation message for a hosted field
 *
 */
export default (fieldType: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) return;

  const fieldSelector = `#secure-payment-field[type=${fieldType === CardFormFieldNames.CardHolderName ? 'text' : 'tel'}]`;
  const fieldInput = document.querySelector(fieldSelector);
  if (!fieldInput) return;
  fieldInput.classList.remove('invalid');

  if (fieldType === CardFormFieldNames.CardNumber) {
    const cardNumberTypeLogo = document.querySelector(`#secure-payment-field-wrapper > img.card-number-icon`);
    cardNumberTypeLogo?.classList.remove('invalid');
  }

  const validationMessageDiv = document.querySelector(`#field-validation-wrapper`);
  if (!validationMessageDiv) return;
  validationMessageDiv.setAttribute("style", encodeEntities(`display: none`));
};