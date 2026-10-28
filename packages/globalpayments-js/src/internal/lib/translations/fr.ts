const fr = {
  labels: {
    "card-number": "Numéro de carte",
    "card-expiration": "Date d'expiration de la carte",
    "card-cvv": "Code CVV de la carte",
    "card-holder-name": "Nom du titulaire de carte",
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
    "submit": "Soumettre"
  },
  values: {
    "card-track": "Lire la carte",
    "submit": "Soumettre"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Le numéro de carte est obligatoire.',
      CharactersLessThan12: 'Le numéro de carte doit comporter au moins 12 chiffres.',
      NumberIsNotValid: 'Le numéro de carte est incorrect.',
      NotAllowedCardType: 'Impossible de traiter ce type de carte, veuillez en utiliser une autre.'
    },
    CardExpiration: {
      NotCompleted: 'Veuillez saisir un mois ou une année valide.',
      YearNotValid: 'L\'année n\'est pas valide.',
      MonthNotValid: 'Le mois n\'est pas valide.',
      ExpiryDateNotValid: 'La date d\'expiration n\'est pas valide.',
    },
    CardCvv: {
      CodeIsNotValid: 'Le code CVV de la carte n\'est pas valide.',
      CodeIsLessThan3Digits: 'Le code CVV de la carte est trop court.',
      CodeMustBe3Digits: 'Le code CVV de la carte doit comporter au moins 3 chiffres.',
      AmexCodeMustBe4Digits: 'Le code CVV de la carte Amex doit comporter au moins 4 chiffres.',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Veuillez saisir un nom de titulaire de carte valide.',
      CharactersMoreThan100: 'Le nom du titulaire de carte ne doit pas dépasser 100 caractères.'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo de chiffrement SSL 256 bits',
    "ssl-msg": 'Chiffrement SSL<br>256 bits',
    "security-msg-alt": 'Sécurisé par Global Payments',
    "security-msg": 'Traitement sécurisé par <strong>Global Payments</strong>',
    "e-service-terms-template": 'By paying, you accept the eService {{regulations}}.',
    "e-service-terms-start": 'By paying, you accept the ',
    "regulations-text": 'regulations',
    "eservice-text": "eService"
  },
  tooltip: {
    "title": 'Code de sécurité',
    "aria-label": 'Informations sur le code de sécurité',
    "text": 'Les 3 chiffres supplémentaires figurant au dos de votre carte. Pour American Express, il s\'agit des 4 chiffres supplémentaires figurant au recto de votre carte.'
  },
  "other-cards-label": 'OU',
  "pay-with-a-card": 'PAYER PAR CARTE',
  QR: {
    button: {
      text: 'Sélectionner un autre moyen de paiement',
      "aria-label": 'Sélectionner un autre moyen de paiement'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Payer avec ##VALUE1##`;

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
    label: "Sélectionnez votre devise préférée",
    additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string, payerRegionEU: string) => {
      // const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
      const euResource = `Taux de change: 1 ##VALUE1## = ##VALUE2## ##VALUE3##  (majoration incluse par rapport au taux de la BCE: ##VALUE4##)`
      const nonEuResource = `Taux de change: 1 ##VALUE1## = ##VALUE2## ##VALUE3## (majoration incluse: ##VALUE4##)`
      const resource = payerRegionEU ? euResource : nonEuResource;

      return resource.replace('##VALUE1##', currency)
        .replace('##VALUE2##', exchangeRate)
        .replace('##VALUE3##', payerCurrency)
        .replace('##VALUE4##', marginRatePercentage)
    },
    cardCurrency: {
      tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
        const resource = `<p>J'accepte qu'un choix de devises m'ait été proposé pour le paiement.
        J'accepte le taux de conversion et le montant final, et que la devise de transaction sélectionnée soit celle choisie par le titulaire de la carte : ##VALUE1##.
        La conversion et le taux de change sont fournis par Global Payments.</p>`;

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
    installmentWithDcc : "La conversion de devises n'est pas disponible pour les paiements échelonnés. Sélectionnez « Payer en une seule fois » pour activer la conversion de devises.",
    dccWarning: 'Assurez-vous de bien comprendre les coûts de conversion de devises, car ils peuvent varier selon que vous choisissiez votre devise nationale ou la devise de la transaction.',
    disclaimer: "Des frais de change et de conversion supplémentaires peuvent être appliqués par l'émetteur de votre carte."
  },
  orderInformation: {
    amount: "Montant",
    orderReference: "Référence de commande",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Veuillez sélectionner votre banque préférée",
  },
  installments: {
    choosePaymentOption: 'Choisissez de payer le montant total, ou payer en versements',
    payInFullLatam: 'PAYER AU COMPLET',
    payInFullVisa: 'PAYER MAINTENANT',
    monthsWithoutInterest: 'MONTHS WITHOUT INTEREST',
    buyNowPayLater: 'BUY NOW PAY LATER',
    months: "MOIS",
    eligibleForInstallmentBadgeText: "Éligible aux versements échelonnés",
    payInInstallmentsText: 'PAYER EN ',
    apr: 'TAP',
    total: 'Total',
    fees: 'Frais',
    additionalTerms: 'Conditions supplémentaires',
    mandatoryError : "L'acceptation des Termes et Conditions est requise",
    learnMoreText : "En savoir plus",
    month:'mois',
    includeFees:'frais inclus',
    include:'inclus',
    furtherInfoText : 'Plus d\'Information et Politique de confidentialité',
    footerInstallmentsTextStart: 'Versements Rendus Possible par',
    footerInstallmentsTextEnd: ''
  }
}

export default fr;
