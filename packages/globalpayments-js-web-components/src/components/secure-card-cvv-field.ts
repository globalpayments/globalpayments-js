import { SecurePaymentElement } from "./secure-payment-element.js";

export class SecureCardCvvField extends SecurePaymentElement {
    static TAG_NAME = "secure-card-cvv-field";

    /**
     * @inheritdoc
     */
    get tagName() {
        return SecureCardCvvField.TAG_NAME;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return "card-cvv";
    }
}

customElements.define(SecureCardCvvField.TAG_NAME, SecureCardCvvField);
