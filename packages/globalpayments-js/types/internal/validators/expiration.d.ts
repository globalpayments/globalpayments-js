import IValidator from "./validator";
export default class Expiration implements IValidator {
    validate(exp: string): boolean;
    /**
     * Validates the expiration date in the format "MM/YYYY".
     * Returns true if the expiration date is valid, otherwise false.
     * @param exp The expiration date string to validate.
     * @returns A boolean indicating whether the expiration date is valid or not.
     */
    validateDate(exp: string): boolean;
}
