import { HOSTED_FIELD_BRAND_THEMES_NAMES } from "../../../../common/constants";
import { BrandThemes } from "../../enums";

export const isBrandTheme = (style: string | undefined) => {
    if (!style) return false;

    return HOSTED_FIELD_BRAND_THEMES_NAMES.indexOf(style) !== -1;
}

export const isEserviceThemeApplied = (style: string | undefined) =>{
    if(style === BrandThemes.BrandThemeESERVICE){
        return true
    }
    return false
}