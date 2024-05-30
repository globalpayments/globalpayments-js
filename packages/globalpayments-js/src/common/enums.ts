export enum CardFormFieldNames {
    CardAccountNumber = "account-number",
    CardNumber = "card-number",
    CardExpiration = "card-expiration",
    CardCvv = "card-cvv",
    CardHolderName = "card-holder-name",
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
}

export enum CardFormFieldValidationTestEvents {
    CardNumber = "card-number-test",
    CardExpiration = "card-expiration-test",
    CardCvv = "card-cvv-test",
    CardHolderName = "card-holder-name-test",
}

export enum Environments {
    Local = "local",
    QA = "qa",
    Sandbox = "sandbox",
    Production = "production",
};