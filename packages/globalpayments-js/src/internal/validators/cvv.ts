import IValidator from "./validator";

export default class Cvv implements IValidator {
  public validate(cvv: string, isAmex?: boolean): boolean {
    if (!cvv) {
      return false;
    }

    cvv = cvv.replace(/^\s+|\s+$/g, "");

    if (!/^\d+$/.test(cvv)) {
      return false;
    }

    if (typeof isAmex !== "undefined" && isAmex === true) {
      return cvv.length === 4;
    }

    if (typeof isAmex !== "undefined" && isAmex === false) {
      return cvv.length === 3;
    }

    return 3 <= cvv.length && cvv.length <= 4;
  }
}
