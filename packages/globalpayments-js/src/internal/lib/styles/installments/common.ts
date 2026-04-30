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

    const commonButtonStyle = {
        padding: "1px 39px",
        display: "flex",
        gap: "8px",
    }

    return {
        ".secure-payment-form .credit-card-installments": {
            "font-family": "DMSans",
        },

        ".secure-payment-form .installment-eligibility-badge": {
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "16px 0",
        },

        ".secure-payment-form .installment-badge": {
            display: "flex",
            "align-items": "center",
            background: "#f3fbf8",
            border: "1px solid #009E61",
            "border-radius": "10px",
            padding: "4px 8px",
            "font-size": "1rem",
            color: "#00663F",
            "font-weight": "400",
            gap: "5px",
            "font-family":"DMSans"
        },

        ".secure-payment-form .pay-in-full-option": {
            ...commonButtonStyle,
            "padding-left": "10px",
            border: `1px solid #BCBFC8`,
            '&.checked': {
                border: `2px solid ${customColors.azure39Blue}`,
            }
        },

        ".secure-payment-form .pay-in-full-option label": {
            "font-size": "12px",
            "font-weight": "600",
        },

        ".secure-payment-form .payment-options": {
            display: "flex",
            "flex-direction": "column",
            gap: "10px",
            width: "100%",
        },

        ".secure-payment-form .installment-section": {
            border: "1px solid #BCBFC8",
        },

        ".secure-payment-form .payment-option-text": {
            color: "#394046",
            "font-size": "14px",
            "font-weight": "600",
        },

        ".secure-payment-form .section-title": {
            display: "flex",
            "font-size": "12px",
            "font-weight": "600",
            width: "100%",
            height: "47px",
            gap: "0 8px",
            padding: "0px 39px",
            "align-items": "center",
            "border-bottom": "1px solid #BCBFC8",
            "text-transform": "uppercase",
        },

        ".secure-payment-form .installment-content": {
            padding: "15px 0px"
        },

        ".secure-payment-form .installment-months-button": {
            ...commonButtonStyle,
            padding: "1px 39px",
            '&.checked': {
                border: `2px solid ${customColors.azure39Blue}`,
            }
        },

        ".secure-payment-form .installment-details-container": {
            "display": "flex",
            "border": "1px solid #BCBFC8",
            "margin": "20px",
            "margin-left": "0",
            "padding": "12px",
            "padding-left": "0",
            "margin-right": "0",
            "flex-wrap": "wrap",
            /* margin-top: 20px; */
            "padding-bottom": "0",
            "padding-right": "0",
        },

        ".secure-payment-form .installment-pay-in-visa-option": {
            ...commonButtonStyle,
            "background": "#F1F2F4",
            "padding": "6px",
            "min-width":"93px",
            // width: "93px",
            color: "#394046",
            "font-weight": "400",
            "font-size": "14px",
            "line-height": "27px",
            "justify-content": "center",
            "height": "38px"
        },

        ".secure-payment-form .installment-option-details": {
            "font-size": "14px",
            "font-weight": "400",
        },

        ".secure-payment-form .installment-option-additional-details": {
            "margin-top":"2%"
        },

        ".secure-payment-form .installment-option-details-span": {
            "margin-left": "20px"
        },

        ".secure-payment-form .installment-option-additional-fee-details": {
            "margin-left":"20px",
            "margin-bottom":"2%"
        },

        ".secure-payment-form .installment-terms-conditions": {
            "flex-basis": "100%",
            "margin-top": "20px",
            "background": "#F1F2F4"
        },

        ".secure-payment-form .installment-terms-checkbox": {
            "width": "32px",
        },
        "@media (min-width: 1500px)": {
            ".secure-payment-form .installment-terms-checkbox": {
                "height": "22px"
            }
        },

        ".secure-payment-form .checkbox-error": {
            "outline": "2px solid red",
            "outline-offset": "-2px"
        },

        ".secure-payment-form .installment-terms-label": {
            "display": "inline",
            "align-items": "center",
            "gap": "0.5em",
            "font-weight":"400",
            "font-size":"0.79em"
        },

        ".secure-payment-form .mandatory-asterisk": {
            "color": "red",
            "margin-right": "0.25em",
        },

        ".secure-payment-form .installment-terms-conditions-flex": {
            "display": "none",
            "align-items": "center",
            "gap": "0.5em",
            "padding": "10px",
        },

        ".secure-payment-form .installment-terms-error": {
            "color": "red",
            "font-size": "0.79em",
            "display":"none",
            "padding": "0 30px 10px 40px"
        },

        ".secure-payment-form .installment-visa-text": {
            "color": "#1434CB",
            "font-size": "14px",
        },

        ".secure-payment-form .installment-visa-logo": {
            "width": "30px",
            "height": "9px",
            "margin-left": "3px"
        },

        ".secure-payment-form .installment-visa-learn-more": {
            "font-size": "14px",
            "margin-left": "20px",
            "color": "#006DBB",
        },

        ".secure-payment-form .installment-availability-text": {
            "margin-left": "8px",
            "font-size": "14px",
            "font-family": 'DMSans',
            "vertical-align": "middle"
        },

        ".secure-payment-form .installment-dcc-warning": {
            "display":"none",
            "margin-top":"20px"
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
            filter: " grayscale(1)",
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