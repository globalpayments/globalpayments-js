export const fieldStyles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    const customColors = {
      validationRed: '#E12619',
    };

    return {
      "#secure-payment-field[type=text].field-validation-wrapper": {
        "font-family": "var(--inputfield-container-font-error, DMSans)",
      },
      "#secure-payment-field[type=tel].hf-invalid": {
        border: `1px solid var(--inputfield-container-color-border-error, ${customColors.validationRed}) !important`,
      },
      "#secure-payment-field[type=text].hf-invalid": {
        border: `1px solid var(--inputfield-container-color-border-error, ${customColors.validationRed}) !important`,
      },
    };
  };

  const styles = (assetBaseUrl: string) => {
      const imageBase = assetBaseUrl + "images/";

      return { };
  };

export default styles;