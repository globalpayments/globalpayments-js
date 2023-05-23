// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

// @TODO: confirm styles with enterprise repo

import getApplePayStyles from './apple-pay/gp-default';
import getClickToPayStyles from "./click-to-pay/gp-default";
import getGooglePayStyles from './google-pay/gp-default';

export const fieldStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    html: {
      "font-size": "62.5%",
    },

    body: {
      "font-size": "1.4rem",
    },

    "#secure-payment-field-wrapper": {
      postition: "relative",
    },

    "#secure-payment-field": {
      "-o-transition":
        "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
      "-webkit-box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)",
      "-webkit-transition":
        "border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s",
      "background-color": "#fff",
      border: "1px solid #cecece",
      "border-radius": "2px",
      "box-shadow": "none",
      "box-sizing": "border-box",
      display: "block",
      "font-family": "Roboto, sans-serif",
      "font-size": "11px",
      "font-smoothing": "antialiased",
      height: "35px",
      margin: "5px 0 10px 0",
      "max-width": "100%",
      outline: "0",
      padding: "0 10px",
      transition: "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
      "vertical-align": "baseline",
      width: "100%",
    },

    "#secure-payment-field:focus": {
      border: "1px solid lightblue",
      "box-shadow": "0 1px 3px 0 #cecece",
      outline: "none",
    },

    "#secure-payment-field[type=button]": {
      "text-align": "center",
      "text-transform": "none",
      "white-space": "nowrap",
    },

    "#secure-payment-field[type=button]:focus": {
      outline: "none",
    },

    ".card-cvv": {
      background: `transparent url(${imageBase}/cvv.png) no-repeat right`,
      "background-size": "60px",
    },

    ".card-cvv.card-type-amex": {
      background: `transparent url(${imageBase}/cvv-amex.png) no-repeat right`,
      "background-size": "60px",
    },

    "img.card-number-icon": {
      background: `transparent url(${imageBase}logo-unknown@2x.png) no-repeat`,
      "background-size": "100%",
      width: "60px",
      height: "30px",
      position: "absolute",
      right: "0",
      top: "50%",
      "margin-top": "-21px",
      "background-position": "50% 50%"
    },

    "img.card-number-icon[src$='/gp-cc-generic.svg']": {
      background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat`,
      "background-size": "120%",
      "background-position-y": "bottom"
    },

    "img.card-number-icon.invalid.card-type-amex": {
      background: `transparent url(${imageBase}logo-amex@2x.png) no-repeat 100%`,
      "background-size": "60%",
      "background-position-y": "88%"
    },

    "img.card-number-icon.invalid.card-type-discover": {
      background: `transparent url(${imageBase}logo-discover@2x.png) no-repeat`,
      "background-size": "115%",
      "background-position-y": "88%",
      width: "80px",
      right: "5px"
    },

    "img.card-number-icon.invalid.card-type-jcb": {
      background: `transparent url(${imageBase}logo-jcb@2x.png) no-repeat 105%`,
      "background-size": "75%",
      "background-position-y": "85%"
    },

    "img.card-number-icon.invalid.card-type-mastercard": {
      background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat`,
      "background-size": "100%",
      "background-position": "6px 99%"
    },

    "img.card-number-icon.invalid.card-type-visa": {
      background: `transparent url(${imageBase}logo-visa@2x.png) no-repeat `,
      "background-size": "120%",
      "background-position": "-4px 91%"
    },

    "img.card-number-icon.valid.card-type-amex": {
      background: `transparent url(${imageBase}logo-amex@2x.png) no-repeat 100%`,
      "background-size": "60%",
      "background-position-y": "-3px"
    },
    "img.card-number-icon.valid.card-type-discover": {
      background: `transparent url(${imageBase}logo-discover@2x.png) no-repeat`,
      "background-size": "115%",
      "background-position-y": "-10px",
      width: "80px",
      right: "5px"
    },
    "img.card-number-icon.valid.card-type-jcb": {
      background: `transparent url(${imageBase}logo-jcb@2x.png) no-repeat 105%`,
      "background-size": "75%",
      "background-position-y": "-5px"
    },
    "img.card-number-icon.valid.card-type-mastercard": {
      background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat`,
      "background-size": "100%",
      "background-position": "6px -1px"
    },
    "img.card-number-icon.valid.card-type-visa": {
      background: `transparent url(${imageBase}logo-visa@2x.png) no-repeat`,
      "background-size": "120%",
      "background-position": "-4px -4px"
    },

    ".card-number::-ms-clear": {
      display: "none",
    },

    "input[placeholder]": {
      "letter-spacing": ".5px",
    },
  };
};

export const parentStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    ".secure-payment-form": {
      "font-family": "sans-serif",
      width: "300px",
    },

    ".secure-payment-form label": {
      color: "#555",
      "font-size": "13px",
      "font-weight": "bold",
      "line-height": "1.5",
      "text-transform": "uppercase",
    },

    ".secure-payment-form #ss-banner": {
      background: `transparent url(${imageBase}/shield-and-logos@2x.png) no-repeat left center`,
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
      width: "89px",
      height: "26px",
      "text-align": "center",
      margin: "0"
    },

    ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
      width: "19px",
      height: "18px",
      "margin-top": "1px",
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
      float: "right"
    },

    ".secure-payment-form div[class$='-logo'] .security-msg": {
      color: "#707689",
      "font-size": "8px",
      display: "inline-block",
      "vertical-align": "middle",
      "margin-right": "2px"
    },

    ".secure-payment-form div[class$='-logo'] img": {
      "vertical-align": "middle"
    },
    ".secure-payment-form div": {
      display: "block",
    },

    ".secure-payment-form iframe": {
      "min-height": "3.6rem",
    },

    ".secure-payment-form .form-row": {
      "margin-top": "10px",
    },

    ".secure-payment-form .form-wrapper": {
      display: "block",
      margin: "10px auto",
    },

    ".secure-payment-form input": fieldStyles(assetBaseUrl)[
      "#secure-payment-field"
      ],
    ".secure-payment-form input:focus": fieldStyles(assetBaseUrl)[
      "#secure-payment-field:focus"
      ],

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
      "font-family": "GPCommerce",
      "font-size": "16px",
      "white-space": "nowrap",
    },

    ".secure-payment-form .hidden": {
      display: "none!important",
    },

    ...getApplePayStyles(assetBaseUrl),
    ...getClickToPayStyles(assetBaseUrl),
    ...getGooglePayStyles(assetBaseUrl),
  };
};
