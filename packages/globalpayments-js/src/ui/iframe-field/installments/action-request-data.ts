import { postMessage as pm } from "../../../internal";
import { InstallmentEvents } from "../../../internal/lib/installments/contracts/enums";
import paymentFieldId from "../../../internal/lib/payment-field-id";
import { IDictionary } from "../../../internal/lib/util";

export default (id: string, type: string, data: IDictionary) => {
  const field = document.getElementById(paymentFieldId) as HTMLInputElement;
  const value = field && field.value ? field.value : "";

  pm.post(
    {
      data: {
        target: data.data.target,
        type,
        value,
      },
      id,
      type: `ui:iframe-field:${InstallmentEvents.CardInstallmentsPassData}`,
    },
    "parent",
  );
};
