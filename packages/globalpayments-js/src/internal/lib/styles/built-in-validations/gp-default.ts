import {
    fieldStyles as getCommonBuiltInValidationFieldStyles,
  } from './common';

export const fieldStyles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    return {
      ...getCommonBuiltInValidationFieldStyles(assetBaseUrl),

      "img.card-number-icon": {
        background: `transparent url(${imageBase}gp-cc-generic.svg) no-repeat right center`,
        right: "10px",
        top: "13px",
        width: "24px",
        height: "16px",
        "background-size": "20px",
      },
    };
  };

export const styles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";

    const cvvTooltipInvalidStyle = {
        border: "1px solid var(--inputfield-container-color-border-error, #E12619)",
        "border-left": "none",
      };

    return {
      ".secure-payment-form .hf-cvv-tooltip-invalid": cvvTooltipInvalidStyle,
      ".secure-payment-form .hf-cvv-tooltip-invalid:hover": cvvTooltipInvalidStyle,
      ".secure-payment-form .hf-cvv-tooltip-invalid:focus": cvvTooltipInvalidStyle,
    };
  };