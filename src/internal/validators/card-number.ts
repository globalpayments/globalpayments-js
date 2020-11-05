import { luhnCheck, typeByNumber } from "../lib/card-types";
import IValidator from "./validator";

export default class CardNumber implements IValidator {
  public validate(cardNumber: string): boolean {
    if (!cardNumber) {
      return false;
    }

    cardNumber = cardNumber.replace(/[-\s]/g, "");
    const type = typeByNumber(cardNumber);

    if (!type) {
      return false;
    }
    return luhnCheck(cardNumber) && type.lengths.indexOf(cardNumber.length) !== -1;
  }
}
