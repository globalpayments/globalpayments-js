import { HOSTED_FIELD_NAME_KEYS, HOSTED_FIELDS_ADDITIONAL_KEYS, HOSTED_FIELDS_SHIPPING_KEYS } from "../../common/constants";
import { CardFormFieldNames, HostedFieldValidationEvents } from "../../common/enums";
import { options, postMessage } from "../../internal";
import { expressPayFieldsValidate, validate } from "../../internal/built-in-validations/field-validator";
import { hideHostedFieldValidation, showHostedFieldValidation } from "../../internal/built-in-validations/helpers";
import paymentFieldId from "../../internal/lib/payment-field-id";
import { handleCurrencyConversionValidationSetup } from "../../internal/lib/currency-conversion/utils/helpers";

/**
 * Validate the value for a hosted field
 */
export default (id: string, type: string, target: string, expressPayValidation?: boolean) => {
  // Set the initial set of fields to validate
  let fieldsToValidate = HOSTED_FIELD_NAME_KEYS.map(x => x);

  let additionalFieldsToValidate = HOSTED_FIELDS_ADDITIONAL_KEYS.map(x => x);

  const shippingFieldsToValidate = HOSTED_FIELDS_SHIPPING_KEYS.map(x => x);

  if(options.expressPay?.enabled){
    if(options.expressPay?.isShippingRequired !== false && localStorage.getItem("shippingSameAsBilling")==="false"){
      additionalFieldsToValidate = [...additionalFieldsToValidate,...shippingFieldsToValidate];
    }
    fieldsToValidate = [...fieldsToValidate,...additionalFieldsToValidate];
  }

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
  const expressPayValidationResult:any = additionalFieldsToValidate.indexOf(type) > -1 ? expressPayFieldsValidate(type, value, extraData) : true;

  isValid = additionalFieldsToValidate.indexOf(type) > -1 ? (expressPayValidationResult && expressPayValidationResult.isValid) : (validationResult && validationResult.isValid);

  if (!isValid && (validationResult.message || expressPayValidationResult.message)) {
    showHostedFieldValidation(id, (validationResult.message || expressPayValidationResult.message));
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
        expressPayValidation
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