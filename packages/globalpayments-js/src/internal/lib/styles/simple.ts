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
  };
};
