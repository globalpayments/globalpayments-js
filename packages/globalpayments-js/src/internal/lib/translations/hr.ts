// hr - Croatian
const hr = {
  labels: {
    "card-number": "Broj kartice",
    "card-expiration": "Istek kartice",
    "card-cvv": "CVV kartice",
    "card-holder-name": "Ime i prezime vlasnika kartice",
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
    "security-msg": 'Sigurno obradila tvrtka <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Sigurnosni kod',
    "aria-label": 'Informacije o sigurnosnom kodu',
    "text": 'Zadnje 3 znamenke na poleđini vaše kartice. Za American Express, to su dodatne 4 znamenke na prednjoj strani kartice.'
  },
  "other-cards-label": 'ILI',
  "pay-with-a-card": 'PLAĆANJE KARTICOM',
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
    label: "Odaberite željenu valutu",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Tečaj: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (uključujući maržu iznad tečaja ECB-a: ##VALUE4##)`
      const nonEuResource = `Tečaj: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (uključujući maržu: ##VALUE4##)`;

      const resource = payerRegionEU ? euResource : nonEuResource;
      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Prihvaćam da mi je ponuđen izbor valuta za plaćanje.
        Prihvaćam tečaj konverzije i konačni iznos te da je odabrana valuta transakcije valuta koju je odabrao korisnik kartice: ##VALUE1##.
        Konverziju valuta i tečaj osigurava Global Payments.</p>`;

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
    installmentWithDcc : 'Konverzija valuta ne može se ponuditi uz obročnu otplatu. Odaberite "Plati u cijelosti" kako biste omogućili konverziju valuta.',
    dccWarning: 'PROVJERITE DA RAZUMIJETE TROŠKOVE KONVERZIJE VALUTA JER SE MOGU RAZLIKOVATI OVISNO O TOMU ODABIRATE LI DOMAĆU VALUTU ILI VALUTU TRANSAKCIJE.',
    disclaimer: 'Izdavatelj vaše kartice može primijeniti tečajnu listu i dodatne naknade za konverziju.'
  },
  orderInformation: {
    amount: "Iznositi",
    orderReference: "Referenca narudžbe",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Odaberite željenu banku",
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

export default hr;