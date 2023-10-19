import { postMessage } from "../../internal";
import { HOSTED_FIELD_NAME_KEYS } from "../../common/constants";
import { IDictionary } from "../../internal/lib/util";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";

export default (id: string, data: IDictionary) => {
  const w = window as any;

  const fieldIsValid = false || data.data.isValid;

  w.formValidations = w.formValidations || {};
  w.formValidations[data.data.type] = fieldIsValid;

  const fieldsToValidateCount = HOSTED_FIELD_NAME_KEYS.length;

  const cardHolderNotPresent = w.formValidations[CardFormFieldNames.CardHolderName] === undefined;
  const formFields = {
    cardNumber: w.formValidations[CardFormFieldNames.CardNumber],
    cardExpiration: w.formValidations[CardFormFieldNames.CardExpiration],
    cardCvv: w.formValidations[CardFormFieldNames.CardCvv],
    cardHolderName: w.formValidations[CardFormFieldNames.CardHolderName],
  };
  const { cardNumber, cardExpiration, cardCvv, cardHolderName } = formFields;
  const isFormValid = cardNumber && cardExpiration && cardCvv && (cardHolderName || cardHolderNotPresent);
  let validFieldsCount = Object.values(formFields).filter(x => x).length;
  if (cardHolderNotPresent) {
    ++validFieldsCount;
  }

  if ((validFieldsCount < fieldsToValidateCount) && !isFormValid) return;

  // Continue when the validation round is the last one (since at this point the form is valid)
  let lastFieldToValidate;
  if (cardHolderNotPresent) {
    lastFieldToValidate = HOSTED_FIELD_NAME_KEYS.slice(-2)[0];
  } else {
    lastFieldToValidate = HOSTED_FIELD_NAME_KEYS.slice(-1)[0];
  }
  if (data.data.type !== lastFieldToValidate) return;

  postMessage.post(
    {
      data: {
        ...formFields,
      },
      id,
      type: `ui:iframe-field:${HostedFieldValidationEvents.ValidateFormValid}`,
    },
    "parent",
  );
};