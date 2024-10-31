export interface IThemePreset {
    name: string;

    colors: {
        brand: {
          color1: string,
          accent1: string,
          accent2: string,
          accent3: string,

          dark: string,
          lightGrey: string,

          buttonLabelColor1: string,
          buttonLabelColor2: string,

          errorColor: string,
        },

        general: IThemePresetGeneralColors,
    },

    fontFamily: IThemePresetFontFamily,

    borders: {
        dropInUIBody: {
            topLeft: string,
            topRight: string,
            bottomLeft: string,
            bottomRight: string,
        },
        buttonPrimary: {
            topLeft: string,
            topRight: string,
            bottomLeft: string,
            bottomRight: string,
        }
        radius: {
            general: string,
            curve: string,
        },
    },

    images: {
        brand: {
            buttonPrimaryIcon: string,

            footer: {
                desktopLogo: string,
                tabletLogo: string,
                mobileLogo: string,
            },
        },
    },

    paddings: {
        dropInUIBody: IThemePresetBodyPaddings,
    },
}

export interface IThemePresetGeneralColors {
    coolGrey25: string,
    coolGreyBase: string,
    neutralWhite: string,
    coolGrey61: string,
    coolGrey76: string,
}

export interface IThemePresetBodyPaddings {
    top: string,
    bottom: string,
    left: string,
    right: string,
}

export interface IThemePresetFontFamily {
    brand: {
        fontName: string,
        fontFileName: string,
        fontFormat?: string,
        fontWeightMedium: string,
        fontWeightRegular: string,
    },

    sizes: {
        buttonPrimary: string,
        bodyBase: string,
        small1: string,
        small2: string,
    },

    lineHeights: {
        small1: string,
        small2: string,
        small3: string,
    }
}