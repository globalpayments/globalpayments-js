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
      // @ts-ignore
      detail: [{
        data_path: "/card/card_number",
        description: "Invalid data",
      }],
      message: "Invalid input data.",
    });
  }

  return errors;
};
