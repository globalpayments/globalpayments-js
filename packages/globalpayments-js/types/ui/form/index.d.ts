import { IEventListener } from "globalpayments-lib";
import { IDictionary } from "../../internal/lib/util";
import { IFrameCollection, IUIFormField } from "../iframe-field";
export { IUIFormField } from "../iframe-field";
export declare const fieldStyles: () => {
    blank: {};
    default: {
        "img.card-number-icon": {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            right: string;
            top: string;
            "background-position": string;
        } | {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            right: string;
            top: string;
            "margin-top": string;
            "background-position": string;
        };
        "#secure-payment-field[type=text].field-validation-wrapper"?: {
            "font-family": string;
        };
        "#secure-payment-field[type=tel].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[type=text].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[hidden]"?: {
            display: string;
            opacity: string;
            visibility: string;
        };
        "#secure-payment-field": {
            "-o-transition": string;
            "-webkit-box-shadow": string;
            "-webkit-transition": string;
            "background-color": string;
            border: string;
            "border-radius": string;
            "box-shadow": string;
            "box-sizing": string;
            color: string;
            display: string;
            "font-family": string;
            "font-size": string;
            height: string;
            "line-height": string;
            margin: string;
            "max-width": string;
            outline: string;
            padding: string;
            transition: string;
            "vertical-align": string;
            width: string;
        };
        "#secure-payment-field:focus": {
            border: string;
            "box-shadow": string;
            height: string;
            outline: string;
        };
        "#secure-payment-field[type=button]": {
            "-moz-user-select": string;
            "-ms-touch-action": string;
            "-ms-user-select": string;
            "-webkit-user-select": string;
            "background-color": string;
            "background-image": string;
            border: string;
            "box-sizing": string;
            color: string;
            cursor: string;
            display: string;
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "margin-bottom": string;
            padding: string;
            "text-align": string;
            "text-transform": string;
            "touch-action": string;
            "user-select": string;
            "vertical-align": string;
            "white-space": string;
        };
        "#secure-payment-field[type=button]:focus": {
            "background-color": string;
            color: string;
            outline: string;
        };
        "#secure-payment-field.disabled-submit-button[type=button]": {
            "background-color": string;
            color: string;
        };
        "#secure-payment-field.disabled-submit-button[type=button]:hover": {
            "background-color": string;
            color: string;
        };
        "#secure-payment-field[type=button]:hover": {
            "background-color": string;
        };
        ".card-cvv": {
            background: string;
            "background-size": string;
        };
        ".card-cvv.card-type-amex": {
            background: string;
            "background-size": string;
        };
        "img.card-number-icon[src$='/gp-cc-generic.svg']": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-amex": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-discover": {
            background: string;
            "background-size": string;
            "background-position-y": string;
            width: string;
        };
        "img.card-number-icon.invalid.card-type-jcb": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-mastercard": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-visa": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.valid.card-type-amex": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.valid.card-type-discover": {
            background: string;
            "background-size": string;
            "background-position-y": string;
            /**
             * Sets an event listener for an event type
             *
             * @param fieldTypeOrEventName The field type on which the listener should
             *          be applied, or the type of event that should trigger the listener
             * @param eventNameOrListener The type of event that should trigger the
             *          listener, or the listener function
             * @param listener The listener function when both field type and event type
             *          are provided
             */
            width: string;
        };
        "img.card-number-icon.valid.card-type-jcb": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.valid.card-type-mastercard": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.valid.card-type-visa": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.card-type-carnet": {
            "background-image": string;
        };
        ".card-number::-ms-clear": {
            display: string;
        };
        "input[placeholder]": {
            "letter-spacing": string;
        };
    };
    "gp-default": {
        ".secure-payment-form label::after"?: {
            content: string;
        };
        "#secure-payment-field[type=text].field-validation-wrapper"?: {
            "font-family": string;
        };
        "#secure-payment-field[type=tel].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[type=text].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[hidden]"?: {
            display: string;
            opacity: string;
            visibility: string;
        };
        "@font-face": {
            "font-family": string;
            src: string;
        };
        "*": {
            "box-sizing": string;
        };
        "::-webkit-input-placeholder": {
            color: string;
        };
        "::-ms-input-placeholder": {
            color: string;
        };
        "::-moz-input-placeholder": {
            color: string;
            opacity: number;
        };
        ":-moz-input-placeholder": {
            color: string;
            opacity: number;
        };
        ":-moz-placeholder": {
            color: string;
            opacity: string;
        };
        "::-moz-placeholder": {
            color: string;
            opacity: string;
        };
        "#secure-payment-field": {
            width: string;
            height: string;
            padding: string;
            border: string;
            "border-radius": string;
            "font-size": string;
            "font-weight": string;
            color: string;
        };
        "#secure-payment-field:focus": {
            border: string;
            outline: string;
        };
        "#secure-payment-field:hover": {
            border: string;
            outline: string;
        };
        "#secure-payment-field.disabled-submit-button[type=button]": {
            "background-color": string;
            color: string;
            cursor: string;
        };
        "#secure-payment-field.disabled-submit-button[type=button]:hover": {
            "background-color": string;
            color: string;
            cursor: string;
        };
        "#secure-payment-field[type=button]": {
            "background-color": string;
            color: string;
            padding: string;
            border: string;
            width: string;
            "border-radius": string;
            cursor: string;
            "font-size": string;
            "font-weight": string;
            height: string;
            "text-align": string;
            "vertical-align": string;
            "text-transform": string;
        };
        "#secure-payment-field[type=button]:focus": {
            border: string;
            outline: string;
        };
        "#secure-payment-field[type=button]:hover": {
            "background-color": string;
        };
        "#secure-payment-field[type=button]::before": {
            content: string;
            "margin-right": string;
        };
        ".card-cvv": {
            background: string;
            "background-size": string;
        };
        ".card-cvv.card-type-amex": {
            "background-image": string;
        };
        "img.card-number-icon": {
            background: string;
            right: string;
            top: string;
            width: string;
            height: string;
            "margin-top": string;
            "background-size": string;
        };
        "img.card-number-icon.card-type-amex": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-discover": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-jcb": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-mastercard": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-visa": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-diners": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-carnet": {
            "background-image": string;
        };
        ".card-number::-ms-clear": {
            display: string;
        };
    };
    simple: {
        "#secure-payment-field[hidden]"?: {
            display: string;
            opacity: string;
            visibility: string;
        };
        "img.card-number-icon": {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            right: string;
            top: string;
        } | {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            right: string;
            top: string;
            "margin-top": string;
            "background-position": string;
        };
        "#field-validation-wrapper"?: {
            "margin-top": string;
        };
        "#secure-payment-field[type=text].field-validation-wrapper"?: {
            "font-family": string;
        };
        "#secure-payment-field[type=tel].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[type=text].hf-invalid"?: {
            border: string;
        };
        html: {
            "font-size": string;
        };
        body: {
            "font-size": string;
        };
        "#secure-payment-field-wrapper": {
            postition: string;
        };
        "#secure-payment-field": {
            "-o-transition": string;
            "-webkit-box-shadow": string;
            "-webkit-transition": string;
            "background-color": string;
            border: string;
            "border-radius": string;
            "box-shadow": string;
            "box-sizing": string;
            display: string;
            "font-family": string;
            "font-size": string;
            "font-smoothing": string;
            height: string;
            margin: string;
            "max-width": string;
            outline: string;
            padding: string;
            transition: string;
            "vertical-align": string;
            width: string;
        };
        "#secure-payment-field:focus": {
            border: string;
            "box-shadow": string;
            outline: string;
        };
        "#secure-payment-field[type=button]": {
            "text-align": string;
            "text-transform": string;
            "white-space": string;
        };
        "#secure-payment-field[type=button]:focus": {
            outline: string;
        };
        ".card-cvv": {
            background: string;
            "background-size": string;
        };
        ".card-cvv.card-type-amex": {
            background: string;
            "background-size": string;
        };
        "img.card-number-icon[src$='/gp-cc-generic.svg']": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-amex": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-discover": {
            background: string;
            "background-size": string;
            "background-position-y": string;
            width: string;
            right: string;
        };
        "img.card-number-icon.invalid.card-type-jcb": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.invalid.card-type-mastercard": {
            background: string;
            "background-size": string;
            "background-position": string;
        };
        "img.card-number-icon.invalid.card-type-visa": {
            background: string;
            "background-size": string;
            "background-position": string;
        };
        "img.card-number-icon.valid.card-type-amex": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.valid.card-type-discover": {
            background: string;
            "background-size": string;
            "background-position-y": string;
            width: string;
            right: string;
        };
        "img.card-number-icon.valid.card-type-jcb": {
            background: string;
            "background-size": string;
            "background-position-y": string;
        };
        "img.card-number-icon.valid.card-type-mastercard": {
            background: string;
            "background-size": string;
            "background-position": string;
        };
        "img.card-number-icon.valid.card-type-visa": {
            background: string;
            "background-size": string;
            "background-position": string;
        };
        "img.card-number-icon.card-type-carnet": {
            "background-image": string;
        };
        ".card-number::-ms-clear": {
            display: string;
        };
        "input[placeholder]": {
            "letter-spacing": string;
        };
    };
    "gp-default2": {
        ".secure-payment-form label::after"?: {
            content: string;
        };
        "#secure-payment-field[type=text].field-validation-wrapper"?: {
            "font-family": string;
        };
        "#secure-payment-field[type=tel].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[type=text].hf-invalid"?: {
            border: string;
        };
        "#secure-payment-field[hidden]"?: {
            display: string;
            opacity: string;
            visibility: string;
        };
        "@font-face": {
            "font-family": string;
            src: string;
        };
        "*": {
            "box-sizing": string;
        };
        "::-webkit-input-placeholder": {
            color: string;
        };
        "::-ms-input-placeholder": {
            color: string;
        };
        "::-moz-input-placeholder": {
            color: string;
            opacity: number;
        };
        ":-moz-input-placeholder": {
            color: string;
            opacity: number;
        };
        ":-moz-placeholder": {
            color: string;
            opacity: string;
        };
        "::-moz-placeholder": {
            color: string;
            opacity: string;
        };
        "#secure-payment-field": {
            width: string;
            height: string;
            padding: string;
            border: string;
            "border-radius": string;
            "font-size": string;
            "font-weight": string;
            color: string;
            "font-family": string;
        };
        "#secure-payment-field.card-number": {
            width: string;
            height: string;
            padding: string;
            border: string;
            "border-radius": string;
            "font-size": string;
            "font-weight": string;
            color: string;
            "padding-left": string;
        };
        "#secure-payment-field:focus": {
            border: string;
            outline: string;
        };
        "#secure-payment-field:hover": {
            border: string;
            outline: string;
        };
        "#secure-payment-field[type=button]": {
            "background-color": string;
            color: string;
            padding: string;
            border: string;
            width: string;
            "border-radius": string;
            cursor: string;
            "font-size": string;
            "font-weight": string;
            height: string;
            "text-align": string;
            "vertical-align": string;
            "line-height": string;
            "font-family": string;
        };
        "#secure-payment-field[type=button]:focus": {
            border: string;
            outline: string;
        };
        "#secure-payment-field[type=button]:hover": {
            "background-color": string;
        };
        "#secure-payment-field[type=button]::before": {
            content: string;
            "margin-right": string;
            "vertical-align": string;
        };
        ".card-cvv": {
            "background-size": string;
        };
        "img.card-number-icon": {
            background: string;
            width: string;
            height: string;
            "margin-top": string;
            "background-size": string;
            left: string;
        };
        "img.card-number-icon.card-type-amex": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-discover": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-jcb": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-mastercard": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-visa": {
            "background-image": string;
        };
        "img.card-number-icon.card-type-diners": {
            "background-image": string;
        }; /**
         * Instantiates a new UIForm object for a group of hosted fields
         *
         * @param fields Hosted field configuration
         * @param styles Custom CSS configuration
         */
        "img.card-number-icon.card-type-carnet": {
            "background-image": string;
        };
        ".card-number::-ms-clear": {
            display: string;
        };
    };
};
export declare const parentStyles: () => {
    blank: {};
    default: {
        ".bank-selection-wrapper": {
            background: string;
            padding: string;
        };
        ".bank-selection": {
            display: string;
            "align-items": string;
            "flex-flow": string;
            "margin-bottom": string;
        };
        ".bank-selecction-option": {
            width: string;
            height: string;
            cursor: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            "box-shadow": string;
            "margin-right": string;
            "margin-left": string;
            "margin-top": string;
            background: string;
            "border-radius": string;
            "flex-direction": string;
        };
        ".bank-selecction-option:hover": {
            border: string;
        };
        ".bank-selecction-option:active": {
            background: string;
            border: string;
        };
        ".external-link-div": {
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".qr-code-button": {
            background: string;
        };
        ".title-text": {
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "font-family": string;
        };
        ".order-information"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
            "font-family": string;
        };
        ".title-field"?: {
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".order-information-field"?: {
            "line-height": string;
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments"?: {
            "font-family": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments-target, .qr-code-payment-content, .qr-code-payment-countdown-timer"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-methods-wrapper"?: {
            width: string;
        };
        ".secure-payment-form .qr-code-payment-method-button"?: {
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .qr-code-payment-method-button:focus"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-iframe-wrapper"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-iframe"?: {
            border: string;
            width: string;
            height: string;
        };
        ".secure-payment-form .qr-code-payment-content"?: {
            "font-size": string;
            "line-height": string;
            width: string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-message"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock img"?: {
            "margin-right": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock"?: {
            display: string;
            "align-items": string;
            color: string;
            "font-size": string;
            "line-height": string;
            "font-weight": string;
            "justify-content": string;
        };
        ".secure-payment-form .payment-amount"?: {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .qr-code-expired-alert"?: {
            display: string;
            border: string;
            height: string;
            "margin-top": string;
        };
        ".secure-payment-form .qr-code-expired-alert-icon"?: {
            background: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            width: string;
        };
        ".secure-payment-form .qr-code-expired-alert-message"?: {
            display: string;
            "flex-direction": string;
            "justify-content": string;
            padding: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-expired-alert-message-title"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .paypal-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .paypal-button": {
            position: string;
            background: string;
            height: string;
            border: string;
            width: string;
            "border-radius": string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .paypal-button:hover": {
            "background-color": string;
        };
        ".secure-payment-form .paypal-button:focus": {
            "background-color": string;
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .open-banking-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .blik-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .express-pay-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .open-banking-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .open-banking-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .open-banking-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .open-banking-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .blik-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .blik-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .blik-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .blik-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .express-pay-button": {
            "background-color": string;
            border: string;
            "border-radius": string;
            position: string;
            color: string;
            height: string;
            width: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .express-pay-button:hover": {
            "background-color": string;
        };
        ".secure-payment-form .express-pay-button:focus": {
            "background-color": string;
        };
        ".secure-payment-form .express-pay-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .express-pay-button::after": {
            content: string;
        };
        ".secure-payment-form .affirm-button, .secure-payment-form .klarna-button, .secure-payment-form .sezzle-button, .secure-payment-form .zip-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .affirm-button:hover, .secure-payment-form .klarna-button:hover, .secure-payment-form .sezzle-button:hover, .secure-payment-form .zip-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .affirm-button:focus, .secure-payment-form .klarna-button:focus, .secure-payment-form .sezzle-button:focus, .secure-payment-form .zip-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .affirm-button::before, .secure-payment-form .klarna-button::before, .secure-payment-form .sezzle-button::before, .secure-payment-form .zip-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .link-button": {
            display: string;
            "flex-direction": string;
            "align-items": string;
            background: string;
            border: string;
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            padding: string;
            cursor: string;
            margin: string;
        };
        ".secure-payment-form .link-button:hover": {
            color: string;
        };
        ".secure-payment-form .link-button:active": {
            color: string;
        };
        ".secure-payment-form .link-button:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .apms-redirecting-to-page": {
            "justify-content": string;
            height: string;
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .apms-redirecting-to-page-message": {
            color: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .currency-conversion-container"?: {
            width: string;
            "flex-wrap": string;
        };
        ".secure-payment-form .credit-card-currency-conversion legend"?: {
            "font-family": string;
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "text-transform": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset"?: {
            "font-family": string;
            border: string;
            margin: string;
            padding: string;
            display: string;
            "flex-wrap": string;
            width: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button"?: {
            display: string;
            "justify-content": string;
            "align-items": string;
            border: string;
            padding: string;
            "white-space": string;
            height: string;
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child"?: {
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button label"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": number;
            display: string;
            margin: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked label"?: {
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            margin: string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            margin: string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info p"?: {
            "font-family": string;
            margin: string;
            "font-style": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p"?: {
            "font-family": string;
            margin: string;
        };
        "@media(max-width: 340px)"?: {
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                "margin-right": string;
            };
        };
        "@media(max-width: 768px)"?: {
            ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
        };
        ".secure-payment-form .currency-conversion-container"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .credit-card-currency-conversion iframe"?: {
            "min-height": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:hover"?: {
            "border-color": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset:focus-within > .radio-button"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset.no-focus-outline .radio-button.checked"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked"?: {
            background: string;
            "border-color": string;
            color: string;
            outline: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']"?: {
            margin: string;
            appearance: string;
            "-webkit-appearance": string;
            "-moz-appearance": string;
            border: string;
            "border-radius": string;
            width: string;
            height: string;
            display: string;
            position: string;
            padding: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:checked"?: {
            "background-color": string;
            border: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:focus"?: {
            outline: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": number;
            margin: string;
            display: string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip"?: {
            width: string;
            height: string;
            "min-width": string;
            "border-left": string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:focus"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content"?: {
            bottom: string;
            right: string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover .tooltip-content"?: {
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p:last-child"?: {
            "margin-bottom": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before"?: {
            left: string;
            top: string;
            right: string;
            transform: string;
            "border-width": string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "border-style": string;
            "border-color": string;
        };
        "@media only screen and (max-width: 768px)"?: {
            ".secure-payment-form .currency-conversion-container": {
                "flex-direction": string;
                "align-items": string;
            };
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:first-child": {
                margin: string;
            };
            ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before": {
                right: string;
            };
        };
        "#googlePay": {
            height: string;
            margin: string;
        };
        "#googlePay button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .ctp-panel": {
            border: string;
            "box-shadow": string;
            "border-radius": string;
            "container-type": string;
            "font-family": string;
            "margin-bottom": string;
        };
        ".secure-payment-form div[class^='credit-card'].apm-active ~ div:not([class$='shield']):not([class$='logo'])": {
            display: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button": {
            "align-items": string;
            background: string;
            cursor: string;
            display: string;
            flex: string;
            "flex-direction": string;
            "flex-grow": string;
            order: string;
            padding: string;
            position: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-panel .ctp-header": {
            width: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .heading": {
            "font-family": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            margin: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .subheading": {
            margin: string;
            "font-family": string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form div[class^='ctp'] .card-brands": {
            background: string;
            padding: string;
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-info-tooltip": {
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            overflow: string;
            background: string;
            margin: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            "margin-left": string;
            "margin-top": string;
            opacity: string;
            transition: string;
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content .ctp-icon": {
            "margin-left": string;
        };
        ".secure-payment-form .ctp-info-tooltip .ctp-heading": {
            "max-width": string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content ul": {
            padding: string;
            "margin-bottom": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li": {
            padding: string;
            "font-size": string;
            "line-height": string;
            "list-style": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.smart-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.faster-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.industry-standards": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip .top-arrow": {
            position: string;
            "margin-top": string;
            background: string;
            width: string;
            left: string;
            "margin-left": string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li .ctp-icon": {
            "background-size": string;
            width: string;
            height: string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content strong": {
            "font-size": string;
            "vertical-align": string;
        };
        ".secure-payment-form .ctp-info-tooltip:hover .ctp-info-tooltip-content": {
            visibility: string;
            opacity: string;
        };
        "@container (min-width: 408px)": {
            ".secure-payment-form .ctp-panel .ctp-button .heading": {
                "font-size": string;
            };
            ".secure-payment-form .ctp-panel .right-arrow": {
                "border-width": string;
            };
            ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
                width: string;
                height: string;
                "background-size": string;
            };
        };
        ".secure-payment-form .apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form.apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button:after": {
            content: string;
            position: string;
            width: string;
            height: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
        };
        ".secure-payment-form .ctp-panel .right-arrow": {
            position: string;
            background: string;
            right: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
            top: string;
            "margin-top": string;
        };
        ".secure-payment-form .apm-active .right-arrow": {
            display: string;
        };
        ".secure-payment-form.apm-active .right-arrow": {
            display: string;
        };
        "#ctp-wrapper #header": {
            display: string;
        };
        "#ctp-wrapper .logindiv .tooltip": {
            display: string;
        };
        "#ctp-wrapper .logindiv .lblemailInput": {
            display: string;
        };
        "#ctp-wrapper #verifyVisa .VerificationLabel": {
            "font-size": string;
            "font-family": string;
            "line-height": string;
        };
        "#ctp-wrapper #verifyVisa label": {
            display: string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "font-size": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .blue-button label": {
            "font-size": string;
            "line-height": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .cardhdr label": {
            margin: string;
            display: string;
            "font-size": string;
            "line-height": string;
        };
        "#ctp-wrapper .cardhdr label.crdSelectuser": {
            margin: string;
        };
        "#ctp-wrapper button label": {
            margin: string;
            "font-size": string; /**
             * Sets a special-case event listener that fires when all hosted
             * fields in a form have registered / loaded
             *
             * @param fn The listener function
             */
        };
        "#ctp-wrapper .quitbanner > svg": {
            display: string;
        };
        "#ctp-wrapper #footer": {
            display: string;
        };
        "#ctp-wrapper .signinlayout": {
            "max-width": string;
            "min-height": string;
        };
        ".secure-payment-form.apm-active .signinlayout": {
            "min-height": string;
        };
        "#ctp-wrapper .rsdcode": {
            "font-size": string;
            "font-weight": string;
            margin: string;
        };
        "#ctp-wrapper .footerLabelDiv label": {
            "font-size": string;
            "font-weight": string;
            "margin-top": string;
            "margin-bottom": string;
        };
        "#ctp-wrapper .logindiv": {
            "min-height": string;
        };
        "#ctp-wrapper .VerificationLabel label": {
            display: string;
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .VerificationLabel #userMobileMC": {
            margin: string;
        };
        "#ctp-wrapper .transctcardlabel": {
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .TransitionLabel": {
            "font-size": string;
            "line-height": string;
            "text-align": string;
            float: string;
            margin: string;
        };
        "apple-pay-button": {
            "--apple-pay-button-width": string;
            "--apple-pay-button-height": string;
            "--apple-pay-button-border-radius": string;
            "--apple-pay-button-padding": string;
            "--apple-pay-button-box-sizing": string;
            display: string;
            margin: string;
        };
        ".secure-payment-form .tooltip": {
            position: string;
            width: string;
            height: string;
            border: string;
            "border-left": string;
            color: string;
            float: string;
            "background-size": string;
            background: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .tooltip h4": {
            "font-family": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .tooltip:focus": {
            border: string;
            outline: string;
            "border-left": string;
        };
        ".secure-payment-form .tooltip:hover": {
            border: string;
            outline: string;
            "border-left": string;
        };
        ".secure-payment-form .tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            right: string;
            opacity: string;
            transition: string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
            "margin-top": string;
            "margin-right": string;
        };
        ".secure-payment-form .tooltip-content h4": {
            margin: string;
        };
        ".secure-payment-form .tooltip:hover > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip:focus > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip-content::before": {
            position: string;
            content: string;
            right: string;
            top: string;
            "border-left": string;
            "border-right": string;
            "border-bottom": string;
        };
        ".secure-payment-form": {
            "font-family": string;
        };
        ".secure-payment-form label": {
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "text-transform": string;
        };
        ".secure-payment-form #ss-banner": {
            background: string;
            "background-size": string;
            height: string;
            "margin-bottom": string;
        };
        ".secure-payment-form div[class$='-shield']": {
            flex: string;
            "margin-right": string;
            float: string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-text-logo": {
            "border-radius": string;
            height: string;
            "text-align": string;
            margin: string;
            display: string;
            "justify-content": string;
            "align-items": string;
            width: string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
            height: string;
            "margin-left": string;
            "vertical-align": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-msg": {
            "font-size": string;
            "font-weight": string;
            "font-family": string;
            color: string;
            "line-height": string;
            display: string;
            "vertical-align": string;
            "text-align": string;
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".secure-payment-form div[class$='-logo']": {
            flex: string;
            "margin-left": string;
            width: string;
            height: string;
            "text-align": string;
            float: string;
            display: string;
            "justify-content": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg": {
            color: string;
            "font-size": string;
            display: string;
            "vertical-align": string;
            "white-space": string;
            "margin-right": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg strong": {
            "white-space": string;
            "font-weight": string;
            display: string;
        };
        ".secure-payment-form div[class$='-logo'] img": {
            "vertical-align": string;
        };
        ".secure-payment-form div": {
            display: string;
        };
        ".secure-payment-form iframe": {
            width: string;
        };
        ".secure-payment-form .form-row": {
            "margin-top": string;
        };
        ".secure-payment-form .form-wrapper": {
            display: string;
            margin: string;
            width: string;
        };
        ".secure-payment-form .tooltip, .secure-payment-form .tooltip-content": {
            display: string;
        };
        ".secure-payment-form .other-cards-label": {
            "border-bottom": string;
            "text-align": string;
            margin: string;
            position: string;
        };
        ".secure-payment-form .other-cards-label span": {
            "text-align": string;
            padding: string;
            background: string;
            position: string;
            color: string;
            width: string;
            left: string;
            "-webkit-transform": string;
            "-moz-transform": string;
            "-ms-transform": string;
            "-o-transform": string;
            transform: string;
            margin: string;
            "font-family": string;
            "font-size": string;
            "white-space": string;
        };
        ".secure-payment-form .hidden": {
            display: string;
        };
    };
    "gp-default": {
        ".bank-selection-wrapper": {
            background: string;
            padding: string;
        };
        ".bank-selection": {
            display: string;
            "align-items": string;
            "flex-flow": string;
            "margin-bottom": string;
        };
        ".bank-selecction-option": {
            width: string;
            height: string;
            cursor: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            "box-shadow": string;
            "margin-right": string;
            "margin-left": string;
            "margin-top": string;
            background: string;
            "border-radius": string;
            "flex-direction": string;
        };
        ".bank-selecction-option:hover": {
            border: string;
        };
        ".bank-selecction-option:active": {
            background: string;
            border: string;
        };
        ".external-link-div": {
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".qr-code-button": {
            background: string;
        };
        ".title-text": {
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "font-family": string;
        };
        ".order-information"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
            "font-family": string;
        };
        ".title-field"?: {
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".order-information-field"?: {
            "line-height": string;
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments"?: {
            "font-family": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments-target, .qr-code-payment-content, .qr-code-payment-countdown-timer"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-methods-wrapper"?: {
            width: string;
        };
        ".secure-payment-form .qr-code-payment-method-button"?: {
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .qr-code-payment-method-button:focus"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-iframe-wrapper"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-iframe"?: {
            border: string;
            width: string;
            height: string;
        };
        ".secure-payment-form .qr-code-payment-content"?: {
            "font-size": string;
            "line-height": string;
            width: string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-message"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock img"?: {
            "margin-right": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock"?: {
            display: string;
            "align-items": string;
            color: string;
            "font-size": string;
            "line-height": string;
            "font-weight": string;
            "justify-content": string;
        };
        ".secure-payment-form .payment-amount"?: {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .qr-code-expired-alert"?: {
            display: string;
            border: string;
            height: string;
            "margin-top": string;
        };
        ".secure-payment-form .qr-code-expired-alert-icon"?: {
            background: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            width: string;
        };
        ".secure-payment-form .qr-code-expired-alert-message"?: {
            display: string;
            "flex-direction": string;
            "justify-content": string;
            padding: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-expired-alert-message-title"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .paypal-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .paypal-button": {
            position: string;
            background: string;
            height: string;
            border: string;
            width: string;
            "border-radius": string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .paypal-button:hover": {
            "background-color": string;
        };
        ".secure-payment-form .paypal-button:focus": {
            "background-color": string;
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .open-banking-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .blik-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .express-pay-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .open-banking-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .open-banking-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .open-banking-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .open-banking-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .blik-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .blik-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .blik-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .blik-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .express-pay-button": {
            "background-color": string;
            border: string;
            "border-radius": string;
            position: string;
            color: string;
            height: string;
            width: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .express-pay-button:hover": {
            "background-color": string;
        };
        ".secure-payment-form .express-pay-button:focus": {
            "background-color": string;
        };
        ".secure-payment-form .express-pay-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .express-pay-button::after": {
            content: string;
        };
        ".secure-payment-form .affirm-button, .secure-payment-form .klarna-button, .secure-payment-form .sezzle-button, .secure-payment-form .zip-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .affirm-button:hover, .secure-payment-form .klarna-button:hover, .secure-payment-form .sezzle-button:hover, .secure-payment-form .zip-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .affirm-button:focus, .secure-payment-form .klarna-button:focus, .secure-payment-form .sezzle-button:focus, .secure-payment-form .zip-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .affirm-button::before, .secure-payment-form .klarna-button::before, .secure-payment-form .sezzle-button::before, .secure-payment-form .zip-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .link-button": {
            display: string;
            "flex-direction": string;
            "align-items": string;
            background: string;
            border: string;
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            padding: string;
            cursor: string;
            margin: string;
        };
        ".secure-payment-form .link-button:hover": {
            color: string;
        };
        ".secure-payment-form .link-button:active": {
            color: string;
        };
        ".secure-payment-form .link-button:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .apms-redirecting-to-page": {
            "justify-content": string;
            height: string;
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .apms-redirecting-to-page-message": {
            color: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .currency-conversion-container"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .credit-card-currency-conversion iframe"?: {
            "min-height": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset"?: {
            "font-family": string;
            border: string;
            margin: string;
            padding: string;
            display: string;
            "flex-wrap": string;
        };
        ".secure-payment-form .credit-card-currency-conversion legend"?: {
            "font-family": string;
            border: number;
            top: string;
            margin: string;
            padding: number;
            display: string;
            "font-size": string;
            "font-weight": string;
            position: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button"?: {
            display: string;
            "justify-content": string;
            "align-items": string;
            border: string;
            padding: string;
            "white-space": string;
            height: string;
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child"?: {
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:hover"?: {
            "border-color": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset:focus-within > .radio-button"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset.no-focus-outline .radio-button.checked"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked"?: {
            background: string;
            "border-color": string;
            color: string;
            outline: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked label"?: {
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']"?: {
            margin: string;
            appearance: string;
            "-webkit-appearance": string;
            "-moz-appearance": string;
            border: string;
            "border-radius": string;
            width: string;
            height: string;
            display: string;
            position: string;
            padding: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:checked"?: {
            "background-color": string;
            border: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:focus"?: {
            outline: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button label"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            display: string;
            margin: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            "margin-left": string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            /**
             * Represents logic surrounding a group of hosted fields.
             */
            "margin-left": string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": number;
            margin: string;
            display: string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info p"?: {
            margin: string;
            "font-style": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip"?: {
            width: string;
            height: string;
            "min-width": string;
            "border-left": string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:focus"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content"?: {
            bottom: string;
            right: string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover .tooltip-content"?: {
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p"?: {
            margin: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p:last-child"?: {
            "margin-bottom": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before"?: {
            left: string;
            top: string;
            right: string;
            transform: string;
            "border-width": string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "border-style": string;
            "border-color": string;
        };
        "@media only screen and (max-width: 768px)"?: {
            ".secure-payment-form .currency-conversion-container": {
                "flex-direction": string;
                "align-items": string;
            };
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:first-child": {
                margin: string;
            };
            ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before": {
                right: string;
            };
        };
        "@media(max-width: 340px)"?: {
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "flex-flow": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "margin-bottom": string;
                "margin-right": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
                "margin-bottom": string;
            };
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid"?: {
            border: string;
            "border-left": string;
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid:hover"?: {
            border: string;
            "border-left": string;
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid:focus"?: {
            border: string;
            "border-left": string;
        };
        "#googlePay": {
            height: string;
            margin: string;
        };
        "#googlePay button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .ctp-panel": {
            border: string;
            "box-shadow": string;
            "border-radius": string;
            "container-type": string;
            "font-family": string;
            "margin-bottom": string;
        };
        ".secure-payment-form div[class^='credit-card'].apm-active ~ div:not([class$='shield']):not([class$='logo'])": {
            display: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button": {
            "align-items": string;
            background: string;
            cursor: string;
            display: string;
            flex: string;
            "flex-direction": string;
            "flex-grow": string;
            order: string;
            padding: string;
            position: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-panel .ctp-header": {
            width: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .heading": {
            "font-family": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            margin: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .subheading": {
            margin: string;
            "font-family": string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form div[class^='ctp'] .card-brands": {
            background: string;
            padding: string;
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-info-tooltip": {
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            overflow: string;
            background: string;
            margin: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            "margin-left": string;
            "margin-top": string;
            opacity: string;
            transition: string;
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content .ctp-icon": {
            "margin-left": string;
        };
        ".secure-payment-form .ctp-info-tooltip .ctp-heading": {
            "max-width": string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content ul": {
            padding: string;
            "margin-bottom": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li": {
            padding: string;
            "font-size": string;
            "line-height": string;
            "list-style": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.smart-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.faster-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.industry-standards": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip .top-arrow": {
            position: string;
            "margin-top": string;
            background: string;
            width: string;
            left: string;
            "margin-left": string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li .ctp-icon": {
            "background-size": string;
            width: string;
            height: string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content strong": {
            "font-size": string;
            "vertical-align": string;
        };
        ".secure-payment-form .ctp-info-tooltip:hover .ctp-info-tooltip-content": {
            visibility: string;
            opacity: string;
        };
        "@container (min-width: 408px)": {
            ".secure-payment-form .ctp-panel .ctp-button .heading": {
                "font-size": string;
            };
            ".secure-payment-form .ctp-panel .right-arrow": {
                "border-width": string;
            };
            ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
                width: string;
                height: string;
                "background-size": string;
            };
        };
        ".secure-payment-form .apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form.apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button:after": {
            content: string;
            position: string;
            width: string;
            height: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
        };
        ".secure-payment-form .ctp-panel .right-arrow": {
            position: string;
            background: string;
            right: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
            top: string;
            "margin-top": string;
        };
        ".secure-payment-form .apm-active .right-arrow": {
            display: string;
        };
        ".secure-payment-form.apm-active .right-arrow": {
            display: string;
        };
        "#ctp-wrapper #header": {
            display: string;
        };
        "#ctp-wrapper .logindiv .tooltip": {
            display: string;
        };
        "#ctp-wrapper .logindiv .lblemailInput": {
            display: string;
        };
        "#ctp-wrapper #verifyVisa .VerificationLabel": {
            "font-size": string;
            "font-family": string;
            "line-height": string;
        };
        "#ctp-wrapper #verifyVisa label": {
            display: string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "font-size": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .blue-button label": {
            "font-size": string;
            "line-height": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .cardhdr label": {
            margin: string;
            display: string;
            "font-size": string;
            "line-height": string;
        };
        "#ctp-wrapper .cardhdr label.crdSelectuser": {
            margin: string;
        };
        "#ctp-wrapper button label": {
            margin: string;
            "font-size": string; /**
             * Sets a special-case event listener that fires when all hosted
             * fields in a form have registered / loaded
             *
             * @param fn The listener function
             */
        };
        "#ctp-wrapper .quitbanner > svg": {
            display: string;
        };
        "#ctp-wrapper #footer": {
            display: string;
        };
        "#ctp-wrapper .signinlayout": {
            "max-width": string;
            "min-height": string;
        };
        ".secure-payment-form.apm-active .signinlayout": {
            "min-height": string;
        };
        "#ctp-wrapper .rsdcode": {
            "font-size": string;
            "font-weight": string;
            margin: string;
        };
        "#ctp-wrapper .footerLabelDiv label": {
            "font-size": string;
            "font-weight": string;
            "margin-top": string;
            "margin-bottom": string;
        };
        "#ctp-wrapper .logindiv": {
            "min-height": string;
        };
        "#ctp-wrapper .VerificationLabel label": {
            display: string;
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .VerificationLabel #userMobileMC": {
            margin: string;
        };
        "#ctp-wrapper .transctcardlabel": {
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .TransitionLabel": {
            "font-size": string;
            "line-height": string;
            "text-align": string;
            float: string;
            margin: string;
        };
        "apple-pay-button": {
            "--apple-pay-button-width": string;
            "--apple-pay-button-height": string;
            "--apple-pay-button-border-radius": string;
            "--apple-pay-button-padding": string;
            "--apple-pay-button-box-sizing": string;
            display: string;
            margin: string;
        };
        ".secure-payment-form .modal-overlay": {
            background: string;
            position: string;
            top: string;
            left: string;
            margin: string;
            width: string;
            height: string;
            display: string;
            "justify-content": string;
            "align-items": string;
            "z-index": string;
        };
        ".secure-payment-form .modal-wrapper": {
            "font-family": string;
            background: string;
            "border-width": string;
            "border-radius": string;
            overflow: string;
        };
        ".secure-payment-form .credit-card-installments": {
            "font-family": string;
        };
        ".secure-payment-form .installment-eligibility-badge": {
            display: string;
            alignItems: string;
            justifyContent: string;
            width: string;
            margin: string;
        };
        ".secure-payment-form .installment-badge": {
            display: string;
            "align-items": string;
            background: string;
            border: string;
            "border-radius": string;
            padding: string;
            "font-size": string;
            color: string;
            "font-weight": string;
            gap: string;
        };
        ".secure-payment-form .pay-in-full-option": {
            "padding-left": string;
            border: string;
            '&.checked': {
                border: string;
            };
            padding: string;
            display: string;
            gap: string;
        };
        ".secure-payment-form .pay-in-full-option label": {
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .payment-options": {
            display: string;
            "flex-direction": string;
            gap: string;
            width: string;
        };
        ".secure-payment-form .installment-section": {
            border: string;
        };
        ".secure-payment-form .payment-option-text": {
            color: string;
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .section-title": {
            display: string;
            "font-size": string;
            "font-weight": string;
            width: string;
            height: string;
            gap: string;
            padding: string;
            "align-items": string;
            "border-bottom": string;
            "text-transform": string;
        };
        ".secure-payment-form .installment-content": {
            padding: string;
        };
        ".secure-payment-form .installment-months-button": {
            padding: string;
            '&.checked': {
                border: string;
            };
            display: string;
            gap: string;
        };
        ".secure-payment-form .installment-issuer-panel": {
            background: string;
            display: string;
            "flex-direction": string;
            "max-width": string;
            padding: string;
            margin: string;
            gap: string;
            width: string;
        };
        ".secure-payment-form .installment-issuer-panel-header": {
            display: string;
            "justify-content": string;
            "align-items": string;
        };
        ".secure-payment-form .installment-issuer-panel-title": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-issuer-panel-content": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-panel": {
            "max-width": string;
            "margin-bottom": string;
        };
        ".secure-payment-form .installment-plans-title": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            margin: string;
        };
        ".secure-payment-form .installment-plans-subtitle": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-plan-details": {
            "border-top": string;
            "border-bottom": string;
            padding: string;
        };
        ".secure-payment-form .installment-plan-monthly-amount": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-options, .installment-panel": {
            display: string;
            "flex-direction": string;
            padding: string;
            width: string;
        };
        ".secure-payment-form .installment-options": {
            background: string;
            margin: string;
            padding: string;
            "border-radius": string;
        };
        ".secure-payment-form .installment-plan-options-title": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-options-content": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            margin: string;
        };
        ".secure-payment-form .installment-term-selector-title": {
            "text-align": string;
            padding: string;
        };
        ".secure-payment-form .installment-panel-header": {
            "text-align": string;
            display: string;
            "flex-direction": string;
        };
        ".secure-payment-form .installment-panel-content": {
            margin: string;
        };
        ".secure-payment-form .installment-panel-footer": {
            "text-align": string;
            display: string;
            "flex-direction": string;
        };
        ".secure-payment-form .installment-field-value-item": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            margin: string;
        };
        ".secure-payment-form .installment-field-value-item, .installment-options-header": {
            display: string;
            "flex-direction": string;
            "justify-content": string;
        };
        ".secure-payment-form .installment-link": {
            background: string;
            border: string;
            color: string;
            "font-style": string;
            "font-weight": string;
            "text-decoration": string;
            "line-height": string;
            "font-size": string;
            padding: string;
            cursor: string;
        };
        ".secure-payment-form .installment-link:hover": {
            color: string;
        };
        ".secure-payment-form .installment-link:active": {
            color: string;
        };
        ".secure-payment-form .installment-link:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .installment-step-container": {
            display: string;
            "justify-content": string;
        };
        ".secure-payment-form .installment-base-action-button-wrapper": {
            display: string;
            "justify-content": string;
            "flex-wrap": string;
        };
        ".secure-payment-form .installment-base-action-button, .installment-button-explore-plans, .installment-button-learn-more, .installment-button-month-term, .installment-button-pay": {
            "border-radius": string;
            width: string;
            height: string;
            padding: string;
            color: string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            "font-style": string;
            border: string;
            cursor: string;
            "margin-top": string;
            "margin-bottom": string;
            display: string;
            "justify-content": string;
            "align-items": string;
            gap: string;
        };
        ".secure-payment-form .installment-button-explore-plans": {
            background: string;
            "margin-bottom": string;
        };
        ".secure-payment-form .installment-button-explore-plans:hover": {
            background: string;
        };
        ".secure-payment-form .installment-button-explore-plans:active": {
            background: string;
        };
        ".secure-payment-form .installment-button-explore-plans:focus": {
            background: string;
            border: string;
        };
        ".secure-payment-form .installment-button-learn-more": {
            background: string;
            color: string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            margin: string;
        };
        ".secure-payment-form .installment-button-learn-more::after": {
            content: string;
            "padding-top": string;
            filter: string;
        };
        ".secure-payment-form .installment-button-learn-more:hover": {
            color: string;
        };
        ".secure-payment-form .installment-button-learn-more:active": {
            color: string;
        };
        ".secure-payment-form .installment-button-learn-more:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .installment-button-month-term": {
            background: string;
            width: string;
            height: string;
            "font-weight": string;
            margin: string;
        };
        ".secure-payment-form .installment-unselected": {
            background: string;
            color: string;
        };
        ".secure-payment-form .installment-unselected:hover": {
            border: string;
        };
        ".secure-payment-form .installment-button-pay": {
            background: string;
            height: string;
            padding: string;
        };
        ".secure-payment-form .installment-button-pay:hover": {
            background: string;
        };
        ".secure-payment-form .installment-button-pay:active": {
            background: string;
        };
        ".secure-payment-form .installment-button-pay:focus": {
            background: string;
            border: string;
        };
        ".secure-payment-form .installment-button-pay::before": {
            content: string;
            "margin-right": string;
        };
        ".secure-payment-form .provided-by": {
            "font-style": string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            color: string;
            margin: string;
        };
        ".secure-payment-form .installment-learn-more-content": {
            width: string;
        };
        ".secure-payment-form .installment-learn-more-header": {
            display: string;
            padding: string;
            "justify-content": string;
            "align-items": string;
            background: string;
        };
        ".secure-payment-form .installment-learn-more-header-title": {
            "font-style": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .installment-learn-more-body": {
            display: string;
            margin: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .installment-learn-more-body ul": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            padding: string;
            "margin-top": string;
        };
        ".secure-payment-form .installment-learn-more-link": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "text-decoration-line": string;
            margin: string;
        };
        ".secure-payment-form .installment-button-close": {
            background: string;
            border: string;
            padding: string;
            cursor: string;
        };
        ".secure-payment-form .installment-button-close::after": {
            content: string;
        };
        ".secure-payment-form .term-and-condition-title": {
            display: string;
            "align-items": string;
            "font-style": string;
            "font-weight": string;
        };
        ".secure-payment-form .term-and-condition-title::before": {
            content: string;
            "margin-right": string;
        };
        ".secure-payment-form .term-and-condition-link": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "text-decoration-line": string;
        };
        ".secure-payment-form .tooltip": {
            position: string;
            width: string;
            height: string;
            border: string;
            "border-left": string;
            color: string;
            float: string;
            "background-size": string;
            background: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .tooltip h4": {
            "font-family": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .tooltip:focus": {
            border: string;
            outline: string;
            "border-left": string;
        };
        ".secure-payment-form .tooltip:hover": {
            border: string;
            outline: string;
            "border-left": string;
        };
        ".secure-payment-form .tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            right: string;
            opacity: string;
            transition: string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
            "margin-top": string;
            "margin-right": string;
        };
        ".secure-payment-form .tooltip-content h4": {
            margin: string;
        };
        ".secure-payment-form .tooltip:hover > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip:focus > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip-content::before": {
            position: string;
            content: string;
            right: string;
            top: string;
            "border-left": string;
            "border-right": string;
            "border-bottom": string;
        };
        "@font-face": {
            "font-family": string;
            src: string;
        };
        ".secure-payment-form": {
            display: string;
            "-ms-flex-wrap": string;
            "flex-wrap": string;
        };
        ".secure-payment-form *": {
            "box-sizing": string;
        };
        ".secure-payment-form label": {
            margin: string;
            display: string;
            "font-size": string;
            "font-weight": string;
            "font-family": string;
        };
        /**
         * Sets an event listener for an event type
         *
         * @param fieldTypeOrEventName The field type on which the listener should
         *          be applied, or the type of event that should trigger the listener
         * @param eventNameOrListener The type of event that should trigger the
         *          listener, or the listener function
         * @param listener The listener function when both field type and event type
         *          are provided
         */
        ".secure-payment-form > div": {
            flex: string;
        };
        ".secure-payment-form .credit-card-card-cvv iframe": {
            width: string;
            float: string;
        };
        ".secure-payment-form div[class$='-shield']": {
            flex: string;
            "margin-right": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-text-logo": {
            "border-radius": string;
            height: string;
            "text-align": string;
            margin: string;
            display: string;
            "justify-content": string;
            "align-items": string;
            width: string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
            height: string;
            "margin-left": string;
            "vertical-align": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-msg": {
            "font-size": string;
            "font-weight": string;
            "font-family": string;
            color: string;
            "line-height": string;
            display: string;
            "vertical-align": string;
            "text-align": string;
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".secure-payment-form div[class$='-logo']": {
            flex: string;
            "margin-left": string;
            width: string;
            height: string;
            "text-align": string;
            display: string;
            "justify-content": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg": {
            color: string;
            "font-size": string;
            display: string;
            "vertical-align": string;
            "white-space": string;
            "margin-right": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg strong": {
            "white-space": string;
            "font-weight": string;
            display: string;
        };
        ".secure-payment-form div[class$='-logo'] img": {
            "vertical-align": string;
        };
        ".secure-payment-form .credit-card-submit": {
            margin: string;
        };
        ".secure-payment-form iframe": {
            "min-height": string;
            width: string;
        };
        ".secure-payment-form .other-cards-label": {
            "border-bottom": string;
            "text-align": string;
            margin: string;
            position: string;
        };
        ".secure-payment-form .other-cards-label span": {
            "text-align": string;
            padding: string;
            background: string;
            position: string;
            color: string;
            width: string;
            left: string;
            "-webkit-transform": string;
            "-moz-transform": string;
            "-ms-transform": string;
            "-o-transform": string;
            transform: string;
            margin: string;
            "font-family": string;
            "font-size": string;
            "white-space": string;
        };
        ".secure-payment-form .hidden": {
            display: string;
        };
        ".secure-payment-form .credit-card-phone-number label": {
            visibility: string;
        };
        ".phone-number-wrapper, .billing-address-wrapper, .shipping-details-wrapper": {
            display: string;
        };
        ".secure-payment-form .credit-card-country-code": {
            width: string;
            "min-width": string;
        };
        ".secure-payment-form .credit-card-country-code .label-div": {
            width: string;
        };
        ".secure-payment-form .credit-card-phone-number": {
            width: string;
            "margin-left": string;
        };
        ".secure-payment-form .credit-card-country": {
            "margin-left": string;
            "min-width": string;
        };
        ".secure-payment-form .credit-card-billing-address": {
            width: string;
        };
        "@media(min-width: 800px)": {
            ".secure-payment-form .credit-card-card-expiration": {
                flex: string;
                "margin-right": string;
            };
            ".secure-payment-form .credit-card-card-cvv": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-billing-address": {
                flex: string;
            };
            ".secure-payment-form .credit-card-country": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-country-code": {
                flex: string;
            };
            ".secure-payment-form .credit-card-country-code label": {
                width: string;
            };
            ".secure-payment-form .credit-card-phone-number": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-phone-number label": {
                visibility: string;
            };
        };
        ".credit-card-save-enable": {
            "margin-top": string;
            "font-family": string;
        };
        ".credit-card-save-enable input": {
            height: string;
            width: string;
        };
        ".credit-card-save-enable span": {
            "vertical-align": string;
            "letter-spacing": string;
            "margin-left": string;
        };
        ".credit-card-save-enable .learn-more": {
            "vertical-align": string;
            color: string;
        };
        ".terms-and-conditions": {
            "font-size": string;
            color: string;
            "margin-top": string;
        };
        ".terms-and-conditions a": {
            color: string;
            "font-weight": string;
            "text-decoration": string;
        };
        ".credit-card-shipping-same-as-billing": {
            "margin-top": string;
            "font-family": string;
            "margin-bottom": string;
        };
        ".credit-card-shipping-same-as-billing input": {
            height: string;
            width: string;
        };
        ".credit-card-shipping-same-as-billing span": {
            "vertical-align": string;
            "letter-spacing": string;
            color: string;
            "margin-left": string;
            "font-size": string;
        };
        ".encrypted": {
            "font-family": string;
            " text-align": string;
            "font-size": string;
            "margin-top": string;
            color: string;
            "font-weight": string;
            "margin-left": string;
        };
        ".encrypted-shipping": {
            "font-size": string;
            "margin-top": string;
            color: string;
            "font-weight": string;
            float: string;
            "letter-spacing": string;
        };
    };
    simple: {
        ".bank-selection-wrapper": {
            background: string;
            padding: string;
        };
        ".bank-selection": {
            display: string;
            "align-items": string;
            "flex-flow": string;
            "margin-bottom": string;
        };
        ".bank-selecction-option": {
            width: string;
            height: string;
            cursor: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            "box-shadow": string;
            "margin-right": string;
            "margin-left": string;
            "margin-top": string;
            background: string;
            "border-radius": string;
            "flex-direction": string;
        };
        ".bank-selecction-option:hover": {
            border: string;
        };
        ".bank-selecction-option:active": {
            background: string;
            border: string;
        };
        ".external-link-div": {
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".qr-code-button": {
            background: string;
        };
        ".title-text": {
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "font-family": string;
        };
        ".order-information"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
            "font-family": string;
        };
        ".title-field"?: {
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".order-information-field"?: {
            "line-height": string;
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .credit-card-currency-conversion legend"?: {
            "font-family": string;
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "text-transform": string;
            "margin-bottom": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .currency-conversion-container"?: {
            "margin-bottom": string;
            "flex-wrap": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content"?: {
            display: string;
            bottom: string;
            right: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button"?: {
            display: string;
            "justify-content": string;
            "align-items": string;
            border: string;
            padding: string;
            "white-space": string;
            height: string;
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button label"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": number;
            display: string;
            margin: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked label"?: {
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            margin: string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            margin: string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info p"?: {
            "font-family": string;
            margin: string;
            "font-style": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p"?: {
            "font-family": string;
            margin: string;
        };
        ".secure-payment-form .currency-conversion-container"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .credit-card-currency-conversion iframe"?: {
            "min-height": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset"?: {
            "font-family": string;
            border: string;
            margin: string;
            padding: string;
            display: string;
            "flex-wrap": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child"?: {
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:hover"?: {
            "border-color": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset:focus-within > .radio-button"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset.no-focus-outline .radio-button.checked"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked"?: {
            background: string;
            "border-color": string;
            color: string;
            outline: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']"?: {
            margin: string;
            appearance: string;
            "-webkit-appearance": string;
            "-moz-appearance": string;
            border: string;
            "border-radius": string;
            width: string;
            height: string;
            display: string;
            position: string;
            padding: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:checked"?: {
            "background-color": string;
            border: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:focus"?: {
            outline: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": number;
            margin: string;
            display: string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip"?: {
            width: string;
            height: string;
            "min-width": string;
            "border-left": string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:focus"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover .tooltip-content"?: {
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p:last-child"?: {
            "margin-bottom": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before"?: {
            left: string;
            top: string;
            right: string;
            transform: string;
            "border-width": string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "border-style": string;
            "border-color": string;
        };
        "@media only screen and (max-width: 768px)"?: {
            ".secure-payment-form .currency-conversion-container": {
                "flex-direction": string;
                "align-items": string;
            };
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:first-child": {
                margin: string;
            };
            ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before": {
                right: string;
            };
        };
        "@media(max-width: 340px)"?: {
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "flex-flow": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "margin-bottom": string;
                "margin-right": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
                "margin-bottom": string;
            };
        };
        ".secure-payment-form .credit-card-qr-code-payments"?: {
            "font-family": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments-target, .qr-code-payment-content, .qr-code-payment-countdown-timer"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-methods-wrapper"?: {
            width: string;
        };
        ".secure-payment-form .qr-code-payment-method-button"?: {
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .qr-code-payment-method-button:focus"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-iframe-wrapper"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-iframe"?: {
            border: string;
            width: string;
            height: string;
        };
        ".secure-payment-form .qr-code-payment-content"?: {
            "font-size": string;
            "line-height": string;
            width: string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-message"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock img"?: {
            "margin-right": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock"?: {
            display: string;
            "align-items": string;
            color: string;
            "font-size": string;
            "line-height": string;
            "font-weight": string;
            "justify-content": string;
        };
        ".secure-payment-form .payment-amount"?: {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .qr-code-expired-alert"?: {
            display: string;
            border: string;
            height: string;
            "margin-top": string;
        };
        ".secure-payment-form .qr-code-expired-alert-icon"?: {
            background: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            width: string;
        };
        ".secure-payment-form .qr-code-expired-alert-message"?: {
            display: string;
            "flex-direction": string;
            "justify-content": string;
            padding: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-expired-alert-message-title"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        "#googlePay": {
            height: string;
            margin: string;
        };
        "#googlePay button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .ctp-panel": {
            border: string;
            "box-shadow": string;
            "border-radius": string;
            "container-type": string;
            "font-family": string;
            "margin-bottom": string;
        };
        ".secure-payment-form div[class^='credit-card'].apm-active ~ div:not([class$='shield']):not([class$='logo'])": {
            display: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button": {
            "align-items": string;
            background: string;
            cursor: string;
            display: string;
            flex: string;
            "flex-direction": string;
            "flex-grow": string;
            order: string;
            padding: string;
            position: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-panel .ctp-header": {
            width: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .heading": {
            "font-family": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            margin: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .subheading": {
            margin: string;
            "font-family": string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form div[class^='ctp'] .card-brands": {
            background: string;
            padding: string;
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-info-tooltip": {
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            overflow: string;
            background: string;
            margin: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            "margin-left": string;
            "margin-top": string;
            opacity: string;
            transition: string;
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content .ctp-icon": {
            "margin-left": string;
        };
        ".secure-payment-form .ctp-info-tooltip .ctp-heading": {
            "max-width": string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content ul": {
            padding: string;
            "margin-bottom": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li": {
            padding: string;
            "font-size": string;
            "line-height": string;
            "list-style": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.smart-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.faster-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.industry-standards": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip .top-arrow": {
            position: string;
            "margin-top": string;
            background: string;
            width: string;
            left: string;
            "margin-left": string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li .ctp-icon": {
            "background-size": string;
            width: string;
            height: string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content strong": {
            "font-size": string;
            "vertical-align": string;
        };
        ".secure-payment-form .ctp-info-tooltip:hover .ctp-info-tooltip-content": {
            visibility: string;
            opacity: string;
        };
        "@container (min-width: 408px)": {
            ".secure-payment-form .ctp-panel .ctp-button .heading": {
                "font-size": string;
            };
            ".secure-payment-form .ctp-panel .right-arrow": {
                "border-width": string;
            };
            ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
                width: string;
                height: string;
                "background-size": string;
            };
        };
        ".secure-payment-form .apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form.apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button:after": {
            content: string;
            position: string;
            width: string;
            height: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
        };
        ".secure-payment-form .ctp-panel .right-arrow": {
            position: string;
            background: string;
            right: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
            top: string;
            "margin-top": string;
        };
        ".secure-payment-form .apm-active .right-arrow": {
            display: string;
        };
        ".secure-payment-form.apm-active .right-arrow": {
            display: string;
        };
        "#ctp-wrapper #header": {
            display: string;
        };
        "#ctp-wrapper .logindiv .tooltip": {
            display: string;
        };
        "#ctp-wrapper .logindiv .lblemailInput": {
            display: string;
        };
        "#ctp-wrapper #verifyVisa .VerificationLabel": {
            "font-size": string;
            "font-family": string;
            "line-height": string;
        };
        "#ctp-wrapper #verifyVisa label": {
            display: string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "font-size": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .blue-button label": {
            "font-size": string;
            "line-height": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .cardhdr label": {
            margin: string;
            display: string;
            "font-size": string;
            "line-height": string;
        };
        "#ctp-wrapper .cardhdr label.crdSelectuser": {
            margin: string;
        };
        "#ctp-wrapper button label": {
            margin: string;
            "font-size": string; /**
             * Sets a special-case event listener that fires when all hosted
             * fields in a form have registered / loaded
             *
             * @param fn The listener function
             */
        };
        "#ctp-wrapper .quitbanner > svg": {
            display: string;
        };
        "#ctp-wrapper #footer": {
            display: string;
        };
        "#ctp-wrapper .signinlayout": {
            "max-width": string;
            "min-height": string;
        };
        ".secure-payment-form.apm-active .signinlayout": {
            "min-height": string;
        };
        "#ctp-wrapper .rsdcode": {
            "font-size": string;
            "font-weight": string;
            margin: string;
        };
        "#ctp-wrapper .footerLabelDiv label": {
            "font-size": string;
            "font-weight": string;
            "margin-top": string;
            "margin-bottom": string;
        };
        "#ctp-wrapper .logindiv": {
            "min-height": string;
        };
        "#ctp-wrapper .VerificationLabel label": {
            display: string;
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .VerificationLabel #userMobileMC": {
            margin: string;
        };
        "#ctp-wrapper .transctcardlabel": {
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .TransitionLabel": {
            "font-size": string;
            "line-height": string;
            "text-align": string;
            float: string;
            margin: string;
        };
        "apple-pay-button": {
            "--apple-pay-button-width": string;
            "--apple-pay-button-height": string;
            "--apple-pay-button-border-radius": string;
            "--apple-pay-button-padding": string;
            "--apple-pay-button-box-sizing": string;
            display: string;
            margin: string;
        };
        ".secure-payment-form .tooltip": {
            position: string;
            width: string;
            height: string;
            border: string;
            "border-left": string;
            color: string;
            float: string;
            "background-size": string;
            background: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .tooltip h4": {
            "font-family": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .tooltip:focus": {
            border: string;
            outline: string;
            "border-left": string;
        };
        ".secure-payment-form .tooltip:hover": {
            border: string;
            outline: string;
            "border-left": string;
        };
        ".secure-payment-form .tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            right: string;
            opacity: string;
            transition: string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
            "margin-top": string;
            "margin-right": string;
        };
        ".secure-payment-form .tooltip-content h4": {
            margin: string;
        };
        ".secure-payment-form .tooltip:hover > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip:focus > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip-content::before": {
            position: string;
            content: string;
            right: string;
            top: string;
            "border-left": string;
            "border-right": string;
            "border-bottom": string;
        };
        ".secure-payment-form": {
            "font-family": string;
            width: string;
        };
        ".secure-payment-form label": {
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "text-transform": string;
        };
        ".secure-payment-form #ss-banner": {
            background: string;
            "background-size": string;
            height: string;
            "margin-bottom": string;
        };
        ".secure-payment-form div[class$='-shield']": {
            flex: string;
            "margin-right": string;
            float: string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-text-logo": {
            "border-radius": string;
            height: string;
            "text-align": string;
            margin: string;
            display: string;
            "justify-content": string;
            "align-items": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
            height: string;
            "margin-left": string;
            "vertical-align": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-msg": {
            "font-size": string;
            "font-weight": string;
            "font-family": string;
            color: string;
            "line-height": string;
            display: string;
            "vertical-align": string;
            "text-align": string;
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".secure-payment-form div[class$='-logo']": {
            flex: string;
            "margin-left": string;
            width: string;
            height: string;
            "text-align": string;
            float: string;
            display: string;
            "justify-content": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg": {
            color: string;
            "font-size": string;
            display: string;
            "vertical-align": string;
            "white-space": string;
            "margin-right": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg strong": {
            "white-space": string;
            "font-weight": string;
            display: string;
        };
        ".secure-payment-form div[class$='-logo'] img": {
            "vertical-align": string;
        };
        ".secure-payment-form div": {
            display: string;
        };
        ".secure-payment-form iframe": {
            "min-height": string;
        };
        ".secure-payment-form .form-row": {
            "margin-top": string;
        }; /**
         * Deletes all hosted fields within the form
         */
        ".secure-payment-form .form-wrapper": {
            display: string;
            margin: string;
        };
        ".secure-payment-form input": {
            "-o-transition": string;
            "-webkit-box-shadow": string;
            "-webkit-transition": string;
            "background-color": string;
            border: string;
            "border-radius": string;
            "box-shadow": string;
            "box-sizing": string;
            display: string;
            "font-family": string;
            "font-size": string;
            "font-smoothing": string;
            height: string;
            margin: string;
            "max-width": string;
            outline: string;
            padding: string;
            transition: string;
            "vertical-align": string;
            width: string;
        };
        ".secure-payment-form input:focus": {
            border: string;
            "box-shadow": string;
            outline: string;
        };
        ".secure-payment-form .tooltip, .secure-payment-form .tooltip-content": {
            display: string;
        };
        ".secure-payment-form .other-cards-label": {
            "border-bottom": string;
            "text-align": string;
            margin: string;
            position: string;
        };
        ".secure-payment-form .other-cards-label span": {
            "text-align": string;
            padding: string;
            background: string;
            position: string;
            color: string;
            width: string;
            left: string;
            "-webkit-transform": string;
            "-moz-transform": string;
            "-ms-transform": string;
            "-o-transform": string;
            transform: string;
            margin: string;
            "font-family": string;
            "font-size": string;
            "white-space": string;
        };
        ".secure-payment-form .hidden": {
            display: string;
        };
    };
    "gp-default2": {
        ".bank-selection-wrapper": {
            background: string;
            padding: string;
        };
        ".bank-selection": {
            display: string;
            "align-items": string;
            "flex-flow": string;
            "margin-bottom": string;
        };
        ".bank-selecction-option": {
            width: string;
            height: string;
            cursor: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            "box-shadow": string;
            "margin-right": string;
            "margin-left": string;
            "margin-top": string;
            background: string;
            "border-radius": string;
            "flex-direction": string;
        };
        ".bank-selecction-option:hover": {
            border: string;
        };
        ".bank-selecction-option:active": {
            background: string;
            border: string;
        };
        ".external-link-div": {
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".qr-code-button": {
            background: string;
        };
        ".title-text": {
            color: string;
            "font-size": string;
            "font-weight": string;
            "line-height": string;
            "font-family": string;
        };
        ".order-information"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
            "font-family": string;
        };
        ".title-field"?: {
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".order-information-field"?: {
            "line-height": string;
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments"?: {
            "font-family": string;
        };
        ".secure-payment-form .credit-card-qr-code-payments-target, .qr-code-payment-content, .qr-code-payment-countdown-timer"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-methods-wrapper"?: {
            width: string;
        };
        ".secure-payment-form .qr-code-payment-method-button"?: {
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .qr-code-payment-method-button:focus"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipayhk:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-alipay:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-method-wechat:hover"?: {
            "background-color": string;
            border: string;
        };
        ".secure-payment-form .qr-code-payment-iframe-wrapper"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .qr-code-payment-iframe"?: {
            border: string;
            width: string;
            height: string;
        };
        ".secure-payment-form .qr-code-payment-content"?: {
            "font-size": string;
            "line-height": string;
            width: string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-message"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock img"?: {
            "margin-right": string;
        };
        ".secure-payment-form .qr-code-payment-countdown-timer-clock"?: {
            display: string;
            "align-items": string;
            color: string;
            "font-size": string;
            "line-height": string;
            "font-weight": string;
            "justify-content": string;
        };
        ".secure-payment-form .payment-amount"?: {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .qr-code-expired-alert"?: {
            display: string;
            border: string;
            height: string;
            "margin-top": string;
        };
        ".secure-payment-form .qr-code-expired-alert-icon"?: {
            background: string;
            display: string;
            "align-items": string;
            "justify-content": string;
            width: string;
        };
        ".secure-payment-form .qr-code-expired-alert-message"?: {
            display: string;
            "flex-direction": string;
            "justify-content": string;
            padding: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .qr-code-expired-alert-message-title"?: {
            color: string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .paypal-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .paypal-button": {
            position: string;
            background: string;
            height: string;
            border: string;
            width: string;
            "border-radius": string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .paypal-button:hover": {
            "background-color": string;
        };
        ".secure-payment-form .paypal-button:focus": {
            "background-color": string;
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .open-banking-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .blik-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .express-pay-button-wrapper": {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .open-banking-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .open-banking-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .open-banking-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .open-banking-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .blik-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .blik-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .blik-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .blik-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .express-pay-button": {
            "background-color": string;
            border: string;
            "border-radius": string;
            position: string;
            color: string;
            height: string;
            width: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .express-pay-button:hover": {
            "background-color": string;
        };
        ".secure-payment-form .express-pay-button:focus": {
            "background-color": string;
        };
        ".secure-payment-form .express-pay-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .express-pay-button::after": {
            content: string;
        };
        ".secure-payment-form .affirm-button, .secure-payment-form .klarna-button, .secure-payment-form .sezzle-button, .secure-payment-form .zip-button": {
            background: string;
            position: string;
            color: string;
            height: string;
            width: string;
            "border-radius": string;
            border: string;
            margin: string;
            cursor: string;
        };
        ".secure-payment-form .affirm-button:hover, .secure-payment-form .klarna-button:hover, .secure-payment-form .sezzle-button:hover, .secure-payment-form .zip-button:hover": {
            "border-color": string;
            "background-color": string;
        };
        ".secure-payment-form .affirm-button:focus, .secure-payment-form .klarna-button:focus, .secure-payment-form .sezzle-button:focus, .secure-payment-form .zip-button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .affirm-button::before, .secure-payment-form .klarna-button::before, .secure-payment-form .sezzle-button::before, .secure-payment-form .zip-button::before": {
            width: string;
            height: string;
            position: string;
            top: string;
            right: string;
        };
        ".secure-payment-form .link-button": {
            display: string;
            "flex-direction": string;
            "align-items": string;
            background: string;
            border: string;
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            padding: string;
            cursor: string;
            margin: string;
        };
        ".secure-payment-form .link-button:hover": {
            color: string;
        };
        ".secure-payment-form .link-button:active": {
            color: string;
        };
        ".secure-payment-form .link-button:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .apms-redirecting-to-page": {
            "justify-content": string;
            height: string;
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .apms-redirecting-to-page-message": {
            color: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
        ".secure-payment-form .currency-conversion-container"?: {
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .credit-card-currency-conversion iframe"?: {
            "min-height": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset"?: {
            "font-family": string;
            border: string;
            margin: string;
            padding: string;
            display: string;
            "flex-wrap": string;
        };
        ".secure-payment-form .credit-card-currency-conversion legend"?: {
            "font-family": string;
            border: number;
            top: string;
            margin: string;
            padding: number;
            display: string;
            "font-size": string;
            "font-weight": string;
            position: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button"?: {
            display: string;
            "justify-content": string;
            "align-items": string;
            border: string;
            padding: string;
            "white-space": string;
            height: string;
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child"?: {
            "margin-right": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button:hover"?: {
            "border-color": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset:focus-within > .radio-button"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion fieldset.no-focus-outline .radio-button.checked"?: {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked"?: {
            background: string;
            "border-color": string;
            color: string;
            outline: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button.checked label"?: {
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']"?: {
            margin: string;
            appearance: string;
            "-webkit-appearance": string;
            "-moz-appearance": string;
            border: string;
            "border-radius": string;
            width: string;
            height: string;
            display: string;
            position: string;
            padding: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:checked"?: {
            "background-color": string;
            border: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button input[type='radio']:focus"?: {
            outline: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .radio-button label"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            display: string;
            margin: string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            "margin-left": string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .card-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content"?: {
            opacity: string;
            visibility: boolean;
            display: string;
            "flex-direction": string;
            /**
             * Represents logic surrounding a group of hosted fields.
             */
            "margin-left": string;
            "align-items": string;
            height: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content.visible"?: {
            display: string;
            opacity: string;
            visibility: boolean;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info"?: {
            "font-family": string;
            "font-size": string;
            "font-weight": number;
            margin: string;
            display: string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .additional-info p"?: {
            margin: string;
            "font-style": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip"?: {
            width: string;
            height: string;
            "min-width": string;
            "border-left": string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:focus"?: {
            "border-left": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content"?: {
            bottom: string;
            right: string;
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip:hover .tooltip-content"?: {
            display: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p"?: {
            margin: string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content p:last-child"?: {
            "margin-bottom": string;
        };
        ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before"?: {
            left: string;
            top: string;
            right: string;
            transform: string;
            "border-width": string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "border-style": string;
            "border-color": string;
        };
        "@media only screen and (max-width: 768px)"?: {
            ".secure-payment-form .currency-conversion-container": {
                "flex-direction": string;
                "align-items": string;
            };
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "justify-content": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:first-child": {
                margin: string;
            };
            ".secure-payment-form .credit-card-currency-conversion .card-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .merchant-currency-content": {
                width: string;
                "margin-top": string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .tooltip-content::before": {
                right: string;
            };
        };
        "@media(max-width: 340px)"?: {
            ".secure-payment-form .credit-card-currency-conversion fieldset": {
                "flex-flow": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button": {
                width: string;
                "margin-bottom": string;
                "margin-right": string;
            };
            ".secure-payment-form .credit-card-currency-conversion .radio-button:last-child": {
                "margin-bottom": string;
            };
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid"?: {
            border: string;
            "border-left": string;
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid:hover"?: {
            border: string;
            "border-left": string;
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid:focus"?: {
            border: string;
            "border-left": string;
        };
        "#googlePay": {
            height: string;
            margin: string;
        };
        "#googlePay button:focus": {
            outline: string;
            "outline-offset": string;
        };
        ".secure-payment-form .ctp-panel": {
            border: string;
            "box-shadow": string;
            "border-radius": string;
            "container-type": string;
            "font-family": string;
            "margin-bottom": string;
        };
        ".secure-payment-form div[class^='credit-card'].apm-active ~ div:not([class$='shield']):not([class$='logo'])": {
            display: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button": {
            "align-items": string;
            background: string;
            cursor: string;
            display: string;
            flex: string;
            "flex-direction": string;
            "flex-grow": string;
            order: string;
            padding: string;
            position: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-panel .ctp-header": {
            width: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .heading": {
            "font-family": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
            background: string;
            "background-size": string;
            width: string;
            height: string;
            margin: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-panel .ctp-button .subheading": {
            margin: string;
            "font-family": string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form div[class^='ctp'] .card-brands": {
            background: string;
            padding: string;
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            flex: string;
            order: string;
            "flex-grow": string;
        };
        ".secure-payment-form .ctp-info-tooltip": {
            width: string;
            height: string;
            display: string;
            "vertical-align": string;
            overflow: string;
            background: string;
            margin: string;
            "white-space": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            "margin-left": string;
            "margin-top": string;
            opacity: string;
            transition: string;
            "font-family": string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content .ctp-icon": {
            "margin-left": string;
        };
        ".secure-payment-form .ctp-info-tooltip .ctp-heading": {
            "max-width": string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content ul": {
            padding: string;
            "margin-bottom": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li": {
            padding: string;
            "font-size": string;
            "line-height": string;
            "list-style": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.smart-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.faster-checkout": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li.industry-standards": {
            background: string;
        };
        ".secure-payment-form .ctp-info-tooltip .top-arrow": {
            position: string;
            "margin-top": string;
            background: string;
            width: string;
            left: string;
            "margin-left": string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
        };
        ".secure-payment-form .ctp-info-tooltip-content li .ctp-icon": {
            "background-size": string;
            width: string;
            height: string;
            margin: string;
        };
        ".secure-payment-form .ctp-info-tooltip-content strong": {
            "font-size": string;
            "vertical-align": string;
        };
        ".secure-payment-form .ctp-info-tooltip:hover .ctp-info-tooltip-content": {
            visibility: string;
            opacity: string;
        };
        "@container (min-width: 408px)": {
            ".secure-payment-form .ctp-panel .ctp-button .heading": {
                "font-size": string;
            };
            ".secure-payment-form .ctp-panel .right-arrow": {
                "border-width": string;
            };
            ".secure-payment-form .ctp-panel .ctp-button .ctp-icon": {
                width: string;
                height: string;
                "background-size": string;
            };
        };
        ".secure-payment-form .apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form.apm-active .ctp-panel .ctp-button": {
            cursor: string;
        };
        ".secure-payment-form .ctp-panel .ctp-button:after": {
            content: string;
            position: string;
            width: string;
            height: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
        };
        ".secure-payment-form .ctp-panel .right-arrow": {
            position: string;
            background: string;
            right: string;
            border: string;
            "border-width": string;
            display: string;
            padding: string;
            transform: string;
            "-webkit-transform": string;
            "z-index": string;
            top: string;
            "margin-top": string;
        };
        ".secure-payment-form .apm-active .right-arrow": {
            display: string;
        };
        ".secure-payment-form.apm-active .right-arrow": {
            display: string;
        };
        "#ctp-wrapper #header": {
            display: string;
        };
        "#ctp-wrapper .logindiv .tooltip": {
            display: string;
        };
        "#ctp-wrapper .logindiv .lblemailInput": {
            display: string;
        };
        "#ctp-wrapper #verifyVisa .VerificationLabel": {
            "font-size": string;
            "font-family": string;
            "line-height": string;
        };
        "#ctp-wrapper #verifyVisa label": {
            display: string;
            /**
             * Appends additional CSS rules to the group of hosted fields
             *
             * @param json New CSS rules
             */
            "font-size": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .blue-button label": {
            "font-size": string;
            "line-height": string;
            "font-family": string;
            margin: string;
        };
        "#ctp-wrapper .cardhdr label": {
            margin: string;
            display: string;
            "font-size": string;
            "line-height": string;
        };
        "#ctp-wrapper .cardhdr label.crdSelectuser": {
            margin: string;
        };
        "#ctp-wrapper button label": {
            margin: string;
            "font-size": string; /**
             * Sets a special-case event listener that fires when all hosted
             * fields in a form have registered / loaded
             *
             * @param fn The listener function
             */
        };
        "#ctp-wrapper .quitbanner > svg": {
            display: string;
        };
        "#ctp-wrapper #footer": {
            display: string;
        };
        "#ctp-wrapper .signinlayout": {
            "max-width": string;
            "min-height": string;
        };
        ".secure-payment-form.apm-active .signinlayout": {
            "min-height": string;
        };
        "#ctp-wrapper .rsdcode": {
            "font-size": string;
            "font-weight": string;
            margin: string;
        };
        "#ctp-wrapper .footerLabelDiv label": {
            "font-size": string;
            "font-weight": string;
            "margin-top": string;
            "margin-bottom": string;
        };
        "#ctp-wrapper .logindiv": {
            "min-height": string;
        };
        "#ctp-wrapper .VerificationLabel label": {
            display: string;
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .VerificationLabel #userMobileMC": {
            margin: string;
        };
        "#ctp-wrapper .transctcardlabel": {
            margin: string;
            "font-size": string;
        };
        "#ctp-wrapper .TransitionLabel": {
            "font-size": string;
            "line-height": string;
            "text-align": string;
            float: string;
            margin: string;
        };
        "apple-pay-button": {
            "--apple-pay-button-width": string;
            "--apple-pay-button-height": string;
            "--apple-pay-button-border-radius": string;
            "--apple-pay-button-padding": string;
            "--apple-pay-button-box-sizing": string;
            display: string;
            margin: string;
        };
        ".secure-payment-form .modal-overlay": {
            background: string;
            position: string;
            top: string;
            left: string;
            margin: string;
            width: string;
            height: string;
            display: string;
            "justify-content": string;
            "align-items": string;
            "z-index": string;
        };
        ".secure-payment-form .modal-wrapper": {
            "font-family": string;
            background: string;
            "border-width": string;
            "border-radius": string;
            overflow: string;
        };
        ".secure-payment-form .credit-card-installments": {
            "font-family": string;
        };
        ".secure-payment-form .installment-eligibility-badge": {
            display: string;
            alignItems: string;
            justifyContent: string;
            width: string;
            margin: string;
        };
        ".secure-payment-form .installment-badge": {
            display: string;
            "align-items": string;
            background: string;
            border: string;
            "border-radius": string;
            padding: string;
            "font-size": string;
            color: string;
            "font-weight": string;
            gap: string;
        };
        ".secure-payment-form .pay-in-full-option": {
            "padding-left": string;
            border: string;
            '&.checked': {
                border: string;
            };
            padding: string;
            display: string;
            gap: string;
        };
        ".secure-payment-form .pay-in-full-option label": {
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .payment-options": {
            display: string;
            "flex-direction": string;
            gap: string;
            width: string;
        };
        ".secure-payment-form .installment-section": {
            border: string;
        };
        ".secure-payment-form .payment-option-text": {
            color: string;
            "font-size": string;
            "font-weight": string;
        };
        ".secure-payment-form .section-title": {
            display: string;
            "font-size": string;
            "font-weight": string;
            width: string;
            height: string;
            gap: string;
            padding: string;
            "align-items": string;
            "border-bottom": string;
            "text-transform": string;
        };
        ".secure-payment-form .installment-content": {
            padding: string;
        };
        ".secure-payment-form .installment-months-button": {
            padding: string;
            '&.checked': {
                border: string;
            };
            display: string;
            gap: string;
        };
        ".secure-payment-form .installment-issuer-panel": {
            background: string;
            display: string;
            "flex-direction": string;
            "max-width": string;
            padding: string;
            margin: string;
            gap: string;
            width: string;
        };
        ".secure-payment-form .installment-issuer-panel-header": {
            display: string;
            "justify-content": string;
            "align-items": string;
        };
        ".secure-payment-form .installment-issuer-panel-title": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-issuer-panel-content": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-panel": {
            "max-width": string;
            "margin-bottom": string;
        };
        ".secure-payment-form .installment-plans-title": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            margin: string;
        };
        ".secure-payment-form .installment-plans-subtitle": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-plan-details": {
            "border-top": string;
            "border-bottom": string;
            padding: string;
        };
        ".secure-payment-form .installment-plan-monthly-amount": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-options, .installment-panel": {
            display: string;
            "flex-direction": string;
            padding: string;
            width: string;
        };
        ".secure-payment-form .installment-options": {
            background: string;
            margin: string;
            padding: string;
            "border-radius": string;
        };
        ".secure-payment-form .installment-plan-options-title": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
        };
        ".secure-payment-form .installment-options-content": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            margin: string;
        };
        ".secure-payment-form .installment-term-selector-title": {
            "text-align": string;
            padding: string;
        };
        ".secure-payment-form .installment-panel-header": {
            "text-align": string;
            display: string;
            "flex-direction": string;
        };
        ".secure-payment-form .installment-panel-content": {
            margin: string;
        };
        ".secure-payment-form .installment-panel-footer": {
            "text-align": string;
            display: string;
            "flex-direction": string;
        };
        ".secure-payment-form .installment-field-value-item": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "font-size": string;
            margin: string;
        };
        ".secure-payment-form .installment-field-value-item, .installment-options-header": {
            display: string;
            "flex-direction": string;
            "justify-content": string;
        };
        ".secure-payment-form .installment-link": {
            background: string;
            border: string;
            color: string;
            "font-style": string;
            "font-weight": string;
            "text-decoration": string;
            "line-height": string;
            "font-size": string;
            padding: string;
            cursor: string;
        };
        ".secure-payment-form .installment-link:hover": {
            color: string;
        };
        ".secure-payment-form .installment-link:active": {
            color: string;
        };
        ".secure-payment-form .installment-link:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .installment-step-container": {
            display: string;
            "justify-content": string;
        };
        ".secure-payment-form .installment-base-action-button-wrapper": {
            display: string;
            "justify-content": string;
            "flex-wrap": string;
        };
        ".secure-payment-form .installment-base-action-button, .installment-button-explore-plans, .installment-button-learn-more, .installment-button-month-term, .installment-button-pay": {
            "border-radius": string;
            width: string;
            height: string;
            padding: string;
            color: string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            "font-style": string;
            border: string;
            cursor: string;
            "margin-top": string;
            "margin-bottom": string;
            display: string;
            "justify-content": string;
            "align-items": string;
            gap: string;
        };
        ".secure-payment-form .installment-button-explore-plans": {
            background: string;
            "margin-bottom": string;
        };
        ".secure-payment-form .installment-button-explore-plans:hover": {
            background: string;
        };
        ".secure-payment-form .installment-button-explore-plans:active": {
            background: string;
        };
        ".secure-payment-form .installment-button-explore-plans:focus": {
            background: string;
            border: string;
        };
        ".secure-payment-form .installment-button-learn-more": {
            background: string;
            color: string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            margin: string;
        };
        ".secure-payment-form .installment-button-learn-more::after": {
            content: string;
            "padding-top": string;
            filter: string;
        };
        ".secure-payment-form .installment-button-learn-more:hover": {
            color: string;
        };
        ".secure-payment-form .installment-button-learn-more:active": {
            color: string;
        };
        ".secure-payment-form .installment-button-learn-more:focus": {
            color: string;
            border: string;
        };
        ".secure-payment-form .installment-button-month-term": {
            background: string;
            width: string;
            height: string;
            "font-weight": string;
            margin: string;
        };
        ".secure-payment-form .installment-unselected": {
            background: string;
            color: string;
        };
        ".secure-payment-form .installment-unselected:hover": {
            border: string;
        };
        ".secure-payment-form .installment-button-pay": {
            background: string;
            height: string;
            padding: string;
        };
        ".secure-payment-form .installment-button-pay:hover": {
            background: string;
        };
        ".secure-payment-form .installment-button-pay:active": {
            background: string;
        };
        ".secure-payment-form .installment-button-pay:focus": {
            background: string;
            border: string;
        };
        ".secure-payment-form .installment-button-pay::before": {
            content: string;
            "margin-right": string;
        };
        ".secure-payment-form .provided-by": {
            "font-style": string;
            "font-weight": string;
            "font-size": string;
            "line-height": string;
            color: string;
            margin: string;
        };
        ".secure-payment-form .installment-learn-more-content": {
            width: string;
        };
        ".secure-payment-form .installment-learn-more-header": {
            display: string;
            padding: string;
            "justify-content": string;
            "align-items": string;
            background: string;
        };
        ".secure-payment-form .installment-learn-more-header-title": {
            "font-style": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .installment-learn-more-body": {
            display: string;
            margin: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".secure-payment-form .installment-learn-more-body ul": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            padding: string;
            "margin-top": string;
        };
        ".secure-payment-form .installment-learn-more-link": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "text-decoration-line": string;
            margin: string;
        };
        ".secure-payment-form .installment-button-close": {
            background: string;
            border: string;
            padding: string;
            cursor: string;
        };
        ".secure-payment-form .installment-button-close::after": {
            content: string;
        };
        ".secure-payment-form .term-and-condition-title": {
            display: string;
            "align-items": string;
            "font-style": string;
            "font-weight": string;
        };
        ".secure-payment-form .term-and-condition-title::before": {
            content: string;
            "margin-right": string;
        };
        ".secure-payment-form .term-and-condition-link": {
            color: string;
            "font-style": string;
            "font-weight": string;
            "line-height": string;
            "text-decoration-line": string;
        };
        "@font-face": {
            "font-family": string;
            src: string;
        };
        ".secure-payment-form": {
            display: string;
            "-ms-flex-wrap": string;
            "flex-wrap": string;
        };
        ".secure-payment-form *": {
            "box-sizing": string;
        };
        ".secure-payment-form label": {
            margin: string;
            display: string;
            "font-size": string;
            "font-weight": string;
            "font-family": string;
            color: string;
            "line-height": string;
        };
        ".label-div": {
            display: string;
        };
        ".required": {
            color: string;
        };
        ".secure-payment-form > div": {
            flex: string;
        };
        ".secure-payment-form .credit-card-card-cvv iframe": {
            width: string;
            float: string;
        };
        ".secure-payment-form div[class$='-shield']": {
            flex: string;
            "margin-right": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-text-logo": {
            "border-radius": string;
            height: string;
            "text-align": string;
            margin: string;
            display: string;
            "justify-content": string;
            "align-items": string;
            width: string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-logo_ico": {
            height: string;
            "margin-left": string;
            "vertical-align": string;
        };
        ".secure-payment-form div[class$='-shield'] .ssl-msg": {
            "font-size": string;
            "font-weight": string;
            "font-family": string;
            color: string;
            "line-height": string;
            display: string;
            "vertical-align": string;
            "text-align": string;
            "margin-left": string;
            "margin-right": string;
            "margin-top": string;
        };
        ".secure-payment-form div[class$='-logo']": {
            flex: string;
            "margin-left": string;
            width: string;
            height: string;
            "text-align": string;
            display: string;
            "justify-content": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg": {
            color: string;
            "font-size": string;
            display: string;
            "vertical-align": string;
            "white-space": string;
            "margin-right": string;
        };
        ".secure-payment-form div[class$='-logo'] .security-msg strong": {
            "white-space": string;
            "font-weight": string;
            display: string;
        };
        ".secure-payment-form div[class$='-logo'] img": {
            "vertical-align": string;
        };
        ".secure-payment-form .credit-card-submit": {
            margin: string;
        };
        ".secure-payment-form iframe": {
            "min-height": string;
            width: string;
        };
        ".secure-payment-form .other-cards-label": {
            "border-bottom": string;
            "text-align": string;
            margin: string;
            position: string;
        };
        ".secure-payment-form .other-cards-label span": {
            "text-align": string;
            padding: string;
            background: string;
            position: string;
            color: string;
            width: string;
            left: string;
            "-webkit-transform": string;
            "-moz-transform": string;
            "-ms-transform": string;
            "-o-transform": string;
            transform: string;
            margin: string;
            "font-family": string;
            "font-size": string;
            "white-space": string;
        };
        ".secure-payment-form .hidden": {
            display: string;
        };
        "@media(min-width: 1000px)": {
            ".secure-payment-form .credit-card-card-expiration": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-card-cvv": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-card-number": {
                flex: string;
            };
        };
        "@media (min-width: 300px) and (max-width: 1000px)": {
            ".secure-payment-form .credit-card-card-expiration": {
                flex: string;
            };
            ".secure-payment-form .credit-card-card-cvv": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-billing-address": {
                flex: string;
            };
            ".secure-payment-form .credit-card-country": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-shipping-address-country": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-shipping-address": {
                flex: string;
            };
            ".secure-payment-form .credit-card-country-code": {
                flex: string;
            };
            ".secure-payment-form .credit-card-country-code label": {
                width: string;
            };
            ".secure-payment-form .credit-card-phone-number": {
                flex: string;
                "margin-left": string;
            };
            ".secure-payment-form .credit-card-phone-number label": {
                visibility: string;
            };
            ".secure-payment-form .credit-card-billing-city": {
                flex: string;
            };
        };
        ".secure-payment-form .credit-card-card-number-small": {
            display: string;
        };
        ".secure-payment-form .credit-card-card-expiration-small": {
            "margin-left": string;
            flex: string;
        };
        ".secure-payment-form .credit-card-billing-state-small, .secure-payment-form .credit-card-shipping-state-small": {
            flex: string;
            "margin-left": string;
        };
        ".secure-payment-form .credit-card-billing-postal-code-small, .secure-payment-form .credit-card-shipping-postal-code-small": {
            flex: string;
            "margin-left": string;
        };
        ".secure-payment-form .credit-card-billing-city-small, .secure-payment-form .credit-card-shipping-city-small": {
            display: string;
        };
        ".secure-payment-form .credit-card-phone-number label": {
            visibility: string;
        };
        ".phone-number-wrapper, .billing-address-wrapper, .shipping-details-wrapper, .billing-location-wrapper, .shipping-location-wrapper": {
            display: string;
        };
        ".credit-card-billing-city, .credit-card-shipping-city": {
            flex: string;
        };
        ".credit-card-billing-state, .credit-card-billing-postal-code, .credit-card-shipping-state, .credit-card-shipping-postal-code": {
            "margin-left": string;
        };
        ".secure-payment-form .credit-card-country-code": {
            width: string;
            "min-width": string;
        };
        ".secure-payment-form .credit-card-country-code .label-div": {
            width: string;
        };
        ".credit-card-save-enable": {
            "margin-top": string;
            "font-family": string;
        };
        ".credit-card-save-enable input": {
            height: string;
            width: string;
        };
        ".credit-card-save-enable span": {
            "vertical-align": string;
            "letter-spacing": string;
            color: string;
            "margin-left": string;
        };
        ".credit-card-save-enable .learn-more": {
            "vertical-align": string;
            color: string;
        };
        ".terms-and-conditions": {
            "font-size": string;
            color: string;
            "margin-top": string;
        };
        ".terms-and-conditions a": {
            color: string;
            "font-weight": string;
            "text-decoration": string;
        };
        ".credit-card-shipping-same-as-billing": {
            "margin-top": string;
            "font-family": string;
            "margin-bottom": string;
        };
        ".credit-card-shipping-same-as-billing input": {
            height: string;
            width: string;
        };
        ".credit-card-shipping-same-as-billing span": {
            "vertical-align": string;
            "letter-spacing": string;
            color: string;
            "margin-left": string;
            "font-size": string;
        };
        ".encrypted": {
            "font-family": string;
            " text-align": string;
            "font-size": string;
            "margin-top": string;
            color: string;
            "font-weight": string;
            "margin-left": string;
        };
        ".encrypted-shipping": {
            "font-size": string;
            "margin-top": string;
            color: string;
            "font-weight": string;
            float: string;
            "letter-spacing": string;
        };
        ".options": {
            "list-style": string;
            padding: string;
            width: string;
            height: string;
            overflow: string;
            position: string;
            border: string;
            "border-radius": string;
            background: string;
            "margin-top": string;
        };
        ".show": {
            display: string;
        };
        ".options li": {
            display: string;
            "margin-top": string;
            height: string;
            padding: string;
            cursor: string;
        };
        ".secure-payment-form .credit-card-phone-number": {
            width: string;
            "margin-left": string;
        };
        ".secure-payment-form .credit-card-country": {
            "margin-left": string;
            "min-width": string;
        };
        ".secure-payment-form .credit-card-shipping-address-country": {
            "margin-left": string;
            "min-width": string;
        };
        ".secure-payment-form .credit-card-billing-address": {
            width: string;
        };
        ".secure-payment-form .credit-card-shipping-address": {
            width: string;
        };
        ".secure-payment-form .tooltip": {
            position: string;
            width: string;
            "border-radius": string;
            color: string;
            float: string;
            "background-size": string;
            background: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
            "margin-left": string;
        };
        ".secure-payment-form .tooltip h4": {
            "font-family": string;
            "font-size": string;
            "line-height": string;
            color: string;
        };
        ".secure-payment-form .tooltip:focus": {
            outline: string;
        };
        ".secure-payment-form .tooltip:hover": {
            outline: string;
        };
        ".secure-payment-form .tooltip-content": {
            visibility: string;
            width: string;
            "background-color": string;
            color: string;
            "text-align": string;
            "border-radius": string;
            border: string;
            padding: string;
            position: string;
            "z-index": string;
            opacity: string;
            transition: string;
            "font-size": string;
            "font-weight": string;
            "box-shadow": string;
            bottom: string;
        };
        "@media (max-width: 700px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
                width: string;
            };
        };
        "@media (min-width: 700px) and (max-width: 850px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 850px) and (max-width: 1000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 1000px) and (max-width: 1200px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 1200px) and (max-width: 1700px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 1700px) and (max-width: 2000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 2000px) and (max-width: 2500px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 2500px) and (max-width: 3000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        "@media (min-width: 3000px)": {
            ".secure-payment-form .tooltip-content": {
                "margin-left": string;
            };
        };
        ".secure-payment-form .tooltip-content h4": {
            margin: string;
        };
        ".secure-payment-form .tooltip:hover > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip:focus > .tooltip-content": {
            visibility: string;
            opacity: string;
        };
        ".secure-payment-form .tooltip-content::after": {
            position: string;
            content: string;
            top: string;
            left: string;
            "margin-left": string;
            "border-width": string;
            "border-style": string;
            "border-color": string;
        };
        ".secure-payment-form .hf-cvv-tooltip-invalid, .secure-payment-form .hf-cvv-tooltip-invalid:hover, .secure-payment-form .hf-cvv-tooltip-invalid:focus": {
            border: string;
        };
        ".field-validation": {
            color: string;
            "font-weight": string;
        };
        ".apms-redirecting-to-page": {
            "justify-content": string;
            height: string;
            display: string;
            "flex-direction": string;
            "align-items": string;
        };
        ".apms-redirecting-to-page-message": {
            color: string;
            "font-family": string;
            "font-size": string;
            "line-height": string;
        };
    };
};
export interface IUIFormOptions {
    labels?: IDictionary;
    placeholders?: IDictionary;
    prefix?: string;
    style?: "default" | "simple" | "blank" | "gp-default" | "gp-default2";
    titles?: IDictionary;
    values?: IDictionary;
    amount?: number;
    apms?: IDictionary;
    fields?: IDictionary;
    provider?: string;
}
export declare const frameFieldTypes: string[];
export interface IUIFormFields {
    [key: string]: IUIFormField;
}
/**
 * Represents logic surrounding a group of hosted fields.
 */
export default class UIForm {
    frames: IFrameCollection;
    fields: IUIFormFields;
    styles: object;
    formOptionFields: IUIFormOptions | undefined;
    private totalNumberOfFields;
    /**
     * Instantiates a new UIForm object for a group of hosted fields
     *
     * @param fields Hosted field configuration
     * @param styles Custom CSS configuration
     */
    constructor(fields: IUIFormFields, styles: object, formOptions?: IUIFormOptions);
    /**
     * Sets an event listener for an event type
     *
     * @param fieldTypeOrEventName The field type on which the listener should
     *          be applied, or the type of event that should trigger the listener
     * @param eventNameOrListener The type of event that should trigger the
     *          listener, or the listener function
     * @param listener The listener function when both field type and event type
     *          are provided
     */
    on(fieldTypeOrEventName: string, eventNameOrListener: string | IEventListener, listener?: IEventListener): this | undefined;
    /**
     * Appends additional CSS rules to the group of hosted fields
     *
     * @param json New CSS rules
     */
    addStylesheet(json: IDictionary): this | undefined;
    /**
     * Sets a special-case event listener that fires when all hosted
     * fields in a form have registered / loaded
     *
     * @param fn The listener function
     */
    ready(fn: (fields: IFrameCollection) => void): void;
    /**
     * Deletes all hosted fields within the form
     */
    dispose(): void;
    private createFrames;
    private expressPayEventEmitter;
    private addExpressPayBtnEventListener;
    private configureCardInstallmentsEvents;
    private startCardInstallmentDataRequest;
    private removeInstallmentsPanel;
    private currencyConversionResponseData;
    private installmentResponseData;
    /**
     * Configures event listeners related to currency conversion for the specified iframe field.
     * @param dccField The iframe field associated with the currency conversion.
     */
    private configureCurrencyConversionEvents;
    private checkCurrencyConversionStatus;
    /**
     * Initiates a currency conversion data request using the provided parameters.
     * @param args An object containing the necessary parameters for the currency conversion request.
     */
    private startCurrencyConversionDataRequest;
    /**
     * Requests data from all relevant fields associated with the target iframe field,
     * including optional installment payment data and currency conversion data if enabled.
     * @param target The iframe field for which data is requested.
     * @param installment Optional installment payment data.
     */
    private requestDataFromAll;
    setSubtotalAmount(amount: string): void;
    private requestInstallmentData;
    private getHostedFieldsToValidate;
    private configureHostedFieldValidations;
    private validateForm;
    private submitForm;
    private requestCurrencyConversionData;
    private startQRCodePaymentMethodsRequest;
}
