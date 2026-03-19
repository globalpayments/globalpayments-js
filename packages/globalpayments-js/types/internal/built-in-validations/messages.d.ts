export declare const ValidationMessages: {
    CardNumber: {
        Required: any;
        CharactersLessThan12: any;
        NumberIsNotValid: any;
        NotAllowedCardType: any;
    };
    CardExpiration: {
        NotCompleted: any;
        YearNotValid: any;
        MonthNotValid: any;
        ExpiryDateNotValid: any;
    };
    CardCvv: {
        CodeIsNotValid: any;
        CodeIsLessThan3Digits: any;
        CodeMustBe3Digits: any;
        AmexCodeMustBe4Digits: any;
    };
    CardHolderName: {
        NotValidCardHolderName: any;
        CharactersMoreThan100: any;
    };
    CurrencyConversion: {
        Required: any;
    };
    EmailId: {
        Required: string;
        InvalidEmail: string;
    };
    PhoneNumber: {
        Required: string;
        InvalidPhone: string;
        InvalidLength: string;
    };
    BillingAddress: {
        Required: string;
        CountryRequired: string;
    };
    ShippingAddress: {
        Required: string;
        MandatoryName: string;
        InvalidPostalCode: string;
        MandatoryPostalCode: string;
        MandatoryCity: string;
        MandatoryState: string;
    };
};
