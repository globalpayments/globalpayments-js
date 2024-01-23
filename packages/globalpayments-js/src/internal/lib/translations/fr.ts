const fr = {
  labels: {
    "card-number": "Numéro de carte",
    "card-expiration": "Date d\'expiration",
    "card-cvv": "Code de sécurité (CVC)",
    "card-holder-name": "Nom sur la carte",
    "submit": "Soumettre"
  },
  values: {
    "card-track": "Lire la carte",
    "submit": "Soumettre"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Saisissez le numéro de carte',
      CharactersLessThan12: 'Le numéro de carte doit comporter au moins 12 chiffres',
      NumberIsNotValid: 'Le numéro de carte n\'est pas valide',
      NotAllowedCardType: 'Impossible de traiter ce type de carte, veuillez utiliser une autre carte'
    },
    CardExpiration: {
      NotCompleted: 'Saisissez une date d\'expiration valide',
      YearNotValid: 'L\'année n\'est pas valide',
      MonthNotValid: 'Le mois n\'est pas valide',
      ExpiryDateNotValid: 'La date d\'expiration n\'est pas valide',
    },
    CardCvv: {
      CodeIsNotValid: 'Entrez le code de sécurité sur votre carte',
      CodeIsLessThan3Digits: 'Le code CVC de la carte est trop court',
      CodeMustBe3Digits: 'Le code CVC de la carte doit comporter 3 chiffres',
      AmexCodeMustBe4Digits: 'Le code CVC de la carte Amex doit comporter 4 chiffres',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Entrez le nom tel qu\'il est écrit sur votre carte',
      CharactersMoreThan100: 'Le nom du titulaire de la carte ne peut pas dépasser 100 caractères'
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo crypté 256-bit SSL',
    "ssl-msg": '256-bit SSL<br>crypté',
    "security-msg-alt": 'Sécurisé par Global Payments',
    "security-msg": 'Traitement sécurisé par <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Code de sécurité',
    "aria-label": 'Informations sur le code de sécurité',
    "text": 'Les 3 chiffres supplémentaires au dos de votre carte. Pour American Express, il s\'agit les 4 chiffres supplémentaires à l\'avant de votre carte.'
  },
  "other-cards-label": 'Ou saisissez les détails de la carte manuellement',
  QR: {
    button: {
      text: 'Sélectionner une autre méthode de paiement',
      "aria-label": 'Sélectionner une autre méthode de paiement'
    },
    loading: "Chargement",
    redirectScreen: {
      redirectingToPaymentPageMessage: 'Redirection vers la page de paiement',
    },
  }
}

export default fr;
