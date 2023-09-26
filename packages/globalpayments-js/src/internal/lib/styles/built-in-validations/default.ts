import {
    fieldStyles as getCommonBuiltInValidationFieldStyles,
  } from './common';

export const fieldStyles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    return {
        ...getCommonBuiltInValidationFieldStyles(assetBaseUrl),

        "img.card-number-icon": {
          background: `transparent url(${imageBase}logo-unknown@2x.png) no-repeat`,
          "background-size": "100%",
          width: "65px",
          height: "40px",
          right: "12px",
          top: "6px",
          "background-position": "50% 50%"
        },
    };
  };

export const styles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";

    return { };
  };