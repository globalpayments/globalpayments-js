const styles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";
  const customColors = {
    azure76LightBlue: '#148EE6',
  };

  return {
    "#googlePay": {
      height: "50px",
      margin: "5px 0",
    },
    "#googlePay button:focus": {
      outline: `2px solid ${customColors.azure76LightBlue}`,
      "outline-offset": "2px"
    }
  };
};

export default styles;