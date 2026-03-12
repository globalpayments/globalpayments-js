export const enum ApmInternalEvents {
    PaymentMethodsRequestStart = "payment-methods-request-start",
    PaymentMethodsRequestCompleted = "payment-methods-request-completed",
    NavigatesBackBySelectAnotherPaymentMethod = "payment-navigates-back-select-another-payment-method",
}

export const enum QRCodePaymentsActions {
    RedirectAction = "REDIRECT",
    RedirectInFrameAction = "REDIRECT_IN_FRAME",
    PresentQRCodeAction = "PRESENT_QR_CODE",
}

export const enum BnplCountries {
    US = "US",
    AU = "AU",
    NZ = "NZ",
    EU = "EU",
    NO = "NO",
    CH = "CH",
    UK = "UK",
    CA = "CA",
    HK = "HK",
    IN = "IN",
    IL = "IL",
    BZ = "BZ",
    MX = "MX"
}