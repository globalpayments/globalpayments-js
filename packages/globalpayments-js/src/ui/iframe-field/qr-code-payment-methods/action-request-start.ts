import { IDictionary } from "@globalpayments/js/types/internal/lib/util";
import { ApmInternalEvents } from "../../../apm/enums";
import { postMessage } from "../../../internal";
import getQrCodePaymentMethods from "../../../apm/qr-code-payments/requests/get-qr-code-payment-methods";

/**
 * Requests the QR Code Payment methods
 */
export default (id: string, data: IDictionary): void => {
  if (!id) return;

  getQrCodePaymentMethods({
  }).then((response: any) => {
    const paymentMethodConfigurations: any[] = response[`payment_method_configurations`];

    // Complete the request event
    postMessage.post(
      {
        data: {
          paymentMethodConfigurations,
          ...data,
        },
        id,
        type: `ui:iframe-field:${ApmInternalEvents.PaymentMethodsRequestCompleted}`,
      },
      "parent",
    );
  }).catch(error => {
    // tslint:disable-next-line:no-console
    console.log('Request Error: Payment Methods Request Failed.', error);
  });
}