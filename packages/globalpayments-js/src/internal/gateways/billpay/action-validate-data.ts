import { IErrorReason } from "..";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  const errors: IErrorReason[] = [];

  if (!data["card-number"] && !data["card-track"] && !data["account-number"]) {
    if (!data["card-number"]) {
      errors.push({
        code: "INVALID_CARD_NUMBER",
        message: "The card number is invalid.",
      });
    } else if (!data["account-number"]) {
      errors.push({
        code: "INVALID_ACCOUNT_NUMBER",
        message: "The account number is invalid",
      });
    }
  }

  if (data["account-number"] && !data["routing-number"]) {
    errors.push({
      code: "INVALID_ROUTING_NUMBER",
      message: "The routing number is invalid",
    });
  }

  return errors;
};
