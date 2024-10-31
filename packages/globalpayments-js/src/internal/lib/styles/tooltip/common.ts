const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";
  const customColors = {
    coolGrey25: '#394046',
  };

  return {
    ".secure-payment-form .tooltip": {
      position: "relative",
      width: "10%",
      height: "40px",
      border: "1px solid var(--inputfield-tooltip-color-border-default, #5a5e6d)",
      "border-left": "none",
      color: "#474B57",
      float: "right",
      "background-size": "20px",
      background: `transparent url(${imageBase}gp-fa-question-circle.svg) no-repeat center center`,
      "font-family": "var(--tooltip-overlay-font-body, GPCommerce)",
      "font-size": "var(--tooltip-overlay-size-text-body)",
      "line-height": "var(--tooltip-overlay-line-height-text-body)",
    },

    ".secure-payment-form .tooltip h4": {
      "font-family": "var(--tooltip-overlay-font-heading, GPCommerce)",
      "font-size": "var(--tooltip-overlay-size-text-heading)",
      "line-height": "var(--tooltip-overlay-line-height-text-heading)",
      color: "var(--tooltip-overlay-color-text-heading)",
    },

    ".secure-payment-form .tooltip:focus": {
      border: "1px solid var(--inputfield-tooltip-color-border-focus, #2B9AEC)",
      outline: "none",
      "border-left": "none"
    },

    ".secure-payment-form .tooltip:hover": {
      border: "1px solid var(--inputfield-tooltip-color-border-hover, #2B9AEC)",
      outline: "none",
      "border-left": "none"
    },

    ".secure-payment-form .tooltip-content": {
      visibility: "hidden",
      width: "267px",
      "background-color": `var(--tooltip-overlay-color-background, ${customColors.coolGrey25})`,
      color: "var(--tooltip-overlay-color-text-body, #fff)",
      "text-align": "left",
      "border-radius": "3px",
      border: `solid 1px ${customColors.coolGrey25}`,
      padding: "13px 13px",
      position: "absolute",
      "z-index": "99999999",
      right: "27px",
      opacity: "0",
      transition: "opacity 0.3s",
      "font-size": "0.79em",
      "font-weight": "400",
      "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",

      "margin-top": "40px",
      "margin-right": "-28px",
    },
    ".secure-payment-form .tooltip-content h4": {
      "margin": "0 0 10px 0"
    },

    ".secure-payment-form .tooltip:hover > .tooltip-content": {
      visibility: "visible",
      opacity: "1",
    },

    ".secure-payment-form .tooltip:focus > .tooltip-content": {
      visibility: "visible",
      opacity: "1",
    },

    ".secure-payment-form .tooltip-content::before": {
      position: "absolute",
      content: "''",
      right: "10%",
      top: "-8px",

      "border-left": "8px solid transparent",
      "border-right": "8px solid transparent",
      "border-bottom": `8px solid ${customColors.coolGrey25}`,
    },
  };
};

export default styles;