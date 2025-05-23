const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  const customColors = {
    azureBaseBlue: '#148EE6',
    coolGrey: '#BCBFC8',
    coolGreyDarken: '#9296A5',
    linkActiveBlue: '#6583EA',
    warmGrey95: '#F2F2F2',
    neutralsWhite: '#FFFFFF'
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
    "border-radius": "2px",
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
  };
};

export default styles;