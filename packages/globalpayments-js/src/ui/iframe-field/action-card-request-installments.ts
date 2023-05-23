import { postMessage } from "../../internal";
import queryInstallmentPlans from "../../internal/lib/installments/requests/query-installment-plans";
import { InstallmentEvents } from "../../internal/lib/installments/contracts/enums";
import { IDictionary } from "../../internal/lib/util";
import { typeByNumber } from "../../internal/lib/card-types";

/**
 * Requests the installment plans data for a valid credit card number
 */
export default (id: string, data: IDictionary): void => {
  if (!id) return;

  const { cardNumber, amount, cardExpiration } = data;
  const [expiryMonth, fullExpiryYear] = cardExpiration.replace(' ', '').split('/');
  const { code: brand } = typeByNumber(cardNumber) || {};

  queryInstallmentPlans({
    number: cardNumber,
    amount,
    brand,
    expiryMonth,
    expiryYear: fullExpiryYear.slice(-2),
  }).then((responseData: any) => {
    let eventType = InstallmentEvents.CardInstallmentsRequestCompleted;

    if (responseData[`error_code`]) {
      eventType = InstallmentEvents.CardInstallmentsRequestFailed;
    }

    postMessage.post(
      {
        data: responseData,
        id,
        type: `ui:iframe-field:${eventType}`,
      },
      "parent",
    );
  }).catch((responseError: any) => {
    postMessage.post(
      {
        data: responseError,
        id,
        type: `ui:iframe-field:${InstallmentEvents.CardInstallmentsRequestFailed}`,
      },
      "parent",
    );
  });
};
