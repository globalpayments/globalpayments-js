import {
    getCurrencySymbol as _getCurrencySymbol,
    addCurrencyToAmount as _addCurrencyToAmount,
} from "../../../../common/currency";

export const getCurrencySymbol = (currency: string): string => _getCurrencySymbol(currency);

export const addCurrencyToAmount = (currency: string, amount: string | number | undefined): string => _addCurrencyToAmount(currency, amount);