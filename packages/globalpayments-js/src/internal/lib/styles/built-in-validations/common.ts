export const fieldStyles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    const customColors = {
      validationRed: '#E12619',
    };

    return {
      "@font-face": {
        "font-family": "GPCommerce",
        src: `url("${fontBase}GPCommerce-Regular.woff2") format("woff2")`,
      },

      "#secure-payment-field[type=text].field-validation-wrapper": {
        "font-family": "GPCommerce",
      },
      "#secure-payment-field[type=tel].hf-invalid": {
        border: `1px solid ${customColors.validationRed} !important`,
      },
      "#secure-payment-field[type=text].hf-invalid": {
        border: `1px solid ${customColors.validationRed} !important`,
      },
    };
  };

  const styles = (assetBaseUrl: string) => {
      const imageBase = assetBaseUrl + "images/";

      return { };
  };

export default styles;