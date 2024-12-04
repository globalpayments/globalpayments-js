import getCurrencyConversionStyles from './common';

export const fieldStyles = () => {
  return {
    "#secure-payment-field[hidden]" : {
      display: "none!important",
      opacity: "0!important",
      visibility: "false!important"
    }
  }
};

export const styles = () => {
  const customColors = {
    coolGreyBase: '#D7DCE1',
    coolGrey39: '#5A5E6D',
    coolGrey25: '#394046',
    darkGrey: '#555',
    white: '#fff'
  };

  return {
    ...getCurrencyConversionStyles(),
    ".secure-payment-form .credit-card-currency-conversion .currency-conversion-container": {
      width: "300px",
      "flex-wrap": "wrap"
    },
    ".secure-payment-form .credit-card-currency-conversion legend": {
      "font-family": "sans-serif",
      color: customColors.darkGrey,
      "font-size": "13px",
      "font-weight": "bold",
      "line-height": "1.5",
      "text-transform": "uppercase"
    },
    ".secure-payment-form .credit-card-currency-conversion fieldset" : {
      "font-family": "GPCommerce",
      border: "0",
      margin: "0",
      padding: "0",
      display: "flex",
      "flex-wrap": "nowrap",
      width: "300px"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button": {
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      border: `1px solid ${customColors.coolGreyBase}`,
      padding: "10px",
      "white-space": "nowrap",
      height: "30px",
      "margin-right": "0.5em",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
      "margin-right": "0.5em",
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button label": {
      "font-family": "sans-serif",
      "font-size": "0.79em",
      "font-weight": 500,
      display: "inline-block",
      margin: "0"
    },
    ".secure-payment-form .credit-card-currency-conversion .radio-button.checked label": {
      color: customColors.white
    },
    ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content" : {
      opacity: '0',
      visibility: false,
      display: "none",
      "flex-direction": "row",
      "margin": "10px 0.5em 0 0",
      "align-items": "center",
      height: "100%"
    },
    ".secure-payment-form .credit-card-currency-conversion .card-currency-content" : {
      opacity: '0',
      visibility: false,
      display: "none",
      "flex-direction": "row",
      "margin": "10px 0.5em 0 0",
      "align-items": "center",
      height: "100%"
    },
    ".secure-payment-form .credit-card-currency-conversion .additional-info p": {
      "font-family": "sans-serif",
      margin: "0",
      "font-style": "italic",
    },
    ".secure-payment-form .credit-card-currency-conversion .tooltip-content p": {
      "font-family": "sans-serif",
      "margin": "0 0 10px 0",
    },

    "@media(max-width: 340px)": {
      ".secure-payment-form .credit-card-currency-conversion .radio-button": {
        "margin-right": "0.5em",
      },
    },

    "@media(max-width: 768px)": {
      ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
        "width": "auto",
        "margin-top": "10px",
        "margin-left": "0"
      },
      ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
        "width": "auto",
        "margin-top": "10px",
        "margin-left": "0"
      },
    },
  };
};