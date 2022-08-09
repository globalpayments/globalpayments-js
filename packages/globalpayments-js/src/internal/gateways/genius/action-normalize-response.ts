import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  if (data.error && data.reasons) {
    return {
      error: data.error,
      reasons: data.reasons,
    };
  }

  // TODO: parse these properly
  if (data.errors) {
    const reasons = [];

    for (const i in data.errors) {
      if (!data.errors.hasOwnProperty(i)) {
        continue;
      }

      const reason = data.errors[i];
      const serverErrorType =
        reason.code === "SERVER_REQUIRED" ? "missing" : "invalid";
      let code = "ERROR";
      let message = `An unknown error has occurred. Details: ${reason.error_Code} - ${reason.reason}`;

      if (reason.reason === "cardnumber") {
        code = "INVALID_CARD_NUMBER";
        message = `The card number is ${serverErrorType}`;
      } else if (reason.reason === "expirationdate") {
        code = "INVALID_CARD_EXPIRATION";
        message = `The card expiration date is ${serverErrorType}`;
      } else if (reason.reason === "cvv") {
        code = "INVALID_CARD_SECURITY_CODE";
        message = `The card security code is ${serverErrorType}`;
      }

      reasons.push({
        code,
        message,
      });
    }

    return {
      error: true,
      reasons,
    };
  }

  const response: any = {
    paymentReference: data.token,
  };

  return response;
};
