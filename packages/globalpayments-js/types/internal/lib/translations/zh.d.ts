declare const zh: {
    labels: {
        "card-cvv": string;
        "card-expiration": string;
        "card-holder-name": string;
        "card-number": string;
        "email-id": string;
        "phone-number": string;
        "billing-address": string;
        country: string;
        "shipping-address-country": string;
        "shipping-address": string;
        "shipping-name": string;
        "country-code": string;
        "billing-city": string;
        "shipping-city": string;
        "billing-state": string;
        "shipping-state": string;
        "billing-apt": string;
        "shipping-apt": string;
        "billing-postal-code": string;
        "shipping-postal-code": string;
        "apt-suite": string;
        city: string;
        state: string;
        "postal-code": string;
        submit: string;
    };
    values: {
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
        button: {
            text: string;
            "aria-label": string;
        };
        loading: string;
        redirectScreen: {
            redirectingToPaymentPageMessage: string;
        };
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
    };
    apms: {
        button: {
            getAriaLabel: (paymentMethod: string) => string;
        };
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
export default zh;
