import {
  getBaseThemeStyles as getBaseThemeStyles,
} from "./base/base-theme";
import { getBaseThemePresetBodyPaddings, getBaseThemePresetGeneralColors, getBaseThemePresetFontFamily } from "./base/base-theme-preset";
import { IThemePreset } from "./base/contracts";

// Brand theme: BOIPA
const themePreset: IThemePreset = {
  name: 'BOIPA preset',

  colors: {
    brand: {
      color1: '#0000FF',
      accent1: '#000066',
      accent2: '#52B8C2',
      accent3: '#FFFFFF',

      dark: '#000066',
      lightGrey: '#DCDCDC',

      buttonLabelColor1: '#FFFFFF',
      buttonLabelColor2: '#0000FF',

      errorColor: '#B31E14',
    },

    // Inherits the general colors from Base preset
    general: {
      ...getBaseThemePresetGeneralColors(),
      cool_grey_39: '#5A5E6D',
      cool_grey_base: '#707689',
      cool_grey_95: '#F1F2F4',
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
      topLeft: "20px",
      topRight: "0px",
      bottomLeft: "0px",
      bottomRight: "20px",
    },
    radius: {
      general: "0px",
      curve: "2px",
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
      buttonPrimaryIcon: "BrandSecurityIcon_BOIPA.svg",

      footer: {
        desktopLogo: "BrandFooterLogo_BOIPA_Desktop.svg",
        tabletLogo: "BrandFooterLogo_BOIPA_Tablet_Mobile.svg",
        mobileLogo: "BrandFooterLogo_BOIPA_Tablet_Mobile.svg",
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