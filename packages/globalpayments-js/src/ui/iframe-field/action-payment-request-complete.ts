import { postMessage } from "../../internal";
import { IDictionary } from "../../internal/lib/util";

/**
 * Completes a payment via the PaymentRequest API
 * after the integrator performs the server-side
 * authorization request. This is triggered in the parent
 * window, but the PaymentRequest functionality and
 * data only exists within the hoted field.
 *
 * @param id ID of the hosted field
 * @param data Payment status from the integrator
 */
export default async (id: string, data: IDictionary) => {
  if (!(window as any).globalPaymentResponse) {
    postMessage.post(
      {
        data: {
          code: "ERROR",
          message: "Missing PaymentResponse object",
        },
        id,
        type: "ui:iframe-field:error",
      },
      "parent",
    );
    return;
  }
  ((window as any).globalPaymentResponse as PaymentResponse)
    .complete(data.data.status)
    .then(() => {
      postMessage.post(
        {
          id,
          type: "ui:iframe-field:payment-request-completed",
        },
        "parent",
      );
    })
    .catch((e: Error) => {
      postMessage.post(
        {
          data: {
            code: "ERROR",
            message: e.message,
          },
          id,
          type: "ui:iframe-field:error",
        },
        "parent",
      );
    });
};
