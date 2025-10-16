import { HostedFieldStyles as HostedFieldStylesAlias } from "../../common/enums";
import { BrandThemes as BrandThemesAlias } from "./styles/themes/brand-themes/brand-themes";
import { BankDisplayNames } from "./bank-selection/contracts";

export enum ApiVersion {
  default = "2021-03-22"
}

export enum Apm {
  ApplePay = "apple-pay",
  ClickToPay = "click-to-pay",
  GooglePay = "google-pay",
  OpenBankingPayment = "open-banking",
  PayPal = "paypal",
  QRCodePayments = "qr-code-payments",
  Blik = "blik",
  ExpressPay = "express-pay"
}

export enum ApmEvents {
  PaymentMethodActionDetail = "apm-action-details",
  PaymentMethodSelection = "apm-payment-method"
}

export enum CardNetwork {
  Amex = "AMEX",
  Discover = "DISCOVER",
  Mastercard = "MASTERCARD",
  Visa = "VISA",
  Carnet = "CARNET"
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
  WeChat = "WeChat",
  Blik = "blik",
  ExpressPay = "ExpressPay"
}

export enum QRCodePaymentsWeChatProviderBrands {
  WeChatBrand = "WeChat",
  WeChatMethodResponse = "WECHAT",
  WeChatAccountResponse = "WeChat Pay",
}

export const phoneNumberLength = 10;

export const HostedFieldStyles = HostedFieldStylesAlias;

export const BrandThemes = BrandThemesAlias;

export const BankNames = BankDisplayNames;

export enum HostedFieldFooterLinks {
  LearnMore = "learnmore.html",
  Terms = "termsofservice.html",
  PrivacyPolicy = "privacypolicy.html"
}

export enum ExpressPayEvents {
  ExpressPayActionDetail = "express-pay-action-details",
}

export const OTPLength = 6;

export const formMaxWidth = 1000;