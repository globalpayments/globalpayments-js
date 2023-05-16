/**
 * InstallmentPaymentMethod class model.
 */
export default class InstallmentPaymentMethod {
    public entryMode: string;
    public card: {
        brand: string,
        maskedNumberLast4: string
    };

    constructor(
        _entryMode: string,
        _card: {
            brand: string,
            maskedNumberLast4: string
        },
    ) {
        this.entryMode = _entryMode;
        this.card = _card;
    }
}

export function installmentPaymentMethodMapper(origin: {
    entry_mode: string,
    card: {
        brand: string,
        masked_number_last4: string
    },
}): InstallmentPaymentMethod {
    return {
        entryMode: origin.entry_mode,
        card: {
            brand: origin.card.brand,
            maskedNumberLast4: origin.card.masked_number_last4,
        },
    };
}