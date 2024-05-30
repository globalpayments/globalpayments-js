import getCurrencyConversionStyles from './common';

export const fieldStyles = () => {
    return {
      "#secure-payment-field[hidden]" : {
        display: "none!important",
        opacity: "0!important",
        visibility: "false!important"
      }
    };
};

export const styles = () => {
    return {
      ...getCurrencyConversionStyles()
    };
};