// de - German
const de = {
  labels: {
    "card-number": "Kartennummer",
    "card-expiration": "Ablaufdatum der Karte",
    "card-cvv": "CVV der Karte",
    "email-id": "Email",
    "phone-number": "Mobile Number",
    "billing-address": "Billing address",
    "country": "Country",
    "shipping-address-country": "Country",
    "shipping-address": "Shipping address",
    "shipping-name": "Full Name",
    "country-code": "Mobile Number",
    "billing-city": "City",
    "shipping-city": "City",
    "billing-state": "State/Province",
    "shipping-state": "State/Province",
    "billing-apt": "Apt, Suite (optional)",
    "shipping-apt": "Apt, Suite (optional)",
    "billing-postal-code": "Postal Code",
    "shipping-postal-code": "Postal Code",
    "apt-suite": "Apt, Suite (optional)",
    "city": "City",
    "state": "State/Province",
    "postal-code": "Postal Code",
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
    "security-msg": 'Sichere Verarbeitung durch <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Sicherheitscode',
    "aria-label": 'Information zum Sicherheitscode',
    "text": 'Die zusätzlichen drei Ziffern auf der Rückseite Ihrer Karte. Bei American Express sind es die zusätzlichen vier Ziffern auf der Vorderseite Ihrer Karte.'
  },
  "other-cards-label": 'ODER',
  "pay-with-a-card": 'MIT KARTE BEZAHLEN',
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
    },
    redirectToBank: "Redirecting",
    waitingScreen: {
      blik0WaitingScreenMessage: "Please confirm the transaction from your mobile banking application.",
      waitingIcon: "Waiting Icon",
    },
    redirectionText1: "or use the ",
    link: "link",
    redirectionText2: " to confirm it.",
    blik0c: {
      enterCodeMessage: "Please enter the BLIK code generated from your mobile banking application.",
      errorMessage: "Please enter your 6 digit BLIK code.",
    },
  },
  dcc: {
    label: "Wählen Sie Ihre bevorzugte Währung.",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Wechselkurs: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (einschließlich Aufschlag auf den EZB-Zinssatz: ##VALUE4##)`
      const nonEuResource = `Wechselkurs: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (einschließlich Aufschlag: ##VALUE4##)`;

      const resource = payerRegionEU ? euResource : nonEuResource;
      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Ich bestätige, dass mir verschiedene Währungen für die Zahlung angeboten wurden.
        Ich akzeptiere den Umrechnungskurs und den Endbetrag sowie die vom Karteninhaber gewählte Währung: ##VALUE1##.
        Die Währungsumrechnung und der Kurs werden von Global Payments bereitgestellt.</p>`;

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
    },
    installmentWithDcc : 'Bei Ratenzahlung ist keine Währungsumrechnung möglich. Wählen Sie „Vollständig bezahlen“, um die Währungsumrechnung zu aktivieren.',
    dccWarning: 'Informieren Sie sich unbedingt über die Kosten der Währungsumrechnung, da diese je nach Wahl Ihrer Heimatwährung oder der Transaktionswährung unterschiedlich sein können.',
    disclaimer: 'Wechselkurs und zusätzliche Umrechnungsgebühren können von Ihrem Kartenaussteller erhoben werden.'
  },
  orderInformation: {
    amount: "Menge",
    orderReference: "Tagairt Ordaithe",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Bitte wählen Sie lhre bevorzugte Bank aus",
  },
  installments: {
    choosePaymentOption: 'Choose to pay the full amount or pay in installments',
    payInFullLatam: 'PAY IN FULL',
    payInFullVisa: 'PAY NOW',
    monthsWithoutInterest: 'MONTHS WITHOUT INTEREST',
    buyNowPayLater: 'BUY NOW PAY LATER',
    months: "MONTHS",
    eligibleForInstallmentBadgeText: "Eligible for Installments",
    payInInstallmentsText: 'PAY IN ',
    apr: 'APR',
    total: 'Total',
    fees: 'Fees',
    additionalTerms: 'Additional terms',
    mandatoryError : "Acceptance of Terms and Conditions is required",
    learnMoreText : "Learn more",
    month:'month',
    includeFees:'incl. fee',
    include: 'incl.',
    furtherInfoText : 'Further Information and Privacy Policy',
    footerInstallmentsTextStart: 'Installments enabled by',
    footerInstallmentsTextEnd: ''
  }
}

export default de;