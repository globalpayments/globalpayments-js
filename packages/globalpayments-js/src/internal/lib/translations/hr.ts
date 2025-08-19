// hr - Croatian
const hr = {
  labels: {
    "card-number": "Broj kartice",
    "card-expiration": "Istek kartice",
    "card-cvv": "CVV kartice",
    "card-holder-name": "Ime i prezime vlasnika kartice",
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
    "submit": "Pošalji"
  },
  values: {
    "card-track": "Očitaj karticu",
    "submit": "Pošalji"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Potreban je broj kartice',
      CharactersLessThan12: 'Broj kartice mora se sastojati od najmanje 12 znamenki',
      NumberIsNotValid: 'Broj kartice nije valjan',
      NotAllowedCardType: 'Nije moguće obraditi ovu vrstu kartice, upotrijebite drugu karticu'
    },
    CardExpiration: {
      NotCompleted: 'Unesite valjani mjesec/godinu',
      YearNotValid: 'Godina nije valjana',
      MonthNotValid: 'Mjesec nije valjan',
      ExpiryDateNotValid: 'Datum isteka nije valjan',
    },
    CardCvv: {
      CodeIsNotValid: 'CVV kartice nije valjan',
      CodeIsLessThan3Digits: 'CVV kartice je prekratak',
      CodeMustBe3Digits: 'CVV kartice mora imati 3 znamenke',
      AmexCodeMustBe4Digits: 'CVV kartice za Amex mora imati 4 znamenke',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Unesite valjano ime i prezime vlasnika kartice',
      CharactersMoreThan100: 'Ime i prezime vlasnika kartice može imati najviše 100 znakova'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256-bitni SSL šifrirani logotip',
    "ssl-msg": '256-bitni SSL<br>šifrirani',
    "security-msg-alt": 'Osigurala tvrtka Global Payments',
    "security-msg": 'Sigurno obradila tvrtka <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Sigurnosni kod',
    "aria-label": 'Informacije o sigurnosnom kodu',
    "text": 'Zadnje 3 znamenke na poleđini vaše kartice. Za American Express, to su dodatne 4 znamenke na prednjoj strani kartice.'
  },
  "other-cards-label": 'Ili ručno unesite podatke o kartici',
  QR: {
    button: {
      text: 'Odabir plaćanja',
      "aria-label": 'Odabir plaćanja'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Plati sa ##VALUE1##`;

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
    amount: "Iznositi",
    orderReference: "Referenca narudžbe",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Odaberite željenu banku",
  }
}

export default hr;