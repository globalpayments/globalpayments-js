const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    ".secure-payment-form .ctp-panel": {
      border: "0.5px solid #BCBFC8",
      "box-shadow": "0px 1px 1px rgba(0, 0, 0, 0.25)",
      "border-radius": "3px",
      "container-type": "inline-size",
      "font-family": "GPCommerce",
      "margin-bottom": "20px",
    },
    ".secure-payment-form div[class^='credit-card'].apm-active ~ div:not([class$='shield']):not([class$='logo'])": {
      display: "none",
    },

    ".secure-payment-form .ctp-panel .ctp-button": {
      "align-items": "center",
      background: `transparent url(${imageBase}ctp-coloured-cards.svg) no-repeat 16px 20px`,
      cursor: "pointer",
      display: "flex",
      flex: "none",
      "flex-direction": "row",
      "flex-grow": "1",
      order: "0",
      padding: "16px 50px 16px 78px",
      position: "relative",
      "white-space": "nowrap"
    },

    ".secure-payment-form .ctp-panel .ctp-header": {
      width: "100%",
    },

    ".secure-payment-form .ctp-panel .ctp-button .heading": {
      "font-family": "GPCommerce",
      "font-weight": "600",
      "line-height": "22px",
      "font-size": "12px"
    },

    ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
      background: `transparent url(${imageBase}ctp.svg) no-repeat 50% 50%`,
      "background-size": "90%",
      width: "25px",
      height: "15px",
      margin: "0 5px",
      display: "inline-flex",
      "vertical-align": "middle",
      flex: "none",
      order: "0",
      "flex-grow": "0",
    },

    ".secure-payment-form .ctp-panel .ctp-button .subheading": {
      margin: "5px 0 0 0",
      "font-family": "Roboto, sans-serif",
      "font-weight": "400",
      "font-size": "12px",
      "line-height": "19px",
      "color": "#687282",
    },

    ".secure-payment-form div[class^='ctp'] .card-brands": {
      background: `transparent url(${imageBase}card-brands.svg) no-repeat center right`,
      padding: "0px",
      width: "108px",
      height: "19px",
      display: "inline-flex",
      "vertical-align": "middle",
      flex: "none",
      order: "0",
      "flex-grow": "0"
    },

    ".secure-payment-form .ctp-info-tooltip": {
      width: "16px",
      height: "16px",
      display: "inline-flex",
      "vertical-align": "middle",
      overflow: "hidden",
      background: `transparent url(${imageBase}info.svg) no-repeat center center`,
      margin: "0 5px",
      "white-space": "normal"
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
      "margin-left": "-133px",
      "margin-top": "25px",
      opacity: "0",
      transition: "opacity 0.3s",
      "font-family": "GPCommerce",
      "font-size": "0.79em",
      "font-weight": "400",
      "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",
    },

    ".secure-payment-form .ctp-info-tooltip-content .ctp-icon": {
      "margin-left": "0!important"
    },

    ".secure-payment-form .ctp-info-tooltip .ctp-heading": {
      "max-width": "350px",
      margin: "0 auto",
    },

    ".secure-payment-form .ctp-info-tooltip-content ul": {
      padding: "0",
      "margin-bottom": "0"
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

    "@container (min-width: 408px)": {
      ".secure-payment-form .ctp-panel .ctp-button .heading": {
        "font-size": "14px"
      },

      ".secure-payment-form .ctp-panel .right-arrow": {
        "border-width": "0 3px 3px 0",
      },

      ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
        width: "28px",
        height: "18px",
        "background-size": "100%"
      }
    },

    ".secure-payment-form .apm-active .ctp-panel .ctp-button": {
      cursor: "default",
    },

    ".secure-payment-form.apm-active .ctp-panel .ctp-button": {
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
      padding: "8px",
      transform: "rotate(-45deg)",
      "-webkit-transform": "rotate(-45deg)",
      "z-index": "9999",
      top: "50%",
      "margin-top": "-8px",
    },

    ".secure-payment-form .apm-active .right-arrow": {
      display: "none",
    },

    ".secure-payment-form.apm-active .right-arrow": {
      display: "none",
    },

    // Styles for signinlayout
    "#ctp-wrapper #header": {
      display: "none!important",
    },

    "#ctp-wrapper .logindiv .tooltip": {
      display: "none!important",
    },

    "#ctp-wrapper .logindiv .lblemailInput": {
      display: "none!important",
    },

    "#ctp-wrapper #verifyVisa .VerificationLabel": {
      "font-size": "14px",
      "font-family": "GPCommerce",
      "line-height": "25px"
    },

    "#ctp-wrapper #verifyVisa label": {
      display: "inline-block",
      "font-size": "14px",
      "font-family": "GPCommerce",
      margin: "0"
    },

    "#ctp-wrapper .blue-button label": {
      "font-size": "18px",
      "line-height": "27px",
      "font-family": "GPCommerce",
      margin: "0"
    },

    "#ctp-wrapper .cardhdr label": {
      margin: "0",
      display: "inline-block",
      "font-size": "14px",
      "line-height": "37px"
    },

    "#ctp-wrapper .cardhdr label.crdSelectuser": {
      margin: "0 5px",
    },

    "#ctp-wrapper button label": {
      margin: "0!important",
      "font-size": "14px!important"
    },

    "#ctp-wrapper .quitbanner > svg": {
      display: "none"
    },

    "#ctp-wrapper #footer": {
      display: "none!important",
    },

    "#ctp-wrapper .signinlayout": {
      "max-width": "350px",
      "min-height": "200px"
    },

    ".secure-payment-form.apm-active .signinlayout": {
      "min-height": "250px!important"
    },

    "#ctp-wrapper .rsdcode": {
      "font-size": "14px",
      "font-weight": "700",
      margin: "0!important"
    },

    "#ctp-wrapper .footerLabelDiv label": {
      "font-size": "14px",
      "font-weight": "700",
      "margin-top": "0",
      "margin-bottom": "40px"
    },

    "#ctp-wrapper .logindiv": {
      "min-height": "160px",
    },

    "#ctp-wrapper .VerificationLabel label": {
      display: "inline-block",
      margin: "0",
      "font-size": "14px"
    },

    "#ctp-wrapper .VerificationLabel #userMobileMC": {
      margin: "0 5px",
    },

    "#ctp-wrapper .transctcardlabel": {
      margin: "0",
      "font-size": "14px"
    },

    "#ctp-wrapper .TransitionLabel": {
      "font-size": "14px",
      "line-height": "22px",
      "text-align": "center",
      float: "none",
      margin: "0",
    },
  };
};

export default styles;