// ro - Romanian
const ro = {
  labels: {
    "card-number": "Număr card",
    "card-expiration": "Dată expirare card",
    "card-cvv": "Cod CVV card",
    "card-holder-name": "Nume titular card",
    "email-id":"Email",
    "phone-number":"Mobile Number",
    "billing-address":"Billing address",
    "country":"Country",
    "shipping-address-country":"Country",
    "shipping-address":"Shipping address",
    "shipping-name":"Full Name",
    "country-code":"Mobile Number",
    "billing-city":"City",
    "shipping-city":"City",
    "billing-state":"State/Province",
    "shipping-state":"State/Province",
    "billing-apt":"Apt, Suite (optional)",
    "shipping-apt":"Apt, Suite (optional)",
    "billing-postal-code":"Postal Code",
    "shipping-postal-code":"Postal Code",
    "apt-suite":"Apt, Suite (optional)",
    "city":"City",
    "state":"State/Province",
    "postal-code":"Postal Code",
    "submit": "Trimiteți"
  },
  values: {
    "card-track": "Citiți cardul",
    "submit": "Trimiteți"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Numărul cardului este obligatoriu',
      CharactersLessThan12: 'Numărul cardului trebuie să fie format din cel puțin 12 cifre',
      NumberIsNotValid: 'Numărul cardului nu este valid',
      NotAllowedCardType: 'Nu se poate procesa acest tip de card, utilizați un alt card'
    },
    CardExpiration: {
      NotCompleted: 'Introduceți o lună valabilă/un an valid',
      YearNotValid: 'Anul nu este valid',
      MonthNotValid: 'Luna nu este validă',
      ExpiryDateNotValid: 'Data de expirare nu este validă',
    },
    CardCvv: {
      CodeIsNotValid: 'Codul CVV al cardului nu este valid',
      CodeIsLessThan3Digits: 'Codul CVV al cardului este prea scurt',
      CodeMustBe3Digits: 'Codul CVV al cardului trebuie să conțină 3 cifre',
      AmexCodeMustBe4Digits: 'Codul CVV al cardului pentru Amex trebuie să conțină 4 cifre',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Introduceți un nume valid al titularului cardului',
      CharactersMoreThan100: 'Numele titularului cardului poate avea cel mult 100 de caractere'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Sigla criptată SSL pe 256 de biți',
    "ssl-msg": 'Criptare<br>SSL pe 256 de biți',
    "security-msg-alt": 'Securizat de Global Payments',
    "security-msg": 'Procesat în mod securizat de <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Cod de securitate',
    "aria-label": 'Informații despre codul de securitate',
    "text": 'Cele 3 cifre suplimentare de pe spatele cardului. Pentru American Express, cele 4 cifre suplimentare de pe fața cardului.'
  },
  "other-cards-label": 'Sau introduceți manual detaliile cardului',
  QR: {
    button: {
      text: 'Opțiune de plată',
      "aria-label": 'Opțiune de plată'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Plateste cu ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
      // getImageUrl: (assetBaseUrl: string): string => {
      //   const imageBase = assetBaseUrl + "images/";
      //   const url = `transparent url(${imageBase}open-banking.svg) no-repeat 50% 50%`
      //   return url;
      // }
    }
  },
  orderInformation: {
    amount: "Cantitate",
    orderReference: "Referință de comandă",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Vă rugăm să selectați banca preferată",
  }
}

export default ro;