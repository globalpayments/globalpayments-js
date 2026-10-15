// es - Spanish
const es = {
  labels: {
    "card-number": "Número de tarjeta",
    "card-expiration": "Fecha de expiración",
    "card-cvv": "CVV de la tarjeta",
    "card-holder-name": "Nombre del titular de la tarjeta",
    "email-id": "Email",
    "phone-number": "Mobile Number",
    "billing-address": "Billing address",
    "country": "Country",
    "shipping-address-country": "Country",
    "shipping-address": "Shipping address",
    "shipping-name": "Full Name",
    "country-code": "Mobile Number",
    "billing-city": "City",
    "shipping-city": "City",
    "billing-state": "State/Province",
    "shipping-state": "State/Province",
    "billing-apt": "Apt, Suite (optional)",
    "shipping-apt": "Apt, Suite (optional)",
    "billing-postal-code": "Postal Code",
    "shipping-postal-code": "Postal Code",
    "apt-suite": "Apt, Suite (optional)",
    "city": "City",
    "state": "State/Province",
    "postal-code": "Postal Code",
    "submit": "Enviar"
  },
  values: {
    "card-track": "Leer tarjeta",
    "submit": "Enviar"
  },
  validationMessages: {
    CardNumber: {
      Required: 'El número de tarjeta es obligatorio',
      CharactersLessThan12: 'El número de tarjeta debe contener 12 dígitos como mínimo',
      NumberIsNotValid: 'El número de tarjeta no es válido',
      NotAllowedCardType: 'No se puede procesar este tipo de tarjeta, utilice otra tarjeta'
    },
    CardExpiration: {
      NotCompleted: 'Introduzca un mes/año válido',
      YearNotValid: 'El año no es válido',
      MonthNotValid: 'El mes no es válido',
      ExpiryDateNotValid: 'La fecha de caducidad no es válida',
    },
    CardCvv: {
      CodeIsNotValid: 'El CVV de la tarjeta no es válido',
      CodeIsLessThan3Digits: 'El CVV de la tarjeta es demasiado corto',
      CodeMustBe3Digits: 'El CVV de la tarjeta debe tener 3 dígitos',
      AmexCodeMustBe4Digits: 'El CVV de la tarjeta de Amex debe tener 4 dígitos',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Introduzca un nombre del titular de la tarjeta válido',
      CharactersMoreThan100: 'El nombre del titular de la tarjeta debe tener 100 caracteres como máximo'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logotipo cifrado SSL de 256 bits',
    "ssl-msg": 'Cifrado SSL de 256 bits',
    "security-msg-alt": 'Protegido por Global Payments',
    "security-msg": 'Procesado de forma segura por <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Código de seguridad (CVV)',
    "aria-label": 'Información sobre el código de seguridad',
    "text": 'Los 3 dígitos adicionales que figuran en la parte trasera de la tarjeta. En el caso de American Express, son los 4 dígitos adicionales que figuran en la parte delantera de la tarjeta.'
  },
  "other-cards-label": 'O',
  "pay-with-a-card": 'PAGA CON TARJETA',
  QR: {
    button: {
      text: 'Elección de pago',
      "aria-label": 'Elección de pago'
    },
    redirectScreen: {
      redirectingToPaymentPageMessage: 'Redirigiendo a la página de pago',
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Pagar con ##VALUE1##`;

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
    amount: "Cantidad",
    orderReference: "Referencia del pedido",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Por favor seleccione su banco preferido",
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

export default es;