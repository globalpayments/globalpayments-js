import { isExpressPayAvailable } from "../../../built-in-validations/helpers";
import {options} from "../../options";

const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  const customColors = {
    azureBaseBlue: '#148EE6',
    coolGrey: '#BCBFC8',
    coolGreyDarken: '#9296A5',
    linkActiveBlue: '#6583EA',
    warmGrey95: '#F2F2F2',
    neutralsWhite: '#FFFFFF',
    backgroundBlue: '#262AFF',
    azure25Blue: '#004A80',
    warmGrey39: '#646264',
  };

  const commonColumnFlexCenterStyles = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  };

  const apmButtonStyles = {
    position: "relative",
    color: "white",
    height: "50px",
    width: "100%",
    // "border-radius": `${isExpressPayAvailable(options?.apms?.nonCardPayments) ? "999px" : "2px"}`,
    "border-radius":"2px",
    border: `2px solid ${customColors.coolGreyDarken}`,
    margin: "8px 0",
    cursor: "pointer"
  }

  const apmButtonHoverStyles = {
    "border-color": `${customColors.coolGreyDarken}`,
    "background-color": `${customColors.warmGrey95} !important`
  }

  const apmButtonFocusStyles = {
    "outline": `2px solid ${customColors.azureBaseBlue}`,
    "outline-offset": "2px"
  }

  return {
    ".secure-payment-form .open-banking-button-wrapper": {
      ...commonColumnFlexCenterStyles,
    },
    ".secure-payment-form .blik-button-wrapper": {
      ...commonColumnFlexCenterStyles,
    },
    ".secure-payment-form .express-pay-button-wrapper": {
      ...commonColumnFlexCenterStyles,
    },
    ".secure-payment-form .open-banking-button::before": {
      // content: `url(${imageBase}external-link.svg)`,
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px"
    },
    ".secure-payment-form .open-banking-button": {
      ...apmButtonStyles,
      background: `${customColors.neutralsWhite} url(${imageBase}open-banking.svg) no-repeat 50% 50%`,
    },
    ".secure-payment-form .open-banking-button:hover": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .open-banking-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .blik-button": {
      ...apmButtonStyles,
      background: `${customColors.neutralsWhite} url(${imageBase}blik.svg) no-repeat 50% 50%`
    },
    ".secure-payment-form .blik-button:hover": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .blik-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .blik-button::before": {
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px"
    },
    ".secure-payment-form .express-pay-button": {
      ...apmButtonStyles,
      "background-color" : `${customColors.backgroundBlue} !important`,
      "border":"none",
      "border-radius":"9999px"
    },
    ".secure-payment-form .express-pay-button:hover": {
      "background-color": "#3D40FF !important",
    },
    ".secure-payment-form .express-pay-button:focus": {
      "background-color": "#262AFF !important",
    },
    ".secure-payment-form .express-pay-button::before": {
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px",
    },
    ".secure-payment-form .express-pay-button::after":{
      content : "Express pay"
    },
    ".secure-payment-form .affirm-button, .secure-payment-form .klarna-button, .secure-payment-form .sezzle-button, .secure-payment-form .zip-button": {
      ...apmButtonStyles,
      background: `${customColors.neutralsWhite} url(${imageBase}blik.svg) no-repeat 50% 50%`
    },
    ".secure-payment-form .affirm-button:hover, .secure-payment-form .klarna-button:hover, .secure-payment-form .sezzle-button:hover, .secure-payment-form .zip-button:hover, .secure-payment-form .gp-accordion__header:hover ": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .affirm-button:focus, .secure-payment-form .klarna-button:focus, .secure-payment-form .sezzle-button:focus, .secure-payment-form .zip-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .affirm-button::before, .secure-payment-form .klarna-button::before, .secure-payment-form .sezzle-button::before, .secure-payment-form .zip-button::before, .secure-payment-form .gp-accordion__header:before": {
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px"
    },
    ".secure-payment-form .cashpresso30days-button": {
      ...apmButtonStyles,
      background: `transparent url(${imageBase}Cashpresso30Days.svg) no-repeat 50% 50%`,
      "background-size":"100px"
    },
    ".secure-payment-form .cashpressoflexible-button": {
      ...apmButtonStyles,
      background: `transparent url(${imageBase}CashpressoInstallments.svg) no-repeat 50% 50%`,
      "background-size":"100px"
    },
    ".secure-payment-form .cashpresso3inst-button": {
      ...apmButtonStyles,
      background: `transparent url(${imageBase}Cashpresso3Installments.svg) no-repeat 50% 50%`,
      "background-size":"100px"
    },
    ".secure-payment-form .cashpresso30days-button:hover": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .cashpressoflexible-button:hover": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .cashpresso3inst-button:hover": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .cashpresso30days-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .cashpressoflexible-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .cashpresso3inst-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .gp-accordion__header": {
      ...apmButtonStyles,
      color: `${customColors.azure25Blue}`,
      background: `${customColors.neutralsWhite}`,
      "font-weight": "bold",
      "font-size": "16px",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
    ".secure-payment-form .gp-accordion__title": {
      "line-height": "1.2",
      padding: "0 8px",
    },
    ".secure-payment-form .gp-accordion__icon-before, .secure-payment-form .gp-accordion__icon-after": {
      width: "24px",
      height: "24px",
      "object-fit": "contain",
      display: "block",
    },
    ".secure-payment-form .credit-card-accordion-container:has(.gp-accordion__content--visible)": {
      background: `${customColors.warmGrey95}`,
      border: `2px solid ${customColors.coolGreyDarken}`,
      padding: "0px 16px 16px 16px",
    },
    ".secure-payment-form .credit-card-accordion-container:has(.gp-accordion__content--visible) .gp-accordion__header": {
      background: `${customColors.warmGrey95}`,
      border: 'none',
    },
  };
};

export default styles;