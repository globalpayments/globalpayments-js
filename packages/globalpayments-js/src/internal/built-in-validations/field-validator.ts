import { CardFormFieldNames } from "../../common/enums";
import { luhnCheck } from "../lib/card-types";
import { ValidationMessages } from "./messages";

export const validate = (fieldType: string, value: string, extraData?: any): { isValid: boolean, message?: string } => {
    switch (fieldType) {
        case CardFormFieldNames.CardNumber:
            // If user clicks but does not enter any value
            // A Card Number is required
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardNumber.Required);

            // If card number is less than 12 digits
            // The Card Number must consist of at least 12 digits
            if (charactersLessThan(value, 12)) return createValidationResult(false, ValidationMessages.CardNumber.CharactersLessThan12);

            // If card number fails Luhn check
            // The Card Number is not valid
            if (!luhnCheck(value.replaceAll(" ", ""))) return createValidationResult(false, ValidationMessages.CardNumber.NumberIsNotValid);

            return createValidationResult(true);
        case CardFormFieldNames.CardExpiration:
            // If expiry date is not complete
            // Please enter a valid month/year
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardExpiration.NotCompleted);

            // If a user clicks but does not enter any value
            // Please enter a valid month/year
            if (charactersLessThan(value, 4)) return createValidationResult(false, ValidationMessages.CardExpiration.NotCompleted);

            // If the month is not valid
            // The month is not valid
            if (!isValidMonth(getCardExpirationDate(value).month)) return createValidationResult(false, ValidationMessages.CardExpiration.MonthNotValid);

            // If the year is not valid
            // The year is not valid
            if (!isValidYear(getCardExpirationDate(value).year)) return createValidationResult(false, ValidationMessages.CardExpiration.YearNotValid);

            // If the expiry date is expired (Not in HF built-in validation requirements)
            // Please enter a valid date
            if (hasCardExpirationDateExpired(getCardExpirationDate(value))) return createValidationResult(false, ValidationMessages.CardExpiration.HasExpired);

            return createValidationResult(true);
        case CardFormFieldNames.CardCvv:
            // If user clicks but does not enter any value
            // The Security Code is not valid
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardCvv.CodeIsNotValid);

            // If security code is less than 3 digits
            // Security Code is too short
            if (charactersLessThan(value, 3)) return createValidationResult(false, ValidationMessages.CardCvv.CodeIsLessThan3Digits);

            // If security code is 4 digits but card is not AMEX
            // Security Code must be 3 digits
            if (extraData
                && !extraData.isAmex
                && (charactersLessThan(value, 3)
                || !charactersEqualTo(value, 3))
                ) return createValidationResult(false, ValidationMessages.CardCvv.CodeMustBe3Digits);

            // If security code is not 4 digits for Amex
            // Security Code for Amex must be 4 digits
            if (extraData
                && extraData.isAmex
                && (charactersLessThan(value, 4)
                || !charactersEqualTo(value, 4))
                ) return createValidationResult(false, ValidationMessages.CardCvv.AmexCodeMustBe4Digits);

            return createValidationResult(true);
        case CardFormFieldNames.CardHolderName:
            // If user clicks but does not enter any value
            // Please enter a valid Cardholder Name
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardHolderName.Required);

            // If characters entered is less the 2
            // There is an invalid character in the Cardholder name field.
            if (charactersLessThan(value, 2)) return createValidationResult(false, ValidationMessages.CardHolderName.CharactersLessThan2);

            return createValidationResult(true);
        default:
            return createValidationResult(false);
    }
}

const createValidationResult = (isValid: boolean, message?: string): { isValid: boolean, message?: string } => ({ isValid, message });

const isEmpty = (value: string | undefined): boolean => {
    if (!value || (value && !value.length)) {
        return true;
    }
    return false;
};

const charactersLessThan = (value: string | undefined, minCharacters: number): boolean => {
    if (!value || (value && value.length < minCharacters)) {
        return true;
    }
    return false;
};

const charactersEqualTo = (value: string | undefined, totalCharacters: number): boolean => {
    if (!value || (value && value.length === totalCharacters)) {
        return true;
    }
    return false;
};

const getCardExpirationDate = (value: string): { month: string, year: string } => {
    const [m, y] = value.split(" / ");
    const month = m.replace(/^\s+|\s+$/g, "");
    let year = y.replace(/^\s+|\s+$/g, "");

    if (year.length === 2) {
        year = new Date().getFullYear().toString().slice(0, 2) + year;
    }

    return { month, year };
}

const isValidYear = (value: string | undefined): boolean => {
    if (!value || value.length < 4) return false;

    const currentYear = new Date().getFullYear();
    const year = parseInt(value, 10);
    if (year < currentYear || year > currentYear + 10) return false;

    return true;
}

const isValidMonth = (value: string | undefined): boolean => {
    if (!value || value.length < 2) return false;

    if (parseInt(value, 10) < 1 || parseInt(value, 10) > 12 ) return false;

    return true;
}

const hasCardExpirationDateExpired = (expirationDate: { year: string, month: string }) => {
    const { year, month } = expirationDate;
    // creates date as 1 day past end of
    // expiration month since JS months
    // are 0 indexed
    return new Date(parseInt(year, 10), parseInt(month, 10), 1) < new Date();
}