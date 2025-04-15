import { IThemePreset, IThemePresetBodyPaddings, IThemePresetFontFamily, IThemePresetGeneralColors } from "./contracts";

// Base theme preset
const themePreset: IThemePreset = {
    name: 'Base preset',

    colors: {
      brand: {
        color1: '#0074C7',
        accent1: '#85CCFF',
        accent2: '#148EE6',
        accent3: '#FFFFFF',

        dark: '#707689',
        lightGrey: '#DCDCDC',

        buttonLabelColor1: '#FFFFFF',
        buttonLabelColor2: '#0074C7',

        errorColor: '#E12619',
      },

      general: {
        coolGrey25: '#394046',
        coolGreyBase: '#707689',
        neutralWhite: '#FFFFFF',
        coolGrey61: '#9296A5',
        coolGrey76: '#BCBFC8',
        cool_grey_39: '#5A5E6D',
        cool_grey_base: '#707689',
        cool_grey_95: '#F1F2F4',
        azure_95:'#E5F4FF'
      },
    },

    fontFamily: {
      // Font values to include the necessary @font-face rules
      brand: {
        fontName: "DMSans",
        fontFileName: "DMSans-Regular.ttf",
        fontFormat: "ttf",
        fontWeightMedium: "500", // Medium = 500
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

      lineHeights: {
        small1: "24px", // Used for Tooltip Heading
        small2: "19px", // Used for DCC Exchange rate legend
        small3: "21.3px", // Used for Tooltip body text
      }
    },

    borders: {
      dropInUIBody: {
        topLeft: "0px",
        topRight: "0px",
        bottomLeft: "0px",
        bottomRight: "0px",
      },
      buttonPrimary: {
        topLeft: "2px",
        topRight: "2px",
        bottomLeft: "2px",
        bottomRight: "2px",
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
        buttonPrimaryIcon: "gp-lock.svg",
        footer: {
          // The footer logo images will always be overridden by each brand implementation
          desktopLogo: "",
          tabletLogo: "",
          mobileLogo: "",
        },
      },
    },

    paddings: {
      dropInUIBody: {
        top: "16px",
        bottom: "16px",
        left: "16px",
        right: "16px",
      },
    },
};

export const getBaseThemePreset = (): IThemePreset => themePreset;

export const getBaseThemePresetGeneralColors = (): IThemePresetGeneralColors => getBaseThemePreset().colors.general;

export const getBaseThemePresetBodyPaddings = (): IThemePresetBodyPaddings => getBaseThemePreset().paddings.dropInUIBody;

export const getBaseThemePresetFontFamily = (): IThemePresetFontFamily => getBaseThemePreset().fontFamily;