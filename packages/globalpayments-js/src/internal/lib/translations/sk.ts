// sk - Slovak
const sk = {
  labels: {
    "card-number": "Číslo karty",
    "card-expiration": "Skončenie platnosti karty",
    "card-cvv": "Kód CVV karty",
    "card-holder-name": "Meno držiteľa karty",
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
    "submit": "Odoslať"
  },
  values: {
    "card-track": "Načítať kartu",
    "submit": "Odoslať"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Vyžaduje sa číslo karty',
      CharactersLessThan12: 'Číslo karty musí obsahovať najmenej 12 číslic',
      NumberIsNotValid: 'Číslo karty je neplatné',
      NotAllowedCardType: 'Tento typ karty nie je možné spracovať, použite inú kartu'
    },
    CardExpiration: {
      NotCompleted: 'Zadajte platný mesiac/rok',
      YearNotValid: 'Rok je neplatný',
      MonthNotValid: 'Mesiac je neplatný',
      ExpiryDateNotValid: 'Dátum skončenia platnosti je neplatný',
    },
    CardCvv: {
      CodeIsNotValid: 'Kód CVV karty je neplatný',
      CodeIsLessThan3Digits: 'Kód CVV karty je príliš krátky',
      CodeMustBe3Digits: 'Kód CVV karty musí obsahovať 3 číslice',
      AmexCodeMustBe4Digits: 'Kód CVV karty Amex musí obsahovať 4 číslice',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Zadajte platné meno držiteľa karty',
      CharactersMoreThan100: 'Meno držiteľa karty môže obsahovať maximálne 100 znakov'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo s 256-bitovým šifrovaním SSL',
    "ssl-msg": '256-bitové šifrovanie<br>SSL',
    "security-msg-alt": 'Zabezpečenie od spoločnosti Global Payments',
    "security-msg": 'Spracované v režime zabezpečenia spoločnosťou <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Bezpečnostný kód',
    "aria-label": 'Informácie o bezpečnostnom kóde',
    "text": 'Ďalšie 3 číslice na zadnej strane karty. V prípade kariet od spoločnosti American Express ide o ďalšie 4 číslice na zadnej strane karty.'
  },
  "other-cards-label": 'Alebo zadajte podrobnosti o karte manuálne',
  QR: {
    button: {
      text: 'Oblike plačila',
      "aria-label": 'Oblike plačila'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Platiť s ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
      getImageUrl: (assetBaseUrl: string): string => {
        const imageBase = assetBaseUrl + "images/";
        const url = `transparent url(${imageBase}Bankova_Platba_Logo.svg) no-repeat 50% 50%`
        return url;
      }
    }
  },
  orderInformation: {
    amount: "Suma",
    orderReference: "Referencia objednávky",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Vyberte si preferovanú banku",
  }
}

export default sk;