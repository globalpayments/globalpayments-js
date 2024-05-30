import { options, postMessage } from "../../../internal";
import { IDictionary } from "../../../internal/lib/util";
import CardNumberValidator from "../../../internal/validators/card-number";
import CardExpirationValidator from "../../../internal/validators/expiration";
import { CurrencyConversionEvents } from "../../../internal/lib/currency-conversion/contracts/enums";
import {CardFormFieldNames} from "../../../common/enums";

/**
 * Posts a message to the parent window to start a currency conversion request.
 * @param id The ID of the message.
 * @param _type The type of the message.
 * @param data An object containing the data for the currency conversion request.
 */
export default (id: string, _type: string, data: IDictionary) => {
  const w = window as any;

  // Initialize dccData object in window context if not already present
  w.dccData = w.dccData || {};

  // Store data in dccData object
  w.dccData[data.data.type] = data.data.value;

  // Extract cardNumber and cardExpiration from dccData
  const dccData = {
    cardNumber: w.dccData[CardFormFieldNames.CardNumber],
    cardExpiration: w.dccData[CardFormFieldNames.CardExpiration],
  };

  const { cardNumber, cardExpiration } = dccData;

  // Check if cardNumber and cardExpiration are valid
  const isCardNumberValid = cardNumber && new CardNumberValidator().validate(cardNumber);
  let isCardExpirationValid = cardExpiration && new CardExpirationValidator().validate(cardExpiration);
  if (options.fieldValidation?.enabled) {
    isCardExpirationValid = new CardExpirationValidator().validateDate(cardExpiration);
  }

  if (!isCardNumberValid || !isCardExpirationValid) return;

  // Post a message to the parent window to start the currency conversion request
  postMessage.post(
    {
      data: dccData,
      id,
      type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionRequestStart}`,
    },
    "parent",
  );
};
