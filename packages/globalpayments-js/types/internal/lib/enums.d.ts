import { HostedFieldStyles as HostedFieldStylesAlias } from "../../common/enums";
import { BrandThemes as BrandThemesAlias } from "./styles/themes/brand-themes/brand-themes";
import { BankDisplayNames } from "./bank-selection/contracts";
export declare enum ApiVersion {
    default = "2021-03-22"
}
export declare enum Apm {
    ApplePay = "apple-pay",
    ClickToPay = "click-to-pay",
    GooglePay = "google-pay",
    OpenBankingPayment = "open-banking",
    PayPal = "paypal",
    QRCodePayments = "qr-code-payments",
    Blik = "blik",
    ExpressPay = "express-pay",
    Affirm = "affirm",
    Klarna = "klarna",
    Sezzle = "sezzle",
    Zip = "zip"
}
export declare enum ApmEvents {
    PaymentMethodActionDetail = "apm-action-details",
    PaymentMethodSelection = "apm-payment-method"
}
export declare enum CardNetwork {
    Amex = "AMEX",
    Discover = "DISCOVER",
    Mastercard = "MASTERCARD",
    Visa = "VISA",
    Carnet = "CARNET"
}
export declare enum CharacterValidation {
    englishOnly = "englishOnly",
    none = "none"
}
export declare enum Language {
    en = "en",
    zh = "zh"
}
export declare enum CardFormEvents {
    ValidityState = "card-form-validity"
}
export declare enum QRCodePaymentsProviderBrands {
    Alipay = "Alipay",
    AlipayHK = "AlipayHK",
    WeChat = "WeChat"
}
export declare enum OpenBanking {
    title = "Bank Payment"
}
export declare enum PayPal {
    title = "PayPal Payment"
}
export declare enum ApmProviders {
    Alipay = "Alipay",
    AlipayHK = "AlipayHK",
    OpenBanking = "OPEN_BANKING",
    PayPal = "PayPal",
    WeChat = "WeChat",
    Blik = "blik",
    ExpressPay = "ExpressPay",
    Affirm = "Affirm",
    Klarna = "Klarna",
    Sezzle = "Sezzle",
    Zip = "Zip"
}
export declare enum QRCodePaymentsWeChatProviderBrands {
    WeChatBrand = "WeChat",
    WeChatMethodResponse = "WECHAT",
    WeChatAccountResponse = "WeChat Pay"
}
export declare const phoneNumberLength = 10;
export declare const HostedFieldStyles: typeof HostedFieldStylesAlias;
export declare const BrandThemes: typeof BrandThemesAlias;
export declare const BankNames: typeof BankDisplayNames;
export declare enum HostedFieldFooterLinks {
    LearnMore = "learnmore.html",
    Terms = "termsofservice.html",
    PrivacyPolicy = "privacypolicy.html"
}
export declare enum ExpressPayEvents {
    ExpressPayActionDetail = "express-pay-action-details"
}
export declare const OTPLength = 6;
export declare const formMaxWidth = 1000;
