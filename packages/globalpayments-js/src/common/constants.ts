import { getBrandThemeNames } from "../internal/lib/styles/themes/brand-themes/brand-themes";
import { CardFormFieldNames, HostedFieldStyles } from "./enums";

export const HOSTED_FIELD_NAME_KEYS: string[] = [
     CardFormFieldNames.CardNumber,
     CardFormFieldNames.CardExpiration,
     CardFormFieldNames.CardCvv,
     CardFormFieldNames.CardHolderName,
];

export const HOSTED_FIELD_STYLE_NAMES: string[] = [
     HostedFieldStyles.Default,
     HostedFieldStyles.Simple,
     HostedFieldStyles.Blank,
     HostedFieldStyles.GpDefault,
];

export const HOSTED_FIELD_BRAND_THEMES_NAMES: string[] = getBrandThemeNames();