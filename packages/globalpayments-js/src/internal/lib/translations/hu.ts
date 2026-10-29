// hu - Hungarian
const hu = {
  labels: {
    "card-number": "Kártyaszám",
    "card-expiration": "Kártya lejárata",
    "card-cvv": "Kártya CVV-azonosítója",
    "card-holder-name": "Kártyatulajdonos neve",
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
    "submit": "Küldés"
  },
  values: {
    "card-track": "Kártya olvasása",
    "submit": "Küldés"
  },
  validationMessages: {
    CardNumber: {
      Required: 'A kártyaszámot meg kell adni',
      CharactersLessThan12: 'A kártyaszámnak legalább 12 számjegyből kell állnia',
      NumberIsNotValid: 'A telefonszám érvénytelen',
      NotAllowedCardType: 'Ezt a kártyatípust nem lehet feldolgozni, használjon másik kártyát'
    },
    CardExpiration: {
      NotCompleted: 'Adjon meg érvényes hónapot/évet',
      YearNotValid: 'Az év nem érvényes',
      MonthNotValid: 'A hónap nem érvényes',
      ExpiryDateNotValid: 'A lejárati dátum nem érvényes',
    },
    CardCvv: {
      CodeIsNotValid: 'A kártya CVV-azonosítója nem érvényes',
      CodeIsLessThan3Digits: 'A kártya CVV-azonosítója túl rövid',
      CodeMustBe3Digits: 'A kártya CVV-azonosítójának 3 számjegyűnek kell lennie',
      AmexCodeMustBe4Digits: 'Amex esetében a kártya CVV-azonosítójának 4 számjegyűnek kell lennie',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Adjon meg érvényes kártyatulajdonos-nevet',
      CharactersMoreThan100: 'A kártyatulajdonos neve legfeljebb 100 karakter lehet'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256 bites SSL-titkosítású embléma',
    "ssl-msg": '256 bites<br>SSL-titkosítású',
    "security-msg-alt": 'A Global Payments által biztosított',
    "security-msg": 'A biztonságos feldolgozást a <strong>Global Payments</strong> szolgáltatja',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Biztonsági kód',
    "aria-label": 'Információ a biztonsági kódról',
    "text": 'A kártya hátulján szereplő további 3 számjegy. American Express esetében ez a kártya hátulján szereplő további 4 számjegy.'
  },
  "other-cards-label": 'VAGY',
  "pay-with-a-card": 'KÁRTYÁS FIZETÉS',
  QR: {
    button: {
      text: 'Választott fizetési mód',
      "aria-label": 'Választott fizetési mód'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Fizessen ezzel ##VALUE1##`;

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
    label: "Válassza ki a kívánt pénznemet",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Árfolyam: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (Beleértve az EKB árfolyamához képesti felárat: ##VALUE4##)`
      const nonEuResource = `Árfolyam: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (Haszonkulccsal együtt: ##VALUE4##)`;

      const resource = payerRegionEU ? euResource : nonEuResource;
      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Elfogadom, hogy fizetéskor több pénznem közül választhatok.
        Elfogadom az átváltási árfolyamot és a végső összeget, valamint azt, hogy a kiválasztott tranzakció pénzneme a kártyatulajdonos által választott pénznem: ##VALUE1##.
        A pénznemváltást és az árfolyamot a Global Payments biztosítja.</p>`;

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
    installmentWithDcc : 'Részletfizetés esetén nem lehetséges a pénznemváltás. A pénznemváltás engedélyezéséhez válassza a „Teljes összeg fizetése” lehetőséget.',
    dccWarning: 'GYŐZŐDJÖN MEG RÓLA, HOGY ÉRTETTE A DEVIZAÁTVÁLTÁS KÖLTSÉGEIT, MERT AZOK ELTÉRŐEK LEHETNEK ATTÓL FÜGGŐEN, HOGY A HAZAI PÉNZNEMÉT VAGY A TRANZAKCIÓ PÉNZNEMÉT VÁLASZTOTJA-E.',
    disclaimer: 'A kártyakibocsátó árfolyamot és további átváltási díjakat számíthat fel.'
  },
  orderInformation: {
    amount: "Összeg",
    orderReference: "Rendelési hivatkozás",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Kérjük, válassza ki a kívánt bankot",
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
    footerInstallmentsTextStart:'Installments enabled by',
    footerInstallmentsTextEnd: ''
  }
}

export default hu;