const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  const customColors = {
    outlineBlue: '#355EC5',
    defaultYellow: '#FFC439',
    hoverYellow: '#E4BC52',
  };

  const commonColumnFlexCenterStyles = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  };

  return {
    ".secure-payment-form .paypal-button-wrapper": {
      ...commonColumnFlexCenterStyles,
    },
    ".secure-payment-form .paypal-button": {
      position: "relative",
      background: `${customColors.defaultYellow} url(${imageBase}paypal.svg) no-repeat 50% 50%`,
      height: "46px",
      border: "0px",
      width: "100%",
      "border-radius": "2px",
      margin: "8px 0",
      cursor: "pointer"
    },
    ".secure-payment-form .paypal-button:hover": {
      "background-color": `${customColors.hoverYellow}`,
    },
    ".secure-payment-form .paypal-button:focus": {
      "background-color": `${customColors.defaultYellow}`,
      outline: `2px solid ${customColors.outlineBlue}`,
      "outline-offset": "2px"
    },
  };
};

export default styles;