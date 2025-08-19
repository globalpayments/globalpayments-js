import { CardFormFieldNames, ExpressPayFieldNames } from "../../common/enums";
import { luhnCheck, typeByNumber } from "../lib/card-types";
import { ValidationMessages } from "./messages";
import { options } from "../lib/options";
import { CharacterValidation, phoneNumberLength } from "../lib/enums";
import containsOnlyEnglishCharacters from "./english-characters-validation";
import { DCC_KEY } from "../lib/currency-conversion/contracts/constants";

export const validate = (fieldType: string, value: string, extraData?: any): { isValid: boolean, message?: string } => {
    switch (fieldType) {
        case CardFormFieldNames.CardNumber:
            // If user clicks but does not enter any value
            // A Card Number is required
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CardNumber.Required);

            // If card number is less than 12 digits
            // The Card Number must consist of at least 12 digits
            if (charactersLessThan(trimSpaces(value), 12)) return createValidationResult(false, ValidationMessages.CardNumber.CharactersLessThan12);

            // The entered Card Number type should be in the list of configured allowedCardTypes
            const allowedCardTypes = options.allowedCardTypes;
            if (allowedCardTypes && allowedCardTypes.length > 0) {
                const cardType = typeByNumber(value)?.code.toUpperCase();
                if (cardType && !allowedCardTypes.includes(cardType)) {
                    return createValidationResult(false, ValidationMessages.CardNumber.NotAllowedCardType)
                }
            }

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

            // If entered value does not contain English characters
            const englishCharacters = options.fieldValidation?.characterValidation;
            if (englishCharacters && englishCharacters === CharacterValidation.englishOnly) {
                if (!containsOnlyEnglishCharacters(value)){
                    return createValidationResult(false, ValidationMessages.CardHolderName.NotValidCardHolderName)
                }
            }

            // If characters entered are a sequence of special characters (dots, dashes, apostrophes, grave accents)
            if (cardHolderNameHasSpecialChars(value)) return createValidationResult(false, ValidationMessages.CardHolderName.NotValidCardHolderName);

            // If characters entered are more than 100
            if (value.length > 100) {
                return createValidationResult(false, ValidationMessages.CardHolderName.CharactersMoreThan100)
            }

            // If characters entered is less the 2
            if (charactersLessThan(trimSpaces(value), 2)) return createValidationResult(false, ValidationMessages.CardHolderName.NotValidCardHolderName);

            return createValidationResult(true);
        case DCC_KEY:
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.CurrencyConversion.Required);
            return createValidationResult(true);
        default:
        return createValidationResult(false);
    }
}

export const expressPayFieldsValidate = (fieldType: string, value: string, extraData?: any): { isValid: boolean, message?: string } => {
    switch (fieldType) {
        case ExpressPayFieldNames.EmailId: {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.EmailId.Required);
            if(!isValidEmail(value)){
                return createValidationResult(false, ValidationMessages.EmailId.InvalidEmail);
            }
            return createValidationResult(true);
        }
        case ExpressPayFieldNames.CountryCode: {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.PhoneNumber.Required);
            return createValidationResult(true);
        }
        case ExpressPayFieldNames.Phone: {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.PhoneNumber.Required);
            if(!isValidPhone(value)){
                return createValidationResult(false, ValidationMessages.PhoneNumber.InvalidLength);
            }
            return createValidationResult(true);
        }
        case ExpressPayFieldNames.BillingAddress: {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.BillingAddress.Required);
            return createValidationResult(true);
        }
        case ExpressPayFieldNames.ShippingAddress: {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.ShippingAddress.Required);
            return createValidationResult(true);
        }
        case (ExpressPayFieldNames.Country):
        case (ExpressPayFieldNames.ShippingCountry) :
        {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.BillingAddress.CountryRequired);
            return createValidationResult(true);
        }
        case (ExpressPayFieldNames.ShippingCity) :
        case (ExpressPayFieldNames.BillingCity) :
        {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.ShippingAddress.MandatoryCity);
            return createValidationResult(true);
        }
        case (ExpressPayFieldNames.BillingState) :
        case (ExpressPayFieldNames.ShippingState) :
        {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.ShippingAddress.MandatoryState);
            return createValidationResult(true);
        }
        case ExpressPayFieldNames.ShippingName: {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.ShippingAddress.MandatoryName);
            return createValidationResult(true);
        }
        case ExpressPayFieldNames.BillingPostalCode:
        case ExpressPayFieldNames.ShippingPostalCode:
        {
            if (isEmpty(value)) return createValidationResult(false, ValidationMessages.ShippingAddress.MandatoryPostalCode);
            if (!isValidPostalCode(value)) {
                return createValidationResult(false, ValidationMessages.ShippingAddress.InvalidPostalCode)
            }
            return createValidationResult(true);
        }
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

const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

const isValidPhone = (value: string): boolean => {
    return value.length === phoneNumberLength
}

const isValidPostalCode = (value: string): boolean => {
    // Assuming a simple regex for US postal codes (5 digits or 5+4 format)
    const postalCodeRegex = /^\d{5}(-\d{4})?$/;
    return postalCodeRegex.test(value);
}

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

const cardHolderNameHasSpecialChars = (value: string | undefined): boolean => {
    if (!value || (value && !value.length)) return true;

    // Check for consecutive and repeated allowed special characters
    const notAllowedSpecialCharsPattern = /(\.{2,}|-{2,}|'{2,}|`{2,})/;
    if (notAllowedSpecialCharsPattern.test(value)) return true;

    // Check for NOT allowed special characters
    let hasAnyNotAllowedSpecialChar = false;
    for (const char of Array.from("…´—_|!@#$%&/=?*+;:,<>[]{}()\"\\")) {
        hasAnyNotAllowedSpecialChar = value.indexOf(char) !== -1;

        if (hasAnyNotAllowedSpecialChar) break;
    }

    return hasAnyNotAllowedSpecialChar;
};