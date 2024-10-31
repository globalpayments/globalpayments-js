import { HOSTED_FIELD_BRAND_THEMES_NAMES } from "../../../../common/constants";

export const isBrandTheme = (style: string | undefined) => {
    if (!style) return false;

    return HOSTED_FIELD_BRAND_THEMES_NAMES.indexOf(style) !== -1;
}