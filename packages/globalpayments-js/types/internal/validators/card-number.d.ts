import IValidator from "./validator";
export default class CardNumber implements IValidator {
    validate(cardNumber: string): boolean;
}
