import { HOSTED_FIELD_NAME_KEYS } from "../../common/constants";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { postMessage } from "../../internal";
import { validate } from "../../internal/built-in-validations/field-validator";
import { hideHostedFieldValidation, showHostedFieldValidation } from "../../internal/built-in-validations/helpers";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { handleCurrencyConversionValidationSetup } from "../../internal/lib/currency-conversion/utils/helpers";

/**
 * Validate the value for a hosted field
 */
export default (id: string, type: string, target: string) => {
  // Set the initial set of fields to validate
  const fieldsToValidate = HOSTED_FIELD_NAME_KEYS.map(x => x);

  // Handle DCC Validations (if needed)
  handleCurrencyConversionValidationSetup(fieldsToValidate);

  // Only for Hosted fields that has built in validations
  if (fieldsToValidate.indexOf(type) === -1) return;

  const field = document.getElementById(paymentFieldId) as HTMLInputElement;
  if (!field) return;

  let isValid = true;
  const value = field.value;

  // Evaluate the valid rules
  let extraData = {};
  if (type === CardFormFieldNames.CardCvv) {
    const cardType = getCardType(field);
    if (!cardType) return;

    extraData = {
      isAmex: cardTypeIsAmex(cardType),
    };
  }

  const validationResult = validate(type, value, extraData);
  isValid = validationResult && validationResult.isValid;
  if (!isValid && validationResult.message) {
    showHostedFieldValidation(id, validationResult.message);
  } else {
    hideHostedFieldValidation(id);
  }

  postMessage.post(
    {
      data: {
        type,
        value,
        isValid,
        target,
      },
      id,
      type: `ui:iframe-field:${HostedFieldValidationEvents.ValidatePassData}`,
    },
    "parent",
  );
};

const getCardType = (field: HTMLInputElement): string | undefined => {
  if (!field) return;

  const classList = field.className.split(" ");
  const cardTypeClass = classList.filter(x => x.indexOf("card-type-") !== -1)[0];

  if (!cardTypeClass) return "unknown";

  return cardTypeClass.replace("card-type-", "");
}

const cardTypeIsAmex = (cardType: string) => cardType === "amex";