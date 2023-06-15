export const fieldStyles = (assetBaseUrl: string) => {
  const imageBase = assetBaseUrl + "images/";

  const customColors = {
    validationRed: '#E12619',
  };

  return {
    "#secure-payment-field[type=text].field-validation-wrapper": {
      "font-family": "GPCommerce",
    },
    "#secure-payment-field[type=tel].invalid": {
      border: `1px solid ${customColors.validationRed} !important`,
    },
    "#secure-payment-field[type=text].invalid": {
      border: `1px solid ${customColors.validationRed} !important`,
    },
    "img.card-number-icon.invalid": {
      "margin-top": "-20px",
    },
  };
};

const styles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";

    return { };
};

export default styles;