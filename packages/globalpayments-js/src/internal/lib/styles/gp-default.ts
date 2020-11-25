// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

export const fieldStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    "*": {
      "box-sizing": "border-box",
    },
    "::-webkit-input-placeholder": {
      color: "#9296A5",
    },
    "::-ms-input-placeholder": {
      color: "#9296A5",
    },
    "::-moz-input-placeholder": {
      color: "#9296A5",
      opacity: 1,
    },
    ":-moz-input-placeholder": {
      color: "#9296A5",
      opacity: 1,
    },
    "#secure-payment-field": {
      width: "100%",
      height: "40px",
      padding: "12px",
      border: "1px solid #BCBFC8",
      "border-radius": "0",
      "font-size": "0.89em",
      "font-weight": "400",
      color: "#394046",
    },
    "#secure-payment-field:focus": {
      border: "2px solid #2B9AEC",
      outline: "none",
    },
    "#secure-payment-field[type=button]": {
      "background-color": "#0074C7",
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
    },
    "#secure-payment-field[type=button]:focus": {
      border: "2px solid #2B9AEC",
      outline: "none",
    },
    "#secure-payment-field[type=button]:hover": {
      "background-color": "#148EE6",
    },
    ".card-cvv": {
      background: `transparent url(${imageBase}cvv.png) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-cvv.card-type-amex": {
      background: `transparent url(${imageBase}cvv-amex.png) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number": {
      background: `transparent url(${imageBase}gp-cc-generic.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.invalid.card-type-amex": {
      background: `transparent url(${imageBase}gp-cc-amex.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.invalid.card-type-discover": {
      background: `transparent url(${imageBase}gp-cc-discover.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.invalid.card-type-jcb": {
      background: `transparent url(${imageBase}gp-cc-jcb.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.invalid.card-type-mastercard": {
      background: `transparent url(${imageBase}gp-cc-mastercard.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.invalid.card-type-visa": {
      background: `transparent url(${imageBase}gp-cc-visa.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.valid.card-type-amex": {
      background: `transparent url(${imageBase}gp-cc-amex.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.valid.card-type-discover": {
      background: `transparent url(${imageBase}gp-cc-discover.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.valid.card-type-jcb": {
      background: `transparent url(${imageBase}gp-cc-jcb.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.valid.card-type-mastercard": {
      background: `transparent url(${imageBase}gp-cc-mastercard.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.valid.card-type-visa": {
      background: `transparent url(${imageBase}gp-cc-visa.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number::-ms-clear": {
      display: "none",
    },
  };
};

export const parentStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    ".secure-payment-form": {
      display: "-ms-flexbox",
      // @ts-ignore
      display: "flex",
      "-ms-flex-wrap": "wrap",
      "flex-wrap": "wrap",
    },

    ".secure-payment-form label": {
      "margin": "16px 0",
      "display": "block",
      "font-size": "0.79em",
      "font-weight": "500"
    },

    ".secure-payment-form > div": {
      "flex": "100%",
    },

    ".secure-payment-form .credit-card-card-expiration": {
      "flex": "1 1 auto",
      "margin-right": "16px",
    },

    ".secure-payment-form .credit-card-card-cvv": {
      "flex": "1 1 auto",
      "margin-left": "16px",
    },

    ".secure-payment-form .credit-card-shield": {
      "flex": "1 1 auto",
      "margin-right": "16px",
      "background": `url(${imageBase}gp-secure-ssl-logo.svg) no-repeat left`,
      "width": "88px",
      "height": "26px",
    },

    ".secure-payment-form .credit-card-logo": {
      "flex": "1 1 auto",
      "margin-left": "16px",
      "background": `url(${imageBase}gp-secure-logo.svg) no-repeat right`,
      "width": "100px",
      "height": "23px",
    },

    ".secure-payment-form .credit-card-submit": {
      "margin": "32px 0 16px 0",
    },

    ".secure-payment-form iframe": {
      "min-height": "41px",
      "width": "100%",
    },

    ".secure-payment-form .form-row": {
    },

    ".secure-payment-form .form-wrapper": {
    },
  };
};
