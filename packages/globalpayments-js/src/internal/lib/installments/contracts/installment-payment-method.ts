/**
 * InstallmentPaymentMethod class model.
 */
export default class InstallmentPaymentMethod {
    public entryMode: string;
    public card: {
        maskedNumberLast4: string,
        expiryMonth: string,
        expiryYear: string,
    };

    constructor(
        _entryMode: string,
        _card: {
            maskedNumberLast4: string,
            expiryMonth: string,
            expiryYear: string,
        },
    ) {
        this.entryMode = _entryMode;
        this.card = _card;
    }
}

export function installmentPaymentMethodMapper(origin: {
    entry_mode: string,
    card: {
        masked_number_last4: string
        expiry_month: string;
        expiry_year: string;
    },
}): InstallmentPaymentMethod {
    return {
        entryMode: origin.entry_mode,
        card: {
            maskedNumberLast4: origin.card.masked_number_last4,
            expiryMonth: origin.card.expiry_month,
            expiryYear: origin.card.expiry_year,
        },
    };
}