import { postMessage } from "../../../internal";
import { IDictionary } from "../../../internal/lib/util";
import {CurrencyConversionEvents} from "../../../internal/lib/currency-conversion/contracts/enums";

/**
 * Initiates a currency conversion request and posts the response data to the parent window.
 * @param id The ID of the message.
 * @param data An object containing the data required for the currency conversion request.
 */
export default (id: string, data: IDictionary): void => {
  // If ID is not provided, return early
  if (!id) return;

  // Destructure required data from the input
  const { value, selectedCurrency } = data.data;

  postMessage.post(
    {
      data: { value, selectedCurrency },
      id,
      type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionSendValue}`,
    },
    "parent",
  );
};
