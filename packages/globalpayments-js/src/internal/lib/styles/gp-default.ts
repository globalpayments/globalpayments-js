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
      "background-color": "#148EE6",
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

    ".secure-payment-form .tooltip:focus + .tooltip-content": {
      visibility: "visible",
      opacity: "1",
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

    ".secure-payment-form .ctp-panel": {
      border: "0.5px solid #BCBFC8",
      "box-shadow": "0px 1px 1px rgba(0, 0, 0, 0.25)",
      "border-radius": "3px",
      "margin-bottom": "20px",
    },

    ".secure-payment-form div[class^='credit-card'].apm-active ~ div:not([class$='shield']):not([class$='logo'])": {
      display: "none",
    },

    ".secure-payment-form .ctp-panel .ctp-button": {
      display: "flex",
      background: `transparent url(${imageBase}ctp-coloured-cards.svg) no-repeat 16px 20px`,
      "flex-direction": "row",
      "align-items": "center",
      padding: "16px 50px 16px 78px",
      flex: "none",
      order: "0",
      "flex-grow": "1",
      position: "relative",
      "font-size": "14px",
      "line-height": "24px",
      cursor: "pointer",
      "font-family": "GPCommerce",
    },

    ".secure-payment-form .apm-active .ctp-panel .ctp-button": {
      cursor: "default",
    },

    ".secure-payment-form .ctp-panel .ctp-button:after": {
      content: "",
      position: "absolute",
      width: "20px",
      height: "20px",
      border: "solid black",
      "border-width": "0 3px 3px 0",
      "display": "inline-block",
      padding: "3px",
      transform: "rotate(-45deg)",
      "-webkit-transform": "rotate(-45deg)",
    },

    ".secure-payment-form .ctp-panel .right-arrow": {
      position: "absolute",
      background: "#fff",
      right: "20px",
      border: "solid #242729",
      "border-width": "0 4px 4px 0",
      "display": "inline-block",
      padding: "10px",
      transform: "rotate(-45deg)",
      "-webkit-transform": "rotate(-45deg)",
      "z-index": "9999",
      top: "50%",
      "margin-top": "-10px",
    },

    ".secure-payment-form .apm-active .right-arrow": {
      display: "none",
    },

    ".secure-payment-form .ctp-info-tooltip": {
      width: "16px",
      height: "16px",
      display: "inline-block",
      "vertical-align": "middle",
      overflow: "hidden",
      background: `transparent url(${imageBase}info.svg) no-repeat center center`,
      margin: "0 5px",
    },

    ".secure-payment-form .ctp-info-tooltip-content": {
      visibility: "hidden",
      width: "282px",
      "background-color": "#fff",
      color: "#474B57",
      "text-align": "left",
      "border-radius": "3px",
      border: "solid 1px #BCBFC8",
      padding: "8px 8px",
      position: "absolute",
      "z-index": "99999999",
      "margin-left": "-141px",
      "margin-top": "25px",
      opacity: "0",
      transition: "opacity 0.3s",
      "font-size": "0.79em",
      "font-weight": "400",
      "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",
    },

    ".secure-payment-form .ctp-info-tooltip .ctp-heading": {
      "max-width": "350px",
      margin: "0 auto",
    },

    ".secure-payment-form .ctp-info-tooltip-content ul": {
      padding: "0",
    },

    ".secure-payment-form .ctp-info-tooltip-content li": {
      padding: "3px 5px 3px 50px",
      "font-size": "12px",
      "line-height": "19px",
      "list-style": "none",
    },

    ".secure-payment-form .ctp-info-tooltip-content li.smart-checkout": {
      background: `transparent url(${imageBase}ctp-shopping-cart.svg) no-repeat left center`,
    },

    ".secure-payment-form .ctp-info-tooltip-content li.faster-checkout": {
      background: `transparent url(${imageBase}ctp-check.svg) no-repeat left center`,
    },

    ".secure-payment-form .ctp-info-tooltip-content li.industry-standards": {
      background: `transparent url(${imageBase}ctp-lock.svg) no-repeat left center`,
    },

    ".secure-payment-form .ctp-info-tooltip .top-arrow": {
      position: "absolute",
      "margin-top": "-12px",
      background: "#fff",
      width: "4px",
      left: "50%",
      "margin-left": "-2px",
      border: "solid #BCBFC8",
      "border-width": "0 1px 1px 0",
      "display": "inline-block",
      padding: "3px",
      transform: "rotate(-135deg)",
      "-webkit-transform": "rotate(-135deg)",
      "z-index": "9999",
    },

    ".secure-payment-form .ctp-info-tooltip-content li .ctp-icon": {
      "background-size": "80%!important",
      width: "20px!important",
      height: "10px!important",
      margin: "0 0 0 2px!important",
    },

    ".secure-payment-form .ctp-info-tooltip-content strong": {
      "font-size": "16px",
      "vertical-align": "middle",
    },

    ".secure-payment-form .ctp-info-tooltip:hover .ctp-info-tooltip-content": {
      visibility: "visible",
      opacity: "1",
    },

    ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
      background: `transparent url(${imageBase}ctp.svg) no-repeat 0 0`,
      display: "inline-block",
      "vertical-align": "middle",
      width: "28px",
      height: "18px",
      margin: "0 5px",
    },

    ".secure-payment-form div[class^='ctp'] .card-brands": {
      background: `transparent url(${imageBase}card-brands.svg) no-repeat center right`,
      display: "inline-block",
      "vertical-align": "middle",
      "padding-right": "115px",
      "min-height": "19px",
      color: "#687282",
      "white-space": "nowrap",
    },

    ".secure-payment-form #ctp-wrapper #header": {
      display: "none!important",
    },

    ".secure-payment-form #ctp-wrapper #footer": {
      display: "none!important",
    },

    ".secure-payment-form #ctp-wrapper label.footerLabel": {
      margin: "0",
      "font-size": "14px",
      "line-height": "21px",
      "font-weight": "bold",
    },

    ".secure-payment-form #ctp-wrapper .footerLinewindow": {
      padding: "20px 20% 0",
    },

    ".secure-payment-form #ctp-wrapper .TransitionLabel": {
      "font-size": "18px",
      "line-height": "27px",
      "text-align": "center",
      float: "none",
      margin: "0",
    },

    ".secure-payment-form #ctp-wrapper #mtransitiontext.transctcardlabel": {
      "font-size": "18px",
      "line-height": "27px",
      "text-align": "center",
      float: "none",
      margin: "20px 0 0",
    },

    ".secure-payment-form #ctp-wrapper .transctcardlabel": {
      "font-size": "14px",
      "line-height": "21px",
      "text-align": "center",
      float: "none",
    },

    ".secure-payment-form #ctp-wrapper .quitbanner": {
      "margin-left": "16px",
      "margin-top": "0",
    },

    ".secure-payment-form #ctp-wrapper .quitbanner > svg": {
      display: "none",
    },

    ".secure-payment-form #ctp-wrapper .quitbanner .quitPage": {
      margin: "0",
    },

    ".secure-payment-form #ctp-wrapper .VerificationLabel": {
      "font-size": "14px",
      "line-height": "21px",
      "font-weight": "bold",
      margin: "0",
    },

    ".secure-payment-form #ctp-wrapper label": {
      "font-size": "14px",
      "line-height": "21px",
      "font-weight": "bold",
      margin: "0",
    },

    ".secure-payment-form #ctp-wrapper label.change": {
      "font-size": "14px",
      "line-height": "21px",
      "font-weight": "bold",
      margin: "0",
    },

    ".secure-payment-form #ctp-wrapper .blue-button": {
      height: "auto",
      "font-size": "18px",
      "line-height": "27px",
      padding: "13px 0",
    },

    ".secure-payment-form #ctp-wrapper .blue-button label": {
      margin: "0",
    },

    ".secure-payment-form #ctp-wrapper .lblemailDisplay": {
      "font-size": "13px",
      "line-height": "19px",
      "margin-top": "0",
    },

    ".secure-payment-form #ctp-wrapper .rsdcode": {
      "font-size": "14px",
      "line-height": "21px",
      "font-weight": "bold",
      "margin-bottom": "0",
    },

    ".secure-payment-form #ctp-wrapper .svgalignDiv": {
      "padding": "0 40%",
    },

    ".secure-payment-form #ctp-wrapper .signinlayout": {
      "min-height": "200px",
      "max-width": "350px",
    },

    ".secure-payment-form #ctp-wrapper .logindiv": {
      "min-height": "160px",
      padding: "16px 0",
    },

    ".secure-payment-form #ctp-wrapper #cancel-link": {
      "margin-bottom": "16px",
    },

    ".secure-payment-form #ctp-wrapper .logindiv .tooltip": {
      display: "none",
    },

    ".secure-payment-form #ctp-wrapper .logindiv .lblemailInput": {
      display: "none",
    },

    ".secure-payment-form #ctp-wrapper .VerificationLabel label": {
      display: "inline-block",
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
