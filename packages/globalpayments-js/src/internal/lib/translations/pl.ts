// pl - Polish
const en = {
  labels: {
    "card-number": "Numer karty",
    "card-expiration": "Wygaśnięcie karty",
    "card-cvv": "Kod CVV karty",
    "card-holder-name": "Imię i nazwisko właściciela karty",
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
    "submit": "Wyślij"
  },
  values: {
    "card-track": "Odczytaj kartę",
    "submit": "Wyślij"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Wymagany jest numer karty',
      CharactersLessThan12: 'Numer karty musi składać się z co najmniej 12 znaków',
      NumberIsNotValid: 'Numer karty jest nieprawidłowy',
      NotAllowedCardType: 'Nie można przetworzyć tego typu karty, użyj innej karty'
    },
    CardExpiration: {
      NotCompleted: 'Wprowadź prawidłowy miesiąc/rok',
      YearNotValid: 'Rok jest nieprawidłowy',
      MonthNotValid: 'Miesiąc jest nieprawidłowy',
      ExpiryDateNotValid: 'Data wygaśnięcia jest nieprawidłowa',
    },
    CardCvv: {
      CodeIsNotValid: 'Kod CVV karty jest nieprawidłowy',
      CodeIsLessThan3Digits: 'Kod CVV karty jest zbyt krótki',
      CodeMustBe3Digits: 'Kod CVV karty musi zawierać 3 cyfry',
      AmexCodeMustBe4Digits: 'Kod CVV karty Amex musi zawierać 4 cyfry',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Wprowadź prawidłowe imię i nazwisko właściciela karty',
      CharactersMoreThan100: 'Imię i nazwisko właściciela karty może mieć najwyżej 100 znaków'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo 256-bitowego szyfrowania SSL',
    "ssl-msg": '256-bitowe szyfrowanie SSL<br>',
    "security-msg-alt": 'Zabezpieczenie — Global Payments',
    "security-msg": 'Bezpieczne przetwarzanie przez <strong>Global Payments</strong>',
    "e-service-terms-template": 'Płacąc akceptujesz {{regulations}} eService.',
    "e-service-terms-start": 'Płacąc akceptujesz',
    "regulations-text": 'regulamin',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Kod zabezpieczeń',
    "aria-label": 'Informacje o kodzie zabezpieczeń',
    "text": 'Dodatkowe 3 cyfry znajdujące się na odwrocie karty W przypadku kart American Express są to dodatkowe 4 cyfry znajdujące się na przedniej stronie karty.'
  },
  "other-cards-label": 'LUB',
  "pay-with-a-card": 'PŁAĆ KARTĄ',
  QR: {
    button: {
      text: 'Wybór sposobu płatności',
      "aria-label": 'Wybór sposobu płatności'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Zapłacić ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
      getImageUrl: (assetBaseUrl: string): string => {
        const imageBase = assetBaseUrl + "images/";
        const url = `transparent url(${imageBase}Przelew_Online_Logo.svg) no-repeat 50% 50%`
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
    label: "Wybierz preferowaną walutę",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Kurs wymiany: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (w tym marża ponad kurs referencyjny EBC: ##VALUE4##)`
      const nonEuResource = `Kurs wymiany: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (w tym marża kursowa: ##VALUE4##)`
      const resource = payerRegionEU ? euResource : nonEuResource;

      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>Potwierdzam, że zaoferowano mi możliwość wyboru waluty płatności.
        Akceptuję kurs wymiany oraz finalną kwotę i potwierdzam, że wybrana przeze mnie waluta transakcji to: ##VALUE1##.
        Przewalutowanie oraz kurs wymiany są dostarczane przez firmę Global Payments.</p>`;

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
    installmentWithDcc : 'Przewalutowanie nie może być oferowane przy płatności ratalnej. Wybierz opcję „Zapłać całość”, aby włączyć przewalutowanie.',
    dccWarning: 'UPEWNIJ SIĘ, ŻE ROZUMIESZ KOSZTY ZWIĄZANE Z PRZEWALUTOWANIEM, PONIEWAŻ MOGĄ ONE RÓŻNIĆ SIĘ W ZALEŻNOŚCI OD WYBORU WALUTY LOKALNEJ LUB WALUTY KARTY.',
    disclaimer: 'Wydawca karty może naliczyć opłatę za wymianę walut i inne dodatkowe opłaty za przewalutowanie.'
  },
  orderInformation: {
    amount: "Kwota",
    orderReference: "Numer zamówienia",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Wybierz preferowany bank",
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

export default en;