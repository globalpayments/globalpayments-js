export declare const getCurrencySymbol: (currencyCode: string) => string;
export declare const addCurrencyToAmount: (currency: string, amount: string | number | undefined) => string;
export declare const availableCurrencies: {
    description: string;
    code: string;
    symbol: string;
}[];
export declare const convertAmount: (amount: string, withoutDecimals?: boolean, decimalPlaces?: number) => string | void;
