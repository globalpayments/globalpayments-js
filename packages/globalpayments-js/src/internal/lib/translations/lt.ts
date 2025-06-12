// lt - Lithuanian
const lt = {
    labels: {
      "card-number": "Kortelės numeris",
      "card-expiration": "Kortelės galiojimo pabaiga",
      "card-cvv": "Kortelės CVV",
      "card-holder-name": "Kortelės turėtojo vardas ir pavardė",
      "submit": "Pateikti"
    },
    values: {
      "card-track": "Nuskaityti kortelę",
      "submit": "Pateikti"
    },
    validationMessages: {
      CardNumber: {
        Required: 'Būtina nurodyti kortelės numerį',
        CharactersLessThan12: 'Kortelės numerį turi sudaryti bent 12 skaitmenų',
        NumberIsNotValid: 'Kortelės numeris netinkamas',
        NotAllowedCardType: 'Šio tipo kortelės neapdorojamos, naudokite kitą kortelę'
      },
      CardExpiration: {
        NotCompleted: 'Įveskite tinkamą mėnesį / metus',
        YearNotValid: 'Metai netinkami',
        MonthNotValid: 'Mėnuo netinkamas',
        ExpiryDateNotValid: 'Galiojimo pabaigos data netinkama',
      },
      CardCvv: {
        CodeIsNotValid: 'Kortelės CVV netinkamas',
        CodeIsLessThan3Digits: 'Kortelės CVV per trumpas',
        CodeMustBe3Digits: 'Kortelės CVV turi sudaryti 3 skaitmenys',
        AmexCodeMustBe4Digits: '„Amex“ kortelės CVV turi sudaryti 4 skaitmenys',
      },
      CardHolderName: {
        NotValidCardHolderName: 'Įveskite tinkamą kortelės turėtojo vardą ir pavardę',
        CharactersMoreThan100: 'Kortelės turėtojo vardą ir pavardę gali sudaryti ne daugiau kaip 100 simbolių'
      },
      CurrencyConversion: {
        Required: "Choose preferred currency"
      }
    },
    footer: {
      "ssl-msg-alt": '256 bitų SSL užšifruotas logotipas',
      "ssl-msg": 'Užšifruotas<br>256 bitų SSL',
      "security-msg-alt": 'Apsaugą užtikrina „Global Payments“',
      "security-msg": 'Saugų apdorojimą užtikrina <strong>Global Payments</strong>'
    },
    tooltip: {
      "title": 'Saugos kodas',
      "aria-label": 'Saugos kodo informacija',
      "text": 'Papildomi 3 skaitmenys kortelės galinėje pusėje. „American Express“ atveju tai yra papildomi 4 skaitmenys kortelės priekinėje pusėje.'
    },
    "other-cards-label": 'Arba įveskite kortelės duomenis rankiniu būdu',
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
        text: 'Pasirinkite kitą mokėjimo būdą',
        "aria-label": 'Pasirinkite kitą mokėjimo būdą'
      },
      loading: "Įkeliama",
      redirectScreen: {
        redirectingToPaymentPageMessage: 'Nukreipiama į mokėjimo puslapį',
      },
    },
    apms: {
      button: {
        getAriaLabel: (paymentMethod: string): string => {
          const resource = `Mokėti naudojant ##VALUE1##`;
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
      amount: "Amount",
      orderReference: "Order Reference",
    },
    bankSelection: {
      pleaseSelectYourPreferredBank: "Please select your preferred bank",
    },
  }

  export default lt;