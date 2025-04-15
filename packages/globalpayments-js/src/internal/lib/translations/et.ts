// et - Estonia
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
      },
      CurrencyConversion: {
        Required: "Choose preferred currency"
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
        getAriaLabel: (paymentMethod: string): string => {
          const resource = `Pay with ##VALUE1##`;
          return resource.replace('##VALUE1##', paymentMethod);
        },
        // getImageUrl: (assetBaseUrl: string): string => {
        //   const imageBase = assetBaseUrl + "images/";
        //   const url = `transparent url(${imageBase}open-banking.svg) no-repeat 50% 50%`
        //   return url;
        // }
      },
      redirectToBank: "Redirecting",
    },
    dcc: {
      label: "Select Your Preferred Currency",
      additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string) => {
        const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
        return resource.replace('##VALUE1##', currency)
          .replace('##VALUE2##', exchangeRate)
          .replace('##VALUE3##', payerCurrency)
          .replace('##VALUE4##', marginRatePercentage);
      },
      cardCurrency: {
        tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
          const resource = `<p>I accept that I have been offered a choice of currencies for payment. I accept the conversion rate and final amount and that the final selected transaction currency is the cardholder's chosen currency, ##VALUE1##.</p>
          <p>Reference Rate Provided by: ##VALUE2##,<br />
          Exchange rate offered on: ##VALUE3##.</p>`;
          return resource.replace('##VALUE1##', payerCurrency)
            .replace('##VALUE2##', exchangeRateSource)
            .replace('##VALUE3##', exchangeRateTimeCreated);
        },
        "aria-label": "Information about Currency Conversion"
      },
      merchantCurrency: {
        tooltip: (exchangeRateSource: string, exchangeRateTimeCreated: string) => {
          const resource = `<p>Reference Rate Provided by: ##VALUE1##,<br />
          Exchange rate offered on: ##VALUE2##.</p>`;
          return resource.replace('##VALUE1##', exchangeRateSource)
            .replace('##VALUE2##', exchangeRateTimeCreated);
        },
        "aria-label": "Information about Currency Conversion"
      }
    },
    orderInformation: {
        amount: "Summa",
        orderReference: "Tellimuse viide",
      },
    bankSelection: {
      pleaseSelectYourPreferredBank: "Please select your preferred bank",
    },
  }

  export default en;

