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
      "font-family": "GPCommerce",
      border: 0,
      top: "16px",
      margin: "0 0 32px",
      padding: 0,
      display: "block",
      "font-size": "0.79em",
      "font-weight": 500,
      position: "relative",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button": {
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      border: `1px solid ${customColors.coolGreyBase}`,
      padding: "10px",
      "white-space": "nowrap",
      height: "40px",
      "margin-right": "15px"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
      "margin-right": "0px",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button:hover": {
      "border-color": customColors.coolGrey61
    },
    ".secure-payment-form .credit-card-currency-conversion fieldset:focus-within > .radio-button": {
      outline: `2px solid ${customColors.azure76LightBlue}`,
      "outline-offset": "2px"
    },
    ".secure-payment-form .credit-card-currency-conversion fieldset.no-focus-outline .radio-button.checked": {
      outline: "none",
      "outline-offset": "0"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button.checked": {
      background: customColors.azure39Blue,
      "border-color": customColors.azure39Blue,
      color: customColors.white,
      outline: "none"
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
      "background-color": customColors.azure39Blue,
      "border": `5px solid ${customColors.white}`
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:focus": {
      outline: "none"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button label": {
      "font-family": "GPCommerce",
      "font-size": "0.79em",
      "font-weight": 500,
      display: "inline-block",
      margin: "0"
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
      "font-family": "GPCommerce",
      "font-size": "0.79em",
      "font-weight": 500,
      margin: "0 15px 0 0",
      display: "flex",
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
      "border-left": `1px solid ${customColors.azure61LightBlue}`,
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip:focus": {
      "border-left": `1px solid ${customColors.azure61LightBlue}`,
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
      }
    },
  };
};

export default styles;