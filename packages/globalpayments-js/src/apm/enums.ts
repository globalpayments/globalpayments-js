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