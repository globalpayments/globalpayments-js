import { isExpressPayAvailable } from "../../../built-in-validations/helpers";
import { options } from "../../options";

const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  const customColors = {
    azureBaseBlue: "#148EE6",
    coolGrey: "#BCBFC8",
    coolGreyDarken: "#9296A5",
    linkActiveBlue: "#6583EA",
    warmGrey95: "#F2F2F2",
    neutralsWhite: "#FFFFFF",
    backgroundBlue: "#262AFF",
    azure25Blue: "#004A80",
    warmGrey39: "#646264",
  };

  const commonColumnFlexCenterStyles = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  };

  const blik0cExpandedStyles = {
    border: `2px solid ${customColors.coolGreyDarken}`,
    background: `${customColors.warmGrey95}`,
    "border-radius": "2px",
  };

  const blik0cTextStyles = {
    width: "100%",
    display: "block",
    "text-align": "left",
    font: '14px/20px "Open Sans",sans-serif',
    color: `${customColors.warmGrey39}`,
  };

  const blik0cFormStyles = {
    ...commonColumnFlexCenterStyles,
    "align-items": "flex-start",
    gap: "16px",
    width: "100%",
    padding: "16px",
    "box-sizing": "border-box",
  };

  const blik0cStackStyles = {
    width: "100%",
    display: "flex",
    "flex-direction": "column",
    gap: "12px",
  };

  const blik0cInputGroupStyles = {
    width: "100%",
    display: "flex",
    "flex-direction": "column",
    gap: "8px",
  };

  const apmButtonStyles = {
    position: "relative",
    color: "white",
    height: "50px",
    width: "100%",
    // "border-radius": `${isExpressPayAvailable(options?.apms?.nonCardPayments) ? "999px" : "2px"}`,
    "border-radius": "2px",
    border: `2px solid ${customColors.coolGreyDarken}`,
    margin: "8px 0",
    cursor: "pointer",
  };

  const apmButtonHoverStyles = {
    "border-color": `${customColors.coolGreyDarken}`,
    "background-color": `${customColors.warmGrey95} !important`,
  };

  const apmButtonFocusStyles = {
    outline: `2px solid ${customColors.azureBaseBlue}`,
    "outline-offset": "2px",
  };

  return {
    ".secure-payment-form .open-banking-button-wrapper, .secure-payment-form .blik-button-wrapper, .secure-payment-form .blik0c-button-wrapper, .secure-payment-form .express-pay-button-wrapper": {
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
      content: `url(${imageBase}external-link.svg)`,
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px"
    },
    ".secure-payment-form .blik0c-wrapper.expand-blik0c-form": {
      ...blik0cExpandedStyles,
    },
    ".secure-payment-form .blik0c-wrapper.expand-blik0c-form .blik0c-button": {
      ...blik0cExpandedStyles,
      border: "none",
      background: `${customColors.warmGrey95} url(${imageBase}blik.svg) no-repeat 50% 50%`,
      outline: "none",
    },
    ".secure-payment-form .blik0c-wait-screen": {
      ...commonColumnFlexCenterStyles,
      "justify-content": "center",
      "text-align": "center",
    },
    ".secure-payment-form .express-pay-button": {
      ...apmButtonStyles,
      "background-color": `${customColors.backgroundBlue} !important`,
      border: "none",
      color: customColors.neutralsWhite,
      "font-weight": "600",
      "border-radius": "9999px",
    },

    ".secure-payment-form .express-pay-button:hover": {
      "background-color": "#3D40FF !important",
    },
    ".secure-payment-form .express-pay-button:focus": {
      "background-color": `${customColors.backgroundBlue} !important`,
      ...apmButtonFocusStyles,
    },
    ".secure-payment-form .express-pay-button::before": {
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px",
    },
    ".secure-payment-form .express-pay-button::after": {
      content: "Express pay",
    },
    ".secure-payment-form .affirm-button, .secure-payment-form .klarna-button, .secure-payment-form .sezzle-button, .secure-payment-form .zip-button, .secure-payment-form .blik0c-button": {
      ...apmButtonStyles,
      background: `${customColors.neutralsWhite} url(${imageBase}blik.svg) no-repeat 50% 50%`
    },
    ".secure-payment-form .affirm-button:hover, .secure-payment-form .klarna-button:hover, .secure-payment-form .sezzle-button:hover, .secure-payment-form .zip-button:hover, .secure-payment-form .gp-accordion__header:hover, .secure-payment-form .blik0c-button:hover": {
      ...apmButtonHoverStyles
    },
    ".secure-payment-form .affirm-button:focus, .secure-payment-form .klarna-button:focus, .secure-payment-form .sezzle-button:focus, .secure-payment-form .zip-button:focus, .secure-payment-form .blik0c-button:focus": {
      ...apmButtonFocusStyles
    },
    ".secure-payment-form .affirm-button::before, .secure-payment-form .klarna-button::before, .secure-payment-form .sezzle-button::before, .secure-payment-form .zip-button::before, .secure-payment-form .gp-accordion__header:before": {
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px"
    },
    ".secure-payment-form .blik0c-component": {
      width: "100%",
      margin: "8px 0",
      padding: "0",
      "box-sizing": "border-box",
      "border": `2px solid ${customColors.coolGreyDarken}`,
      "border-radius": "2px",
      background: `${customColors.neutralsWhite}`,
      overflow: "hidden",
    },
    ".secure-payment-form .blik0c-custom-form": {
      ...blik0cFormStyles,
    },
    ".secure-payment-form .blik0c-code-action-wrapper": {
      ...blik0cStackStyles,
    },
    ".secure-payment-form .blik0c-content, .secure-payment-form .blik0c-header": {
      ...blik0cTextStyles,
    },
    ".secure-payment-form .blik0c-code-input-wrapper": {
      ...blik0cInputGroupStyles,
    },
    ".secure-payment-form .blik0c-code-input": {
      width: "100%",
      height: "40px",
      border: `1px solid ${customColors.coolGrey}`,
      "border-radius": "2px",
      padding: "0 12px",
      "box-sizing": "border-box",
      "font-size": "16px",
      "line-height": "24px",
    },
    ".secure-payment-form .blik0c-code-input:focus": {
      ...apmButtonFocusStyles,
    },
    ".secure-payment-form .blik0c-code-error": {
      width: "100%",
      color: "#D93025",
      font: '400 1em "Open Sans"',
      "text-align": "left",
      "min-height": "16px",
    },
    ".secure-payment-form .blik0c-code-error-icon": {
      width: "1em",
      height: "1em",
      display: "inline-block",
      "vertical-align": "middle",
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
      padding: "0 16px 16px",
    },
    ".secure-payment-form .credit-card-accordion-container:has(.gp-accordion__content--visible) .gp-accordion__header": {
      background: `${customColors.warmGrey95}`,
      border: 'none',
    },
  };
};

export default styles;