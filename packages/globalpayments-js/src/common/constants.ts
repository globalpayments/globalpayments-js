import { getBrandThemeNames } from "../internal/lib/styles/themes/brand-themes/brand-themes";
import { CardFormFieldNames, ExpressPayFieldNames, HostedFieldStyles } from "./enums";

export const HOSTED_FIELD_NAME_KEYS: string[] = [
     CardFormFieldNames.CardNumber,
     CardFormFieldNames.CardExpiration,
     CardFormFieldNames.CardCvv,
     CardFormFieldNames.CardHolderName,
];

export const HOSTED_FIELDS_ADDITIONAL_KEYS: string[] = [
     ExpressPayFieldNames.EmailId,
     ExpressPayFieldNames.BillingAddress,
     ExpressPayFieldNames.BillingApt,
     ExpressPayFieldNames.BillingCity,
     ExpressPayFieldNames.BillingState,
     ExpressPayFieldNames.BillingPostalCode,
     ExpressPayFieldNames.Country,
     ExpressPayFieldNames.CountryCode,
     ExpressPayFieldNames.Phone
];

export const HOSTED_FIELDS_SHIPPING_KEYS: string[] = [
     ExpressPayFieldNames.ShippingAddress,
     ExpressPayFieldNames.ShippingCountry,
     ExpressPayFieldNames.ShippingName,
     ExpressPayFieldNames.ShippingApt,
     ExpressPayFieldNames.ShippingCity,
     ExpressPayFieldNames.ShippingState,
     ExpressPayFieldNames.ShippingPostalCode
];

export const HOSTED_FIELD_STYLE_NAMES: string[] = [
     HostedFieldStyles.Default,
     HostedFieldStyles.Simple,
     HostedFieldStyles.Blank,
     HostedFieldStyles.GpDefault,
     HostedFieldStyles.GpDefault2
];

export const HOSTED_FIELD_BRAND_THEMES_NAMES: string[] = getBrandThemeNames();