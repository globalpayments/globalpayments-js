// sl - Slovenian
const sl = {
  labels: {
    "card-number": "Številka kartice",
    "card-expiration": "Datum poteka kartice",
    "card-cvv": "Koda CVV kartice",
    "card-holder-name": "Ime imetnika kartice",
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
    "submit": "Pošlji"
  },
  values: {
    "card-track": "Preberi kartico",
    "submit": "Pošlji"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Številka kartice je obvezna',
      CharactersLessThan12: 'Številka kartice mora vsebovati najmanj 12 števk',
      NumberIsNotValid: 'Številka kartice ni veljavna',
      NotAllowedCardType: 'Te vrste kartice ni mogoče obdelati. Uporabite drugo kartico.'
    },
    CardExpiration: {
      NotCompleted: 'Vnesite veljaven mesec/leto',
      YearNotValid: 'Leto ni veljavno',
      MonthNotValid: 'Mesec ni veljaven',
      ExpiryDateNotValid: 'Datum poteka ni veljaven',
    },
    CardCvv: {
      CodeIsNotValid: 'Koda CVV kartice ni veljavna',
      CodeIsLessThan3Digits: 'Koda CVV kartice je prekratka',
      CodeMustBe3Digits: 'Koda CVV kartice mora biti 3-mestna',
      AmexCodeMustBe4Digits: 'Koda CVV kartice Amex mora biti 4-mestna',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Vnesite veljavno ime imetnika kartice',
      CharactersMoreThan100: 'Ime imetnika kartice lahko vsebuje največ 100 znakov'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logotip 256-bitno šifriranega potrdila SSL',
    "ssl-msg": '256-bitno šifrirano<br>potrdilo SSL',
    "security-msg-alt": 'Zaščito zagotavlja Global Payments',
    "security-msg": 'Varno obdelalo podjetje <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Varnostna koda',
    "aria-label": 'Informacije o varnostni kodi',
    "text": 'Dodatne 3 števke na hrbtni strani kartice. Za kartice American Express so to dodatne 4 števke na sprednji strani kartice.'
  },
  "other-cards-label": 'ALI',
  "pay-with-a-card": 'PLAČILO S KARTICO',
  QR: {
    button: {
      text: 'Oblike plačila',
      "aria-label": 'Oblike plačila'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Plačajte z ##VALUE1##`;

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
    label: "Izberite želeno valuto",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Menjalni tečaj: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (vključno z dodatkom nad tečaj ECB: ##VALUE4##)`;
      const nonEuResource = `Menjalni tečaj: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (vključno s pribitkom: ##VALUE4##)`;

      const resource = payerRegionEU ? euResource : nonEuResource;
      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Sprejemam, da mi je bila ponujena izbira valut za plačilo.
        Sprejemam menjalni tečaj in končni znesek ter da je izbrana valuta transakcije valuta imetnika kartice: ##VALUE1##.
        Pretvorbo valut in tečaj zagotavlja Global Payments.</p>`;

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
    installmentWithDcc : 'Pretvorba valut ni mogoča z obročnim odplačevanjem. Izberite »Plačilo v celoti«, da omogočite pretvorbo valut.',
    dccWarning: 'PREPRIČAJTE SE, DA RAZUMEJTE STROŠKE PRETVORBE VALUT, SAJ SE LAHKO RAZLIKUJEJO GLEDE NA TO, ALI IZBERETE DOMAČO VALUTO ALI TRANSAKCIJSKO VALUTO.',
    disclaimer: 'Izdajatelj vaše kartice lahko zaračuna menjalni tečaj in dodatne provizije za pretvorbo.'
  },
  orderInformation: {
    amount: "Znesek",
    orderReference: "Referenca naročila",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Izberite želeno banko",
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

export default sl;