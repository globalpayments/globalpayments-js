const styles = (_assetBaseUrl: string, theme?:string) => {
    return {
        ".order-information": {
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            // "font-family": "var(--dropInUI-orderSummary-itemMerchant-fontFamily, DMSans)"
            "font-family": `${theme === "gp-default2" ? "Inter" : "var(--dropInUI-orderSummary-itemMerchant-fontFamily, DMSans)"}`
        },
        ".title-field": {
            "font-weight": "var(--dropInUI-orderSummary-itemMerchant-font-weight-text, bold)",
            "line-height": "var(--dropInUI-orderSummary-itemMerchant-line-height, 2.25rem)",
            "font-size": "var(--dropInUI-orderSummary-itemMerchant-font-size-text, 1.25rem)"
        },
        ".order-information-field": {
            "line-height": "var(--dropInUI-orderSummary-itemMerchant-line-height, 2.25rem)",
            "font-size": "var(--dropInUI-orderSummary-itemOrderID-font-size-text, 0.875rem)",
            "font-weight": "var(--dropInUI-orderSummary-itemOrderID-font-weight-text, 400)"
        },
    };
};

export default styles;