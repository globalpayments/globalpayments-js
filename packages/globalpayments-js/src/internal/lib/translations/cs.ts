// cs - Czech
const cs = {
  labels: {
    "card-number": "Číslo karty",
    "card-expiration": "Platnost karty",
    "card-cvv": "CVV kód karty",
    "card-holder-name": "Jméno držitele karty",
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
    "submit": "Odeslat"
  },
  values: {
    "card-track": "Načíst kartu",
    "submit": "Odeslat"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Je vyžadováno číslo karty',
      CharactersLessThan12: 'Číslo karty musí obsahovat alespoň 12 číslic',
      NumberIsNotValid: 'Číslo karty není platné',
      NotAllowedCardType: 'Tento typ karty nelze zpracovat, použijte prosím jinou kartu'
    },
    CardExpiration: {
      NotCompleted: 'Zadejte platný měsíc/rok',
      YearNotValid: 'Rok není platný',
      MonthNotValid: 'Měsíc není platný',
      ExpiryDateNotValid: 'Platnost karty není platná',
    },
    CardCvv: {
      CodeIsNotValid: 'CVV kód karty není platný',
      CodeIsLessThan3Digits: 'CVV kód karty je příliš krátký',
      CodeMustBe3Digits: 'CVV kód karty musí mít 3 číslice',
      AmexCodeMustBe4Digits: 'CVV kód karty Amex musí mít 4 číslice',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Zadejte prosím platné jméno držitele karty',
      CharactersMoreThan100: 'Jméno držitele karty může mít maximálně 100 znaků'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo 256bitového šifrování SSL',
    "ssl-msg": '256bitové<br> šifrování SSL',
    "security-msg-alt": 'Zabezpečeno společností Global Payments',
    "security-msg": 'Bezpečně zpracováno společností <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Bezpečnostní kód',
    "aria-label": 'Informace o bezpečnostním kódu',
    "text": 'Další 3 číslice na zadní straně vaší karty. U karet American Express se jedná o další 4 číslice na přední straně vaší karty.'
  },
  "other-cards-label": 'Nebo zadejte údaje o kartě ručně',
  QR: {
    button: {
      text: 'Vyberte jinou platební metodu',
      "aria-label": 'Vyberte jinou platební metodu'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Platit ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
      getImageUrl: (assetBaseUrl: string): string => {
        const imageBase = assetBaseUrl + "images/";
        const url = `transparent url(${imageBase}Bankovni_Platba_Logo.svg) no-repeat 50% 50%`
        return url;
      }
    }
  },
  orderInformation: {
    amount: "Množství",
    orderReference: "Reference objednávky",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Vyberte preferovanou banku",
  }
}

export default cs;