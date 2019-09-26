import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  if (data.error && data.reasons) {
    return {
      error: data.error,
      reasons: data.reasons,
    };
  }

  // TODO: parse these properly
  if (["FAIL", "FAILURE"].indexOf(data.status) !== -1) {
    return {
      error: true,
      reasons: [{
        code: "ERROR",
        message: `${data.responseCode}: ${data.message}`,
      }],
    };
  }

  const response: any = {
    paymentReference: data.tsepToken,
    requestId: data.transactionId,
  };

  return response;
};
