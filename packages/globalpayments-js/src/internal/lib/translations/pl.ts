// pl - Polish
const en = {
  labels: {
    "card-number": "Numer karty",
    "card-expiration": "Wygaśnięcie karty",
    "card-cvv": "Kod CVV karty",
    "card-holder-name": "Imię i nazwisko właściciela karty",
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
    "security-msg": 'Bezpieczne przetwarzanie przez <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Kod zabezpieczeń',
    "aria-label": 'Informacje o kodzie zabezpieczeń',
    "text": 'Dodatkowe 3 cyfry znajdujące się na odwrocie karty W przypadku kart American Express są to dodatkowe 4 cyfry znajdujące się na przedniej stronie karty.'
  },
  "other-cards-label": 'Albo wprowadź dane karty ręcznie',
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
  },
  orderInformation: {
    amount: "Kwota",
    orderReference: "Numer zamówienia",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Wybierz preferowany bank",
  }
}

export default en;