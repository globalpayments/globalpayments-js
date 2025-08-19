// hu - Hungarian
const hu = {
  labels: {
    "card-number": "Kártyaszám",
    "card-expiration": "Kártya lejárata",
    "card-cvv": "Kártya CVV-azonosítója",
    "card-holder-name": "Kártyatulajdonos neve",
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
  QR: {
    button: {
      text: 'Választott fizetési mód',
      "aria-label": 'Választott fizetési mód'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Fizessen ezzel ##VALUE1##`;

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
    amount: "Összeg",
    orderReference: "Rendelési hivatkozás",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Kérjük, válassza ki a kívánt bankot",
  }
}

export default hu;