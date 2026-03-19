export interface ICardType {
    code: string;
    regex: RegExp;
    format: RegExp;
    lengths: number[];
}
/**
 * typeByNumber
 *
 * Helper function to grab the ICardType for a given card number.
 *
 * @param cardNumber - The card number
 */
export declare function typeByNumber(cardNumber: string): ICardType | undefined;
/**
 * typeByTrack
 *
 * @param data - track data
 * @param isEncrypted - (default: false)
 * @param trackNumber
 */
export declare function typeByTrack(data: string, isEncrypted?: boolean, trackNumber?: string): ICardType | undefined;
/**
 * luhnCheck
 *
 * Runs a mod 10 check on a given card number.
 *
 * @param cardNumber - The card number
 */
export declare function luhnCheck(cardNumber: string): boolean;
declare const cardTypes: ICardType[];
export default cardTypes;
