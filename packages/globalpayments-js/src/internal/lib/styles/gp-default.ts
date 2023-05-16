import getInstallmentStyles from './installments/gp-default';
import getApplePayStyles from './apple-pay/gp-default';
import getClickToPayStyles from './click-to-pay/gp-default';
import getGooglePayStyles from './google-pay/gp-default';

// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

export const fieldStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    "*": {
      "box-sizing": "border-box",
    },
    "::-webkit-input-placeholder": {
      color: "#767676",
    },
    "::-ms-input-placeholder": {
      color: "#767676",
    },
    "::-moz-input-placeholder": {
      color: "#767676",
      opacity: 1,
    },
    ":-moz-input-placeholder": {
      color: "#9296A5",
      opacity: 1,
    },
    ":-moz-placeholder": { /* Firefox 18- */
      color: "#767676",
      opacity: "1",
    },

    "::-moz-placeholder": {  /* Firefox 19+ */
      color: "#767676",
      opacity: "1"
    },
    "#secure-payment-field": {
      width: "100%",
      height: "40px",
      padding: "12px",
      border: "1px solid #5a5e6d",
      "border-radius": "0",
      "font-size": "0.89em",
      "font-weight": "400",
      color: "#394046",
    },
    "#secure-payment-field:focus": {
      border: "1px solid #2B9AEC",
      outline: "none",
    },
    "#secure-payment-field[type=button]": {
      "background-color": "#0071ba",
      color: "white",
      padding: "8px",
      border: "none",
      width: "100%",
      "border-radius": "2px",
      cursor: "pointer",
      "font-size": "1.125em",
      "font-weight": "500",
      height: "48px",
      "text-align": "center",
      "vertical-align": "middle",
      "text-transform": "uppercase"
    },
    "#secure-payment-field[type=button]:focus": {
      border: "2px solid #08385b",
      outline: "none",
    },
    "#secure-payment-field[type=button]:hover": {
      "background-color": "#015a94",
    },
    "#secure-payment-field[type=button]::before": {
      content: `url("${imageBase}gp-lock.svg")`,
      "margin-right": "5px",
    },
    ".card-cvv": {
      background: `transparent url(${imageBase}cvv.png) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-cvv.card-type-amex": {
      "background-image": `url(${imageBase}cvv-amex.png)`,
    },
    "img.card-number": {
      background: `transparent url(${imageBase}gp-cc-generic.svg) no-repeat right center`,
      position: "absolute",
      right: "10px",
      top: "50%",
      width: "24px",
      height: "16px",
      "margin-top": "-8px",
      "background-size": "20px",
    },
    "img.card-number.card-type-amex": {
      "background-image": `url(${imageBase}gp-cc-amex.svg)`,
    },
    "img.card-number.card-type-discover": {
      "background-image": `url(${imageBase}gp-cc-discover.svg)`,
    },
    "img.card-number.card-type-jcb": {
      "background-image": `url(${imageBase}gp-cc-jcb.svg)`,
    },
    "img.card-number.card-type-mastercard": {
      "background-image": `url(${imageBase}gp-cc-mastercard.svg)`,
    },
    "img.card-number.card-type-visa": {
      "background-image": `url(${imageBase}gp-cc-visa.svg)`,
    },
    "img.card-number.card-type-diners": {
      "background-image": `url(${imageBase}gp-cc-diners.svg)`,
    },
    ".card-number::-ms-clear": {
      display: "none",
    },
  };
};

export const parentStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";
  const fontBase = assetBaseUrl + "fonts/";

  return {
    ".secure-payment-form": {
      display: "flex",
      "-ms-flex-wrap": "wrap",
      "flex-wrap": "wrap",
    },

    ".secure-payment-form *": {
      "box-sizing": "border-box",
    },

    ".secure-payment-form label": {
      margin: "16px 0",
      display: "block",
      "font-size": "0.79em",
      "font-weight": "500",
      "font-family": "GPCommerce"
    },

    ".secure-payment-form > div": {
      flex: "100%",
    },

    ".secure-payment-form .credit-card-card-cvv iframe": {
      width: "90%",
      float: "left",
    },

    ".secure-payment-form div[class$='-shield']": {
      flex: "1 1 auto",
      "margin-right": "16px"
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
      width: "100px",
      height: "23px",
      "text-align": "right"
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

    ".secure-payment-form .credit-card-submit": {
      margin: "32px 0 16px 0",
    },

    ".secure-payment-form iframe": {
      "min-height": "40px",
      width: "100%",
    },

    ".secure-payment-form .tooltip": {
      position: "relative",
      width: "10%",
      height: "40px",
      border: "1px solid #5a5e6d",
      "border-left": "none",
      color: "#474B57",
      float: "right",
      "background-size": "20px",
      background: `transparent url(${imageBase}gp-fa-question-circle.svg) no-repeat center center`,
    },

    ".secure-payment-form .tooltip:focus": {
      border: "1px solid #2B9AEC",
      outline: "none",
    },

    ".secure-payment-form .tooltip-content": {
      visibility: "hidden",
      width: "200px",
      "background-color": "#fff",
      color: "#474B57",
      "text-align": "left",
      "border-radius": "3px",
      border: "solid 1px #5a5e6d",
      padding: "8px 8px",
      position: "absolute",
      "z-index": "99999999",
      right: "70%",
      opacity: "0",
      transition: "opacity 0.3s",
      "font-size": "0.79em",
      "font-weight": "400",
      "margin-top": "30px",
      overflow: "hidden",
      "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",
    },

    ".secure-payment-form .tooltip:hover > .tooltip-content": {
      visibility: "visible",
      opacity: "1",
    },

    ".secure-payment-form .tooltip:focus > .tooltip-content": {
      visibility: "visible",
      opacity: "1",
    },

    ".secure-payment-form .other-cards-label": {
      "border-bottom": "1px solid #5a5e6d",
      "text-align": "center",
      margin: "40px 0 20px",
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

    "@font-face": {
      "font-family": "GPCommerce",
      src: `url("${fontBase}GPCommerce-Regular.woff2") format("woff2")`,
    },

    "@media(min-width: 800px)": {
      ".secure-payment-form .credit-card-card-expiration": {
        flex: "1 1 auto",
        "margin-right": "16px",
      },

      ".secure-payment-form .credit-card-card-cvv": {
        flex: "1 1 auto",
        "margin-left": "16px",
      },
    },

    ...getInstallmentStyles(assetBaseUrl),
    ...getApplePayStyles(assetBaseUrl),
    ...getClickToPayStyles(assetBaseUrl),
    ...getGooglePayStyles(assetBaseUrl),
  };
};