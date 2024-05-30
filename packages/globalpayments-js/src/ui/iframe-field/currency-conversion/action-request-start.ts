import {bus, postMessage} from "../../../internal";
import queryCurrencyConversion from "../../../internal/lib/currency-conversion/requests/query-currency-conversion";
import { IDictionary } from "../../../internal/lib/util";
import { CurrencyConversionEvents, CurrencyConversionStatus } from "../../../internal/lib/currency-conversion/contracts/enums";
import { IError } from "../../../internal/gateways";
import { convertAmount } from "../../../common/currency";
import { setCurrencyConversionAvailabilityStatus } from "../../../internal/lib/currency-conversion/utils/helpers";

/**
 * Initiates a currency conversion request and posts the response data to the parent window.
 * @param id The ID of the message.
 * @param data An object containing the data required for the currency conversion request.
 */
export default (id: string, data: IDictionary): void => {
  // If ID is not provided, return early
  if (!id) return;

  // Destructure required data from the input
  const { cardNumber, cardExpiration } = data;
  let { amount } = data;
  amount = convertAmount(amount, true, 0);

  // Extract expiry month and year from the card expiration date
  const [expiryMonth, fullExpiryYear] = cardExpiration.replace(' ', '').split('/');

  // Query the currency conversion API
  queryCurrencyConversion({
    number: cardNumber,
    amount,
    expiryMonth,
    expiryYear: fullExpiryYear.slice(-2),
  }).then((responseData: any) => {
    // Store the new AvailabilityStatus (in the iframe scope)
    const isCurrencyConversionAvailable = responseData.status === CurrencyConversionStatus.CurrencyConversionAvailable;
    setCurrencyConversionAvailabilityStatus(isCurrencyConversionAvailable);

    const w = window as any;

    // Clean up the dcc local data used for this request
    delete w.dccData;

    // Post the response data to the parent window
    postMessage.post(
      {
        data: responseData,
        id,
        type: `ui:iframe-field:${CurrencyConversionEvents.CurrencyConversionRequestCompleted}`,
      },
      "parent",
    );
  }).catch(error => {
    const errorObj: IError = {
      error: true,
      reasons: [{
        code: "ERROR",
        message: error,
      }],
    };

    bus.emit('error', errorObj);
  });
};
