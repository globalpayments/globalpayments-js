// lv - Latvia
const lv = {
    labels: {
      "card-number": "Kartes numurs",
      "card-expiration": "Kartes derīguma termiņš",
      "card-cvv": "Kartes CVV numurs",
      "card-holder-name": "Kartes turētāja vārds, uzvārds",
      "submit": "Iesniegt"
    },
    values: {
      "card-track": "Nolasīt karti",
      "submit": "Iesniegt"
    },
    validationMessages: {
      CardNumber: {
        Required: 'Nepieciešams kartes numurs',
        CharactersLessThan12: 'Kartes numuru jāveido vismaz 12 cipariem',
        NumberIsNotValid: 'Kartes numurs nav derīgs',
        NotAllowedCardType: 'Nav iespējams apstrādāt šādu kartes tipu. Lūdzu, izmantojiet citu karti'
      },
      CardExpiration: {
        NotCompleted: 'Lūdzu, ievadiet derīgu mēnesi/gadu',
        YearNotValid: 'Gads ir nepareizs',
        MonthNotValid: 'Mēnesis ir nepareizs',
        ExpiryDateNotValid: 'Derīguma datums ir nepareizs',
      },
      CardCvv: {
        CodeIsNotValid: 'Kartes CVV numurs nav derīgs',
        CodeIsLessThan3Digits: 'Kartes CVV numurs ir pārāk īss',
        CodeMustBe3Digits: 'Kartes CVV numuru veido 3 cipari',
        AmexCodeMustBe4Digits: 'Amex kartes CVV numuru veido 4 cipari',
      },
      CardHolderName: {
        NotValidCardHolderName: 'Ievadiet derīgu kartes turētāja vārdu, uzvārdu',
        CharactersMoreThan100: 'Kartes turētāja vārds, uzvārds nedrīkst būt garāks par 100 rakstzīmēm'
      },
      CurrencyConversion: {
        Required: "Choose preferred currency"
      }
    },
    footer: {
      "ssl-msg-alt": '256 bitu SSL šifrējuma logotips',
      "ssl-msg": '256 bitu SSL<br>šifrējums',
      "security-msg-alt": 'Aizsargā Global Payments',
      "security-msg": 'Droši apstrādā <strong>Global Payments</strong>'
    },
    tooltip: {
      "title": 'Drošības kods',
      "aria-label": 'Informācija par drošības kodu',
      "text": 'Papildu 3 cipari kartes aizmugurē. American Express kartēm tie ir papildu 4 cipari kartes priekšpusē.'
    },
    "other-cards-label": 'Vai ievadiet kartes datus',
    QR: {
      scanRqCode: "Scan QR Code",
      payInApp: "to pay in app",
      amount: {
        "aria-label": 'Transaction Total'
      },
      qrImage: {
        alt: 'QR Code Display',
        "aria-label": 'QR Code Display'
      },
      timer: {
        text: 'This QR Code will expire in:',
        minutes: 'mins',
        seconds: 's',
        "icon-alt": 'Remaining Time Icon'
      },
      expiredScreen: {
        title: 'QR Code has expired.',
        alt: 'QR Code has expired.',
        text: 'Click the link below to return to the payment options.'
      },
      button: {
        text: 'Izvēlieties citu maksāšanas metodi',
        "aria-label": 'Izvēlieties citu maksāšanas metodi'
      },
      loading: "Ielādē",
      redirectScreen: {
        redirectingToPaymentPageMessage: 'Pārsūta uz maksājumu lapu',
      },
    },
    apms: {
      button: {
        getAriaLabel: (paymentMethod: string): string => {
          const resource = `Maksāt ar ##VALUE1##`;
          return resource.replace('##VALUE1##', paymentMethod);
        },
        // getImageUrl: (assetBaseUrl: string): string => {
        //   const imageBase = assetBaseUrl + "images/";
        //   const url = `transparent url(${imageBase}open-banking.svg) no-repeat 50% 50%`
        //   return url;
        // }
      },
      redirectToBank: "Redirecting",
    },
    dcc: {
      label: "Select Your Preferred Currency",
      additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string) => {
        const resource = `<p>Exchange rate used: 1 ##VALUE1## = ##VALUE2## ##VALUE3##. Exchange Rate Mark-Up: ##VALUE4## above ECB Rate.</p>`;
        return resource.replace('##VALUE1##', currency)
          .replace('##VALUE2##', exchangeRate)
          .replace('##VALUE3##', payerCurrency)
          .replace('##VALUE4##', marginRatePercentage);
      },
      cardCurrency: {
        tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => {
          const resource = `<p>I accept that I have been offered a choice of currencies for payment. I accept the conversion rate and final amount and that the final selected transaction currency is the cardholder's chosen currency, ##VALUE1##.</p>
          <p>Reference Rate Provided by: ##VALUE2##,<br />
          Exchange rate offered on: ##VALUE3##.</p>`;
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
      }
    },
    orderInformation: {
        amount: "Summa",
        orderReference: "Pasūtījuma atsauce",
      },
    bankSelection: {
      pleaseSelectYourPreferredBank: "Please select your preferred bank",
    },
  }
  export default lv;