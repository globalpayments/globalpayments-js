const en = {
  labels: {
    "card-number": "Card Number",
    "card-expiration": "Card Expiration",
    "card-cvv": "Card CVV",
    "card-holder-name": "Card Holder Name",
    "submit": "Submit"
  },
  values: {
    "card-track": "Read Card",
    "submit": "Submit"
  },
  validationMessages: {
    CardNumber: {
      Required: 'A Card Number is required',
      CharactersLessThan12: 'The Card Number must consist of at least 12 digits',
      NumberIsNotValid: 'The Card Number is not valid',
      NotAllowedCardType: 'Cannot process this card type, please use another Card'
    },
    CardExpiration: {
      NotCompleted: 'Please enter a valid month/year',
      YearNotValid: 'The year is not valid',
      MonthNotValid: 'The month is not valid',
      ExpiryDateNotValid: 'The Expiry Date is not valid',
    },
    CardCvv: {
      CodeIsNotValid: 'The Card CVV is not valid',
      CodeIsLessThan3Digits: 'Card CVV is too short',
      CodeMustBe3Digits: 'Card CVV must be 3 digits',
      AmexCodeMustBe4Digits: 'Card CVV for Amex must be 4 digits',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Please enter a valid Card Holder Name',
      CharactersMoreThan100: 'Card Holder Name can be at most 100 characters'
    }
  },
  footer: {
    "ssl-msg-alt": '256-bit SSL encrypted logo',
    "ssl-msg": '256-bit SSL<br>encrypted',
    "security-msg-alt": 'Secured by Global Payments',
    "security-msg": 'Securely processed by <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Security Code',
    "aria-label": 'Information about Security Code',
    "text": 'The additional 3 digits on the back of your card. For American Express, it is the additional 4 digits on the front of your card.'
  },
  "other-cards-label": 'Or enter card details manually',
  QR: {
    scanRqCode: "Scan QR Code",
    payInApp: "to pay in app",
    amount: {
      "aria-label": 'Transaction Total'
    },
    qrImage: {
      alt: 'QR Code Display',
      "aria-label": 'QR Code Display'
    },
    timer: {
      text: 'This QR Code will expire in:',
      minutes: 'mins',
      seconds: 's',
      "icon-alt": 'Remaining Time Icon'
    },
    expiredScreen: {
      title: 'QR Code has expired.',
      alt: 'QR Code has expired.',
      text: 'Click the link below to return to the payment options.'
    },
    button: {
      text: 'Select another payment method',
      "aria-label": 'Select another payment method'
    },
    loading: "Loading",
    redirectScreen: {
      redirectingToPaymentPageMessage: 'Redirecting to payment page',
    },
  },
  apms: {
    button: {
      "aria-label": "Pay with"
    }
  }
}

export default en;