import {
  getBaseThemeStyles as getBaseThemeStyles,
} from "./base/base-theme";
import { IThemePreset } from "./base/contracts";
import { getThemePreset as getThemePresetBOIPA } from "./brand-theme-boipa";

// Brand theme: BOIPA UK
const themePreset: IThemePreset = {
  // Inherits the BOIPA preset and overrides the footer logos
  ...getThemePresetBOIPA(),

  name: 'BOIPA UK preset',

  images: {
    brand: {
      buttonPrimaryIcon: "BrandSecurityIcon_BOIPA.svg",

      footer: {
        desktopLogo: "BrandFooterLogo_BOIPA_Desktop_UK.svg",
        tabletLogo: "BrandFooterLogo_BOIPA_Tablet_Mobile_UK.svg",
        mobileLogo: "BrandFooterLogo_BOIPA_Tablet_Mobile_UK.svg",
      },
    },
  },
};

const fieldStyles = (assetBaseUrl: string) => {
  return {
    ...getBaseThemeStyles(assetBaseUrl, themePreset).fieldStyles,
  };
};

const parentStyles = (assetBaseUrl: string) => {
  return {
    ...getBaseThemeStyles(assetBaseUrl, themePreset).parentStyles,
  };
};

export const getThemeStyles = (assetBaseUrl: string): { fieldStyles: object, parentStyles: object} => {
  return {
    fieldStyles: fieldStyles(assetBaseUrl),
    parentStyles: parentStyles(assetBaseUrl),
  };
}

export const getThemePreset = (): IThemePreset => themePreset;