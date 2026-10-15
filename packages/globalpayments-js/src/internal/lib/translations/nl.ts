// nl - Dutch
const nl = {
  labels: {
    "card-number": "Kaartnummer",
    "card-expiration": "Vervaldatum kaart",
    "card-cvv": "CVV kaart",
    "card-holder-name": "Naam kaarthouder",
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
    "submit": "Indienen"
  },
  values: {
    "card-track": "Kaart lezen",
    "submit": "Indienen"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Kaartnummer vereist',
      CharactersLessThan12: 'Het kaartnummer moet ten minste 12 tekens bevatten',
      NumberIsNotValid: 'Het kaartnummer is niet geldig',
      NotAllowedCardType: 'Dit kaarttype kan niet worden verwerkt. Gebruik een andere kaart'
    },
    CardExpiration: {
      NotCompleted: 'Voer een geldige maand en een geldig jaar in',
      YearNotValid: 'Het jaar is geen geldige waarde',
      MonthNotValid: 'De maand is geen geldige waarde',
      ExpiryDateNotValid: 'De vervaldatum is niet geldig',
    },
    CardCvv: {
      CodeIsNotValid: 'De CVV van de kaart is niet geldig',
      CodeIsLessThan3Digits: 'De CVV van de kaart is te kort',
      CodeMustBe3Digits: 'De CVV van de kaart moet 3 cijfers bevatten',
      AmexCodeMustBe4Digits: 'Bij AmEx-kaarten bestaat de CVV uit 4 cijfers',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Voer een geldige kaarthoudernaam in',
      CharactersMoreThan100: 'De naam van de kaarthouder kan maximaal 100 tekens bevatten'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256-bits SSL-versleuteld logo',
    "ssl-msg": '256-bits SSL-<br>versleuteld',
    "security-msg-alt": 'Gewaarborgd door Global Payments',
    "security-msg": 'Veilig verwerkt door <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Beveiligingscode',
    "aria-label": 'Informatie over de beveiligingscode',
    "text": 'De 3 cijfers op de achterzijde van uw kaart. Bij AmEx-kaarten zijn dit de 4 cijfers op de achterzijde van uw kaart.'
  },
  "other-cards-label": 'OF',
  "pay-with-a-card": 'BETALEN MET EEN KAART',
  QR: {
    button: {
      text: 'Betalingskeuze',
      "aria-label": 'Betalingskeuze'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Betaal met ##VALUE1##`;

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
  orderInformation: {
    amount: "Hoeveelheid",
    orderReference: "Bestelreferentie",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Selecteer uw voorkeursbank",
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

export default nl;