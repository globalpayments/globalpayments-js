import IFormatter from "./formatter";

export default class Expiration implements IFormatter {
  public format(exp: string, final = false): string {
    const pat = /^\D*(\d{1,2})(\D+)?(\d{1,4})?/;
    const groups = exp.match(pat);
    let month: string;
    let del: string;
    let year: string;

    if (!groups) {
      return "";
    }

    month = groups[1] || "";
    del = groups[2] || "";
    year = groups[3] || "";

    if (year.length > 0) {
      del = " / ";
    } else if (month.length === 2 || del.length > 0) {
      del = " / ";
    } else if (month.length === 1 && (month !== "0" && month !== "1")) {
      del = " / ";
    }

    if (month.length === 1 && del !== "") {
      month = "0" + month;
    }

    if (final && year.length === 2) {
      year =
        new Date()
          .getFullYear()
          .toString()
          .slice(0, 2) + year;
    }

    return month + del + year;
  }
}
