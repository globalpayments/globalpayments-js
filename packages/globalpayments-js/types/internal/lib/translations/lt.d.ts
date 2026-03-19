declare const lt: {
    labels: {
        "card-number": string;
        "card-expiration": string;
        "card-cvv": string;
        "card-holder-name": string;
        submit: string;
    };
    values: {
        "card-track": string;
        submit: string;
    };
    validationMessages: {
        CardNumber: {
            Required: string;
            CharactersLessThan12: string;
            NumberIsNotValid: string;
            NotAllowedCardType: string;
        };
        CardExpiration: {
            NotCompleted: string;
            YearNotValid: string;
            MonthNotValid: string;
            ExpiryDateNotValid: string;
        };
        CardCvv: {
            CodeIsNotValid: string;
            CodeIsLessThan3Digits: string;
            CodeMustBe3Digits: string;
            AmexCodeMustBe4Digits: string;
        };
        CardHolderName: {
            NotValidCardHolderName: string;
            CharactersMoreThan100: string;
        };
        CurrencyConversion: {
            Required: string;
        };
    };
    footer: {
        "ssl-msg-alt": string;
        "ssl-msg": string;
        "security-msg-alt": string;
        "security-msg": string;
    };
    tooltip: {
        title: string;
        "aria-label": string;
        text: string;
    };
    "other-cards-label": string;
    QR: {
        scanRqCode: string;
        payInApp: string;
        amount: {
            "aria-label": string;
        };
        qrImage: {
            alt: string;
            "aria-label": string;
        };
        timer: {
            text: string;
            minutes: string;
            seconds: string;
            "icon-alt": string;
        };
        expiredScreen: {
            title: string;
            alt: string;
            text: string;
        };
        button: {
            text: string;
            "aria-label": string;
        };
        loading: string;
        redirectScreen: {
            redirectingToPaymentPageMessage: string;
        };
    };
    apms: {
        button: {
            getAriaLabel: (paymentMethod: string) => string;
        };
        redirectToBank: string;
    };
    dcc: {
        label: string;
        additionalInfo: (currency: string, exchangeRate: string, payerCurrency: string, marginRatePercentage: string) => string;
        cardCurrency: {
            tooltip: (payerCurrency: string, exchangeRateSource: string, exchangeRateTimeCreated: string) => string;
            "aria-label": string;
        };
        merchantCurrency: {
            tooltip: (exchangeRateSource: string, exchangeRateTimeCreated: string) => string;
            "aria-label": string;
        };
    };
    orderInformation: {
        amount: string;
        orderReference: string;
    };
    bankSelection: {
        pleaseSelectYourPreferredBank: string;
    };
    installments: {
        choosePaymentOption: string;
        payInFull: string;
        monthsWithoutInterest: string;
        buyNowPayLater: string;
        months: string;
        eligibleForInstallmentBadgeText: string;
    };
};
export default lt;
