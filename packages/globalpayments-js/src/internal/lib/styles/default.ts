// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

import getApplePayStyles from './apple-pay/common';
import getClickToPayStyles from './click-to-pay/default';
import getGooglePayStyles from './google-pay/common';
import getPaymentMethodsStyles from './payment-methods/common';
import getTooltipStyles from './tooltip/common';
import {
  fieldStyles as getBuiltInValidationFieldStyles,
  styles as getBuiltInValidationParentStyles,
} from './built-in-validations/default';
import { options } from '../options';
import {
  fieldStyles as getCurrencyConversionFieldStyles,
  styles as getCurrencyConversionStyles,
} from './currency-conversion/default';

import getOrderInformationCommonStyles from './order-information/common';
import getBankSelectionCommonStyles from './bank-selection/common';

export const fieldStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    "#secure-payment-field": {
      "-o-transition":
        "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
      "-webkit-box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
      "-webkit-transition":
        "border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s",
      "background-color": "#fff",
      border: "1px solid #ccc",
      "border-radius": "0px",
      "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
      "box-sizing": "border-box",
      color: "#555",
      display: "block",
      "font-family": "sans-serif",
      "font-size": "14px",
      height: "50px",
      "line-height": "1.42857143",
      margin: "0 .5em 0 0",
      "max-width": "100%",
      outline: "0",
      padding: "6px 12px",
      transition: "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
      "vertical-align": "baseline",
      width: "100% ",
    },
    "#secure-payment-field:focus": {
      border: "1px solid #3989e3",
      "box-shadow": "none",
      height: "50px",
      outline: "none",
    },
    "#secure-payment-field[type=button]": {
      "-moz-user-select": "none",
      "-ms-touch-action": "manipulation",
      "-ms-user-select": "none",
      "-webkit-user-select": "none",
      "background-color": "#36b46e",
      "background-image": "none",
      border: "0px solid transparent",
      "box-sizing": "border-box",
      color: "#fff",
      cursor: "pointer",
      display: "inline-block",
      "font-family": "sans-serif",
      "font-size": "14px",
      "font-weight": "400",
      "line-height": "1.42857143",
      "margin-bottom": "0",
      padding: "6px 12px",
      "text-align": "center",
      "text-transform": "uppercase",
      "touch-action": "manipulation",
      "user-select": "none",
      "vertical-align": "middle",
      "white-space": "nowrap",
    },
    "#secure-payment-field[type=button]:focus": {
      "background-color": "#258851",
      color: "#ffffff",
      outline: "none",
    },
    "#secure-payment-field[type=button]:hover": {
      "background-color": "#258851",
    },
    ".card-cvv": {
      background: `transparent url(${imageBase}cvv.png) no-repeat right`,
      "background-size": "63px 40px",
    },
    ".card-cvv.card-type-amex": {
      background: `transparent url(${imageBase}cvv-amex.png) no-repeat right`,
      "background-size": "63px 40px",
    },
    "img.card-number-icon": {
      background: `transparent url(${imageBase}logo-unknown@2x.png) no-repeat`,
      "background-size": "100%",
      width: "65px",
      height: "40px",
      right: "12px",
      top: "50%",
      "margin-top": "-20px",
      "background-position": "50% 50%"
    },
    "img.card-number-icon[src$='/gp-cc-generic.svg']": {
      background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat`,
      "background-size": "120%",
      "background-position-y": "bottom"
    },
    "img.card-number-icon.invalid.card-type-amex": {
      background: `transparent url(${imageBase}logo-amex@2x.png) no-repeat 140%`,
      "background-size": "80%",
      "background-position-y": "87%"
    },
    "img.card-number-icon.invalid.card-type-discover": {
      background: `transparent url(${imageBase}logo-discover@2x.png) no-repeat`,
      "background-size": "115%",
      "background-position-y": "95%",
      width: "80px"
    },
    "img.card-number-icon.invalid.card-type-jcb": {
      background: `transparent url(${imageBase}logo-jcb@2x.png) no-repeat 175%`,
      "background-size": "90%",
      "background-position-y": "85%"
    },
    "img.card-number-icon.invalid.card-type-mastercard": {
      background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat`,
      "background-size": "120%",
      "background-position-y": "bottom"
    },
    "img.card-number-icon.invalid.card-type-visa": {
      background: `transparent url(${imageBase}logo-visa@2x.png) no-repeat `,
      "background-size": "120%",
      "background-position-y": "bottom"
    },
    "img.card-number-icon.valid.card-type-amex": {
      background: `transparent url(${imageBase}logo-amex@2x.png) no-repeat 140%`,
      "background-size": "80%",
      "background-position-y": "-6px"
    },
    "img.card-number-icon.valid.card-type-discover": {
      background: `transparent url(${imageBase}logo-discover@2x.png) no-repeat`,
      "background-size": "115%",
      "background-position-y": "-5px",
      width: "80px"
    },
    "img.card-number-icon.valid.card-type-jcb": {
      background: `transparent url(${imageBase}logo-jcb@2x.png) no-repeat 175%`,
      "background-size": "90%",
      "background-position-y": "-5px"
    },
    "img.card-number-icon.valid.card-type-mastercard": {
      background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat`,
      "background-size": "120%",
      "background-position-y": "-1px"
    },
    "img.card-number-icon.valid.card-type-visa": {
      background: `transparent url(${imageBase}logo-visa@2x.png) no-repeat`,
      "background-size": "120%",
      "background-position-y": "-1px"
    },
    ".card-number::-ms-clear": {
      display: "none",
    },
    "input[placeholder]": {
      "letter-spacing": "3px",
    },

    ...(options.currencyConversion?.enabled ? getCurrencyConversionFieldStyles() : {}),
    ...(options.fieldValidation?.enabled ? getBuiltInValidationFieldStyles(assetBaseUrl) : {}),
  };
};

export const parentStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    ".secure-payment-form": {
      "font-family": "sans-serif",
    },

    ".secure-payment-form label": {
      color: "#555",
      "font-size": "13px",
      "font-weight": "bold",
      "line-height": "1.5",
      "text-transform": "uppercase",
    },

    ".secure-payment-form #ss-banner": {
      background: `transparent url(${imageBase}shield-and-logos@2x.png) no-repeat left center`,
      "background-size": "280px 34px",
      height: "40px",
      "margin-bottom": "7px",
    },

    ".secure-payment-form div[class$='-shield']": {
      flex: "1 1 auto",
      "margin-right": "16px",
      float: "left"
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
      "font-family": "Open sans,sans-serif",
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
      width: "110px",
      height: "23px",
      "text-align": "right",
      float: "right",
      "display": "flex",
      "justify-content": "end"
    },

    ".secure-payment-form div[class$='-logo'] .security-msg": {
      color: "#707689",
      "font-size": "8px",
      display: "inline-block",
      "vertical-align": "middle",
      "white-space": "nowrap",
      "margin-right": "2px"
    },

    ".secure-payment-form div[class$='-logo'] .security-msg strong": {
      "white-space": "nowrap",
      "font-weight": "normal",
      display: "block"
    },

    ".secure-payment-form div[class$='-logo'] img": {
      "vertical-align": "middle"
    },

    ".secure-payment-form div": {
      display: "block",
    },

    ".secure-payment-form iframe": {
      width: "300px",
    },

    ".secure-payment-form .form-row": {
      "margin-top": "10px",
    },

    ".secure-payment-form .form-wrapper": {
      display: "block",
      margin: "10px auto",
      width: "300px",
    },

    ".secure-payment-form .tooltip, .secure-payment-form .tooltip-content": {
      display: "none",
    },
    ".secure-payment-form .other-cards-label": {
      "border-bottom": "1px solid #BCBFC8",
      "text-align": "center",
      margin: "20px 0 20px",
      position: "relative",
    },

    ".secure-payment-form .other-cards-label span": {
      "text-align": "center",
      padding: "0 10px",
      background: "#fff",
      position: "absolute",
      color: "#9296A5",
      width: "auto",
      left: "50%",
      "-webkit-transform": "translateX(-50%)",
      "-moz-transform": "translateX(-50%)",
      "-ms-transform": "translateX(-50%)",
      "-o-transform": "translateX(-50%)",
      transform: "translateX(-50%)",
      margin: "-10px auto",
      "font-family": "DMSans",
      "font-size": "16px",
      "white-space": "nowrap",
    },

    ".secure-payment-form .hidden": {
      display: "none!important",
    },

    ...getTooltipStyles(assetBaseUrl),
    ...getApplePayStyles(assetBaseUrl),
    ...getClickToPayStyles(assetBaseUrl),
    ...getGooglePayStyles(assetBaseUrl),
    ...(options.fieldValidation?.enabled ? getBuiltInValidationParentStyles(assetBaseUrl) : {}),
    ...(options.currencyConversion?.enabled ? getCurrencyConversionStyles() : {}),
    ...getPaymentMethodsStyles(assetBaseUrl),

    ...(options.orderInformation?.enabled ? getOrderInformationCommonStyles(assetBaseUrl) : {}),

    ...getBankSelectionCommonStyles(assetBaseUrl),
  };
};
