import IFormatter from "./formatter";
export default class Expiration implements IFormatter {
    format(exp: string, final?: boolean): string;
}
