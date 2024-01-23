const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  const customColors = {
    azureBaseBlue: '#148EE6',
    coolGrey: '#BCBFC8',
    coolGreyDarken: '#9296A5',
    linkActiveBlue: '#6583EA',
  };

  const commonColumnFlexCenterStyles = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  };

  return {
    ".secure-payment-form .open-banking-button-wrapper": {
      ...commonColumnFlexCenterStyles,
    },
    ".secure-payment-form .open-banking-button::before": {
      content: `url(${imageBase}external-link.svg)`,
      width: "10px",
      height: "10px",
      position: "absolute",
      top: "5px",
      right: "5px"
    },
    ".secure-payment-form .open-banking-button": {
      position: "relative",
      background: `transparent url(${imageBase}open-banking.svg) no-repeat 50% 50%`,
      color: "white",
      height: "70px",
      width: "100%",
      "border-radius": "2px",
      border: `1px solid ${customColors.coolGrey}`,
      margin: "5px 0",
      cursor: "pointer",
      "-webkit-box-shadow": `0px 1px 1px 0px ${customColors.coolGrey}`,
      "-moz-box-shadow": `0px 1px 1px 0px ${customColors.coolGrey}`,
      "box-shadow": `0px 1px 1px 0px ${customColors.coolGrey}`,
    },
    ".secure-payment-form .open-banking-button:hover": {
      "border-color": `${customColors.coolGreyDarken}`,
      "-webkit-box-shadow": `0px 1px 1px 0px ${customColors.coolGreyDarken}`,
      "-moz-box-shadow": `0px 1px 1px 0px ${customColors.coolGreyDarken}`,
      "box-shadow": `0px 1px 1px 0px ${customColors.coolGreyDarken}`,
    },
    ".secure-payment-form .open-banking-button:focus": {
      outline: `2px solid ${customColors.azureBaseBlue}`,
      "outline-offset": "2px"
    },
  };
};

export default styles;