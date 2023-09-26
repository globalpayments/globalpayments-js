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
            if (charactersLessThan(trimSpaces(value), 12)) return createValidationResult(false, ValidationMessages.CardNumber.CharactersLessThan12);

            // If card number fails Luhn check
            // The Card Number is not valid
            if (!luhnCheck(trimSpaces(value))) return createValidationResult(false, ValidationMessages.CardNumber.NumberIsNotValid);

            return createValidationResult(true);
        case CardFormFieldNames.CardExpiration:
            // If expiry date is not complete
            // Please enter a valid month/year
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardExpiration.NotCompleted);

            const { isValid, message } = cardExpirationDateValidations(value);
            if (!isValid) return createValidationResult(isValid, message);

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
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardHolderName.NotValidCardHolderName);

            // If characters entered is less the 2
            if (charactersLessThan(trimSpaces(value), 2)) return createValidationResult(false, ValidationMessages.CardHolderName.NotValidCardHolderName);

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

const cardExpirationDateValidations = (value: string): { isValid: boolean, message?: string | undefined } => {
    const dateRegex = /^(0[1-9]|1[0-9])\/(20\d{2})$/;

    if (!dateRegex.test(trimSpaces(value))) return { isValid: false, message: ValidationMessages.CardExpiration.ExpiryDateNotValid };

    const [month, year] = value.split(' / ').map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (month < 1 || month > 12) return { isValid: false, message: ValidationMessages.CardExpiration.MonthNotValid };

    if (year < currentYear) return { isValid: false, message: ValidationMessages.CardExpiration.YearNotValid };

    if (year === currentYear && month < currentMonth)  return { isValid: false, message: ValidationMessages.CardExpiration.ExpiryDateNotValid };

    return { isValid: true };
}

const trimSpaces = (value: string): string => !value ? '': value.replaceAll(' ', '');