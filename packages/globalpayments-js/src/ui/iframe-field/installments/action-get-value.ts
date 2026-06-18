import { options, postMessage } from "../../../internal";
import { IDictionary } from "../../../internal/lib/util";
import { InstallmentEvents } from "../../../internal/lib/installments/contracts/enums";
import { Program } from "../../../internal/lib/enums";

/**
 * Initiates a installment request and posts the response data to the parent window.
 * @param id The ID of the message.
 * @param data An object containing the data required for the installment request.
 */
export default (id: string, data: IDictionary): void => {
  // If ID is not provided, return early
  if (!id) return;

  // Destructure required data from the input based on program
  const { installmentReference, installmentId } = data;
  const payload: any = { installmentReference, installmentId };

  if (options.installments?.program === Program.VIS) {
    const { language = "", version = "" } = data;
    payload.language = language;
    payload.version = version;
  }

  postMessage.post(
    {
      data: payload,
      id,
      type: `ui:iframe-field:${InstallmentEvents.CardInstallmentSendValue}`,
    },
    "parent",
  );
};
