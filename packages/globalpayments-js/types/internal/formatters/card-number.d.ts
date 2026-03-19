import IFormatter from "./formatter";
export default class CardNumber implements IFormatter {
    format(cardNumber: string): string;
}
