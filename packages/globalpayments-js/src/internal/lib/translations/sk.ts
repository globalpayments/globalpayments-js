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
    "security-msg": 'Spracované v režime zabezpečenia spoločnosťou <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Bezpečnostný kód',
    "aria-label": 'Informácie o bezpečnostnom kóde',
    "text": 'Ďalšie 3 číslice na zadnej strane karty. V prípade kariet od spoločnosti American Express ide o ďalšie 4 číslice na zadnej strane karty.'
  },
  "other-cards-label": 'ALEBO',
  "pay-with-a-card": 'PLATBA KARTOU',
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
    }
  },
  dcc: {
    label: "Vyberte si preferovanú menu",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Výmenný kurz: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (vrátane prirážky oproti kurzu ECB: ##VALUE4##)`
      const nonEuResource = `Výmenný kurz: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (vrátane prirážky: ##VALUE4##)`;
      const resource = payerRegionEU ? euResource : nonEuResource;
      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Potvrdzujem, že mi bola ponúknutá možnosť výberu meny platby.
        Akceptujem výmenný kurz a konečnú sumu a potvrdzujem, že mnou zvolená mena transakcie je: ##VALUE1##.
        Prepočet meny a výmenný kurz zabezpečuje spoločnosť Global Payments.</p>`;

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
    installmentWithDcc : 'Konverzia meny nie je možná pri splátkach. Ak chcete povoliť konverziu meny, vyberte možnosť „Zaplatiť v plnej výške“.',
    dccWarning: 'Uistite sa, že rozumiete nákladom spojeným s prepočtom meny, pretože sa môžu líšiť v závislosti od výberu lokálnej meny alebo meny karty.',
    disclaimer: 'Vydavateľ Vašej karty môže účtovať poplatky za výmenný kurz a ďalšie poplatky za konverziu.'
  },
  orderInformation: {
    amount: "Suma",
    orderReference: "Referencia objednávky",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Vyberte si preferovanú banku",
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

export default sk;