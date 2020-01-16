import { IErrorReason } from "../";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  const errors: IErrorReason[] = [];
  const cardNumber = data["card-number"].replace(/\s+/g, "");

  // The error message here is irrelevant - actual 'invalid_input' error is generated in tokenize.ts.
  // For type compatibility reason, this code is preserved here.
  // if (!data["card-number"] && !data["card-track"] && !data["account-number"]) {
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    errors.push({
      code: "invalid_input",
      message: "Invalid input data.",
    });
  } /*else if (!data["account-number"]) {
      errors.push({
        code: "INVALID_ACCOUNT_NUMBER",
        message: "The account number is invalid",
      });
    }*/
  // }

/*  if (data["account-number"] && !data["routing-number"]) {
    errors.push({
      code: "INVALID_ROUTING_NUMBER",
      message: "The routing number is invalid",
    });
  }*/

  return errors;
};
