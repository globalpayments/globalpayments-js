// it - Italian
const it = {
  labels: {
    "card-number": "Numero di carta",
    "card-expiration": "Scadenza carta",
    "card-cvv": "CVV carta",
    "card-holder-name": "Nome intestatario della carta",
    "submit": "Invia"
  },
  values: {
    "card-track": "Leggi carta",
    "submit": "Invia"
  },
  validationMessages: {
    CardNumber: {
      Required: 'È necessario un numero di carta',
      CharactersLessThan12: 'Il numero di carta deve essere composto da almeno 12 cifre',
      NumberIsNotValid: 'Il numero di carta non è valido',
      NotAllowedCardType: 'Impossibile elaborare questo tipo di carta, usane un\'altra.'
    },
    CardExpiration: {
      NotCompleted: 'Inserisci un mese/anno valido',
      YearNotValid: 'L\'anno non è valido',
      MonthNotValid: 'Il mese non è valido',
      ExpiryDateNotValid: 'La data di scadenza non è valida',
    },
    CardCvv: {
      CodeIsNotValid: 'Il CVV della carta non è valido',
      CodeIsLessThan3Digits: 'Il CVV della carta è troppo corto',
      CodeMustBe3Digits: 'Il CVV della carta deve essere di 3 cifre',
      AmexCodeMustBe4Digits: 'Il CVV della carta Amex deve essere di 4 cifre',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Inserisci un nome dell\'intestatario della carta valido',
      CharactersMoreThan100: 'Il nome dell\'intestatario della carta può contenere un massimo di 100 caratteri'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logo crittografato SSL a 256 bit',
    "ssl-msg": 'SSL a 256 bit<br>crittografato',
    "security-msg-alt": 'Protetto da Global Payments',
    "security-msg": 'Elaborato in modo sicuro da <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Codice di sicurezza',
    "aria-label": 'Informazioni sul codice di sicurezza',
    "text": 'Le 3 cifre aggiuntive sul retro della carta. Per le carte American Express, sono le ulteriori 4 cifre sulla parte anteriore.'
  },
  "other-cards-label": 'Oppure inserisci i dettagli della carta manualmente',
  QR: {
    button: {
      text: 'Metodo di pagamento',
      "aria-label": 'Metodo di pagamento'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Paga con ##VALUE1##`;

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
    amount: "Quantità",
    orderReference: "Riferimento dell'ordine",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Seleziona la tua banca preferita",
  }
}

export default it;