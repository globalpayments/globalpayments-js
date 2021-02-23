import { IErrorReason } from "../";
import { IDictionary } from "../../lib/util";

export default (data: IDictionary) => {
  const errors: IErrorReason[] = [];

  if (!data["card-number"]) {
    errors.push({
      code: "INVALID_CARD_NUMBER",
      message: "The card number is invalid.",
    });
  }

  return errors;
};
