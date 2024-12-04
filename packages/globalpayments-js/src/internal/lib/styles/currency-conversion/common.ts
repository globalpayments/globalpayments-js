const styles = () => {
  const customColors = {
    azure39Blue: '#0074C7',
    azure61LightBlue: '#2B9AEC',
    azure76LightBlue: '#85CCFF',
    coolGreyBase: '#D7DCE1',
    coolGrey25: '#394046',
    coolGrey39: '#5A5E6D',
    coolGrey61: '#9296A5',
    white: '#fff'
  };

  return {
    ".secure-payment-form .currency-conversion-container" : {
      display: "flex",
      "flex-direction": "row",
      "align-items": "end"
    },
    ".secure-payment-form .credit-card-currency-conversion iframe": {
      "min-height": "1px!important",
    },
    ".secure-payment-form .credit-card-currency-conversion fieldset" : {
      "font-family": "GPCommerce",
      border: "0",
      margin: "0",
      padding: "0",
      display: "flex",
      "flex-wrap": "nowrap",
    },
    ".secure-payment-form .credit-card-currency-conversion legend": {
      "font-family": "var(--dcc-options-label-font, GPCommerce)",
      border: 0,
      top: "16px",
      margin: "0 0 32px",
      padding: 0,
      display: "block",
      "font-size": "var(--dcc-options-label-size-text, 0.79em)",
      "font-weight": "var(--dcc-options-label-weight-text, 500)",
      position: "relative",
      color: "var(--dcc-options-label-color-text)",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button": {
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      border: `1px solid var(--dcc-radio-button-color-border-default, ${customColors.coolGreyBase})`,
      padding: "10px",
      "white-space": "nowrap",
      height: "40px",
      "margin-right": "15px"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
      "margin-right": "0px",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button:hover": {
      "border-color": `var(--dcc-radio-button-color-border-hover, ${customColors.coolGrey61})`,
      color: "var(--dcc-radio-button-color-text-hover)",
    },
    ".secure-payment-form .credit-card-currency-conversion fieldset:focus-within > .radio-button": {
      outline: `var(--dcc-radio-button-color-focus-indicator-focus, ${customColors.azure76LightBlue}) 2px solid`, // Same as: --dcc-radio-button-color-border-focus
      "outline-offset": "2px"
    },
    ".secure-payment-form .credit-card-currency-conversion fieldset.no-focus-outline .radio-button.checked": {
      outline: "none",
      "outline-offset": "0"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button.checked": {
      background: `var(--dcc-radio-button-color-background-selected, ${customColors.azure39Blue})`,
      "border-color": `var(--dcc-radio-button-color-border-selected, ${customColors.azure39Blue})`,
      color: customColors.white,
      outline: "none"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button.checked label": {
      color: `var(--dcc-radio-button-color-text-selected)`,
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']": {
      "margin": "0 5px 0 0",
      "appearance": "none",
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      "border": `1px solid ${customColors.coolGreyBase}`,
      "border-radius": "50%",
      "width": "18px",
      "height": "18px",
      display: "block",
      position: "relative",
      padding: "0!important"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:checked": {
      "background-color": `var(--dcc-radio-button-color-icon-selected, ${customColors.azure39Blue})`,
      "border": `5px solid ${customColors.white}`,
      color: `var(--dcc-radio-button-color-text-selected)`,
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:focus": {
      outline: "none",
      color: "var(--dcc-radio-button-color-text-focus)",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button label": {
      "font-family": "var(--dcc-radio-button-font, GPCommerce)",

      "font-size": "var(--dcc-radio-button-size-text, 0.79em)",
      "font-weight": "var(--dcc-radio-button-weight-text-label, 500)",
      display: "inline-block",
      margin: "0",
      color: "var(--dcc-radio-button-color-text-default)",
    },
    ".secure-payment-form .credit-card-currency-conversion .card-currency-content" : {
      opacity: '0',
      visibility: false,
      display: "none",
      "flex-direction": "row",
      "margin-left": "20px",
      "align-items": "center",
      height: "100%"
    },
    ".secure-payment-form .credit-card-currency-conversion .card-currency-content.visible" : {
      display: "flex",
      opacity: '1',
      visibility: true
    },
    ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content" : {
      opacity: '0',
      visibility: false,
      display: "none",
      "flex-direction": "row",
      "margin-left": "20px",
      "align-items": "center",
      height: "100%"
    },
    ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content.visible" : {
      display: "flex",
      opacity: '1',
      visibility: true
    },
    ".secure-payment-form .credit-card-currency-conversion .additional-info": {
      "font-family": "var(--dcc-options-font-exchange-rate, GPCommerce)",
      "font-size": "var(--dcc-options-size-text-exchange-rate, 0.79em)",
      "font-weight": 500,
      margin: "0 15px 0 0",
      display: "flex",
      "line-height": "var(--dcc-options-line-height-text-exchange-rate)",
      color: "var(--dcc-options-color-text-exchange-rate)",
    },
    ".secure-payment-form .credit-card-currency-conversion .additional-info p": {
      margin: "0",
      "font-style": "italic",
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip": {
      width: "40px",
      height: "40px",
      "min-width": "40px",
      "border-left": `1px solid ${customColors.coolGrey39}`,
      display: "block!important"
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip:hover": {
      "border-left": `1px solid var(--general-tooltip-color-border-hover, ${customColors.azure61LightBlue})`,
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip:focus": {
      "border-left": `1px solid var(--general-tooltip-color-focus-indicator-focus, ${customColors.azure61LightBlue})`,
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip-content": {
      bottom: "105%!important",
      right: "20px!important",
      display: "block!important"
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip:hover .tooltip-content": {
      display: "block!important"
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip-content p": {
      "margin": "0 0 10px 0",
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip-content p:last-child": {
      "margin-bottom": "0"
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before": {
      left: "auto",
      top: "100%",
      right: "5%",
      transform: "translateX(-50%)",
      "border-width": "8px",
      "border-style": "solid",
      "border-color": `${customColors.coolGrey25} transparent transparent transparent`,
    },
    "@media only screen and (max-width: 768px)": {
      ".secure-payment-form .currency-conversion-container" : {
        "flex-direction": "column",
        "align-items": "normal"
      },
      ".secure-payment-form .credit-card-currency-conversion fieldset" : {
        "justify-content": "space-between",
      },
      ".secure-payment-form .credit-card-currency-conversion .radio-button": {
        "width": "45%",
        "justify-content": "center",
      },
      ".secure-payment-form .credit-card-currency-conversion .radio-button:first-child": {
        margin: "0 10px 0 0"
      },
      ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
        "width": "100%",
        "margin-top": "10px",
        "margin-left": "0"
      },
      ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
        "width": "100%",
        "margin-top": "10px",
        "margin-left": "0"
      },
      ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before": {
        right: "4%",
      },
    },

    "@media(max-width: 340px)": {
      ".secure-payment-form .credit-card-currency-conversion fieldset": {
        "flex-flow": "column",
      },
      ".secure-payment-form .credit-card-currency-conversion .radio-button": {
        "width": "auto",
        "margin-bottom": "15px",
        "margin-right": "0px",
      },
      ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
        "margin-bottom": "0px",
      },
    },
  };
};

export default styles;