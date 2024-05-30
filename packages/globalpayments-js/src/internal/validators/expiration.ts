import IValidator from "./validator";

export default class Expiration implements IValidator {
  public validate(exp: string): boolean {
    let m: string;
    let y: string;

    if (!exp) {
      return false;
    }

    [m, y] = exp.split("/");

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

  /**
   * Validates the expiration date in the format "MM/YYYY".
   * Returns true if the expiration date is valid, otherwise false.
   * @param exp The expiration date string to validate.
   * @returns A boolean indicating whether the expiration date is valid or not.
   */
  public validateDate(exp: string): boolean {
    // Regular expression to match "MM/YYYY" format
    const dateRegex = /^(0[1-9]|1[0-9])\/(20\d{2})$/;

    // Remove whitespace from the expiration date string
    const val = !exp ? '': exp.replaceAll(' ', '');

    // Check if the expiration date matches the expected format
    if (!dateRegex.test(val)) return false;

    const [month, year] = exp.split(' / ').map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Validate the month (1-12)
    if (month < 1 || month > 12) return false;

    // Validate the year (current year or later)
    if (year < currentYear) return false;

    // If the year is the current year, validate the month (current month or later)
    if (year === currentYear && month < currentMonth) {
      return false;
    }

    // Expiration date is valid
    return true;
  }
}
