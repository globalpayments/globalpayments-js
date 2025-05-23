import {
  getBaseThemeStyles as getBaseThemeStyles,
} from "./base/base-theme";
import { getBaseThemePresetFontFamily, getBaseThemePresetGeneralColors } from "./base/base-theme-preset";
import { IThemePreset } from "./base/contracts";

// Brand theme: E-SERVICE
const themePreset: IThemePreset = {
  name: 'E-SERVICE preset',

  colors:{
    brand: {
      color1: '#0140BE',
      accent1: '#689CFF',
      accent2: '#1C6BFF',
      accent3: '#F6F8FD',

      dark: '#0140BE',
      lightGrey: '#DCDCDC',

      buttonLabelColor1: '#FFFFFF',
      buttonLabelColor2: '#0140BE',

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
      fontWeightBold:"700"
    },
    sizes: {
      buttonPrimary: "1.125em",
      bodyBase: "1em", // 16px
      small1: "1em", // 16px - Used for Tooltip Heading
      small2: "0.889em", // 14.22px - Used for Tooltip body text
      xl:"1.25rem",
      sm:"0.875rem"
    },
    lineHeights:{
      small1 : "2.25rem",
      small2:'',
      small3:''
    }
  },

  borders: {
    dropInUIBody: {
      topLeft: "15px",
      topRight: "15px",
      bottomLeft: "15px",
      bottomRight: "15px",
    },
    buttonPrimary: {
      topLeft: "4px",
      topRight: "4px",
      bottomLeft: "4px",
      bottomRight: "4px",
    },
    radius: {
      general: "15px",
      curve: "4px",
      sm:"0.125rem"
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
      buttonPrimaryIcon: "BrandSecurityIcon_EService.svg",

      footer: {
        desktopLogo: "BrandFooterLogo_ESERVICE_Desktop.svg",
        tabletLogo: "BrandFooterLogo_ESERVICE_Tablet_Mobile.svg",
        mobileLogo: "BrandFooterLogo_ESERVICE_Tablet_Mobile.svg",
      },
    },
  },

  paddings: {
    dropInUIBody: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
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