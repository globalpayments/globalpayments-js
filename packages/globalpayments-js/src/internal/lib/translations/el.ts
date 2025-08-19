// el - Greek
const el = {
  labels: {
    "card-number": "Αριθμός κάρτας",
    "card-expiration": "Λήξη κάρτας",
    "card-cvv": "CVV κάρτας",
    "card-holder-name": "Όνομα κατόχου κάρτας",
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
    "submit": "Υποβολή"
  },
  values: {
    "card-track": "Ανάγνωση κάρτας",
    "submit": "Υποβολή"
  },
  validationMessages: {
    CardNumber: {
      Required: 'Απαιτείται ένας Αριθμός κάρτας',
      CharactersLessThan12: 'Ο Αριθμός κάρτας πρέπει να περιλαμβάνει τουλάχιστον 12 ψηφία',
      NumberIsNotValid: 'Ο Αριθμός κάρτας δεν είναι έγκυρος',
      NotAllowedCardType: 'Αδυναμία επεξεργασίας αυτού του τύπου κάρτας, δοκιμάστε άλλη Κάρτα'
    },
    CardExpiration: {
      NotCompleted: 'Καταχωρίστε έγκυρο μήνα/έτος',
      YearNotValid: 'Το έτος δεν είναι έγκυρο',
      MonthNotValid: 'Ο μήνας δεν είναι έγκυρος',
      ExpiryDateNotValid: 'Η Ημερομηνία λήξης δεν είναι έγκυρη',
    },
    CardCvv: {
      CodeIsNotValid: 'Το CVV κάρτας δεν είναι έγκυρο',
      CodeIsLessThan3Digits: 'Το CVV κάρτας είναι πολύ σύντομο',
      CodeMustBe3Digits: 'Το CVV κάρτας πρέπει να αποτελείται από 3 ψηφία',
      AmexCodeMustBe4Digits: 'Το CVV κάρτας για Amex πρέπει να αποτελείται από 4 ψηφία',
    },
    CardHolderName: {
      NotValidCardHolderName: 'Καταχωρίστε έγκυρο Όνομα κατόχου κάρτας',
      CharactersMoreThan100: 'Το Όνομα κατόχου κάρτας πρέπει να αποτελείται το πολύ από 100 χαρακτήρες'
    },
    CurrencyConversion: {
      Required: "Choose preferred currency",
    }
  },
  footer: {
    "ssl-msg-alt": 'Κρυπτογράφηση λογότυπου 256-bit SSL',
    "ssl-msg": 'Κρυπτογράφηση 256-bit SSL<br>',
    "security-msg-alt": 'Ασφάλεια από την Global Payments',
    "security-msg": 'Ασφαλής επεξεργασία από την <strong>Global Payments</strong>'
  },
  tooltip: {
    "title": 'Κωδικός ασφαλείας',
    "aria-label": 'Πληροφορίες για τον Κωδικό Ασφαλείας',
    "text": 'Τα επιπρόσθετα 3 ψηφία στο πίσω μέρος της κάρτας σας. Για American Express, είναι τα επιπρόσθετα 4 ψηφία στο μπροστινό μέρος της κάρτας σας.'
  },
  "other-cards-label": 'Ή καταχωρίστε χειροκίνητα τα στοιχεία της κάρτας',
  QR: {
    button: {
      text: 'Επιλογή πληρωμής',
      "aria-label": 'Επιλογή πληρωμής'
    },
  },
  apms: {
    button: {
      getAriaLabel: (paymentMethod: string): string => {
        const resource = `Πληρώνω με ##VALUE1##`;

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
    amount: "Ποσό",
    orderReference: "Αναφορά παραγγελίας",
  },
  bankSelection: {
    pleaseSelectYourPreferredBank: "Επιλέξτε την προτιμώμενη τράπεζα",
  }
}

export default el;