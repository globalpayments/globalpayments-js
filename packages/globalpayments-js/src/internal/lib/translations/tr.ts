// tr - Turkish
const tr = {
  labels: {
    "card-number": "Kart Numarası",
    "card-expiration": "Kart Son Kullanma Tarihi",
    "card-cvv": "Kart CVV Numarası",
    "card-holder-name": "Kart Sahibinin Adı",
    "submit": "Gönder"
  },
  values: {
    "card-track": "Kartı Oku",
    "submit": "Gönder"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Bir Kart Numarası gerekiyor',
      CharactersLessThan12: 'Kart Numarası en az 12 rakamdan oluşmalıdır',
      NumberIsNotValid: 'Kart Numarası geçersiz',
      NotAllowedCardType: 'Bu kart türü işlenemiyor, lütfen başka bir Kart kullanın'
    },
    CardExpiration: {
      NotCompleted: 'Lütfen geçerli bir ay/yıl girin',
      YearNotValid: 'Yıl geçersiz',
      MonthNotValid: 'Ay geçersiz',
      ExpiryDateNotValid: 'Son Kullanma Tarihi geçersiz',
    },
    CardCvv: {
      CodeIsNotValid: 'Kart CVV numarası geçersiz',
      CodeIsLessThan3Digits: 'Kart CVV numarası çok kısa',
      CodeMustBe3Digits: 'Kart CVV numarası 3 rakamdan oluşmalıdır',
      AmexCodeMustBe4Digits: 'Amex için Kart CVV numarası 4 rakamdan oluşmalıdır',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Kart Sahibinin Adı için lütfen geçerli bir ad girin',
      CharactersMoreThan100: 'Kart Sahibinin Adı en fazla 100 karakterden oluşabilir'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256-bit SSL encrypted logosu',
    "ssl-msg": '256-bit SSL<br>encrypted',
    "security-msg-alt": 'Global Payments ile Güvence Altında',
    "security-msg": 'Güvenli şekilde işleyen: <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Güvenlik Kodu',
    "aria-label": 'Güvenlik Kodu Hakkında Bilgi',
    "text": 'Kartınızın arkasındaki ek 3 rakamdır. American Express’te, kartınızın önündeki ek 4 rakamdır.'
  },
  "other-cards-label": 'Veya kart bilgilerini manuel olarak girin',
  QR: {
    button: {
      text: 'Başka bir ödeme yöntemi seçin',
      "aria-label": 'Başka bir ödeme yöntemi seçin'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `İle ödemek ##VALUE1##`;

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
    amount: "Miktar",
    orderReference: "Sipariş Referansı",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Lütfen tercih ettiğiniz bankayı seçin",
  }
}

export default tr;