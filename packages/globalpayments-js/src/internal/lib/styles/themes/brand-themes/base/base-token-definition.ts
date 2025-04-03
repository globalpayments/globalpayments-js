import { getBaseThemePreset } from "./base-theme-preset";
import { IThemePreset } from "./contracts";

export const getBaseTokenDefinitions = (assetBaseUrl: string, themePreset?: IThemePreset) => {
  const fontBase = assetBaseUrl + "fonts/";
  const imageBase = assetBaseUrl + "images/";

  const { colors, fontFamily, borders, images, paddings } = themePreset || getBaseThemePreset();

  // Base tokens definitions
  return {
      /* custom fonts tokens and font-face configs */
      "@font-face": {
        "font-family": `${fontFamily.brand.fontName}`,
        src: `url("${fontBase}${fontFamily.brand.fontFileName}") ${ fontFamily.brand.fontFormat ? "format(\""+fontFamily.brand.fontFormat+"\")" : "" }`,
      },

      ":root": {
        /* inputfield font tokens */
        "--inputfield-label-font": `${fontFamily.brand.fontName}`,
        "--inputfield-container-font-placeholder": `${fontFamily.brand.fontName}`,
        "--inputfield-container-font-input": `${fontFamily.brand.fontName}`,
        "--inputfield-container-font-error": `${fontFamily.brand.fontName}`,

        "--tooltip-overlay-font-heading": `${fontFamily.brand.fontName}`,

        "--tooltip-overlay-font-body": `${fontFamily.brand.fontName}`,

        "--button-primary-font-label": `${fontFamily.brand.fontName}`,

        "--dcc-radio-button-font": `${fontFamily.brand.fontName}`,
        "--dcc-options-label-font": `${fontFamily.brand.fontName}`,

        "--dcc-options-font-exchange-rate": `${fontFamily.brand.fontName}`,

        "--other-method-divider-font": `${fontFamily.brand.fontName}`,

        "--inputfield-label-weight-text": `${fontFamily.brand.fontWeightMedium}`,
        "--dcc-options-label-weight-text": `${fontFamily.brand.fontWeightMedium}`,
        "--button-primary-weight-label-text": `${fontFamily.brand.fontWeightMedium}`,
        "--dcc-radio-button-weight-text-label": `${fontFamily.brand.fontWeightMedium}`,

        "--inputfield-container-weight-text-placeholder": `${fontFamily.brand.fontWeightRegular}`,
        "--inputfield-container-weight-text-input": `${fontFamily.brand.fontWeightRegular}`,
        "--inputfield-container-weight-text-error": `${fontFamily.brand.fontWeightRegular}`,

        "--other-method-divider-weight-text": `${fontFamily.brand.fontWeightRegular}`,

        /* dropin ui tokens */
        "--dropin-ui-body-color-background": colors.brand.accent3,

        "--dropin-ui-body-padding-top": paddings.dropInUIBody.top,
        "--dropin-ui-body-padding-bottom": paddings.dropInUIBody.bottom,
        "--dropin-ui-body-padding-left": paddings.dropInUIBody.left,
        "--dropin-ui-body-padding-right": paddings.dropInUIBody.right,

        /* input field tokens */
        "--inputfield-label-color-text": colors.brand.dark,

        "--inputfield-container-color-border-focus": colors.brand.color1,

        "--inputfield-container-color-border-hover": colors.brand.accent1,

        "--inputfield-tooltip-color-border-hover": colors.brand.accent1,
        "--inputfield-tooltip-color-focus-indicator-focus": colors.brand.accent1,

        "--general-tooltip-color-border-hover": colors.brand.accent1,
        "--general-tooltip-color-focus-indicator-focus": colors.brand.accent1,

        /* input field tooltip tokens */

        "--inputfield-tooltip-color-border-focus": colors.brand.color1,

        /* input field validations tokens */
        "--inputfield-container-color-border-error": colors.brand.errorColor,
        "--inputfield-container-color-text-error": colors.brand.errorColor,

        "--inputfield-container-color-text-input": colors.general.coolGrey25,

        "--dcc-options-label-color-text": colors.general.coolGrey25,
        "--dcc-options-color-text-exchange-rate": colors.general.coolGrey25,

        "--dcc-radio-button-color-text-default": colors.general.coolGrey25,
        "--dcc-radio-button-color-text-hover": colors.general.coolGrey25,
        "--dcc-radio-button-color-text-focus": colors.general.coolGrey25,

        "--tooltip-overlay-color-background": colors.general.coolGrey25,

        "--inputfield-container-color-border-default": colors.general.coolGreyBase,
        "--inputfield-container-color-text-placeholder": colors.general.coolGreyBase,

        "--inputfield-tooltip-color-border-default": colors.general.coolGreyBase,

        "--dcc-radio-button-color-border-default": colors.general.coolGreyBase,

        /* dcc tokens */
        "--dcc-radio-button-color-border-hover": colors.brand.accent1,
        "--dcc-radio-button-color-focus-indicator-focus": colors.brand.accent1,

        "--dcc-radio-button-color-border-focus": colors.brand.color1,
        "--dcc-radio-button-color-border-selected": colors.brand.color1,
        "--dcc-radio-button-color-background-selected": colors.brand.color1,
        "--dcc-radio-button-color-icon-selected": colors.brand.color1,

        "--dcc-radio-button-color-text-selected": colors.brand.buttonLabelColor1,

        /* primary buttons */
        "--button-primary-color-background-default": colors.brand.color1,

        "--button-primary-color-background-focus": colors.brand.accent2,

        "--button-primary-color-text-default": colors.brand.buttonLabelColor1,
        "--button-primary-color-text-hover": colors.brand.buttonLabelColor1,
        "--button-primary-color-text-focus": colors.brand.buttonLabelColor1,

        "--button-primary-color-background-hover": colors.brand.accent1,
        "--button-primary-color-focus-indicator-focus": colors.brand.accent1,

        /* border tokens */
        "--dropin-ui-body-radius-bottom-left": borders.dropInUIBody.bottomLeft,
        "--dropin-ui-body-radius-bottom-right": borders.dropInUIBody.bottomRight,
        "--dropin-ui-body-radius-top-left": borders.dropInUIBody.topLeft,
        "--dropin-ui-body-radius-top-right": borders.dropInUIBody.topRight,

        "--button-primary-radius-top-left": borders.buttonPrimary.topLeft,
        "--button-primary-radius-top-right": borders.buttonPrimary.topRight,
        "--button-primary-radius-bottom-left": borders.buttonPrimary.bottomLeft,
        "--button-primary-radius-bottom-right": borders.buttonPrimary.bottomRight,

        /* sizes tokens */
        "--button-primary-size-text": fontFamily.sizes.buttonPrimary,
        "--other-method-divider-size-text": fontFamily.sizes.bodyBase,

        "--inputfield-label-size-text": fontFamily.sizes.small1,
        "--inputfield-container-size-text-placeholder": fontFamily.sizes.small1,
        "--inputfield-container-size-text-input": fontFamily.sizes.small1,

        "--tooltip-overlay-size-text-heading": fontFamily.sizes.small1,
        "--tooltip-overlay-size-text-body": fontFamily.sizes.small2,

        "--inputfield-container-size-text-error": fontFamily.sizes.small1,

        "--dcc-options-label-size-text": fontFamily.sizes.small1,

        "--dcc-radio-button-size-text": fontFamily.sizes.small1,

        "--dcc-options-size-text-exchange-rate": fontFamily.sizes.small1,

        "--tooltip-overlay-color-text-heading": colors.general.neutralWhite,
        "--tooltip-overlay-color-text-body": colors.general.neutralWhite,

        "--other-method-divider-color-text": colors.general.coolGrey61,
        "--other-method-divider-color-line": colors.general.coolGrey76,

        /* line height tokens */
        "--tooltip-overlay-line-height-text-heading": fontFamily.lineHeights.small1,
        "--tooltip-overlay-line-height-text-body": fontFamily.lineHeights.small3,
        "--dcc-options-line-height-text-exchange-rate": fontFamily.lineHeights.small2,

        /* image tokens */
        "--hppfooter-desktop": `url(${imageBase}${images.brand.footer.desktopLogo})`,
        "--hppfooter-tablet": `url(${imageBase}${images.brand.footer.tabletLogo})`,
        "--hppfooter-mobile": `url(${imageBase}${images.brand.footer.mobileLogo})`,

        "--dropin-ui-button-primary-icon": `url(${imageBase}${images.brand.buttonPrimaryIcon})`,

        /* order information tokens */
        "--dropInUI-orderSummary-itemMerchant-fontFamily": fontFamily.brand.fontName,
        "--dropInUI-orderSummary-itemMerchant-font-size-text": fontFamily.sizes.xl,
        "--dropInUI-orderSummary-itemMerchant-font-weight-text": fontFamily.brand.fontWeightBold,
        "--dropInUI-orderSummary-itemMerchant-line-height": fontFamily.lineHeights.small1,
        "--dropInUI-orderSummary-itemOrderID-font-size-text": fontFamily.sizes.sm,
        "--dropInUI-orderSummary-itemOrderID-font-weight-text": fontFamily.brand.fontWeightRegular,

        /* Bank Selection tokens */

        /* Heading Label */
        "--payWithBank-label-fontFamily": fontFamily.brand.fontName,
        "--payWithBank-size-text-label": fontFamily.sizes.bodyBase,
        "--payWithBank-font-weight-text-label": fontFamily.brand.fontWeightRegular,
        "--payWithBank-color-label": colors.brand.dark,

        /* Standard Bank Buttons */
        "--payWithBank-button-color-icon-redirect-default": colors.general.cool_grey_39,
        "--payWithBank-button-color-border-hover": colors.general.cool_grey_base,
        "--payWithBank-button-weight-border-hover": borders.borderWidth[0],
        "--payWithBank-button-weight-focus-indicator": borders.borderWidth[3],
        "--payWithBank-button-color-background-default": colors.general.neutralWhite,
        "--payWithBank-button-color-background-hover": colors.general.neutralWhite,
        "--payWithBank-button-color-background-focus": colors.general.neutralWhite,
        "--payWithBank-button-color-background-pressed": colors.general.cool_grey_95,
        "--payWithBank-button-border-radius": borders.radius.sm,
        /* Pay with QR Code Bank Button */
        "--payWithBank-QRbutton-color-border-hover": colors.general.cool_grey_base,
        "--payWithBank-QRbutton-weight-border-hover": borders.borderWidth[1],
        "--payWithBank-QRbutton-weight-focus-indicator": borders.borderWidth[3],
        "--payWithBank-QRbutton-color-background-default": colors.general.azure_95,
        "--payWithBank-QRbutton-color-background-hover": colors.general.azure_95
      },
  }
}