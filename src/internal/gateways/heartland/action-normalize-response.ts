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
      default:
        break;
    }

    return {
      error: true,
      reasons,
    };
  }

  const response: any = {
    paymentReference: data.token_value,
  };
  if (data.card && data.card.number) {
    response.details = {
      cardNumber: data.card.number,
    };
  }
  return response;
};
