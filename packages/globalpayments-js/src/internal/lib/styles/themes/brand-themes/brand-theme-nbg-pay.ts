import {
  getBaseThemeStyles as getBaseThemeStyles,
} from "./base/base-theme";
import { getBaseThemePresetBodyPaddings, getBaseThemePresetFontFamily, getBaseThemePresetGeneralColors } from "./base/base-theme-preset";
import { IThemePreset } from "./base/contracts";

// Brand theme: NBG PAY
const themePreset: IThemePreset = {
  name: 'NBG PAY preset',

  colors:{
    brand: {
      color1: '#14E8FF',
      accent1: '#61EEFF',
      accent2: '#00B2C7',
      accent3: '#FFFFFF',

      dark: '#173E76',
      lightGrey: '#DCDCDC',

      buttonLabelColor1: '#173E76',
      buttonLabelColor2: '#173E76',

      errorColor: '#DA2C38',
    },

    // Inherits the general colors from Base preset
    general: {
      ...getBaseThemePresetGeneralColors(),
    },
  },

  fontFamily: {
    // Inherits the font family from Base preset
    ...getBaseThemePresetFontFamily(),

    brand: {
      fontName: "OpenSans",
      fontFileName: "OpenSans-Regular.ttf",
      fontWeightMedium: "600", // Semi Bold = 600
      fontWeightRegular: "400", // Regular = 400
    },
  },

  borders: {
    dropInUIBody: {
      topLeft: "0px",
      topRight: "0px",
      bottomLeft: "0px",
      bottomRight: "0px",
    },
    buttonPrimary: {
      topLeft: "4px",
      topRight: "4px",
      bottomLeft: "4px",
      bottomRight: "4px",
    },
    radius: {
      general: "0px",
      curve: "4px",
    },
  },

  images: {
    brand: {
      buttonPrimaryIcon: "BrandSecurityIcon_NBGPay.svg",

      footer: {
        desktopLogo: "BrandFooterLogo_NBGPAY_Desktop.svg",
        tabletLogo: "BrandFooterLogo_NBGPAY_Tablet_Mobile.svg",
        mobileLogo: "BrandFooterLogo_NBGPAY_Tablet_Mobile.svg",
      },
    },
  },

  paddings: {
    dropInUIBody: {
      // Inherits the body paddings from Base preset
      ...getBaseThemePresetBodyPaddings(),
    }
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