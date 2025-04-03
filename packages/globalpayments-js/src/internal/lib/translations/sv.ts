// sv - Swedish
const sv = {
  labels: {
    "card-number": "Kortnummer",
    "card-expiration": "Kortets utgångsdatum",
    "card-cvv": "Kortets CVV-nummer",
    "card-holder-name": "Kortinnehavarens namn",
    "submit": "Skicka"
  },
  values: {
    "card-track": "Läs kort",
    "submit": "Skicka"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Kortnummer krävs',
      CharactersLessThan12: 'Kortnumret måste bestå av minst tolv siffror',
      NumberIsNotValid: 'Kortnumret är ogiltigt',
      NotAllowedCardType: 'Det går inte att bearbeta korttypen. Använd ett annat kort.'
    },
    CardExpiration: {
      NotCompleted: 'Ange giltig(t) månad/år',
      YearNotValid: 'Året är ogiltigt',
      MonthNotValid: 'Månaden är ogiltig',
      ExpiryDateNotValid: 'Utgångsdatumet är ogiltigt',
    },
    CardCvv: {
      CodeIsNotValid: 'Kortets CVV-nummer är ogiltigt',
      CodeIsLessThan3Digits: 'Kortets CVV-nummer är för kort',
      CodeMustBe3Digits: 'Kortets CVV-nummer måste bestå av tre siffror',
      AmexCodeMustBe4Digits: 'För Amex måste kortets CVV-nummer bestå av fyra siffror',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Ange ett giltigt namn på kortinnehavaren',
      CharactersMoreThan100: 'Kortinnehavarens namn får innehålla högst 100 tecken'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256-bitars SSL-krypterad logotyp',
    "ssl-msg": '256-bitars SSL<br>-krypterad',
    "security-msg-alt": 'Säkrad av Global Payments',
    "security-msg": 'Säkert bearbetad av <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Säkerhetskod',
    "aria-label": 'Information om säkerhetskod',
    "text": 'De tre extra siffrorna på kortets baksida. För American Express är det de fyra extra siffrorna på kortets framsida.'
  },
  "other-cards-label": 'Eller ange kortuppgifterna manuellt',
  QR: {
    button: {
      text: 'Betalningsalternativ',
      "aria-label": 'Betalningsalternativ'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Betala med ##VALUE1##`;

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
    amount: "Belopp",
    orderReference: "Beställningsreferens",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Välj din önskade bank",
  }
}

export default sv;