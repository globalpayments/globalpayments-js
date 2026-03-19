export declare enum BrandThemes {
    BrandThemeBOIPA = "brand-theme-boipa",
    BrandThemeBOIPAUK = "brand-theme-boipa-uk",
    BrandThemeCOMMERZBANK = "brand-theme-commerzbank",
    BrandThemeNBGPAY = "brand-theme-nbg-pay",
    BrandThemeESERVICE = "brand-theme-e-service"
}
export declare const getFieldStyles: (assetBaseUrl: string) => {
    [x: string]: object;
};
export declare const getParentStyles: (assetBaseUrl: string) => {
    [x: string]: object;
};
export declare const getBrandThemeNames: () => string[];
