import getInstallmentStyles from '../../../installments/gp-default';
import getApplePayStyles from '../../../apple-pay/common';
import getClickToPayStyles from '../../../click-to-pay/gp-default';
import getGooglePayStyles from '../../../google-pay/common';
import {
  fieldStyles as getBuiltInValidationFieldStyles,
  styles as getBuiltInValidationParentStyles,
} from '../../../built-in-validations/gp-default';
import { options } from '../../../../options';
import getPaymentMethodsStyles from '../../../payment-methods/common';
import getTooltipStyles from '../../../tooltip/common';
import {
  fieldStyles as getCurrencyConversionFieldStyles,
  styles as getCurrencyConversionStyles,
} from '../../../currency-conversion/gp-default';

import getOrderInformationCommonStyles from '../../../order-information/common';
import getBankSelectionCommonStyles from '../../../bank-selection/common';

import { getBaseTokenDefinitions } from './base-token-definition';
import { IThemePreset } from './contracts';

// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

const footerCommonProps = {
  baseFooterProps: {
    display: "flex",
    "align-items": "center",
  },
  shieldLogoProps: {
    "min-width": "83px",
  },
  brandLogoImageProps: {
    margin: 0,
    flex: "1 1 auto",
    background: "var(--hppfooter-desktop) no-repeat center center",
    "background-size": "contain",
    "min-height": "70px",
    "min-width": "205px",
  },
  brandLogoImageTabletProps: {
    background: "var(--hppfooter-tablet) no-repeat center center",
    "min-height": "42px",
    "min-width": "65px",
  },
  brandLogoImageMobileProps: {
    background: "var(--hppfooter-mobile) no-repeat center center",
    "min-height": "42px",
    "min-width": "65px",
  },
  emblemLogoSmallViewportProps: {
    "margin-left": "0",
    "min-width": "78px",
  }
};

const fieldStyles = (assetBaseUrl: string, themePreset?: IThemePreset) => {
  const imageBase = assetBaseUrl + "images/";

  const baseTokens = getBaseTokenDefinitions(assetBaseUrl, themePreset);

  return {
    ...baseTokens,

    "*": {
      "box-sizing": "border-box",
    },
    "::-webkit-input-placeholder": {
      color: "var(--inputfield-container-color-text-placeholder, #767676)",

      "font-family": "var(--inputfield-container-font-placeholder)",
      "font-weight": "var(--inputfield-container-weight-text-placeholder, 400)",
      "font-size": "var(--inputfield-container-size-text-placeholder)",
    },
    "::-ms-input-placeholder": {
      color: "var(--inputfield-container-color-text-placeholder, #767676)",

      "font-family": "var(--inputfield-container-font-placeholder)",
      "font-weight": "var(--inputfield-container-weight-text-placeholder, 400)",
      "font-size": "var(--inputfield-container-size-text-placeholder)",
    },
    "::-moz-input-placeholder": {
      color: "var(--inputfield-container-color-text-placeholder, #767676)",
      opacity: 1,

      "font-family": "var(--inputfield-container-font-placeholder)",
      "font-weight": "var(--inputfield-container-weight-text-placeholder, 400)",
      "font-size": "var(--inputfield-container-size-text-placeholder)",
    },
    ":-moz-input-placeholder": {
      color: "var(--inputfield-container-color-text-placeholder, #9296A5)",
      opacity: 1,

      "font-family": "var(--inputfield-container-font-placeholder)",
      "font-weight": "var(--inputfield-container-weight-text-placeholder, 400)",
      "font-size": "var(--inputfield-container-size-text-placeholder)",
    },
    ":-moz-placeholder": { /* Firefox 18- */
      color: "var(--inputfield-container-color-text-placeholder, #767676)",
      opacity: "1",

      "font-family": "var(--inputfield-container-font-placeholder)",
      "font-weight": "var(--inputfield-container-weight-text-placeholder, 400)",
      "font-size": "var(--inputfield-container-size-text-placeholder)",
    },

    "::-moz-placeholder": {  /* Firefox 19+ */
      color: "var(--inputfield-container-color-text-placeholder, #767676)",
      opacity: "1",

      "font-family": "var(--inputfield-container-font-placeholder)",
      "font-weight": "var(--inputfield-container-weight-text-placeholder, 400)",
      "font-size": "var(--inputfield-container-size-text-placeholder)",
    },

    "#secure-payment-field": {
      width: "100%",
      height: "40px",
      padding: "12px",
      border: "1px solid var(--inputfield-container-color-border-default, #5a5e6d)",
      "border-radius": "0",
      color: "var(--inputfield-container-color-text-input, #394046)",

      "font-family": "var(--inputfield-container-font-input)",
      "font-weight": "var(--inputfield-container-weight-text-input, 400)",
      "font-size": "var(---inputfield-container-size-text-input, 0.89em)",
    },
    "#secure-payment-field:focus": {
      border: "1px solid var(--inputfield-container-color-border-focus, #2B9AEC)",
      outline: "none",
    },
    "#secure-payment-field:hover": {
      border: "1px solid var(--inputfield-container-color-border-hover, #2B9AEC)",
      outline: "none",
    },
    "#secure-payment-field[type=button]": {
      "background-color": "var(--button-primary-color-background-default, #0071ba)",
      color: "var(--button-primary-color-text-default, white)",
      padding: "8px",
      border: "none",
      width: "100%",
      cursor: "pointer",
      "font-size": "var(--button-primary-size-text, 1.125em)",
      "font-weight": "var(--button-primary-weight-label-text, 500)",
      height: "48px",
      "text-align": "center",
      "vertical-align": "middle",
      "text-transform": "uppercase",
      "font-family": "var(--button-primary-font-label, DMSans)",
      "border-bottom-left-radius": "var(--button-primary-radius-bottom-left)",
      "border-bottom-right-radius": "var(--button-primary-radius-bottom-right)",
      "border-top-left-radius": "var(--button-primary-radius-top-left)",
      "border-top-right-radius": "var(--button-primary-radius-top-right)",

      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
    "#secure-payment-field[type=button]:focus": {
      "background-color": "var(--button-primary-color-background-focus, #0071ba)",
      border: "2px solid var(--button-primary-color-focus-indicator-focus, #08385b)",
      color: "var(--button-primary-color-text-focus, white)",
      outline: "none",
    },
    "#secure-payment-field[type=button]:hover": {
      "background-color": "var(--button-primary-color-background-hover, #015a94)",
      color: "var(--button-primary-color-text-hover, white)",
    },
    "#secure-payment-field[type=button]::before": {
      content: `var(--dropin-ui-button-primary-icon)`,
      "margin-right": "5px",

      display: "inline-block",
      width: "18px",
      height: "25px",
    },
    ".card-cvv": {
      background: `field url(${imageBase}cvv.png) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-cvv.card-type-amex": {
      "background-image": `url(${imageBase}cvv-amex.png)`,
    },
    "img.card-number-icon": {
      background: `transparent url(${imageBase}gp-cc-generic.svg) no-repeat right center`,
      right: "10px",
      top: "50%",
      width: "24px",
      height: "16px",
      "margin-top": "-8px",
      "background-size": "20px",
    },
    "img.card-number-icon.card-type-amex": {
      "background-image": `url(${imageBase}gp-cc-amex.svg)`,
    },
    "img.card-number-icon.card-type-discover": {
      "background-image": `url(${imageBase}gp-cc-discover.svg)`,
    },
    "img.card-number-icon.card-type-jcb": {
      "background-image": `url(${imageBase}gp-cc-jcb.svg)`,
    },
    "img.card-number-icon.card-type-mastercard": {
      "background-image": `url(${imageBase}gp-cc-mastercard.svg)`,
    },
    "img.card-number-icon.card-type-visa": {
      "background-image": `url(${imageBase}gp-cc-visa.svg)`,
    },
    "img.card-number-icon.card-type-diners": {
      "background-image": `url(${imageBase}gp-cc-diners.svg)`,
    },
    "img.card-number-icon.card-type-carnet": {
      "background-image": `url(${imageBase}gp-cc-carnet.svg)`,
    },
    ".card-number::-ms-clear": {
      display: "none",
    },

    ...(options.currencyConversion?.enabled ? getCurrencyConversionFieldStyles() : {}),
    ...(options.fieldValidation?.enabled ? getBuiltInValidationFieldStyles(assetBaseUrl) : {}),
  };
};

const parentStyles = (assetBaseUrl: string, themePreset?: IThemePreset) => {
  const imageBase = assetBaseUrl + "images/";

  const baseTokens = getBaseTokenDefinitions(assetBaseUrl, themePreset);

  return {
    ...baseTokens,

    ".secure-payment-form": {
      "background-color": "var(--dropin-ui-body-color-background)",
      display: "flex",
      "-ms-flex-wrap": "wrap",
      "flex-wrap": "wrap",

      "border-bottom-left-radius": "var(--dropin-ui-body-radius-bottom-left)",
      "border-bottom-right-radius": "var(--dropin-ui-body-radius-bottom-right)",
      "border-top-left-radius": "var(--dropin-ui-body-radius-top-left)",
      "border-top-right-radius": "var(--dropin-ui-body-radius-top-right)",

      "padding-top": "var(--dropin-ui-body-padding-top)",
      "padding-bottom": "var(--dropin-ui-body-padding-bottom)",
      "padding-left": "var(--dropin-ui-body-padding-left)",
      "padding-right": "var(--dropin-ui-body-padding-right)",
    },

    ".secure-payment-form *": {
      "box-sizing": "border-box",
    },

    ".secure-payment-form label": {
      color: "var(--inputfield-label-color-text)",
      margin: "16px 0",
      display: "block",
      "font-size": "var(--inputfield-label-size-text, 0.79em)",
      "font-weight": "var(--inputfield-label-weight-text, 500)",
      "font-family": "var(--inputfield-label-font, DMSans)",
    },

    ".secure-payment-form > div": {
      flex: "100%",
    },

    ".secure-payment-form .credit-card-card-cvv iframe": {
      width: "90%",
      float: "left",
    },

    ".secure-payment-form .credit-card-footer": footerCommonProps.baseFooterProps,
    ".secure-payment-form .credit-card-footer .credit-card-shield": footerCommonProps.shieldLogoProps,
    ".secure-payment-form .credit-card-footer .footer-branded-logo-image": footerCommonProps.brandLogoImageProps,

    // APM standalone
    ".secure-payment-form .apm-footer": footerCommonProps.baseFooterProps,
    ".secure-payment-form .apm-footer .apm-shield": footerCommonProps.shieldLogoProps,
    ".secure-payment-form .apm-footer .footer-branded-logo-image": footerCommonProps.brandLogoImageProps,

    "@media(max-width: 530px)": {
      ".secure-payment-form .credit-card-footer .footer-branded-logo-image": footerCommonProps.brandLogoImageTabletProps,
      ".secure-payment-form .credit-card-footer .credit-card-logo": footerCommonProps.emblemLogoSmallViewportProps,

      // APM standalone
      ".secure-payment-form .apm-footer .footer-branded-logo-image": footerCommonProps.brandLogoImageTabletProps,
      ".secure-payment-form .apm-footer .apm-logo": footerCommonProps.emblemLogoSmallViewportProps,
    },

    "@media(max-width: 380px)": {
      ".secure-payment-form .credit-card-footer .footer-branded-logo-image": footerCommonProps.brandLogoImageMobileProps,
      ".secure-payment-form .credit-card-footer .credit-card-logo": footerCommonProps.emblemLogoSmallViewportProps,

      // APM standalone
      ".secure-payment-form .apm-footer .footer-branded-logo-image": footerCommonProps.brandLogoImageMobileProps,
      ".secure-payment-form .apm-footer .apm-logo": footerCommonProps.emblemLogoSmallViewportProps,
    },

    ".secure-payment-form div[class$='-shield']": {
      flex: "1 1 auto",
      "margin-right": "16px"
    },

    ".secure-payment-form div[class$='-shield'] .ssl-text-logo": {
      border: "1px solid #468000",
      "border-radius": "3px",
      height: "26px",
      "text-align": "center",
      margin: "0",
      "display": "flex",
      "justify-content": "start",
      "align-items": "center",
      width: "fit-content",
    },

    ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
      width: "19px",
      height: "18px",
      "margin-left": "5px",
      "vertical-align": "middle"
    },

    ".secure-payment-form div[class$='-shield'] .ssl-msg": {
      "font-size": "8px",
      "font-weight": "600",
      "font-family": "Open sans, sans-serif",
      color: "#468000",
      "line-height": "9px",
      display: "inline-block",
      "vertical-align": "middle",
      "text-align": "center",
      "margin-left": "6px",
      "margin-right": "7px",
      "margin-top": "1px"
    },

    ".secure-payment-form div[class$='-logo']": {
      flex: "1 1 auto",
      "margin-left": "16px",
      width: "100px",
      height: "23px",
      "text-align": "right",
      "display": "flex",
      "justify-content": "end"
    },

    ".secure-payment-form div[class$='-logo'] .security-msg": {
      color: "#707689",
      "font-size": "8px",
      display: "inline-block",
      "vertical-align": "middle",
      "white-space": "nowrap",
      "margin-right": "2px",
      "font-family": "Open sans, sans-serif",
    },

    ".secure-payment-form div[class$='-logo'] .security-msg strong": {
      "white-space": "nowrap",
      "font-weight": "normal",
      display: "block"
    },

    ".secure-payment-form div[class$='-logo'] img": {
      "vertical-align": "middle"
    },

    ".secure-payment-form .credit-card-submit": {
      margin: "32px 0 16px 0",
    },

    ".secure-payment-form iframe": {
      "min-height": "40px",
      width: "100%",
    },

    ".secure-payment-form .other-cards-label": {
      "border-bottom": "1px solid var(--other-method-divider-color-line, #5a5e6d)",
      "text-align": "center",
      margin: "40px 0 20px",
      position: "relative",
    },

    ".secure-payment-form .other-cards-label span": {
      "text-align": "center",
      padding: "0 10px",
      background: "var(--dropin-ui-body-color-background)",
      position: "absolute",
      color: "var(--other-method-divider-color-text, #9296A5)",
      width: "auto",
      left: "50%",
      "-webkit-transform": "translateX(-50%)",
      "-moz-transform": "translateX(-50%)",
      "-ms-transform": "translateX(-50%)",
      "-o-transform": "translateX(-50%)",
      transform: "translateX(-50%)",
      margin: "-10px auto",
      "font-family": "var(--other-method-divider-font, DMSans)",
      "font-size": "var(--other-method-divider-size-text, 16px)",
      "white-space": "nowrap",
      "font-weight": "var(--other-method-divider-weight-text, 400)",
    },

    ".secure-payment-form .hidden": {
      display: "none!important",
    },

    "@media(min-width: 800px)": {
      ".secure-payment-form .credit-card-card-expiration": {
        flex: "auto",
        width: "50%",
        "padding-right": "16px",
      },

      ".secure-payment-form .credit-card-card-cvv": {
        flex: "auto",
        width: "50%",
        "padding-left": "16px",
      },
    },

    ...getTooltipStyles(assetBaseUrl),
    ...getInstallmentStyles(assetBaseUrl),
    ...getApplePayStyles(assetBaseUrl),
    ...getClickToPayStyles(assetBaseUrl),
    ...getGooglePayStyles(assetBaseUrl),
    ...(options.fieldValidation?.enabled ? getBuiltInValidationParentStyles(assetBaseUrl) : {}),
    ...(options.currencyConversion?.enabled ? getCurrencyConversionStyles() : {}),
    ...getPaymentMethodsStyles(assetBaseUrl),

    ...getOrderInformationCommonStyles(assetBaseUrl),
    ...getBankSelectionCommonStyles(assetBaseUrl),
  };
};

export const getBaseThemeStyles = (assetBaseUrl: string, themePreset?: IThemePreset): { fieldStyles: object, parentStyles: object} => {
  return {
    fieldStyles: fieldStyles(assetBaseUrl, themePreset),
    parentStyles: parentStyles(assetBaseUrl, themePreset),
  };
}