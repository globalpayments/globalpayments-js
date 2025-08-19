// uk - Ukrainian
const uk = {
  labels: {
    "card-number": "Номер картки",
    "card-expiration": "Термін дії картки",
    "card-cvv": "CVV картки",
    "card-holder-name": "Ім’я тримача картки",
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
    "submit": "Надіслати"
  },
  values: {
    "card-track": "Зчитати картку",
    "submit": "Надіслати"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Потрібно вказати номер картки',
      CharactersLessThan12: 'Номер картки має містити щонайменше 12 цифр',
      NumberIsNotValid: 'Номер картки недійсний',
      NotAllowedCardType: 'Неможливо обробити цей тип картки, скористайтесь іншою карткою'
    },
    CardExpiration: {
      NotCompleted: 'Введіть дійсні місяць і рік',
      YearNotValid: 'Рік недійсний',
      MonthNotValid: 'Місяць недійсний',
      ExpiryDateNotValid: 'Термін дії недійсний',
    },
    CardCvv: {
      CodeIsNotValid: 'CVV картки недійсний',
      CodeIsLessThan3Digits: 'CVV картки надто короткий',
      CodeMustBe3Digits: 'CVV картки має складатися з 3 цифр',
      AmexCodeMustBe4Digits: 'CVV картки Amex має складатися з 4 цифр',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Введіть дійсне ім’я тримача картки',
      CharactersMoreThan100: 'Ім’я тримача картки не може перевищувати 100 символів'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Логотип 256-бітного шифрування SSL',
    "ssl-msg": '256-бітне<br>шифрування SSL',
    "security-msg-alt": 'Захищено Global Payments',
    "security-msg": 'Безпечно оброблено <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Код безпеки',
    "aria-label": 'Інформація про код безпеки',
    "text": 'Додаткові 3 цифри ззаду вашої картки. Для American Express це додаткові 4 цифри на лицьовому боці картки.'
  },
  "other-cards-label": 'Або введіть відомості про картку вручну',
  QR: {
    button: {
      text: 'Вибрати інший спосіб оплати',
      "aria-label": 'Вибрати інший спосіб оплати'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Платити з ##VALUE1##`;

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
    amount: "Сума",
    orderReference: "Довідка про замовлення",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Виберіть бажаний банк",
  }
}

export default uk;