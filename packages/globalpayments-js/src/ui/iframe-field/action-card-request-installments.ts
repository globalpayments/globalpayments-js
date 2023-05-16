import paymentFieldId from "../../internal/lib/payment-field-id";
import { postMessage } from "../../internal";
import queryInstallmentPlans from "../../internal/lib/installments/requests/query-installment-plans";
import { InstallmentEvents } from "../../internal/lib/installments/contracts/enums";
import { IDictionary } from "../../internal/lib/util";
import { typeByNumber } from "../../internal/lib/card-types";

/**
 * Requests the installment plans data for a valid credit card number
 */
export default (id: string, data: IDictionary): void => {
  const el = document.getElementById(paymentFieldId) as HTMLInputElement;
  if (!el) {
    return;
  }

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
    if (id) {
      const eventType = `ui:iframe-field:${InstallmentEvents.CardInstallmentsRequestCompleted}`;
      postMessage.post(
        {
          data: responseData,
          id,
          type: eventType,
        },
        "parent",
      );
    }
  });
};
