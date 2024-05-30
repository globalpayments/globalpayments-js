import translations from "../lib/translations/translations";

export const ValidationMessages = {
    CardNumber: {
      // If user clicks but does not enter any value
      Required: translations.en.validationMessages.CardNumber.Required,

      // If card number is less than 12 digits
      CharactersLessThan12: translations.en.validationMessages.CardNumber.CharactersLessThan12,

      // If card number fails Luhn check
      NumberIsNotValid: translations.en.validationMessages.CardNumber.NumberIsNotValid,

      // If card number is not found in the configured list of card types
      NotAllowedCardType: translations.en.validationMessages.CardNumber.NotAllowedCardType,
    },
    CardExpiration: {
      // If a user clicks but does not enter any value
      // If expiry date is not complete
      NotCompleted: translations.en.validationMessages.CardExpiration.NotCompleted,

      // If the year is not valid
      YearNotValid: translations.en.validationMessages.CardExpiration.YearNotValid,

      // If the month is not valid
      MonthNotValid: translations.en.validationMessages.CardExpiration.MonthNotValid,

      // If the expiry date is invalid or in the past
      ExpiryDateNotValid: translations.en.validationMessages.CardExpiration.ExpiryDateNotValid,
    },
    CardCvv: {
      // If user clicks but does not enter any value
      CodeIsNotValid: translations.en.validationMessages.CardCvv.CodeIsNotValid,

      // If security code is less than 3 digits
      CodeIsLessThan3Digits: translations.en.validationMessages.CardCvv.CodeIsLessThan3Digits,

      // If security code is 4 digits but card is not AMEX
      CodeMustBe3Digits: translations.en.validationMessages.CardCvv.CodeMustBe3Digits,

      // If security code is not 4 digits for Amex
      AmexCodeMustBe4Digits: translations.en.validationMessages.CardCvv.AmexCodeMustBe4Digits,
    },
    CardHolderName: {
      // If user clicks but does not enter any value
      // If characters entered is less the 2
      NotValidCardHolderName: translations.en.validationMessages.CardHolderName.NotValidCardHolderName,

      // If length is more than 100 characters
      CharactersMoreThan100: translations.en.validationMessages.CardHolderName.CharactersMoreThan100
    },
    CurrencyConversion: {
      // If user doesn't select any value
      Required: translations.en.validationMessages.CurrencyConversion.Required,
    }
};