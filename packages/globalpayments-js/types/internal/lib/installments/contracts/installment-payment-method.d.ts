/**
 * InstallmentPaymentMethod class model.
 */
export default class InstallmentPaymentMethod {
    entryMode: string;
    card: {
        maskedNumberLast4: string;
        expiryMonth: string;
        expiryYear: string;
    };
    constructor(_entryMode: string, _card: {
        maskedNumberLast4: string;
        expiryMonth: string;
        expiryYear: string;
    });
}
export declare function installmentPaymentMethodMapper(origin: {
    entry_mode: string;
    card: {
        masked_number_last4: string;
        expiry_month: string;
        expiry_year: string;
    };
}): InstallmentPaymentMethod;
