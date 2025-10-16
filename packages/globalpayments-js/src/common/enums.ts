export enum CardFormFieldNames {
    CardAccountNumber = "account-number",
    CardNumber = "card-number",
    CardExpiration = "card-expiration",
    CardCvv = "card-cvv",
    CardHolderName = "card-holder-name"
}

export enum ExpressPayFieldNames {
    EmailId = "email-id",
    Phone = "phone-number",
    BillingAddress = "billing-address",
    BillingApt = "billing-apt",
    BillingCity = "billing-city",
    BillingState = "billing-state",
    BillingPostalCode = "billing-postal-code",
    Country = "country",
    CountryCode = "country-code",
    EnableSaveCard = "save-card-to-express-pay",
    ShippingSameAsBilling = "shipping-same-as-billing",
    ShippingAddress = "shipping-address",
    ShippingCountry = "shipping-address-country",
    ShippingName = "shipping-name",
    ShippingApt = "shipping-apt",
    ShippingCity = "shipping-city",
    ShippingState = "shipping-state",
    ShippingPostalCode = "shipping-postal-code"
}

export enum HostedFieldValidationEvents {
    SetCustomValidationMessages = "hosted-field-set-custom-validation-messages",
    BuiltInValidationShow = "hosted-field-built-in-validation-show",
    BuiltInValidationHide = "hosted-field-built-in-validation-hide",

    ValidationCvvTooltipShow = "hosted-field-validation-cvv-tooltip-show",
    ValidationCvvTooltipHide = "hosted-field-validation-cvv-tooltip-hide",

    ValidationShow = "hosted-field-validation-show",
    ValidationHide = "hosted-field-validation-hide",

    Validate = "hosted-field-validate",
    ValidatePassData = "hosted-field-validate-pass-data",

    ValidateForm = "hosted-field-validate-form",
    ValidateFormValid = "hosted-field-validate-form-valid",
    ValidateFormInvalid = "hosted-field-validate-form-invalid",

    ValidationCurrencyConversionShow = "hosted-field-validation-currency-conversion-show",
    EnableSubmitButton = "hosted-field-enable-submit-button",
}

export enum CardFormFieldValidationTestEvents {
    CardNumber = "card-number-test",
    CardExpiration = "card-expiration-test",
    CardCvv = "card-cvv-test",
    CardHolderName = "card-holder-name-test",
    EmailId = "email-test",
    PhoneNumber = "phone-number-test",
    BillingAddress = "billing-address-test",
    BillingApt = "billing-apt-test",
    BillingCity = "billing-city-test",
    BillingState = "billing-state-test",
    BillingPostalCode = "billing-postal-code-test",
    Country = "country-test",
    CountryCode = "country-code-test",
    ShippingAddress = "shipping-address-test",
    ShippingCountry = "shipping-address-country-test",
    ShippingName = "shipping-name-test",
    ShippingApt = "shipping-apt-test",
    ShippingCity = "shipping-city-test",
    ShippingState = "shipping-state-test",
    ShippingPostalCode = "shipping-postal-code-test"
}

// export enum ExpressPayFieldsValidationTestEvents {
//     EmailId = "email-test",
//     PhoneNumber = "phone-number-test",
//     BillingAddress = "billing-address-test",
//     Country = "country-test",
//     CountryCode = "country-code-test",
//     ShippingAddress = "shipping-address-test",
//     ShippingCountry = "shipping-address-country-test"
// }

export enum Environments {
    Local = "local",
    QA = "qa",
    Sandbox = "sandbox",
    Production = "production",
};

export enum HostedFieldStyles {
    Default = "default",
    Simple = "simple",
    Blank = "blank",
    GpDefault = "gp-default",
    GpDefault2 = "gp-default2"
}