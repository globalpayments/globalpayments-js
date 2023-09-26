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
  const fieldsValidatedCount = Object.keys(w.formValidations).length;

  // Continue when all the fields has been validated
  if (fieldsValidatedCount < fieldsToValidateCount) return;

  const formFields = {
    cardNumber: w.formValidations[CardFormFieldNames.CardNumber],
    cardExpiration: w.formValidations[CardFormFieldNames.CardExpiration],
    cardCvv: w.formValidations[CardFormFieldNames.CardCvv],
    cardHolderName: w.formValidations[CardFormFieldNames.CardHolderName],
  };
  const { cardNumber, cardExpiration, cardCvv, cardHolderName } = formFields;
  const isFormValid = cardNumber && cardExpiration && cardCvv && cardHolderName;
  const validFieldsCount = Object.values(formFields).filter(x => x).length;

  if ((validFieldsCount < fieldsToValidateCount) && !isFormValid) return;

  // Continue when the validation round is the last one (since at this point the form is valid)
  const lastFieldToValidate = HOSTED_FIELD_NAME_KEYS.slice(-1)[0];
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