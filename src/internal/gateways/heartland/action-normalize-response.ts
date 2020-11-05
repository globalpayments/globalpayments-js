import { ISuccess } from "..";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  if (data.error && data.reasons) {
    return {
      error: data.error,
      reasons: data.reasons,
    };
  }

  if (data.error) {
    const reasons = [];

    switch (data.error.param) {
      case "card.number":
        reasons.push({
          code: "INVALID_CARD_NUMBER",
          message: data.error.message,
        });
        break;
      case "card.exp_month":
      case "card.exp_year":
        reasons.push({
          code: "INVALID_CARD_EXPIRATION_DATE",
          message: data.error.message,
        });
        break;
      default:
        break;
    }

    return {
      error: true,
      reasons,
    };
  }

  const response: ISuccess = {
    details: {},
    paymentReference: data.token_value,
  };

  if (data.card && data.card.number) {
    response.details.cardNumber = data.card.number;
  }

  if (data.is_fsahsa) {
    response.details.isHsaFsa = data.is_fsahsa === "Y";
  }

  if (data.surcharge_allowed) {
    response.details.canSurcharge = data.surcharge_allowed === "Y";
  }

  return response;
};
