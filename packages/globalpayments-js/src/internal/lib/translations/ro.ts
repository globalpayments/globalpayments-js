// ro - Romanian
const ro = {
  labels: {
    "card-number": "Număr card",
    "card-expiration": "Dată expirare card",
    "card-cvv": "Cod CVV card",
    "card-holder-name": "Nume titular card",
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
    "submit": "Trimiteți"
  },
  values: {
    "card-track": "Citiți cardul",
    "submit": "Trimiteți"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Numărul cardului este obligatoriu',
      CharactersLessThan12: 'Numărul cardului trebuie să fie format din cel puțin 12 cifre',
      NumberIsNotValid: 'Numărul cardului nu este valid',
      NotAllowedCardType: 'Nu se poate procesa acest tip de card, utilizați un alt card'
    },
    CardExpiration: {
      NotCompleted: 'Introduceți o lună valabilă/un an valid',
      YearNotValid: 'Anul nu este valid',
      MonthNotValid: 'Luna nu este validă',
      ExpiryDateNotValid: 'Data de expirare nu este validă',
    },
    CardCvv: {
      CodeIsNotValid: 'Codul CVV al cardului nu este valid',
      CodeIsLessThan3Digits: 'Codul CVV al cardului este prea scurt',
      CodeMustBe3Digits: 'Codul CVV al cardului trebuie să conțină 3 cifre',
      AmexCodeMustBe4Digits: 'Codul CVV al cardului pentru Amex trebuie să conțină 4 cifre',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Introduceți un nume valid al titularului cardului',
      CharactersMoreThan100: 'Numele titularului cardului poate avea cel mult 100 de caractere'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Sigla criptată SSL pe 256 de biți',
    "ssl-msg": 'Criptare<br>SSL pe 256 de biți',
    "security-msg-alt": 'Securizat de Global Payments',
    "security-msg": 'Procesat în mod securizat de <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Cod de securitate',
    "aria-label": 'Informații despre codul de securitate',
    "text": 'Cele 3 cifre suplimentare de pe spatele cardului. Pentru American Express, cele 4 cifre suplimentare de pe fața cardului.'
  },
  "other-cards-label": 'SAU',
  "pay-with-a-card": 'PLĂTEȘTE CU CARDUL',
  QR: {
    button: {
      text: 'Opțiune de plată',
      "aria-label": 'Opțiune de plată'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Plateste cu ##VALUE1##`;

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
    }
  },
  dcc: {
    label: "Selectați moneda preferată",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Curs de schimb: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (Incluzând rata adaosului comercial deasupra cursului BCE: ##VALUE4##)`
      const nonEuResource = `Curs de schimb: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (Incluzând rata adaosului comercial: ##VALUE4##)`;

      const resource = payerRegionEU ? euResource : nonEuResource;
      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Accept că mi s-a oferit o selecție de valute pentru plată.
        Accept cursul de schimb și suma finală și că moneda selectată pentru tranzacție este moneda aleasă de titularul cardului: ##VALUE1##.
        Conversia valutară și cursul de schimb sunt furnizate de Global Payments.</p>`;

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
    installmentWithDcc : 'Conversia valutară nu poate fi oferită la plățile în rate. Selectați „Plătiți integral” pentru a activa conversia valutară.',
    dccWarning: 'ASIGURAȚI-VĂ CĂ ÎNȚELEGEȚI COSTURILE CONVERSIEI VALUTARE, DEOARECE ACESTEA POT FI DIFERITE ÎN FUNCȚIE DE SELECTAREA MONEDEI NAȚIONALE SAU A MONEDEI TRANZACȚIEI.',
    disclaimer: 'Emitentul cardului dumneavoastră poate aplica cursul de schimb valutar și comisioane suplimentare de conversie.'
  },
  orderInformation: {
    amount: "Cantitate",
    orderReference: "Referință de comandă",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Vă rugăm să selectați banca preferată",
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

export default ro;