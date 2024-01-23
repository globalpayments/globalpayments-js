const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  return {
    "apple-pay-button": {
      "--apple-pay-button-width": "100%",
      "--apple-pay-button-height": "50px",
      "--apple-pay-button-border-radius": "3px",
      "--apple-pay-button-padding": "0px 0px",
      "--apple-pay-button-box-sizing": "border-box",
      display: "block",
      margin: "5px 0",
    }
  };
};

export default styles;