import { IErrorReason } from "../";
import { IDictionary } from "../../lib/util";
import { options } from "../../lib/options";

export default (data: IDictionary) => {
  const errors: IErrorReason[] = [];

  if (!data["card-number"]) {
    errors.push({
      code: "INVALID_CARD_NUMBER",
      message: "The card number is invalid.",
    });
  }

  if (data["card-holder-name"] && data["card-holder-name"].length > 100) {
    errors.push({
      code: "TOO_LONG_DATA",
      message: "The card holder name is too long",
    });
  }

  if (options.requireCardHolderName ) {
    if (!data["card-holder-name"]) {
      errors.push({
        code: "INVALID_CARD_HOLDER_NAME",
        message: "The card holder is mandatory",
      });
    }
  }

  return errors;
};
