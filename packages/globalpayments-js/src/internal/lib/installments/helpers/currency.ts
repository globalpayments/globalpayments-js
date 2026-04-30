import {
    getCurrencySymbol as _getCurrencySymbol,
    addCurrencyToAmount as _addCurrencyToAmount,
} from "../../../../common/currency";
import { getCurrentLanguage } from "../../detectLanguage";
import { EligibleCountries } from "../../enums";

export const getCurrencySymbol = (currency: string): string => _getCurrencySymbol(currency);

export const addCurrencyToAmount = (currency: string, amount: string | number | undefined): string => _addCurrencyToAmount(currency, amount);

export const getLearnMoreLink = (country: string | undefined): string => {
    const lang = getCurrentLanguage();
    const link = "https://www.visa.ca/en_CA/partner-with-us/payment-technology/installments.html";
    switch (country) {
        case EligibleCountries.CA :
            return lang === "fr"
                ? "https://www.visa.ca/fr_CA/partner-with-us/payment-technology/installments.html"
                : link;
        case EligibleCountries.UK :
            return "https://www.visa.co.uk/how-you-pay-matters/pay-instalments.html";
        default:
            return link;
    }
};