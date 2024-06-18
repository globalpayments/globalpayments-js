// nl - Dutch
const nl = {
  labels: {
    "card-number": "Kaartnummer",
    "card-expiration": "Vervaldatum kaart",
    "card-cvv": "CVV kaart",
    "card-holder-name": "Naam kaarthouder",
    "submit": "Indienen"
  },
  values: {
    "card-track": "Kaart lezen",
    "submit": "Indienen"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Kaartnummer vereist',
      CharactersLessThan12: 'Het kaartnummer moet ten minste 12 tekens bevatten',
      NumberIsNotValid: 'Het kaartnummer is niet geldig',
      NotAllowedCardType: 'Dit kaarttype kan niet worden verwerkt. Gebruik een andere kaart'
    },
    CardExpiration: {
      NotCompleted: 'Voer een geldige maand en een geldig jaar in',
      YearNotValid: 'Het jaar is geen geldige waarde',
      MonthNotValid: 'De maand is geen geldige waarde',
      ExpiryDateNotValid: 'De vervaldatum is niet geldig',
    },
    CardCvv: {
      CodeIsNotValid: 'De CVV van de kaart is niet geldig',
      CodeIsLessThan3Digits: 'De CVV van de kaart is te kort',
      CodeMustBe3Digits: 'De CVV van de kaart moet 3 cijfers bevatten',
      AmexCodeMustBe4Digits: 'Bij AmEx-kaarten bestaat de CVV uit 4 cijfers',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Voer een geldige kaarthoudernaam in',
      CharactersMoreThan100: 'De naam van de kaarthouder kan maximaal 100 tekens bevatten'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256-bits SSL-versleuteld logo',
    "ssl-msg": '256-bits SSL-<br>versleuteld',
    "security-msg-alt": 'Gewaarborgd door Global Payments',
    "security-msg": 'Veilig verwerkt door <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Beveiligingscode',
    "aria-label": 'Informatie over de beveiligingscode',
    "text": 'De 3 cijfers op de achterzijde van uw kaart. Bij AmEx-kaarten zijn dit de 4 cijfers op de achterzijde van uw kaart.'
  },
  "other-cards-label": 'U kunt de kaartgegevens ook handmatig invoeren',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Betaal met ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default nl;