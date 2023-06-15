export const ValidationMessages = {
  CardNumber: {
    // If user clicks but does not enter any value
    Required: 'A Card Number is required',

    // If card number is less than 12 digits
    CharactersLessThan12: 'The Card Number must consist of at least 12 digits',

    // If card number fails Luhn check
    NumberIsNotValid: 'The Card Number is not valid',
  },
  CardExpiration: {
    // If a user clicks but does not enter any value
    Required: 'Please enter a valid month/year',

    // If expiry date is not complete
    NotCompleted: 'Please enter a valid month/year',

    // If the year is not valid
    YearNotValid: 'The year is not valid',

    // If the month is not valid
    MonthNotValid: 'The month is not valid',

    // If expiration is in the past
    HasExpired: 'Please enter a valid month/year',
  },
  CardCvv: {
    // If user clicks but does not enter any value
    CodeIsNotValid: 'The Security Code is not valid',

    // If security code is less than 3 digits
    CodeIsLessThan3Digits: 'Security Code is too short',

    // If security code is 4 digits but card is not AMEX
    CodeMustBe3Digits: 'Security Code must be 3 digits',

    // If security code is not 4 digits for Amex
    AmexCodeMustBe4Digits: 'Security Code for Amex must be 4 digits',
  },
  CardHolderName: {
    // If user clicks but does not enter any value
    Required: 'Please enter a valid Cardholder Name',

    // If characters entered is less the 2
    CharactersLessThan2: 'There is an invalid character in the Cardholder name field',
  },
};