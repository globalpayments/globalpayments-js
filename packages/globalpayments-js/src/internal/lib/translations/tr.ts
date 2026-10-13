// tr - Turkish
const tr = {
  labels: {
    "card-number": "Kart Numarası",
    "card-expiration": "Kart Son Kullanma Tarihi",
    "card-cvv": "Kart CVV Numarası",
    "card-holder-name": "Kart Sahibinin Adı",
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
    "security-msg": 'Güvenli şekilde işleyen: <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Güvenlik Kodu',
    "aria-label": 'Güvenlik Kodu Hakkında Bilgi',
    "text": 'Kartınızın arkasındaki ek 3 rakamdır. American Express’te, kartınızın önündeki ek 4 rakamdır.'
  },
  "other-cards-label": 'VEYA',
  "pay-with-a-card": 'KARTLA ÖDEME',
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
  orderInformation: {
    amount: "Miktar",
    orderReference: "Sipariş Referansı",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Lütfen tercih ettiğiniz bankayı seçin",
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

export default tr;