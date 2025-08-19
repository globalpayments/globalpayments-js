// ru - Russian
const ru = {
  labels: {
    "card-number": "Номер карты",
    "card-expiration": "Срок действия карты",
    "card-cvv": "Код CVV карты",
    "card-holder-name": "Имя и фамилия владельца карты",
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
    "submit": "Отправить"
  },
  values: {
    "card-track": "Считать карту",
    "submit": "Отправить"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Необходимо указать номер карты',
      CharactersLessThan12: 'Номер карты должен состоять как минимум из 12 цифр',
      NumberIsNotValid: 'Недопустимый номер карты',
      NotAllowedCardType: 'Невозможно обработать карту этого типа. Попробуйте использовать другую карту'
    },
    CardExpiration: {
      NotCompleted: 'Укажите действительный месяц/год',
      YearNotValid: 'Недопустимый год',
      MonthNotValid: 'Недопустимый месяц',
      ExpiryDateNotValid: 'Недопустимый срок действия',
    },
    CardCvv: {
      CodeIsNotValid: 'Недопустимый код CVV карты',
      CodeIsLessThan3Digits: 'Слишком короткий код CVV карты',
      CodeMustBe3Digits: 'Код CVV карты должен состоять из 3 цифр',
      AmexCodeMustBe4Digits: 'Код CVV карты для Amex должен состоять из 4 цифр',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Укажите действительные имя и фамилию владельца карты',
      CharactersMoreThan100: 'Количество символов в имени и фамилии владельца карты не должно быть больше 100'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Логотип SSL-сертификата с 256-битным шифрованием',
    "ssl-msg": 'SSL-сертификат с 256-битным<br>шифрованием',
    "security-msg-alt": 'Под защитой Global Payments',
    "security-msg": 'Безопасно обработано <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Код безопасности',
    "aria-label": 'Информация о коде безопасности',
    "text": 'Дополнительные 3 цифры на обратной стороне карты. Для American Express это дополнительные 4 цифры на лицевой стороне карты.'
  },
  "other-cards-label": 'Либо введите данные карты вручную',
  QR: {
    button: {
      text: 'Выбор способа оплаты',
      "aria-label": 'Выбор способа оплаты'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Оплатить с ##VALUE1##`;

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
    amount: "Количество",
    orderReference: "Ссылка на заказ",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Пожалуйста, выберите предпочитаемый банк",
  }
}

export default ru;