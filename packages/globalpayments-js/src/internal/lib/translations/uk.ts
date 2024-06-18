// uk - Ukrainian
const uk = {
  labels: {
    "card-number": "Номер картки",
    "card-expiration": "Термін дії картки",
    "card-cvv": "CVV картки",
    "card-holder-name": "Ім’я тримача картки",
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
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Платити з ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default uk;