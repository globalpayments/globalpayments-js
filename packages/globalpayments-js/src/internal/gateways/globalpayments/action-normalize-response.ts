import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  if (data.error && data.reasons) {
    return {
      error: data.error,
      reasons: data.reasons,
    };
  }

  if (data.action) {
    const reasons = [];

    switch (data.action) {
      case "action-error":
        reasons.push({
          code: "INVALID_REQUEST",
          message: data.payload,
        });
        break;
      case "hpp-api-timeout-error":
        reasons.push({
          code: "API_ERROR",
          message: data.payload,
        });
        break;
      default:
        for (const i in data.payload) {
          if (!data.payload.hasOwnProperty(i)) {
            continue;
          }

          const reason = data.payload[i];
          let code = "";

          switch (reason.errorCode) {
            case "INVALID_CARDNUMBER":
              code = "INVALID_CARD_NUMBER";
              break;
            case "INVALID_EXPIRY_DATE":
              code = "INVALID_CARD_EXPIRATION";
              break;
            case "INVALID_SECURITY_CODE":
              code = "INVALID_CARD_SECURITY_CODE";
              break;
            case "INVALID_CARDHOLDER_NAME":
              code = "INVALID_CARD_HOLDER_NAME";
              break;
            default:
              break;
          }

          reasons.push({
            code,
            message: reason.errorMessage,
          });
        }
        break;
    }

    return {
      error: true,
      reasons,
    };
  }

  return {
    customerReference: atob(data.SAVED_PAYER_REF),
    details: {
      cardholderName: atob(data.SAVED_PMT_NAME),
      orderId: atob(data.ORDER_ID),
    },
    paymentReference: atob(data.SAVED_PMT_REF),
    requestId: atob(data.PASREF),
  };
};
