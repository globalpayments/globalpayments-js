import { SecurePaymentElement } from "./secure-payment-element.js";

export class SecureCardNumberField extends SecurePaymentElement {
    static TAG_NAME = "secure-card-number-field";

    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureCardNumberField.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return "card-number";
    }
}

customElements.define(SecureCardNumberField.TAG_NAME, SecureCardNumberField);

declare global {
    interface HTMLElementTagNameMap {
        "secure-card-number-field": SecureCardNumberField,
    }
}
