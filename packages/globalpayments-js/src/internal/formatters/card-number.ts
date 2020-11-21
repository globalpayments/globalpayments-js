import { typeByNumber } from "../lib/card-types";
import IFormatter from "./formatter";

export default class CardNumber implements IFormatter {
  public format(cardNumber: string): string {
    cardNumber = cardNumber.replace(/\D/g, "");
    const type = typeByNumber(cardNumber);

    if (!type) {
      return cardNumber;
    }

    const matches = cardNumber.match(type.format);

    if (!matches) {
      return cardNumber;
    }

    if (!type.format.global) {
      matches.shift();
    }
    return matches.join(" ").replace(/^\s+|\s+$/gm, "");
  }
}
