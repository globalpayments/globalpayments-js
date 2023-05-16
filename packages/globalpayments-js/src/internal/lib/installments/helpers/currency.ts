export const getCurrencySymbol = (currency: string): string => {
    switch (currency) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'GBP':
        default:
            return '£';
    }
}

export const addCurrencyToAmount = (currency: string, amount: string | number | undefined): string => {
    const sanitizedAmount = (amount !== undefined && amount !== null) ? amount : 0;

    return `${getCurrencySymbol(currency)}${sanitizedAmount}`;
}