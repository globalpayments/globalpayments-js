const fr = {
  labels: {
    "card-number": "Numéro de carte",
    "card-expiration": "Date d'expiration de la carte",
    "card-cvv": "Code CVV de la carte",
    "card-holder-name": "Nom du titulaire de carte",
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
    "security-msg": 'Traitement sécurisé par <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Code de sécurité',
    "aria-label": 'Informations sur le code de sécurité',
    "text": 'Les 3 chiffres supplémentaires figurant au dos de votre carte. Pour American Express, il s\'agit des 4 chiffres supplémentaires figurant au recto de votre carte.'
  },
  "other-cards-label": 'Vous pouvez aussi saisir manuellement les détails de la carte.',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Payer avec ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default fr;
