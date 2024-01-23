export enum Apm {
  ApplePay = "apple-pay",
  ClickToPay = "click-to-pay",
  GooglePay = "google-pay",
  OpenBankingPayment = "open-banking",
  QRCodePayments = "qr-code-payments"
}

export enum ApmEvents {
  PaymentMethodActionDetail = "apm-action-details",
  PaymentMethodSelection = "apm-payment-method"
}

export enum CardNetwork {
  Amex = "AMEX",
  Discover = "DISCOVER",
  Mastercard = "MASTERCARD",
  Visa = "VISA"
}

export enum CharacterValidation {
  englishOnly = "englishOnly",
  none = "none"
}

export enum Language {
  en = "en",
  zh = "zh"
}

export enum QRCodePaymentsProviderBrands {
  Alipay = "Alipay",
  AlipayHK = "AlipayHK",
  WeChat = "WeChat",
}

export enum OpenBanking {
  title = "Bank Payment"
}

export enum ApmProviders {
  Alipay = "Alipay",
  AlipayHK = "AlipayHK",
  OpenBanking = "OPEN_BANKING",
  WeChat = "WeChat"
}

export enum QRCodePaymentsWeChatProviderBrands {
  WeChatBrand = "WeChat",
  WeChatMethodResponse = "WECHAT",
  WeChatAccountResponse = "WeChat Pay",
}