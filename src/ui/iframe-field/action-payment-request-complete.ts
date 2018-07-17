import { postMessage } from "../../internal";
import { IDictionary } from "../../internal/lib/util";

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
