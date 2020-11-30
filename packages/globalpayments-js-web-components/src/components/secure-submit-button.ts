import { SecurePaymentElement } from "./secure-payment-element.js";

export class SecureSubmitButton extends SecurePaymentElement {
    static TAG_NAME = "secure-submit-button";

    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureSubmitButton.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return "submit";
    }

    /**
     * @inheritdoc
     */
    getTargetEvents() {
        return Array.of(...super.getTargetEvents(), ...["click"]);
    }
}

customElements.define(SecureSubmitButton.TAG_NAME, SecureSubmitButton);

declare global {
    interface HTMLElementTagNameMap {
        "secure-submit-button": SecureSubmitButton,
    }
}
