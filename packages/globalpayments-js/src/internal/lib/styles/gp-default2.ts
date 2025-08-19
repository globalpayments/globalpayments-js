import getInstallmentStyles from './installments/gp-default';
import getApplePayStyles from './apple-pay/common';
import getClickToPayStyles from './click-to-pay/gp-default';
import getGooglePayStyles from './google-pay/common';
import {
    fieldStyles as getBuiltInValidationFieldStyles,
    styles as getBuiltInValidationParentStyles,
} from './built-in-validations/gp-default';
import { options } from '../options';
import getPaymentMethodsStyles from './payment-methods/common';
import getTooltipStyles from './tooltip/common';
import {
    fieldStyles as getCurrencyConversionFieldStyles,
    styles as getCurrencyConversionStyles,
} from './currency-conversion/gp-default';

import getOrderInformationCommonStyles from './order-information/common';
import getBankSelectionCommonStyles from './bank-selection/common';


// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys

const customColors = {
    coolGrey25: '#394046',
    azure31Blue: '#005C9E'
};

const commonColumnFlexCenterStyles = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  };

export const fieldStyles = (assetBaseUrl: string, theme?: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    return {
        "@font-face": {
            "font-family": "Inter",
            src: `url("${fontBase}Inter-Regular.ttf")`,
        },

        "*": {
            "box-sizing": "border-box",
        },
        "::-webkit-input-placeholder": {
            color: "#B0B4B5",
        },
        "::-ms-input-placeholder": {
            color: "#B0B4B5",
        },
        "::-moz-input-placeholder": {
            color: "#B0B4B5",
            opacity: 1,
        },
        ":-moz-input-placeholder": {
            color: "#B0B4B5",
            opacity: 1,
        },
        ":-moz-placeholder": { /* Firefox 18- */
            color: "#B0B4B5",
            opacity: "1",
        },

        "::-moz-placeholder": {  /* Firefox 19+ */
            color: "#B0B4B5",
            opacity: "1"
        },
        "#secure-payment-field": {
            width: "100%",
            height: "40px",
            padding: "10px",
            border: "1px solid #ABC6D8",
            "border-radius": "8px",
            "font-size": "16px",
            "font-weight": "400",
            color: customColors.coolGrey25,
            "font-family":"Inter"
        },
        "#secure-payment-field.card-number": {
            width: "100%",
            height: "40px",
            padding: "12px",
            border: "1px solid #ABC6D8",
            "border-radius": "8px",
            "font-size": "16px",
            "font-weight": "400",
            color: customColors.coolGrey25,
            "padding-left": "50px"
        },
        "#secure-payment-field:focus": {
            border: "1px solid #2B9AEC",
            outline: "none",
        },
        "#secure-payment-field:hover": {
            border: "1px solid #2B9AEC",
            outline: "none",
        },
        "#secure-payment-field[type=button]": {
            "background-color": "#262AFF",
            color: "#FCFCFC",
            padding: "8px",
            border: "none",
            width: "100%",
            "border-radius": "999px",
            cursor: "pointer",
            "font-size": "20px",
            "font-weight": "700",
            height: "56px",
            "text-align": "center",
            "vertical-align": "middle",
            "line-height": "24px",
            "font-family":"Inter",
        },
        "#secure-payment-field[type=button]:focus": {
            border: "2px solid #08385b",
            outline: "none",
        },
        "#secure-payment-field[type=button]:hover": {
            "background-color": "#015a94",
        },
        "#secure-payment-field[type=button]::before": {
            content: `url("${imageBase}gp-lock-alt.svg")`,
            "margin-right": "15px",
            "vertical-align": "middle"
        },
        ".card-cvv": {
            "background-size": "20px",
        },
        "img.card-number-icon": {
            background: `transparent url(${imageBase}gp-cc-generic.svg) no-repeat right center`,
            width: "36px",
            height: "24px",
            "margin-top": "8px",
            "background-size": "36px 24px !important",
            left: "10px !important"
        },
        "img.card-number-icon.card-type-amex": {
            "background-image": `url(${imageBase}gp-cc-amex.svg)`,
        },
        "img.card-number-icon.card-type-discover": {
            "background-image": `url(${imageBase}gp-cc-discover.svg)`,
        },
        "img.card-number-icon.card-type-jcb": {
            "background-image": `url(${imageBase}gp-cc-jcb.svg)`,
        },
        "img.card-number-icon.card-type-mastercard": {
            "background-image": `url(${imageBase}gp-cc-mastercard.svg)`,
        },
        "img.card-number-icon.card-type-visa": {
            "background-image": `url(${imageBase}gp-cc-visa.svg)`,
        },
        "img.card-number-icon.card-type-diners": {
            "background-image": `url(${imageBase}gp-cc-diners.svg)`,
        },
        "img.card-number-icon.card-type-carnet": {
            "background-image": `url(${imageBase}gp-cc-carnet.svg)`,
        },
        ".card-number::-ms-clear": {
            display: "none",
        },

        ...(options.currencyConversion?.enabled ? getCurrencyConversionFieldStyles() : {}),
        ...(options.fieldValidation?.enabled ? getBuiltInValidationFieldStyles(assetBaseUrl, theme) : {}),
    };
};

export const parentStyles = (assetBaseUrl: string, theme?: string) => {
    const imageBase = assetBaseUrl + "images/";
    const fontBase = assetBaseUrl + "fonts/";

    return {
        "@font-face": {
            "font-family": "Inter",
            src: `url("${fontBase}Inter-Regular.ttf")`,
        },
        ".secure-payment-form": {
            display: "flex",
            "-ms-flex-wrap": "wrap",
            "flex-wrap": "wrap",
        },

        ".secure-payment-form *": {
            "box-sizing": "border-box",
        },

        ".secure-payment-form label": {
            margin: "16px 0",
            display: "block",
            "font-size": "16px",
            "font-weight": "500",
            "font-family": "Inter",
            "color": "#203645",
            "line-height": "22px",
        },

        ".label-div": {
            "display": "flex",
        },

        ".required": {
            color: "#BD2947",
        },

        ".secure-payment-form > div": {
            flex: "100%",
        },

        ".secure-payment-form .credit-card-card-cvv iframe": {
            width: "100%",
            float: "left",
        },

        ".secure-payment-form div[class$='-shield']": {
            flex: "1 1 auto",
            "margin-right": "16px"
        },

        ".secure-payment-form div[class$='-shield'] .ssl-text-logo": {
            "border-radius": "3px",
            height: "26px",
            "text-align": "center",
            margin: "0",
            "display": "flex",
            "justify-content": "start",
            "align-items": "center",
            width: "fit-content",
        },

        ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
            height: "36px",
            "margin-left": "5px",
            "vertical-align": "middle"
        },

        ".secure-payment-form div[class$='-shield'] .ssl-msg": {
            "font-size": "8px",
            "font-weight": "600",
            "font-family": "Open sans,sans-serif",
            color: "#468000",
            "line-height": "9px",
            display: "inline-block",
            "vertical-align": "middle",
            "text-align": "center",
            "margin-left": "6px",
            "margin-right": "7px",
            "margin-top": "1px"
        },

        ".secure-payment-form div[class$='-logo']": {
            flex: "1 1 auto",
            "margin-left": "16px",
            width: "100px",
            height: "36px",
            "text-align": "right",
            "display": "flex",
            "justify-content": "end"
        },

        ".secure-payment-form div[class$='-logo'] .security-msg": {
            color: "#707689",
            "font-size": "8px",
            display: "inline-block",
            "vertical-align": "middle",
            "white-space": "nowrap",
            "margin-right": "2px"
        },

        ".secure-payment-form div[class$='-logo'] .security-msg strong": {
            "white-space": "nowrap",
            "font-weight": "normal",
            display: "block"
        },

        ".secure-payment-form div[class$='-logo'] img": {
            "vertical-align": "middle"
        },

        ".secure-payment-form .credit-card-submit": {
            margin: "32px 0 16px 0",
        },

        ".secure-payment-form iframe": {
            "min-height": "40px",
            width: "100%",
        },

        ".secure-payment-form .other-cards-label": {
            "border-bottom": "1px solid #5a5e6d",
            "text-align": "center",
            margin: "40px 0 20px",
            position: "relative",
        },

        ".secure-payment-form .other-cards-label span": {
            "text-align": "center",
            padding: "0 10px",
            background: "#fff",
            position: "absolute",
            color: "#9296A5",
            width: "auto",
            left: "50%",
            "-webkit-transform": "translateX(-50%)",
            "-moz-transform": "translateX(-50%)",
            "-ms-transform": "translateX(-50%)",
            "-o-transform": "translateX(-50%)",
            transform: "translateX(-50%)",
            margin: "-10px auto",
            "font-family": "Inter",
            "font-size": "16px",
            "white-space": "nowrap",
        },

        ".secure-payment-form .hidden": {
            display: "none!important",
        },

        "@media(min-width: 1000px)": {
            ".secure-payment-form .credit-card-card-expiration": {
                flex: "1 1",
                "margin-left": "16px",
            },

            ".secure-payment-form .credit-card-card-cvv": {
                flex: "1 1",
                "margin-left": "16px",
            },
            ".secure-payment-form .credit-card-card-number": {
                flex: "3 0 auto",

            },
        },
        "@media (min-width: 300px) and (max-width: 1000px)": {
            ".secure-payment-form .credit-card-card-expiration": {
                flex: "1 1",
            },

            ".secure-payment-form .credit-card-card-cvv": {
                flex: "1 1",
                "margin-left": "16px",
            },
            ".secure-payment-form .credit-card-billing-address": {
                flex: "100 auto",
            },
            ".secure-payment-form .credit-card-country": {
                flex: "50",
                "margin-left": "16px",
            },
            ".secure-payment-form .credit-card-shipping-address-country":{
                flex: "50",
                "margin-left": "16px",
            },
            ".secure-payment-form .credit-card-shipping-address": {
                flex: "100 auto",
            },
            ".secure-payment-form .credit-card-country-code": {
                flex: "0",
            },

            ".secure-payment-form .credit-card-country-code label": {
                width: "max-content",
            },

            ".secure-payment-form .credit-card-phone-number": {
                flex: "100 auto",
                "margin-left": "16px",
            },
            ".secure-payment-form .credit-card-phone-number label": {
                "visibility": "hidden"
            },
            ".secure-payment-form .credit-card-billing-city": {
                flex: "100 auto",
            },
        },
        ".secure-payment-form .credit-card-phone-number label": {
            "visibility": "hidden"
        },
        ".phone-number-wrapper, .billing-address-wrapper, .shipping-details-wrapper, .billing-location-wrapper, .shipping-location-wrapper": {
            "display": "flex",
        },
        ".credit-card-billing-city, .credit-card-shipping-city":{
            "flex": "1"
        },
        ".credit-card-billing-state, .credit-card-billing-postal-code, .credit-card-shipping-state, .credit-card-shipping-postal-code":{
            "margin-left":"16px"
        },
        ".secure-payment-form .credit-card-country-code": {
            width: "8%",
            "min-width": "80px"
        },
        ".secure-payment-form .credit-card-country-code .label-div": {
            width: "max-content"
        },

        ".credit-card-save-enable":{
            "margin-top":"3%",
            "font-family":"Inter"
        },

        ".credit-card-save-enable input":{
            "height":"24px",
            "width":"24px"
        },

        ".credit-card-save-enable span":{
            "vertical-align":"super",
            "letter-spacing":"-0.5px",
            "color":"#203645",
            "margin-left":"8px"
        },

        ".credit-card-save-enable .learn-more":{
            "vertical-align":"super",
            "color":"#203645",
        },

        ".terms-and-conditions":{
            "font-size":"12px",
            "color":"#04041CA3",
            "margin-top":"25px"
        },

        ".terms-and-conditions a":{
            "color":"#1D68F4",
            "font-weight":"700",
            "text-decoration":"none"
        },

        ".credit-card-shipping-same-as-billing":{
            "margin-top":"5px",
            "font-family":"Inter",
            "margin-bottom":"15px"
        },

        ".credit-card-shipping-same-as-billing input":{
            "height":"22px",
            "width":"22px"
        },

        ".credit-card-shipping-same-as-billing span":{
            "vertical-align":"super",
            "letter-spacing":"-0.5px",
            "color":"#203645",
            "margin-left":"8px",
            "font-size": "15px"
        },

        ".encrypted": {
            "font-family": 'Inter',
           " text-align": "end",
            "font-size": "14px !important",
            "margin-top": "10px",
            "color":" #04041C80 !important",
            "font-weight": "600",
            "margin-left":"auto"
        },

        ".encrypted-shipping":{
            "font-size": "14px !important",
            "margin-top": "5px",
            "color": "#04041C80 !important",
            "font-weight": "600",
            "float": "right",
            "letter-spacing": "0px !important"
        },

        ".options": {
            "list-style": "none",
            "padding": "0px",
            "width": "108px",
            "height": "180px",
            "overflow": "auto",
            "position": "absolute",
            "border": "1px solid black",
            "border-radius": "3px",
            "background": "white",
            "margin-top": "-5px",
        },

        ".show": {
            "display":"block"
        },

        ".options li": {
            "display": "flex",
            "margin-top": "10px",
            "height": "35px",
            "padding": "6%",
            "cursor": "pointer"
        },
        ".secure-payment-form .credit-card-phone-number": {
            "width": "100%",
            "margin-left": "16px",
        },
        ".secure-payment-form .credit-card-country": {
            "margin-left": "16px",
            "min-width": "100px"
        },
        ".secure-payment-form .credit-card-shipping-address-country":{
            "margin-left": "16px",
            "min-width": "100px"
        },
        ".secure-payment-form .credit-card-billing-address": {
            width: "89%",
        },
        ".secure-payment-form .credit-card-shipping-address":{
            width: "89%",
        },
        ".secure-payment-form .tooltip": {
            position: "relative",
            width: "10%",
            "border-radius": "8px",
            color: "#474B57",
            float: "right",
            "background-size": "16px !important",
            background: `transparent url(${imageBase}info-icon.svg) no-repeat center center`,
            "font-family": "var(--tooltip-overlay-font-body, Inter)",
            "font-size": "var(--tooltip-overlay-size-text-body)",
            "line-height": "var(--tooltip-overlay-line-height-text-body)",
            "margin-left": "5px"
        },

        ".secure-payment-form .tooltip h4": {
            "font-family": "var(--tooltip-overlay-font-heading, Inter)",
            "font-size": "var(--tooltip-overlay-size-text-heading)",
            "line-height": "var(--tooltip-overlay-line-height-text-heading)",
            color: "var(--tooltip-overlay-color-text-heading)",
        },

        ".secure-payment-form .tooltip:focus": {
            outline: "none",
        },

        ".secure-payment-form .tooltip:hover": {
            outline: "none",
        },

        ".secure-payment-form .tooltip-content": {
            visibility: "hidden",
            width: "267px",
            "background-color": `var(--tooltip-overlay-color-background, ${customColors.coolGrey25})`,
            color: "var(--tooltip-overlay-color-text-body, #fff)",
            "text-align": "left",
            "border-radius": "3px",
            border: `solid 1px ${customColors.coolGrey25}`,
            padding: "13px 13px",
            position: "absolute",
            "z-index": "99999999",
            opacity: "0",
            transition: "opacity 0.3s",
            "font-size": "0.79em",
            "font-weight": "400",
            "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",
            "bottom": "90%",
        },
        "@media (max-width: 700px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-80px",
                "width": "180px"
            },
        },
        "@media (min-width: 700px) and (max-width: 850px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-118px"
            },
        },
        "@media (min-width: 850px) and (max-width: 1000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-112px"
            },
        },
        "@media (min-width: 1000px) and (max-width: 1200px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-128px"
            },
        },
        "@media (min-width: 1200px) and (max-width: 1700px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-121px"
            },
        },
        "@media (min-width: 1700px) and (max-width: 2000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-120px"
            },
        },
        "@media (min-width: 2000px) and (max-width: 2500px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-112px"
            },
        },
        "@media (min-width: 2500px) and (max-width: 3000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-106px"
            },
        },
        "@media (min-width: 3000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": "-97px"
            },
        },
        ".secure-payment-form .tooltip-content h4": {
            "margin": "0 0 10px 0"
        },

        ".secure-payment-form .tooltip:hover > .tooltip-content": {
            visibility: "visible",
            opacity: "1",
        },

        ".secure-payment-form .tooltip:focus > .tooltip-content": {
            visibility: "visible",
            opacity: "1",
        },

        ".secure-payment-form .tooltip-content::after": {
            position: "absolute",
            content: "''",
            top: "100%",
            left: "50%",
            "margin-left": "-5px",
            "border-width": "7px",
            "border-style": "solid",
            "border-color": `${customColors.coolGrey25} transparent transparent transparent`,
        },
        ".secure-payment-form .hf-cvv-tooltip-invalid, .secure-payment-form .hf-cvv-tooltip-invalid:hover, .secure-payment-form .hf-cvv-tooltip-invalid:focus": {
            border: "none !important"
        },
        ".field-validation": {
            color: "green",
            "font-weight": "bold"
        },
        ".apms-redirecting-to-page": {
            ...commonColumnFlexCenterStyles,
            "justify-content": "center",
            height: "320px",
        },
        ".apms-redirecting-to-page-message": {
            color: customColors.azure31Blue,
            "font-family": "Inter",
            "font-size": "18px!important",
            "line-height": "27px!important"
        },
        ...getInstallmentStyles(assetBaseUrl),
        ...getApplePayStyles(assetBaseUrl),
        ...getClickToPayStyles(assetBaseUrl),
        ...getGooglePayStyles(assetBaseUrl),
        ...(options.fieldValidation?.enabled ? getBuiltInValidationParentStyles(assetBaseUrl, theme) : {}),
        ...(options.currencyConversion?.enabled ? getCurrencyConversionStyles() : {}),
        ...getPaymentMethodsStyles(assetBaseUrl),

        ...(options.orderInformation?.enabled ? getOrderInformationCommonStyles(assetBaseUrl, theme) : {}),

        ...getBankSelectionCommonStyles(assetBaseUrl, theme)
    };
};