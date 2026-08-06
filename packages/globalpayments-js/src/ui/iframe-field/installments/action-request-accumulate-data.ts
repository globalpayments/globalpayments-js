import { postMessage } from "../../../internal";
import { InstallmentEvents } from "../../../internal/lib/installments/contracts/enums";
import { IDictionary } from "../../../internal/lib/util";
import CardNumberValidator from "../../../internal/validators/card-number";
import CardExpirationValidator from "../../../internal/validators/expiration";

export default (id: string, _type: string, data: IDictionary) => {
  const w = window as any;

  w.installmentData = w.installmentData || {};
  w.installmentData[data.data.type] = data.data.value;

  const installmentData = {
    cardNumber: w.installmentData['card-number'],
    cardExpiration: w.installmentData['card-expiration'],
  };
  const { cardNumber, cardExpiration } = installmentData;

  if (!cardNumber
    || !new CardNumberValidator().validate(cardNumber)
    || !cardExpiration
    || !new CardExpirationValidator().validate(cardExpiration)
    ) {
      return;
    };

  const eventType = `ui:iframe-field:${InstallmentEvents.CardInstallmentsRequestStart}`;
  postMessage.post(
    {
      data: installmentData,
      id,
      type: eventType,
    },
    "parent",
  );
};
