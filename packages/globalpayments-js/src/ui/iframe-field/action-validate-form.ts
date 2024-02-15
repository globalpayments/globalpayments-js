import { postMessage } from "../../internal";
import { HOSTED_FIELD_NAME_KEYS } from "../../common/constants";
import { IDictionary } from "../../internal/lib/util";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { getValidationRoundCounter, increaseValidationRoundCounter, removeValidationRoundCounter } from "../../internal/built-in-validations/helpers";

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

  const eventType = `ui:iframe-field:${ isFormValid ? HostedFieldValidationEvents.ValidateFormValid : HostedFieldValidationEvents.ValidateFormInvalid }`;

  const validationRoundCounter = getValidationRoundCounter();
  if (fieldsToValidateCount === validationRoundCounter) {
    postMessage.post(
      {
        data: isFormValid,
        id,
        type: "ui:iframe-field:card-form-validity",
      },
      "parent",
    );
    removeValidationRoundCounter();
  } else {
    increaseValidationRoundCounter();

    return;
  }

  postMessage.post(
    {
      data: {
        ...formFields,
      },
      id,
      type: eventType,
    },
    "parent",
  );
};