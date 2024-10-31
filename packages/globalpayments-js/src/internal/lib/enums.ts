import { HostedFieldStyles as HostedFieldStylesAlias } from "../../common/enums";
import { BrandThemes as BrandThemesAlias } from "./styles/themes/brand-themes/brand-themes";

export enum ApiVersion {
  default = "2021-03-22"
}

export enum Apm {
  ApplePay = "apple-pay",
  ClickToPay = "click-to-pay",
  GooglePay = "google-pay",
  OpenBankingPayment = "open-banking",
  PayPal = "paypal",
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

export enum CardFormEvents {
  ValidityState = "card-form-validity",
}

export enum QRCodePaymentsProviderBrands {
  Alipay = "Alipay",
  AlipayHK = "AlipayHK",
  WeChat = "WeChat",
}

export enum OpenBanking {
  title = "Bank Payment"
}

export enum PayPal {
  title = "PayPal Payment"
}

export enum ApmProviders {
  Alipay = "Alipay",
  AlipayHK = "AlipayHK",
  OpenBanking = "OPEN_BANKING",
  PayPal = "PayPal",
  WeChat = "WeChat"
}

export enum QRCodePaymentsWeChatProviderBrands {
  WeChatBrand = "WeChat",
  WeChatMethodResponse = "WECHAT",
  WeChatAccountResponse = "WeChat Pay",
}

export const HostedFieldStyles = HostedFieldStylesAlias;

export const BrandThemes = BrandThemesAlias;