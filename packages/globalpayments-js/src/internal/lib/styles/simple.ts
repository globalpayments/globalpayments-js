// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

// @TODO: confirm styles with enterprise repo

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

    ".card-number": {
      background: `transparent url(${imageBase}/logo-unknown@2x.png) no-repeat right`,
      "background-size": "52px",
    },

    ".card-number.invalid.card-type-amex": {
      background: `transparent url(${imageBase}/amex-invalid.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "38px",
    },

    ".card-number.invalid.card-type-discover": {
      background: `transparent url(${imageBase}/discover-invalid.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "60px",
    },

    ".card-number.invalid.card-type-jcb": {
      background: `transparent url(${imageBase}/jcb-invalid.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "38px",
    },

    ".card-number.invalid.card-type-mastercard": {
      background: `transparent url(${imageBase}/mastercard-invalid.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "40px",
    },

    ".card-number.invalid.card-type-visa": {
      background: `transparent url(${imageBase}/visa-invalid.svg) no-repeat center`,
      "background-position-x": "98%",
      "background-size": "50px",
    },

    ".card-number.valid.card-type-amex": {
      background: `transparent url(${imageBase}/amex.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "38px",
    },

    ".card-number.valid.card-type-discover": {
      background: `transparent url(${imageBase}/discover.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "60px",
    },

    ".card-number.valid.card-type-jcb": {
      background: `transparent url(${imageBase}/jcb.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "38px",
    },

    ".card-number.valid.card-type-mastercard": {
      background: `transparent url(${imageBase}/mastercard.svg) no-repeat center`,
      "background-position-x": "98%",
      "background-size": "40px",
    },

    ".card-number.valid.card-type-visa": {
      background: `transparent url(${imageBase}/visa.svg) no-repeat right center`,
      "background-position-x": "98%",
      "background-size": "50px",
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
  };
};
