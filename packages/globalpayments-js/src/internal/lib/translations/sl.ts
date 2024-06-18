// sl - Slovenian
const sl = {
  labels: {
    "card-number": "Številka kartice",
    "card-expiration": "Datum poteka kartice",
    "card-cvv": "Koda CVV kartice",
    "card-holder-name": "Ime imetnika kartice",
    "submit": "Pošlji"
  },
  values: {
    "card-track": "Preberi kartico",
    "submit": "Pošlji"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Številka kartice je obvezna',
      CharactersLessThan12: 'Številka kartice mora vsebovati najmanj 12 števk',
      NumberIsNotValid: 'Številka kartice ni veljavna',
      NotAllowedCardType: 'Te vrste kartice ni mogoče obdelati. Uporabite drugo kartico.'
    },
    CardExpiration: {
      NotCompleted: 'Vnesite veljaven mesec/leto',
      YearNotValid: 'Leto ni veljavno',
      MonthNotValid: 'Mesec ni veljaven',
      ExpiryDateNotValid: 'Datum poteka ni veljaven',
    },
    CardCvv: {
      CodeIsNotValid: 'Koda CVV kartice ni veljavna',
      CodeIsLessThan3Digits: 'Koda CVV kartice je prekratka',
      CodeMustBe3Digits: 'Koda CVV kartice mora biti 3-mestna',
      AmexCodeMustBe4Digits: 'Koda CVV kartice Amex mora biti 4-mestna',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Vnesite veljavno ime imetnika kartice',
      CharactersMoreThan100: 'Ime imetnika kartice lahko vsebuje največ 100 znakov'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Logotip 256-bitno šifriranega potrdila SSL',
    "ssl-msg": '256-bitno šifrirano<br>potrdilo SSL',
    "security-msg-alt": 'Zaščito zagotavlja Global Payments',
    "security-msg": 'Varno obdelalo podjetje <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Varnostna koda',
    "aria-label": 'Informacije o varnostni kodi',
    "text": 'Dodatne 3 števke na hrbtni strani kartice. Za kartice American Express so to dodatne 4 števke na sprednji strani kartice.'
  },
  "other-cards-label": 'Ali pa ročno vnesite podatke o kartici',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Plačajte z ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default sl;