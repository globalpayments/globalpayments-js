import { options, postMessage as pm } from "../../../internal";
import paymentFieldId from "../../../internal/lib/payment-field-id";
import { IDictionary } from "../../../internal/lib/util";
import { CurrencyConversionEvents } from "../../../internal/lib/currency-conversion/contracts/enums";
import { CardFormFieldNames } from "../../../common/enums";
import CardNumberValidator from "../../../internal/validators/card-number";
import CardExpirationValidator from "../../../internal/validators/expiration";

/**
 * Posts a message to the parent window to pass currency conversion data.
 * @param id The ID of the message.
 * @param type The type of the message.
 * @param data An object containing the data to be passed for currency conversion.
 */
export default (id: string, type: string, data: IDictionary) => {
  // Get the payment field element by ID
  const field = document.getElementById(paymentFieldId) as HTMLInputElement;

  // Get the value of the payment field or assign an empty string if it doesn't exist
  const value = field && field.value ? field.value : "";

  let isFieldValid = false;
  if (type === CardFormFieldNames.CardNumber) {
    isFieldValid = new CardNumberValidator().validate(value);
  } else if (type === CardFormFieldNames.CardExpiration) {
    isFieldValid = new CardExpirationValidator().validate(value);

    if (options.fieldValidation?.enabled) {
      isFieldValid = new CardExpirationValidator().validateDate(value);
    }
  }

  if (!isFieldValid) return;

  // Post a message to the parent window to pass currency conversion data
  pm.post(
    {
      data: {
        target: data.data.target,
        type,
        value,
      },
      id,
      type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionPassData}`,
    },
    "parent",
  );
};
