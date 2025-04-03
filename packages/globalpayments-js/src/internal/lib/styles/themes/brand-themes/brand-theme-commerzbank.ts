import {
  getBaseThemeStyles as getBaseThemeStyles,
} from "./base/base-theme";
import { getBaseThemePresetBodyPaddings, getBaseThemePresetFontFamily, getBaseThemePresetGeneralColors } from "./base/base-theme-preset";
import { IThemePreset } from "./base/contracts";

// Brand theme: COMMERZBANK
const themePreset: IThemePreset = {
  name: 'COMMERZBANK preset',

  colors:{
    brand: {
      color1: '#FFD700',
      accent1: '#FFDF08',
      accent2: '#E3A90B',
      accent3: '#FFFFFF',

      dark: '#000000',
      lightGrey: '#DCDCDC',

      buttonLabelColor1: '#000000',
      buttonLabelColor2: '#266BFF',

      errorColor: '#EE0125',
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
      sm: '0.125rem'
      },
      borderWidth: {
          '0': '0px', // remove border
          '1': '1px', // customise border widths
          '2': '2px',
          '3': '3px',
      }
    },

  images: {
    brand: {
      buttonPrimaryIcon: "BrandSecurityIcon_Commerzbank.svg",

      footer: {
        desktopLogo: "BrandFooterLogo_COMMERZBANK_Desktop.svg",
        tabletLogo: "BrandFooterLogo_COMMERZBANK_Tablet_Mobile.svg",
        mobileLogo: "BrandFooterLogo_COMMERZBANK_Tablet_Mobile.svg",
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