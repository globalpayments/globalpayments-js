import { postMessage } from "../../internal";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import paymentFieldId from "../../internal/lib/payment-field-id";

/**
 * Hide the validation message for a hosted field
 *
 * @param id The hosted field id
 * @param fieldType The hosted field type
 */
export default (id: string, fieldType: string) => {
  const el = document.getElementById(paymentFieldId);
  if (!el) return;

  el.setAttribute('style', 'width: 100%;');

  const fieldWrapperDiv = el.parentElement;
  if (!fieldWrapperDiv) return;

  fieldWrapperDiv.setAttribute('style', 'flex-direction: unset;');

  const fieldSelector = `#secure-payment-field[type=${fieldType === CardFormFieldNames.CardHolderName ? 'text' : 'tel'}]`;
  const fieldInput = document.querySelector(fieldSelector);
  fieldInput?.classList.remove('hf-invalid');

  if (fieldType === CardFormFieldNames.CardNumber) {
    const cardNumberTypeLogo = document.querySelector(`#secure-payment-field-wrapper > img.card-number-icon`);
    cardNumberTypeLogo?.classList.remove('hf-invalid');
  } else if (fieldType === CardFormFieldNames.CardCvv) {
    postMessage.post(
      {
        data: { },
        id,
        type: `ui:iframe-field:${HostedFieldValidationEvents.ValidationCvvTooltipHide}`,
      },
      "parent",
    );
  }

  const validationMessageDiv = document.querySelector(`#field-validation-wrapper`);
  validationMessageDiv?.remove();
};