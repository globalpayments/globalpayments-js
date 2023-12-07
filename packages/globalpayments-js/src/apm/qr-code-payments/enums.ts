export const enum QRCodePaymentsInternalEvents {
    PaymentMethodsRequestStart = "qr-code-payment-methods-request-start",
    PaymentMethodsRequestCompleted = "qr-code-payment-methods-request-completed",
    NavigatesBackBySelectAnotherPaymentMethod = "qr-code-payment-navigates-back-select-another-payment-method",
}

export const enum QRCodePaymentsActions {
    RedirectAction = "REDIRECT",
    RedirectInFrameAction = "REDIRECT_IN_FRAME",
}