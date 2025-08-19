// et - Estonia
const et = {
    labels: {
      "card-number": "Kaardi number",
      "card-expiration": "Kaardi aegumiskuupäev",
      "card-cvv": "Kaardi CVV",
      "card-holder-name": "Kaardiomaniku nimi",
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
      "submit": "Esita"
    },
    values: {
      "card-track": "Kaardi lugemine",
      "submit": "Esita"
    },
    validationMessages: {
      CardNumber: {
        Required: 'Kaardi number on kohustuslik',
        CharactersLessThan12: 'Kaardi number peab olema vähemalt 12-kohaline',
        NumberIsNotValid: 'Kaardi number on sobimatu',
        NotAllowedCardType: 'Sellist tüüpi kaarti ei saa töödelda. Kasutage teist kaarti'
      },
      CardExpiration: {
        NotCompleted: 'Sisestage sobiv kuu/aasta',
        YearNotValid: 'Aasta on sobimatu',
        MonthNotValid: 'Kuu on sobimatu',
        ExpiryDateNotValid: 'Aegumiskuupäev on sobimatu',
      },
      CardCvv: {
        CodeIsNotValid: 'Kaardi CVV on sobimatu',
        CodeIsLessThan3Digits: 'Kaardi CVV on liiga lühike',
        CodeMustBe3Digits: 'CVV peab olema kolmekohaline',
        AmexCodeMustBe4Digits: 'Amexi kaardi CVV peab olema neljakohaline',
      },
      CardHolderName: {
        NotValidCardHolderName: 'Sisestage sobiv kaardiomaniku nimi',
        CharactersMoreThan100: 'Kaardiomaniku nimi võib koosneda kuni 100 tähemärgist'
      },
      CurrencyConversion: {
        Required: "Choose preferred currency"
      }
    },
    footer: {
      "ssl-msg-alt": '256-bitise SSL-protokolli abil krüpteerimise logo',
      "ssl-msg": 'Krüpteeritud 256-bitise<br>SSL-protokolli abil',
      "security-msg-alt": 'Global Paymentsi turvatud',
      "security-msg": 'Turvaliselt töödeldud <strong>Global Paymentsi</strong> poolt'
    },
    tooltip: {
      "title": 'Turvakood',
      "aria-label": 'Turvakoodi teave',
      "text": 'Kaardi tagaküljel olevad kolm lisanumbrit. American Expressi puhul on need kaardi esiküljel olevad neli lisanumbrit.'
    },
    "other-cards-label": 'Või sisestage üksikasjad käsitsi',
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
        text: 'Valige muu makseviis',
        "aria-label": 'Valige muu makseviis'
      },
      loading: "Laadimine",
      redirectScreen: {
        redirectingToPaymentPageMessage: 'Ümbersuunamine makselehele',
      },
    },
    apms: {
      button: {
        getAriaLabel: (paymentMethod: string): string => {
          const resource = `Maksa ##VALUE1##`;
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
        orderReference: "Tellimuse viide",
      },
    bankSelection: {
      pleaseSelectYourPreferredBank: "Please select your preferred bank",
    },
  }

  export default et;

