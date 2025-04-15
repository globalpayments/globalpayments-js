import getCommonModalStyles from '../../installments/components/modal/styles';

const styles = (assetBaseUrl: string) => {
    const imageBase = assetBaseUrl + "images/";

    const customColors = {
        azureBaseBlue: '#148EE6',
        azure25Blue: '#004A80',
        azure31Blue: '#005C9E',
        azure39Blue: '#0074C7',
        azure61LightBlue: '#2B9AEC',
        azure76LightBlue: '#85CCFF',
        azure95LightBlue: '#E5F4FF',

        warmGreyBase: '#7E7C7E',
        warmGrey95: '#F2F2F2',

        panelBackgroundGray: '#F5F5F5',
        coolGreyBase: '#707689',
        coolGrey16: '#25262D',
        coolGrey20: '#2E3038',
        coolGrey25: '#394046',
        coolGrey39: '#5A5E6D',
        coolGrey61: '#9296A5',
        coolGrey95: '#F1F2F4',

        linkHoverBlue: '#0027AE',
        linkActiveBlue: '#6583EA',
    };

    return {
        ".secure-payment-form .credit-card-installments" : {
            "font-family": "DMSans",
        },

        ".secure-payment-form .installment-issuer-panel": {
            background: customColors.panelBackgroundGray,
            display: "flex",
            "flex-direction": "column",
            "max-width": "50%",
            "padding": "12px",
            margin: "24px",
            gap: "8px",
            width: "432px",
        },
        ".secure-payment-form .installment-issuer-panel-header": {
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
        },
        ".secure-payment-form .installment-issuer-panel-title": {
            color: customColors.coolGrey20,
            "font-style": "normal",
            "font-weight": "700",
            "line-height": "34px",
            "font-size": "medium",
        },
        ".secure-payment-form .installment-issuer-panel-content": {
            color: customColors.coolGrey39,
            "font-style": "normal",
            "font-weight": "400",
            "line-height": "12.64px",
            "font-size": "regular",
        },

        ".secure-payment-form .installment-panel": {
            "max-width": "50%",
            "margin-bottom": "10px",
        },
        ".secure-payment-form .installment-plans-title": {
            color: customColors.coolGrey20,
            "font-style": "normal",
            "font-weight": "700",
            "line-height": "34px",
            "font-size": "x-large",
            margin: "20px 0",
        },
        ".secure-payment-form .installment-plans-subtitle": {
            color: customColors.coolGrey20,
            "font-style": "normal",
            "font-weight": "400",
            "line-height": "24px",
            "font-size": "1em",
        },
        ".secure-payment-form .installment-plan-details": {
            "border-top": `1px solid ${customColors.coolGrey95}`,
            "border-bottom": `1px solid ${customColors.coolGrey95}`,
            padding: "5px 0",
        },
        ".secure-payment-form .installment-plan-monthly-amount": {
            color: customColors.coolGrey16,
            "font-style": "normal",
            "font-weight": "700",
            "line-height": "55px",
            "font-size": "2.28em",
        },
        ".secure-payment-form .installment-options, .installment-panel": {
            display: "flex",
            "flex-direction": "column",
            padding: "10px",
            width: "100%",
        },
        ".secure-payment-form .installment-options": {
            background: customColors.azure95LightBlue,
            margin: "5px 0",
            padding: "20px 25px",
            "border-radius": "2px",
        },
        ".secure-payment-form .installment-plan-options-title": {
            color: customColors.coolGrey20,
            "font-style": "normal",
            "font-weight": "700",
            "line-height": "21px",
            "font-size": "medium",
        },
        ".secure-payment-form .installment-options-content": {
            color: customColors.coolGrey39,
            "font-style": "normal",
            "font-weight": "400",
            "line-height": "21px",
            "font-size": "regular",
            "margin": "15px 0 5px 0",
        },
        ".secure-payment-form .installment-term-selector-title": {
            "text-align": "center",
            "padding": "10px 0 0 0",
        },
        ".secure-payment-form .installment-panel-header": {
            "text-align": "center",
            display: "flex",
            "flex-direction": "column",
        },
        ".secure-payment-form .installment-panel-content": {
            "margin": "5px 0",
        },
        ".secure-payment-form .installment-panel-footer": {
            "text-align": "center",
            display: "flex",
            "flex-direction": "column",
        },
        ".secure-payment-form .installment-field-value-item": {
            color: customColors.coolGrey25,
            "font-style": "normal",
            "font-weight": "400",
            "line-height": "21px",
            "font-size": "small",
            margin: "12px 0",
        },
        ".secure-payment-form .installment-field-value-item, .installment-options-header": {
            display: "flex",
            "flex-direction": "row",
            "justify-content": "space-between",
        },
        ".secure-payment-form .installment-link": {
            background: "none",
            border: "none",
            color: customColors.azure39Blue,
            "font-style": "normal",
            "font-weight": "400",
            "text-decoration": "underline",
            "line-height": "21px",
            "font-size": "medium",
            padding: "0px",
            cursor: "pointer",
        },
        ".secure-payment-form .installment-link:hover": {
            color: customColors.linkHoverBlue,
        },
        ".secure-payment-form .installment-link:active": {
            color: customColors.linkActiveBlue,
        },
        ".secure-payment-form .installment-link:focus": {
            color: customColors.linkActiveBlue,
            border: `1px solid ${customColors.azure76LightBlue}`,
        },
        ".secure-payment-form .installment-step-container": {
            display: "flex",
            "justify-content": "center",
        },
        ".secure-payment-form .installment-base-action-button-wrapper": {
            display: "flex",
            "justify-content": "center",
            "flex-wrap": "wrap",
        },
        ".secure-payment-form .installment-base-action-button, .installment-button-explore-plans, .installment-button-learn-more, .installment-button-month-term, .installment-button-pay": {
            "border-radius": "4px",
            width: "386px",
            height: "44px",
            padding: "10px",
            color: "#ffffff",
            "font-weight": "500",
            "font-size": "1em",
            "line-height": "24px",
            "font-style": "normal",
            border: "0px",
            cursor: "pointer",

            "margin-top": "20px",
            "margin-bottom": "20px",

            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            gap: "10px",
        },
        ".secure-payment-form .installment-button-explore-plans": {
            background: customColors.azure25Blue,
            "margin-bottom": "12px",
        },
        ".secure-payment-form .installment-button-explore-plans:hover": {
            background: customColors.azure31Blue,
        },
        ".secure-payment-form .installment-button-explore-plans:active": {
            background: customColors.azure61LightBlue,
        },
        ".secure-payment-form .installment-button-explore-plans:focus": {
            background: customColors.azure25Blue,
            border: `2px solid ${customColors.azure76LightBlue}`,
        },
        ".secure-payment-form .installment-button-learn-more": {
            background: 'none',
            color: customColors.coolGrey25,
            "font-weight": "400",
            "font-size": "regular",
            "line-height": "21px",

            "margin": "0 0",
        },
        ".secure-payment-form .installment-button-learn-more::after": {
            content: `url("${imageBase}info.svg")`,
            "padding-top": "7px",
            filter:" grayscale(1)",
        },
        ".secure-payment-form .installment-button-learn-more:hover": {
            color: customColors.azure39Blue,
        },
        ".secure-payment-form .installment-button-learn-more:active": {
            color: customColors.coolGrey61,
        },
        ".secure-payment-form .installment-button-learn-more:focus": {
            color: customColors.coolGrey61,
            border: `1px solid ${customColors.azure76LightBlue}`,
        },
        ".secure-payment-form .installment-button-month-term": {
            background: customColors.azure39Blue,
            width: "40px",
            height: "40px",
            "font-weight": "700",

            margin: "15px 10px",
        },
        ".secure-payment-form .installment-unselected": {
            background: customColors.warmGrey95,
            color: customColors.warmGreyBase,
        },
        ".secure-payment-form .installment-unselected:hover": {
            border: `2px solid ${customColors.azure76LightBlue}`,
        },
        ".secure-payment-form .installment-button-pay": {
            background: customColors.azure25Blue,
            height: "47px",
            padding: "10px 28px",
        },
        ".secure-payment-form .installment-button-pay:hover": {
            background: customColors.azure31Blue,
        },
        ".secure-payment-form .installment-button-pay:active": {
            background: customColors.azure61LightBlue,
        },
        ".secure-payment-form .installment-button-pay:focus": {
            background: customColors.azure25Blue,
            border: `2px solid ${customColors.azure76LightBlue}`,
        },
        ".secure-payment-form .installment-button-pay::before": {
            content: `url("${imageBase}gp-lock-alt.svg")`,
            "margin-right": "5px",
        },
        ".secure-payment-form .provided-by": {
            "font-style": "normal",
            "font-weight": "400",
            "font-size": "12.64px",
            "line-height": "19px",
            color: customColors.coolGreyBase,
            margin: "5px 0",
        },

        // Dialog content styles
        ".secure-payment-form .installment-learn-more-content": {
            width: "408px",
        },
        ".secure-payment-form .installment-learn-more-header": {
            display: "flex",
            padding: "28px",
            "justify-content": "space-between",
            "align-items": "flex-start",
            background: customColors.azure61LightBlue,
        },
        ".secure-payment-form .installment-learn-more-header-title": {
            "font-style": "normal",
            "font-size": "1.125em",
            "line-height": "27px",
            color: "#FFFFFF",
        },
        ".secure-payment-form .installment-learn-more-body": {
            display: "flex",
            margin: "0px 24px 28px 24px",
            "flex-direction": "column",
            "align-items": "center",
        },
        ".secure-payment-form .installment-learn-more-body ul": {
            color: customColors.coolGrey25,
            "font-style": "regular",
            "font-weight": "400",
            "line-height": "24px",
            padding: " 0px 20px",
            "margin-top": "28px",
        },
        ".secure-payment-form .installment-learn-more-link": {
            color: customColors.coolGrey25,
            "font-style": "normal",
            "font-weight": "400",
            "line-height": "21px",
            "text-decoration-line": "underline",
            margin: "12px 0",
        },
        ".secure-payment-form .installment-button-close": {
            background: "none",
            border: "none",
            padding: "0px",
            cursor: "pointer",
        },
        ".secure-payment-form .installment-button-close::after": {
            content: `url("${imageBase}cross-grey.svg")`,
        },
        ".secure-payment-form .term-and-condition-title": {
            display: "flex",
            "align-items": "center",
            "font-style": "normal",
            "font-weight": "700",
        },
        ".secure-payment-form .term-and-condition-title::before": {
            content: `url("${imageBase}info-circle.svg")`,
            "margin-right": "5px",
        },
        ".secure-payment-form .term-and-condition-link": {
            color: customColors.azure61LightBlue,
            "font-style": "normal",
            "font-weight": "400",
            "line-height": "19px",
            "text-decoration-line": "underline",
        },

        // Add modal component styles
        ...getCommonModalStyles(assetBaseUrl),
    };
};

export default styles;