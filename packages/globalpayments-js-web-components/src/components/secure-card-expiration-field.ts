import { SecurePaymentElement } from "./secure-payment-element.js";

export class SecureCardExpirationField extends SecurePaymentElement {
    static TAG_NAME = "secure-card-expiration-field";

    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureCardExpirationField.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return "card-expiration";
    }
}

customElements.define(SecureCardExpirationField.TAG_NAME, SecureCardExpirationField);

declare global {
    interface HTMLElementTagNameMap {
        "secure-card-expiration-field": SecureCardExpirationField,
    }
}
