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
      border: "1px solid #2B9AEC",
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
      "text-transform": "uppercase"
    },
    "#secure-payment-field[type=button]:focus": {
      border: "1px solid #2B9AEC",
      outline: "none",
    },
    "#secure-payment-field[type=button]:hover": {
      "background-color": "#148EE6",
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
    ".card-number": {
      background: `transparent url(${imageBase}gp-cc-generic.svg) no-repeat right 10px center`,
      "background-size": "20px",
    },
    ".card-number.card-type-amex": {
      "background-image": `url(${imageBase}gp-cc-amex.svg)`,
    },
    ".card-number.card-type-discover": {
      "background-image": `url(${imageBase}gp-cc-discover.svg)`,
    },
    ".card-number.card-type-jcb": {
      "background-image": `url(${imageBase}gp-cc-jcb.svg)`,
    },
    ".card-number.card-type-mastercard": {
      "background-image": `url(${imageBase}gp-cc-mastercard.svg)`,
    },
    ".card-number.card-type-visa": {
      "background-image": `url(${imageBase}gp-cc-visa.svg)`,
    },
    ".card-number.card-type-diners": {
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

    ".secure-payment-form .credit-card-shield": {
      flex: "1 1 auto",
      "margin-right": "16px",
      background: `url(${imageBase}gp-secure-ssl-logo.svg) no-repeat left`,
      width: "88px",
      height: "26px",
    },

    ".secure-payment-form .credit-card-logo": {
      flex: "1 1 auto",
      "margin-left": "16px",
      background: `url(${imageBase}gp-secure-logo.svg) no-repeat right`,
      width: "100px",
      height: "23px",
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
      border: "1px solid #BCBFC8",
      "border-left": "none",
      color: "#474B57",
      overflow: "hidden",
      "background-size": "20px",
      background: `transparent url(${imageBase}gp-fa-question-circle.svg) no-repeat center center`,
    },

    ".secure-payment-form .tooltip-content": {
      visibility: "hidden",
      width: "200px",
      "background-color": "#fff",
      color: "#474B57",
      "text-align": "left",
      "border-radius": "3px",
      border: "solid 1px #BCBFC8",
      padding: "8px 8px",
      position: "absolute",
      "z-index": "99999999",
      right: "10%",
      opacity: "0",
      transition: "opacity 0.3s",
      "font-size": "0.79em",
      "font-weight": "400",
      "margin-top": "-12px",
      overflow: "hidden",
      "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",
    },

    ".secure-payment-form .tooltip:hover + .tooltip-content": {
      visibility: "visible",
      opacity: "1",
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

      ".secure-payment-form .tooltip-content": {
        right: "5%",
      },
    },
  };
};
