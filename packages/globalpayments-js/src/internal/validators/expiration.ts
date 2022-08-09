import IValidator from "./validator";

export default class Expiration implements IValidator {
  public validate(exp: string): boolean {
    let m: string;
    let y: string;

    if (!exp) {
      return false;
    }

    const split = exp.split("/");
    [m, y] = split;

    if (!m || !y) {
      return false;
    }

    m = m.replace(/^\s+|\s+$/g, "");
    y = y.replace(/^\s+|\s+$/g, "");

    if (!/^\d+$/.test(m)) {
      return false;
    }
    if (!/^\d+$/.test(y)) {
      return false;
    }

    if (y.length === 2) {
      y = new Date().getFullYear().toString().slice(0, 2) + y;
    }

    const month = parseInt(m, 10);
    const year = parseInt(y, 10);

    if (!(1 <= month && month <= 12)) {
      return false;
    }

    // creates date as 1 day past end of
    // expiration month since JS months
    // are 0 indexed
    return new Date(year, month, 1) > new Date();
  }
}
