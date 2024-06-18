// hu - Hungarian
const hu = {
  labels: {
    "card-number": "Kártyaszám",
    "card-expiration": "Kártya lejárata",
    "card-cvv": "Kártya CVV-azonosítója",
    "card-holder-name": "Kártyatulajdonos neve",
    "submit": "Küldés"
  },
  values: {
    "card-track": "Kártya olvasása",
    "submit": "Küldés"
  },
  validationMessages: {
    CardNumber: {
      Required: 'A kártyaszámot meg kell adni',
      CharactersLessThan12: 'A kártyaszámnak legalább 12 számjegyből kell állnia',
      NumberIsNotValid: 'A telefonszám érvénytelen',
      NotAllowedCardType: 'Ezt a kártyatípust nem lehet feldolgozni, használjon másik kártyát'
    },
    CardExpiration: {
      NotCompleted: 'Adjon meg érvényes hónapot/évet',
      YearNotValid: 'Az év nem érvényes',
      MonthNotValid: 'A hónap nem érvényes',
      ExpiryDateNotValid: 'A lejárati dátum nem érvényes',
    },
    CardCvv: {
      CodeIsNotValid: 'A kártya CVV-azonosítója nem érvényes',
      CodeIsLessThan3Digits: 'A kártya CVV-azonosítója túl rövid',
      CodeMustBe3Digits: 'A kártya CVV-azonosítójának 3 számjegyűnek kell lennie',
      AmexCodeMustBe4Digits: 'Amex esetében a kártya CVV-azonosítójának 4 számjegyűnek kell lennie',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Adjon meg érvényes kártyatulajdonos-nevet',
      CharactersMoreThan100: 'A kártyatulajdonos neve legfeljebb 100 karakter lehet'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": '256 bites SSL-titkosítású embléma',
    "ssl-msg": '256 bites<br>SSL-titkosítású',
    "security-msg-alt": 'A Global Payments által biztosított',
    "security-msg": 'A biztonságos feldolgozást a <strong>Global Payments</strong> szolgáltatja'
  },
  tooltip: {
    "title": 'Biztonsági kód',
    "aria-label": 'Információ a biztonsági kódról',
    "text": 'A kártya hátulján szereplő további 3 számjegy. American Express esetében ez a kártya hátulján szereplő további 4 számjegy.'
  },
  "other-cards-label": 'Vagy adja meg kézzel a kártya adatait',
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Fizessen ezzel ##VALUE1##`;

        return resource.replace('##VALUE1##', paymentMethod);
      },
    }
  },
}

export default hu;