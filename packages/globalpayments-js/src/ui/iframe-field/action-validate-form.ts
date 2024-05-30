import { options, postMessage } from "../../internal";
import { HOSTED_FIELD_NAME_KEYS } from "../../common/constants";
import { IDictionary } from "../../internal/lib/util";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { getValidationRoundCounter, increaseValidationRoundCounter, removeValidationRoundCounter } from "../../internal/built-in-validations/helpers";
import { DCC_KEY } from "../../internal/lib/currency-conversion/contracts/constants";
import { getCurrencyConversionAvailabilityStatus, handleCurrencyConversionValidationSetup } from "../../internal/lib/currency-conversion/utils/helpers";

export default (id: string, data: IDictionary) => {
  const w = window as any;

  const fieldIsValid = false || data.data.isValid;

  w.formValidations = w.formValidations || {};
  w.formValidations[data.data.type] = fieldIsValid;

  // Set the initial set of fields to validate
  const fieldsToValidate = HOSTED_FIELD_NAME_KEYS.map(x => x);

  // Handle DCC Validations (if needed)
  handleCurrencyConversionValidationSetup(fieldsToValidate);

  const fieldsToValidateCount = fieldsToValidate.length;

  const cardHolderNotPresent = w.formValidations[CardFormFieldNames.CardHolderName] === undefined;
  const formFields = {
    cardNumber: w.formValidations[CardFormFieldNames.CardNumber],
    cardExpiration: w.formValidations[CardFormFieldNames.CardExpiration],
    cardCvv: w.formValidations[CardFormFieldNames.CardCvv],
    cardHolderName: w.formValidations[CardFormFieldNames.CardHolderName],
  };
  const { cardNumber, cardExpiration, cardCvv, cardHolderName } = formFields;
  let isFormValid = cardNumber && cardExpiration && cardCvv && (cardHolderName || cardHolderNotPresent);

  const isCurrencyConversionEnabled = options.currencyConversion?.enabled;
  const isCurrencyConversionAvailable = getCurrencyConversionAvailabilityStatus();
  const shouldCurrencyConversionBeValidated = isCurrencyConversionEnabled && isCurrencyConversionAvailable;
  if (shouldCurrencyConversionBeValidated) {
    isFormValid = isFormValid && w.formValidations[DCC_KEY];
  }

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