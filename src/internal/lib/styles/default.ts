import assetBaseUrl from "../asset-base-url";

// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

const imageBase = assetBaseUrl() + "images/";

export const fieldStyles = {
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
  ".card-number": {
    background: `transparent url(${imageBase}logo-unknown@2x.png) no-repeat right`,
    "background-size": "55px 35px",
  },
  ".card-number.invalid.card-type-amex": {
    background: `transparent url(${imageBase}logo-amex@2x.png) no-repeat right`,
    "background-position-y": "-44px",
    "background-size": "50px 90px",
  },
  ".card-number.invalid.card-type-discover": {
    background: `transparent url(${imageBase}logo-discover@2x.png) no-repeat right`,
    "background-position-y": "-44px",
    "background-size": "85px 90px",
  },
  ".card-number.invalid.card-type-jcb": {
    background: `transparent url(${imageBase}logo-jcb@2x.png) no-repeat right`,
    "background-position-y": "-44px",
    "background-size": "55px 94px",
  },
  ".card-number.invalid.card-type-mastercard": {
    background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat right`,
    "background-position-y": "-52px",
    "background-size": "62px 105px",
  },
  ".card-number.invalid.card-type-visa": {
    background: `transparent url(${imageBase}logo-visa@2x.png) no-repeat right`,
    "background-position-y": "-44px",
    "background-size": "83px 88px",
  },
  ".card-number.valid.card-type-amex": {
    background: `transparent url(${imageBase}logo-amex@2x.png) no-repeat right top`,
    "background-size": "50px 90px",
  },
  ".card-number.valid.card-type-discover": {
    background: `transparent url(${imageBase}logo-discover@2x.png) no-repeat right`,
    "background-position-y": "1px",
    "background-size": "85px 90px",
  },
  ".card-number.valid.card-type-jcb": {
    background: `transparent url(${imageBase}logo-jcb@2x.png) no-repeat right top`,
    "background-position-y": "2px",
    "background-size": "55px 94px",
  },
  ".card-number.valid.card-type-mastercard": {
    background: `transparent url(${imageBase}logo-mastercard@2x.png) no-repeat right`,
    "background-position-y": "-1px",
    "background-size": "62px 105px",
  },
  ".card-number.valid.card-type-visa": {
    background: `transparent url(${imageBase}logo-visa@2x.png) no-repeat right top`,
    "background-size": "82px 86px",
  },
  ".card-number::-ms-clear": {
    display: "none",
  },
  "input[placeholder]": {
    "letter-spacing": "3px",
  },
};

export const parentStyles = {
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
};
