import { IErrorReason } from "..";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  const errors: IErrorReason[] = [];

  if (!data["card-number"]) {
    errors.push({
      code: "INVALID_CARD_NUMBER",
      message: "The card number is invalid.",
    });
  }

  if (!data["card-cvv"]) {
    errors.push({
      code: "INVALID_CARD_SECURITY_CODE",
      message: "The card security code is invalid.",
    });
  }

  if (!data["card-expiration"]) {
    errors.push({
      code: "INVALID_CARD_EXPIRATION",
      message: "The card expiration is invalid.",
    });
  }

  return errors;
};
