// de - German
const de = {
  labels: {
    "card-number": "Kartennummer",
    "card-expiration": "Ablaufdatum der Karte",
    "card-cvv": "CVV der Karte",
    "card-holder-name": "Name des Karteninhabers",
    "submit": "Absenden"
  },
  values: {
    "card-track": "Karte lesen",
    "submit": "Absenden"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Kartennummer erforderlich',
      CharactersLessThan12: 'Die Kartennummer muss mindestens 12 Stellen aufweisen.',
      NumberIsNotValid: 'Die Kartennummer ist ungültig.',
      NotAllowedCardType: 'Dieser Kartentyp kann nicht verarbeitet werden. Bitte andere Karte verwenden.'
    },
    CardExpiration: {
      NotCompleted: 'Gültigen Monat/gültiges Jahr eingeben',
      YearNotValid: 'Das Jahr ist ungültig.',
      MonthNotValid: 'Der Monat ist ungültig.',
      ExpiryDateNotValid: 'Das Ablaufdatum ist ungültig.',
    },
    CardCvv: {
      CodeIsNotValid: 'Der CVV der Karte ist ungültig.',
      CodeIsLessThan3Digits: 'Der CVV der Karte ist zu kurz.',
      CodeMustBe3Digits: 'Der CVV der Karte muss 3 Stellen aufweisen.',
      AmexCodeMustBe4Digits: 'Der CVV der Amex-Karte muss 4 Stellen aufweisen.',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Gültigen Karteninhabernamen eingeben',
      CharactersMoreThan100: 'Der Karteninhabername darf höchsten 100 Zeichen umfassen.'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo für 256-Bit-SSL-Verschlüsselung',
    "ssl-msg": '256-Bit-SSL-<br>Verschlüsselung',
    "security-msg-alt": 'Sicher dank Global Payments',
    "security-msg": 'Sichere Verarbeitung durch <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Sicherheitscode',
    "aria-label": 'Information zum Sicherheitscode',
    "text": 'Die zusätzlichen drei Ziffern auf der Rückseite Ihrer Karte. Bei American Express sind es die zusätzlichen vier Ziffern auf der Vorderseite Ihrer Karte.'
  },
  "other-cards-label": 'Oder Kartendaten manuell eingeben',
  QR: {
    button: {
      text: 'Zahlungsart',
      "aria-label": 'Zahlungsart'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Bezahlen mit ##VALUE1##`;

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
    amount: "Menge",
    orderReference: "Tagairt Ordaithe",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Bitte wählen Sie lhre bevorzugte Bank aus",
  }
}

export default de;