import IValidator from "./validator";
export default class Cvv implements IValidator {
    validate(cvv: string, isAmex?: boolean): boolean;
}
