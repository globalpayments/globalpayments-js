import getCommonInstallmentStyles from './common';

const styles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";

    return {
      ...getCommonInstallmentStyles(assetBaseUrl),
    };
};

export default styles;