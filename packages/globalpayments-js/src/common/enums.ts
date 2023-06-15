export enum CardFormFieldNames {
    CardAccountNumber = "account-number",
    CardNumber = "card-number",
    CardExpiration = "card-expiration",
    CardCvv = "card-cvv",
    CardHolderName = "card-holder-name",
}

export enum HostedFieldValidationEvents {
    BuiltInValidationShow = "hosted-field-built-in-validation-show",
    BuiltInValidationHide = "hosted-field-built-in-validation-hide",

    ValidationShow = "hosted-field-validation-show",
    ValidationHide = "hosted-field-validation-hide",

    Validate = "hosted-field-validate",
    ValidatePassData = "hosted-field-validate-pass-data",

    ValidateForm = "hosted-field-validate-form",
    ValidateFormField = "hosted-field-validate-form-field",
    ValidateFormValid = "hosted-field-validate-form-valid",
}