export enum Apm {
  ClickToPay = "click-to-pay",
  GooglePay = "google-pay",
  ApplePay = "apple-pay",
  QRCodePayments = "qr-code-payments"
}

export enum CardNetwork {
  Visa = "VISA",
  Mastercard = "MASTERCARD",
  Amex = "AMEX",
  Discover = "DISCOVER"
}

export enum CharacterValidation {
  englishOnly = "englishOnly",
  none = "none"
}

export enum Language {
  en = "en",
  zh = "zh"
}

export enum QRCodePaymentsMerchantInteractionEvents {
  PaymentMethodSelection = "apm-payment-method",
  ProvideQRCodeDetailsMerchantEvent = "apm-action-details",
  TransactionCompletedMerchantEvent = "apm-success-message",
}

export enum QRCodePaymentsProviderBrands {
  AlipayHK = "AlipayHK",
  Alipay = "Alipay",
}