import {
    getThemeStyles as getThemeStylesForBrandThemeBOIPA,
} from "./brand-theme-boipa";
import {
    getThemeStyles as getThemeStylesForBrandThemeBOIPAUK,
} from "./brand-theme-boipa-uk";
import {
    getThemeStyles as getThemeStylesForBrandThemeCOMMERZBANK,
} from "./brand-theme-commerzbank";
import {
    getThemeStyles as getThemeStylesForBrandThemeNBGPAY,
} from "./brand-theme-nbg-pay";
import {
    getThemeStyles as getThemeStylesForBrandThemeESERVICE,
} from "./brand-theme-e-service";

export enum BrandThemes {
    BrandThemeBOIPA = "brand-theme-boipa",
    BrandThemeBOIPAUK = "brand-theme-boipa-uk",
    BrandThemeCOMMERZBANK = "brand-theme-commerzbank",
    BrandThemeNBGPAY = "brand-theme-nbg-pay",
    BrandThemeESERVICE = "brand-theme-e-service",
}

export const getFieldStyles = (assetBaseUrl: string) => {
    return {
        [`${BrandThemes.BrandThemeBOIPA}`]: getThemeStylesForBrandThemeBOIPA(assetBaseUrl).fieldStyles,
        [`${BrandThemes.BrandThemeBOIPAUK}`]: getThemeStylesForBrandThemeBOIPAUK(assetBaseUrl).fieldStyles,
        [`${BrandThemes.BrandThemeCOMMERZBANK}`]: getThemeStylesForBrandThemeCOMMERZBANK(assetBaseUrl).fieldStyles,
        [`${BrandThemes.BrandThemeNBGPAY}`]: getThemeStylesForBrandThemeNBGPAY(assetBaseUrl).fieldStyles,
        [`${BrandThemes.BrandThemeESERVICE}`]: getThemeStylesForBrandThemeESERVICE(assetBaseUrl).fieldStyles,
    };
}

export const getParentStyles = (assetBaseUrl: string) => {
    return {
        [`${BrandThemes.BrandThemeBOIPA}`]: getThemeStylesForBrandThemeBOIPA(assetBaseUrl).parentStyles,
        [`${BrandThemes.BrandThemeBOIPAUK}`]: getThemeStylesForBrandThemeBOIPAUK(assetBaseUrl).parentStyles,
        [`${BrandThemes.BrandThemeCOMMERZBANK}`]: getThemeStylesForBrandThemeCOMMERZBANK(assetBaseUrl).parentStyles,
        [`${BrandThemes.BrandThemeNBGPAY}`]: getThemeStylesForBrandThemeNBGPAY(assetBaseUrl).parentStyles,
        [`${BrandThemes.BrandThemeESERVICE}`]: getThemeStylesForBrandThemeESERVICE(assetBaseUrl).parentStyles,
    };
}

export const getBrandThemeNames = (): string[] => {
    return Object.values(BrandThemes);
}